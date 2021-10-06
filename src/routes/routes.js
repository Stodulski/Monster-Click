const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('index');
})

router.get('/inicio', (req, res)=>{
    res.render('welcome')
})

module.exports = router;