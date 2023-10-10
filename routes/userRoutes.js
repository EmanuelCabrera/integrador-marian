const {Router} = require('express')

const userController = require('../controllers/userController')

const router = Router()

router.get('/user', userController.getUser)

router.post('/user', userController.saveUser)

router.post('/login', userController.loginUser)

router.get('/user/:id', userController.getUserById)

// router.put('/user/:id', userController.putUserById)

// router.delete('/user/:id', userController.deleteUserById)


module.exports = router
