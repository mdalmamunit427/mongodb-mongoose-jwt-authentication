const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userControllers');
const verifyToken = require('../middleware/verifyToken');

// Get all users
router.get('/', usersController.getUsers);

// Create a new user
router.post('/', usersController.createUser);

// Delete a user by ID (restricted to admin)
router.delete('/:id', verifyToken, (req, res) => {
    usersController.deleteUser(req, res);
});

// Update a user by ID (restricted to admin)
router.put('/:id', verifyToken, (req, res) => {
    usersController.updateUser(req, res);
});

router.get("/:id", usersController.signleUser)

module.exports = router;



// GET /users - Get all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

