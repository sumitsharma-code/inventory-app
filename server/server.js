require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const saleRoutes = require('./routes/sales');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman, curl, server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("CORS blocked:", origin);
    return callback(null, false); // ❗ IMPORTANT: false, NOT error
  },
  credentials: true
}));



app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.set('io', io);

io.on('connection', socket => {
  console.log('Socket connected', socket.id);
});

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/sales', saleRoutes);
app.use('/reports', reportRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
