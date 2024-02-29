const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const login = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: 'postgres://smart_brain_db_vhxb_user:bFMDUtJVBT6hXHjreiws95BRV7E7PHIA@dpg-cnfraag21fec73f8ut80-a.frankfurt-postgres.render.com/smart_brain_db_vhxb',
      ssl: true,
      host : 'dpg-cnfraag21fec73f8ut80-a',
      port : 5432,
      user : 'smart_brain_db_vhxb_user',
      password : 'bFMDUtJVBT6hXHjreiws95BRV7E7PHIA',
      database : 'smart_brain_db_vhxb'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('success')});
app.post('/signin', (req, res) => { login.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});