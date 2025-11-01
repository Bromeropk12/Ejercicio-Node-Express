import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();


router.get('/', userController.getAllUsers.bind(userController));


router.get('/:id', userController.getUserById.bind(userController));


router.post('/', userController.createUser.bind(userController));


router.put('/:id', userController.updateUser.bind(userController));


router.patch('/:id', userController.partialUpdateUser.bind(userController));


router.delete('/:id', userController.deleteUser.bind(userController));

export default router;