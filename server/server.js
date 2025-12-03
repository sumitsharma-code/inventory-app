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

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*' }
});

app.set('io', io);

io.on('connection', socket => {
  console.log('Socket connected', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/sales', saleRoutes);
app.use('/reports', reportRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed', err);
  });
