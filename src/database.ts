import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { Usuario } from './types/user';

export class Database {
  private filePath: string;
  private data: Usuario[] = [];
  private usedIds: Set<string> = new Set();

  constructor(filename: string = 'users.json') {
    this.filePath = path.join(__dirname, '..', 'data', filename);
    this.loadData();
  }

  // Cargar datos desde el archivo JSON
  private loadData(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(fileContent);

        // Reconstruir el set de IDs usados
        this.usedIds.clear();
        this.data.forEach(user => {
          this.usedIds.add(user.id.toString());
        });
      } else {
        // Si el archivo no existe, crear uno vacío
        this.saveData();
      }
    } catch (error) {
      console.error('Error loading data from file:', error);
      this.data = [];
      this.usedIds.clear();
    }
  }

  // Generar ID único aleatorio
  private generateUniqueId(): string {
    let id: string;
    let attempts = 0;
    const maxAttempts = 1000; // Límite de seguridad

    do {
      // Generar ID aleatorio de 8 caracteres (base36 para mayor legibilidad)
      id = Math.random().toString(36).substring(2, 10).toUpperCase();
      attempts++;

      if (attempts >= maxAttempts) {
        // Fallback: usar timestamp + random si hay demasiadas colisiones
        id = Date.now().toString(36) + Math.random().toString(36).substring(2, 5).toUpperCase();
        break;
      }
    } while (this.usedIds.has(id));

    this.usedIds.add(id);
    return id;
  }

  // Guardar datos en el archivo JSON
  private saveData(): void {
    try {
      // Asegurar que el directorio data existe
      const dataDir = path.dirname(this.filePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving data to file:', error);
      throw new Error('Failed to save data');
    }
  }

  // Obtener todos los usuarios
  getAll(): Usuario[] {
    return [...this.data];
  }

  // Obtener usuario por ID
  getById(id: string): Usuario | null {
    return this.data.find(user => user.id === id) || null;
  }

  // Crear nuevo usuario
  create(userData: Omit<Usuario, 'id'>): Usuario {
    const newUser: Usuario = {
      id: this.generateUniqueId(),
      ...userData
    };

    this.data.push(newUser);
    this.saveData();

    return newUser;
  }

  // Actualizar usuario completamente
  update(id: string, userData: Omit<Usuario, 'id'>): Usuario | null {
    const index = this.data.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.data[index] = {
      id,
      ...userData
    };

    this.saveData();
    return this.data[index];
  }

  // Actualizar usuario parcialmente
  partialUpdate(id: string, userData: Partial<Omit<Usuario, 'id'>>): Usuario | null {
    const index = this.data.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.data[index] = {
      ...this.data[index],
      ...userData
    };

    this.saveData();
    return this.data[index];
  }

  // Eliminar usuario
  delete(id: string): boolean {
    const index = this.data.findIndex(user => user.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    this.saveData();

    return true;
  }

  // Buscar usuarios por criterios
  find(criteria: Partial<Usuario>): Usuario[] {
    return this.data.filter(user => {
      return Object.entries(criteria).every(([key, value]) => {
        return user[key as keyof Usuario] === value;
      });
    });
  }

  // Obtener estadísticas
  getStats() {
    return {
      total: this.data.length,
      totalIds: this.usedIds.size,
      filePath: this.filePath,
      lastModified: fs.existsSync(this.filePath) ? fs.statSync(this.filePath).mtime : null
    };
  }

  // Limpiar todos los datos (para testing)
  clear(): void {
    this.data = [];
    this.usedIds.clear();
    this.saveData();
  }
}

// Instancia singleton de la base de datos
export const database = new Database();