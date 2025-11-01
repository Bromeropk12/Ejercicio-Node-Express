import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from './types/user';
import { database } from './database';

class UserService {
  // Obtener todos los usuarios
  getAllUsers(): Usuario[] {
    return database.getAll();
  }

  // Obtener usuario por ID
  getUserById(id: string): Usuario | null {
    return database.getById(id);
  }

  // Crear nuevo usuario
  createUser(userData: CreateUsuarioRequest): Usuario {
    return database.create(userData);
  }

  // Actualizar usuario completamente (PUT)
  updateUser(id: string, userData: CreateUsuarioRequest): Usuario | null {
    return database.update(id, userData);
  }

  // Actualizar usuario parcialmente (PATCH)
  partialUpdateUser(id: string, userData: UpdateUsuarioRequest): Usuario | null {
    return database.partialUpdate(id, userData);
  }

  // Eliminar usuario
  deleteUser(id: string): boolean {
    return database.delete(id);
  }

  // Validaciones básicas
  validateUserData(userData: CreateUsuarioRequest | UpdateUsuarioRequest): string[] {
    const errors: string[] = [];

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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Obtener estadísticas de la base de datos
  getDatabaseStats() {
    return database.getStats();
  }

  // Limpiar todos los datos (solo para testing)
  clearAllData(): void {
    database.clear();
  }
}

export const userService = new UserService();