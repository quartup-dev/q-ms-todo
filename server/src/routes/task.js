const express = require('express');
const router = express.Router();
// import ExtError from "../exceptions/ExtError"

// import Task from "../models/task"


const auth = require(global.__basedir + '/src/middlewares/auth-jwt')
const scope = require(global.__basedir + '/src/middlewares/scope')


import taskController from "../controllers/taskController"

router.get('/', auth, taskController.index)
router.post('/', auth, taskController.store)
router.get('/:id', auth, taskController.show)
router.put('/:id', auth, taskController.update)
module.exports = router;
