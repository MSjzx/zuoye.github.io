const express = require('express');
const userControllers = require('../controllers/userControllers')

const router = express.Router();

router.get('/', userControllers.getUsers);
router.post('/save', userControllers.saveUser);
router.post('/update', userControllers.updateUser);
router.get('/remove', userControllers.deleteUser);
router.get('/new', userControllers.showNew);
router.get('/edit', userControllers.showEdit);

exports = module.exports = router;
