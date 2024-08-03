const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const User = require('./models/userModel');
const UserProfile = require('./models/userProfileModel');

const app = express();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true for HTTPS
}));

const uri = "mongodb+srv://admin:Password100@community-portal.se6l09d.mongodb.net/?retryWrites=true&w=majority&appName=community-portal";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/users', async (req, res) => {
    try {
        const memberSince = new Date().toISOString().split('T')[0];
        const userId = new mongoose.Types.ObjectId();
        const profileId = new mongoose.Types.ObjectId();

        const newUser = {
            _id: userId,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            member_since: memberSince,
            profile_picture: ''
        };

        const newUserProfile = {
            profile_id: userId.toString(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            member_since: memberSince,
            profile_picture: '',
            bio: '',
            first_name: '',
            last_name: ''
        };

        const user = await User.create(newUser);
        const userProfile = await UserProfile.create(newUserProfile);

        res.status(200).json({
            user,
            userProfile
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id;
        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const userProfile = await UserProfile.findOne({ profile_id: id });

        if (!user || !userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user, userProfile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/users/:id', upload.single('profile_picture'), async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = {
            username: req.body.username,
            email: req.body.email,
            bio: req.body.bio,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        };

        if (req.file) {
            const fileName = `${Date.now()}-${req.file.originalname}`;
            const filePath = path.join(__dirname, 'uploads', fileName);

            await sharp(req.file.buffer)
                .resize({ width: 300, height: 300, fit: 'cover' })
                .toFile(filePath);

            updateData.profile_picture = `/uploads/${fileName}`;
        }

        const userProfile = await UserProfile.findOneAndUpdate({ profile_id: id }, updateData, { new: true });

        if (!userProfile) {
            return res.status(404).json({ message: `Cannot find user profile with ID ${id}` });
        }

        res.status(200).json({ userProfile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/session', (req, res) => {
    if (req.session.userId) {
        res.status(200).json({ loggedIn: true, userId: req.session.userId });
    } else {
        res.status(200).json({ loggedIn: false });
    }
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
