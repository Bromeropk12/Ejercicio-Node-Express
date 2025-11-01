# API de Gestión de Usuarios

Servicio REST API para gestión de usuarios desarrollado en Node.js + TypeScript con almacenamiento en memoria (sin base de datos persistente).

##  Descripción

Esta API permite realizar operaciones CRUD completas sobre usuarios, incluyendo creación, lectura, actualización y eliminación. Los datos se almacenan en memoria RAM y se persisten en un archivo JSON local durante la ejecución del servidor.

##  Características

-  API REST completa con 6 endpoints funcionales
-  TypeScript con tipado fuerte
-  Validaciones de datos y manejo de errores
-  Almacenamiento en memoria (reinicia al detener el servidor)
-  Interfaz web de administración en `/admin`
-  Documentación completa de endpoints
-  Colección de Postman incluida

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **TypeScript** - Lenguaje con tipado estático
- **Express.js** - Framework web
- **Jest** - Framework de testing
- **Supertest** - Testing de APIs

## 📦 Instalación

### Prerrequisitos

- Node.js v16 o superior
- npm o yarn

### Pasos de Instalación

1. **Clona el repositorio** (o descomprime el proyecto):
   ```bash
   git clone <url-del-repositorio>
   cd ejercicio-node-express
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Compila el proyecto**:
   ```bash
   npm run build
   ```

##  Ejecución

### Modo Desarrollo (con recarga automática)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

### Ejecutar Tests
```bash
npm test
```

### Tests con Watch
```bash
npm run test:watch
```

## Endpoints de la API

### Base URL
```
http://localhost:8080
```

### Endpoints Implementados 

| Método   | Endpoint            | Descripción                         |                        
|----------|---------------------|-------------------------------------|
| `GET`    | `/users`            | Obtener todos los usuarios          |
| `GET`    | `/users/:id`        | Obtener usuario específico por ID   |
| `POST`   | `/users`            | Crear nuevo usuario                 |
| `PUT`    | `/users/:id`        | Actualizar usuario completamente    |
| `PATCH`  | `/users/:id`        | Actualizar usuario parcialmente     |
| `DELETE` | `/users/:id`        | Eliminar usuario                    |

### Endpoints Documentados (No Implementados) 📝

| Método | Endpoint        | Descripción                      |
|--------|-----------------|----------------------------------|
| `GET`  | `/users/stats`  | Obtener estadísticas de usuarios |
| `GET`  | `/users/search` | Buscar usuarios por criterios    |

##  Interfaz Web

Además de la API REST, el proyecto incluye una interfaz web de administración:

- **URL**: `http://localhost:8080/admin`
- **Funcionalidades**: CRUD completo con formulario interactivo
- **Vista de usuarios**: `http://localhost:8080/users` (formato JSON)

## 📝 Ejemplos de Uso (cURL)

### Obtener todos los usuarios
```bash
curl -X GET http://localhost:8080/users \
  -H "Accept: application/json"
```

### Crear un nuevo usuario
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana",
    "apellido": "García",
    "edad": 28,
    "email": "ana.garcia@example.com",
    "telefono": "3012345678"
  }'
```

### Obtener usuario específico
```bash
curl -X GET http://localhost:8080/users/SX3VUYJQ \
  -H "Accept: application/json"
```

### Actualizar usuario completamente
```bash
curl -X PUT http://localhost:8080/users/SX3VUYJQ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana María",
    "apellido": "García López",
    "edad": 29,
    "email": "ana.maria@example.com",
    "telefono": "3012345679"
  }'
```

### Actualizar parcialmente
```bash
curl -X PATCH http://localhost:8080/users/SX3VUYJQ \
  -H "Content-Type: application/json" \
  -d '{
    "telefono": "3098765432"
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:8080/users/SX3VUYJQ
```

## 📁 Estructura del Proyecto

```
ejercicio-node-express/
├── src/
│   ├── app.ts              # Configuración principal de Express
│   ├── server.ts           # Punto de entrada del servidor
│   ├── database.ts         # Gestión de datos en memoria
│   ├── userService.ts      # Lógica de negocio
│   ├── controllers/
│   │   └── userController.ts # Controladores de la API
│   ├── routes/
│   │   └── userRoutes.ts   # Definición de rutas
│   └── types/
│       └── user.ts         # Interfaces y tipos TypeScript
├── data/
│   └── users.json          # Archivo de datos persistentes
├── tests/                  # (Si existen) Tests automatizados
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🧪 Testing

El proyecto incluye configuración para testing con Jest:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

## 📚 Colección de Postman

Se incluye una colección completa de Postman (`API Gestión de Usuarios.postman_collection.json`) con todos los requests de los endpoints implementados, incluyendo:

- Variables de entorno configuradas
- Tests automáticos para validar respuestas
- Ejemplos de requests con datos de prueba

### Importar la colección:
1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `.postman_collection.json`
4. Crea el entorno "API Usuarios Local" con:
   - `base_url`: `http://localhost:8080`

## 🔒 Consideraciones de Seguridad

- Actualmente no implementa autenticación/autorización
- Los datos se almacenan en memoria (se pierden al reiniciar)
- No hay rate limiting
- Recomendado solo para desarrollo y testing

## 📋 Scripts Disponibles

```json
{
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "nodemon --exec ts-node src/server.ts",
  "test": "jest",
  "test:watch": "jest --watch"
}
```


## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Autor

Proyecto desarrollado como ejercicio académico de Node.js + TypeScript.
por: Briann Sneyder Romero

---

