const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();
const { isUserAuthenticated, authorizeRole } = require('../middlewares/auth'); 

router.post('/register', userControllers.registerUser);

router.post('/login', userControllers.loginUser);

router.post('/password/reset', userControllers.resetPassword);

router.get('/logout', userControllers.logoutUser);

router.put('/password/reset/:resetPasswordToken', userControllers.changePassword);

router.get('/me', isUserAuthenticated, userControllers.getUserDetails);

router.put('/password/update', isUserAuthenticated, userControllers.updatePassword);

router.put('/me/update', isUserAuthenticated, userControllers.updateProfile);

router.get('/admin/users', isUserAuthenticated, authorizeRole("admin"), userControllers.getAllUsers);

router.get('/admin/user/:id', isUserAuthenticated, authorizeRole("admin"), userControllers.getUser);

router.put('/admin/user/:id', isUserAuthenticated, authorizeRole("admin"), userControllers.updateUserRole);

router.delete('/admin/user/:id', isUserAuthenticated, authorizeRole("admin"), userControllers.deleteUserProfile);

module.exports = router;