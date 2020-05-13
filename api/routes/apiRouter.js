const router = require('express').Router();
const userRouter = require('./users/userRouter');
router.use('/users', userRouter);


router.get('/', (req,res)=> {
    res.send('Quake alive')
})

module.exports = router;

 