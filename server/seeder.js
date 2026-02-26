const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Beat = require('./models/Beat');
const Session = require('./models/Session');
const Enquiry = require('./models/Enquiry');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const importData = async () => {
  try {
    await User.deleteMany();
    await Beat.deleteMany();
    await Session.deleteMany();
    await Enquiry.deleteMany();

    // Create Admin User
    const adminUser = new User({
      username: 'Admin',
      email: 'admin@rexlabs.com',
      password: 'password123',
      role: 'admin',
    });
    await adminUser.save();

    // Create Client User
    const clientUser = new User({
      username: 'Client',
      email: 'client@rexlabs.com',
      password: 'password123',
      role: 'client',
    });
    await clientUser.save();

    const createdUsers = [adminUser, clientUser];
    const adminUserId = adminUser._id;

    const sampleBeats = [
      {
        title: 'Midnight Drive',
        user: adminUserId,
        audioUrl: '/assets/demo-beat.mp3', // Placeholder
        coverArtUrl: '/assets/audiowave.jpg',
        price: 29.99,
        genre: 'Trap',
        mood: 'Dark',
        bpm: 140,
        duration: '3:20',
      },
      {
        title: 'Soulful Sundays',
        user: adminUserId,
        audioUrl: '/assets/demo-beat.mp3',
        coverArtUrl: '/assets/piano.jpg',
        price: 34.99,
        genre: 'Lo-Fi',
        mood: 'Chill',
        bpm: 90,
        duration: '2:45',
      },
      {
        title: 'Hype Beast',
        user: adminUserId,
        audioUrl: '/assets/demo-beat.mp3',
        coverArtUrl: '/assets/interface.jpg',
        price: 49.99,
        genre: 'Drill',
        mood: 'Aggressive',
        bpm: 160,
        duration: '3:10',
      },
    ];

    await Beat.insertMany(sampleBeats);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Beat.deleteMany();
    await Session.deleteMany();
    await Enquiry.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
