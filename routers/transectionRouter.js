const express = require('express');
const transectionController = require('../controllers/transectionController');

const router = express.Router();

router.post('/create', transectionController.createTransection);
router.get('/all/:userId', transectionController.getTransections);
router.put('/update/:id', transectionController.updateTransection);
router.delete('/delete/:id', transectionController.deleteTransection);

module.exports = router;
