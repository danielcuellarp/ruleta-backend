const { Router } = require('express');
const router = new Router();

// Index
router.get('/', (req, res) => {
    res.send('Hola mundo');
});  

module.exports = router;