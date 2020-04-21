
const Users = require('./userModel');
const bcrypt = require('bcrypt');
const secrets = require ('../../../config/secrets');
const jwt = require('jsonwebtoken');


const router = require('express').Router();
router.get('/all', (req,res)=> {
    Users.getUsers()
    .then(user=> {
      res.status(200).json(user);
  })
  .catch(err=> {
    res.status(500).json({message: 'error getting the users.'})
  });
  });



router.post('/register', (req,res)=> {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    Users.addUser(user)
    .then(saved=>{
        res.status(201).json(saved)
    })
    .catch(err=> {
        res.status(500).json(err)
    })


})

router.post('/login', (req,res)=> {
    let {email, password} = req.body;
    Users.findBy({email})
    .first()
    .then(user=> {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = genToken(user);
            res.status(200).json({
                messsage: `Welcome ${user.first_name}! `,
                user: {
                    'user_id': user.id,
                    'email':user.email,
                    'token': token
                }
            });
        }else{
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(err=> {
        res.status(500).json({message: errror})
    })
})


function genToken(user) {
    const payload = {
      userid: user.id,
      username: user.username
    };
    const secret = secrets.jwtSecret;
    const options = { expiresIn: "1h" };
  
    const token = jwt.sign(payload, secrets.jwtSecret, options);
  
    return token;
  }


module.exports = router;