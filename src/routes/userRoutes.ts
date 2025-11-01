import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

// GET /users - Obtener 
router.get('/', userController.getAllUsers.bind(userController));

// GET  - Obtener  por ID
router.get('/:id', userController.getUserById.bind(userController));

// POST  Crear  usuario
router.post('/', userController.createUser.bind(userController));

// PUT Actualizar usuario 
router.put('/:id', userController.updateUser.bind(userController));

// PATCH  Actualizar parcialmente
router.patch('/:id', userController.partialUpdateUser.bind(userController));

// DELETE  Eliminar usuario
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;