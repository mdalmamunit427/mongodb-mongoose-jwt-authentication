const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()
const jwt = require('jsonwebtoken');

// generate secret key usign crypto random string
// require('crypto').randomBytes(32).toString('hex')


// middleware
app.use(cors());
app.use(express.json()); 


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@usersdb.4qy0iyn.mongodb.net/UsersDB?retryWrites=true&w=majority`).then(
    console.log("MongoDb Connected successfully!")
).catch((error) => {
    console.log("Error connecting to Mongodb server: " + error)
});

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);


app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.send({ token });
})

  // middlewares 
  const verifyToken = (req, res, next) => {
  
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'unauthorized access' })
      }
      req.decoded = decoded;
      next();
    })
  }

app.get('/', verifyToken ,(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})