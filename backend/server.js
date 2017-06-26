const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

let users = [
  {id: 1, email: 'tu@test.fr', nickname:'Tutu', password: 'aze', role: 'admin' },
  {id: 2, email: 'tu2@test.fr', nickname:'Tutu2', password: 'qsd', role: 'user' }  
];
// const fakeUser = {id: 1, email: 'tu@test.fr', nickname:'Tutu', password: 'aze' };
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];  
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
  if(req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    const index = users.findIndex(user => user.email === email);
    console.log('index ', index);
    console.log('user ', users[index]);
    if(index > -1 && users[index].password === password) {
      let user = users[index]; 
      let token = '';
      if(user.email === 'tu@test.fr') {
        token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email, nickname: user.nickname}, secret);
      } else {
        token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email, nickname: user.nickname}, secret);
      }
      res.json({ success: true, token: token});
    } else {
      res.status(401).json({ success: false, message : 'identifiants incorrects' });
    }
  } else {
    res.status(500).json({ success: false, message: 'données manquantes'});
  }
});

auth.post('/register', (req, res) => {
  console.log('req.body ', req.body);
  if(req.body) {
    const email = req.body.email.toLocaleLowerCase().trim();
    const password = req.body.password.toLocaleLowerCase().trim();
    const nickname = req.body.nickname.trim();
    users = [{id: Date.now(), email: email, password: password, nickname: nickname}, ...users];
    res.json({ success: true, users: users });
  } else {
    res.json({ success: false, message: 'la création a échoué'});
  }
});

api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.get('/jobs/:email', (req, res) => {
  // res.json({success: true, message: 'GET on jobs/:email works'});
  const email = req.params.email;
  const jobs = getAllJobs().filter(job => job.email === email);
  res.json({ success: true, jobs: jobs});
});

const checkUserToken = (req, res, next) => {
  // check that the user sent a token in the request header
  if(!req.header('authorization')) {
    // no header, no need to go further
    return res.status(401).json({ success: false, message: "Header d'authentification manquant"});
  }

  const authorizationHeaderParts = req.header('authorization').split(' ');
  // parts are 'Bearer theToken'
  let token = authorizationHeaderParts[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if(err) {
      return res.status(401).json({ success: false, message: "Token non valide"});      
    } else {
      console.log('decodedToken ', decodedToken);
      next();
    }
  });
};

api.post('/jobs', checkUserToken, (req, res) => {
  const job = req.body;
  console.log('received job on POST to /jobs', job);
  addedJobs = [job, ...addedJobs];
  res.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
  const term = req.params.term.toLowerCase().trim();
  let place = req.params.place;
  let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
  if(place) {
    console.log('place ', place);
    place = place.toLowerCase().trim();
    jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
  }
  // console.log(jobs);
  res.json({ success: true, jobs: jobs});
});

api.get('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const job = getAllJobs().filter(j => j.id === id);
  if(job.length === 1) {
    res.json({ success: true, job: job[0]});
  } else {
    res.json({ success: false, message: `pas de job ayant pour id ${id}`});
  }
});

app.use('/api', api);
app.use('/auth', auth);

const port = 4201;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
}); 