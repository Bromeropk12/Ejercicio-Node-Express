"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// GET /users - Obtener 
router.get('/', userController_1.userController.getAllUsers.bind(userController_1.userController));
// GET  - Obtener  por ID
router.get('/:id', userController_1.userController.getUserById.bind(userController_1.userController));
// POST  Crear  usuario
router.post('/', userController_1.userController.createUser.bind(userController_1.userController));
// PUT Actualizar usuario 
router.put('/:id', userController_1.userController.updateUser.bind(userController_1.userController));
// PATCH  Actualizar parcialmente
router.patch('/:id', userController_1.userController.partialUpdateUser.bind(userController_1.userController));
// DELETE  Eliminar usuario
router.delete('/:id', userController_1.userController.deleteUser.bind(userController_1.userController));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map