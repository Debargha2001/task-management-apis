const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/tasks", authController.authMiddleware,taskController.fetchAllTasks)
router.get("/tasks/:id", authController.authMiddleware, taskController.fetchTaskById);
router.get("/tasks/:id", authController.authMiddleware, taskController.fetchTaskById);
router.get("/tasks/:id", authController.authMiddleware, taskController.fetchTaskById);
router.post("/tasks", authController.authMiddleware, taskController.createTask)
router.patch("/tasks/:id", authController.authMiddleware, taskController.updateTask)
router.delete("/tasks/:id", authController.authMiddleware, taskController.deleteTaskById);
router.post("/sign-up", authController.signup)
router.post("/login", authController.login);

module.exports = router;