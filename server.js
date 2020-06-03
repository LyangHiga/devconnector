const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./routes/api/auth');
const postsRouter = require('./routes/api/posts');
const profileRouter = require('./routes/api/profile');
const usersRouter = require('./routes/api/users');

const app = express();

// connecting DB
connectDB();

// body parser middleware
app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
