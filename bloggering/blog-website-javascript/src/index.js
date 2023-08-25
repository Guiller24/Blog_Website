const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/sequelize');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);

try{
  sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}catch(err){
  console.error('Error synchronizing database:', err);
}

