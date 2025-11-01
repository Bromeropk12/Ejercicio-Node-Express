"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const userService_1 = require("../userService");
class UserController {
    // GET /users - Obtener todos los usuarios
    getAllUsers(req, res) {
        try {
            const users = userService_1.userService.getAllUsers();
            const response = {
                success: true,
                data: users,
                timestamp: new Date().toISOString()
            };
            res.json(response);
        }
        catch (error) {
            this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
        }
    }
    // GET /users/:id - Obtener usuario por ID
    getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
            }
            const user = userService_1.userService.getUserById(id);
            if (!user) {
                return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
            }
            const response = {
                success: true,
                data: user,
                timestamp: new Date().toISOString()
            };
            res.json(response);
        }
        catch (error) {
            this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
        }
    }
    // POST /users - Crear nuevo usuario
    createUser(req, res) {
        try {
            const userData = req.body;
            // Validar datos
            const validationErrors = userService_1.userService.validateUserData(userData);
            if (validationErrors.length > 0) {
                return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Datos de usuario inválidos', validationErrors, 400);
            }
            const newUser = userService_1.userService.createUser(userData);
            const response = {
                success: true,
                data: newUser,
                timestamp: new Date().toISOString()
            };
            res.status(201).json(response);
        }
        catch (error) {
            this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
        }
    }
    // PUT /users/:id - Actualizar usuario completamente
    updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
            }
            const userData = req.body;
            // Validar datos
            const validationErrors = userService_1.userService.validateUserData(userData);
            if (validationErrors.length > 0) {
                return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Datos de usuario inválidos', validationErrors, 400);
            }
            const updatedUser = userService_1.userService.updateUser(id, userData);
            if (!updatedUser) {
                return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
            }
            const response = {
                success: true,
                data: updatedUser,
                timestamp: new Date().toISOString()
            };
            res.json(response);
        }
        catch (error) {
            this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
        }
    }
    // PATCH /users/:id - Actualizar usuario parcialmente
    partialUpdateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
            }
            const userData = req.body;
            // Validar que al menos un campo esté presente
            if (Object.keys(userData).length === 0) {
                return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Debe proporcionar al menos un campo para actualizar', null, 400);
            }
            // Validar datos proporcionados
            const validationErrors = userService_1.userService.validateUserData(userData);
            if (validationErrors.length > 0) {
                return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Datos de usuario inválidos', validationErrors, 400);
            }
            const updatedUser = userService_1.userService.partialUpdateUser(id, userData);
            if (!updatedUser) {
                return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
            }
            const response = {
                success: true,
                data: updatedUser,
                timestamp: new Date().toISOString()
            };
            res.json(response);
        }
        catch (error) {
            this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
        }
    }
    // DELETE /users/:id - Eliminar usuario
    deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id <= 0) {
                return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
            }
            const deleted = userService_1.userService.deleteUser(id);
            if (!deleted) {
                return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
            }
            const response = {
                success: true,
                data: null,
                timestamp: new Date().toISOString()
            };
            res.json(response);
        }
        catch (error) {
            this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
        }
    }
    // Método helper para enviar respuestas de error consistentes
    sendErrorResponse(res, code, message, details, statusCode = 500) {
        const response = {
            success: false,
            error: {
                code,
                message,
                details
            },
            timestamp: new Date().toISOString()
        };
        res.status(statusCode).json(response);
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map