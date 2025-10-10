require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const bookRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const app = express();

// ===== CORS (allow all origins for now) =====
app.use(cors({ origin: '*', credentials: true }));

// ===== Middlewares =====
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ===== Routes =====
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.use('/books', bookRouter);
app.use('/users', usersRouter);

// ===== MongoDB Connection =====
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Stop server if DB fails
    }
};

// ===== Health Check Endpoint =====
app.get('/health', async (req, res) => {
    const dbState = mongoose.connection.readyState;
    let status;
    switch (dbState) {
        case 0:
            status = 'disconnected';
            break;
        case 1:
            status = 'connected';
            break;
        case 2:
            status = 'connecting';
            break;
        case 3:
            status = 'disconnecting';
            break;
        default:
            status = 'unknown';
    }
    res.status(200).json({
        server: 'running',
        mongodb: status,
    });
});

// ===== Start server only after DB connection =====
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;
