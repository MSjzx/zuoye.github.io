const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();

router.get('/', userControllers.getUsers);
router.post('/save', userControllers.saveUser);
router.put('/update', userControllers.updateUser);
router.delete('/remove', userControllers.deleteUser);
exports = module.exports = router;