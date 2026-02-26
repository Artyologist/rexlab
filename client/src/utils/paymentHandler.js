import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const initializePayment = async (amount, items, prefill = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Create order on the server
      const { data } = await axios.post(`${API_URL}/payment/order`, {
        amount,
        items,
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Rex Labs Studio',
        description: 'Payment for ' + items.map(i => i.name).join(', '),
        order_id: data.orderId,
        handler: async function (response) {
          try {
            // 2. Verify payment on the server
            const verifyUrl = `${API_URL}/payment/verify`;
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: verResult } = await axios.post(verifyUrl, verifyData);

            if (verResult.message === 'Payment verified successfully') {
              toast.success('Payment successful!');
              resolve(verResult.order);
            } else {
              reject(new Error('Verification failed'));
            }
          } catch (error) {
            console.error('Verification Error:', error);
            toast.error('Payment verification failed.');
            reject(error);
          }
        },
        prefill: {
          name: prefill.name || 'User Name',
          email: prefill.email || 'user@example.com',
          contact: prefill.phone || '',
        },
        theme: {
          color: '#8b5cf6',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', function (response) {
        toast.error('Payment failed: ' + response.error.description);
        reject(new Error(response.error.description));
      });
    } catch (error) {
      console.error('Payment Initialization Error:', error);
      toast.error('Failed to initialize payment.');
      reject(error);
    }
  });
};
