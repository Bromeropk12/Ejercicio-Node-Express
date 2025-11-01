"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
class UserService {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    // Obtener todos los usuarios
    getAllUsers() {
        return [...this.users];
    }
    // Obtener usuario por ID
    getUserById(id) {
        return this.users.find(user => user.id === id) || null;
    }
    // Crear nuevo usuario
    createUser(userData) {
        const newUser = {
            id: this.nextId++,
            ...userData
        };
        this.users.push(newUser);
        return newUser;
    }
    // Actualizar usuario completamente (PUT)
    updateUser(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return null;
        this.users[index] = {
            id,
            ...userData
        };
        return this.users[index];
    }
    // Actualizar usuario parcialmente (PATCH)
    partialUpdateUser(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return null;
        this.users[index] = {
            ...this.users[index],
            ...userData
        };
        return this.users[index];
    }
    // Eliminar usuario
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
    // Validaciones básicas
    validateUserData(userData) {
        const errors = [];
        if ('nombre' in userData && (!userData.nombre || userData.nombre.trim().length === 0)) {
            errors.push('El nombre es requerido');
        }
        if ('apellido' in userData && (!userData.apellido || userData.apellido.trim().length === 0)) {
            errors.push('El apellido es requerido');
        }
        if ('edad' in userData && (userData.edad === undefined || userData.edad < 0 || userData.edad > 150)) {
            errors.push('La edad debe ser un número entre 0 y 150');
        }
        if ('email' in userData && (!userData.email || !this.isValidEmail(userData.email))) {
            errors.push('El email debe tener un formato válido');
        }
        if ('telefono' in userData && (!userData.telefono || userData.telefono.trim().length === 0)) {
            errors.push('El teléfono es requerido');
        }
        return errors;
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map