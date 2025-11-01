import { Request, Response } from 'express';
import { userService } from '../userService';
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, ApiResponse } from '../types/user';

export class UserController {
  // GET /users - Obtener todos los usuarios
  getAllUsers(req: Request, res: Response): void {
    try {
      const users = userService.getAllUsers();

      // Verificar si es una petición desde navegador (Accept: text/html)
      const acceptHeader = req.headers.accept;
      if (acceptHeader && acceptHeader.includes('text/html')) {
        // Devolver HTML con JSON formateado
        const jsonData = JSON.stringify(users, null, 2);
        const html = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Usuarios - JSON Formateado</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.css" rel="stylesheet">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #333;
                min-height: 100vh;
                padding: 20px;
              }

              .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                overflow: hidden;
              }

              .header {
                background: linear-gradient(45deg, #3498db, #2980b9);
                color: white;
                padding: 20px;
                text-align: center;
              }

              .header h1 {
                font-size: 2rem;
                margin-bottom: 10px;
              }

              .header p {
                opacity: 0.9;
                font-size: 1.1rem;
              }

              .content {
                padding: 30px;
              }

              .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
              }

              .stat-card {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                border-left: 4px solid #3498db;
              }

              .stat-number {
                font-size: 2rem;
                font-weight: bold;
                color: #3498db;
                margin-bottom: 5px;
              }

              .stat-label {
                color: #7f8c8d;
                font-size: 0.9rem;
              }

              .json-container {
                position: relative;
              }

              .json-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e9ecef;
              }

              .json-title {
                font-size: 1.2rem;
                font-weight: 600;
                color: #2c3e50;
              }

              .copy-btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background 0.3s ease;
              }

              .copy-btn:hover {
                background: #2980b9;
              }

              pre {
                background: #f8f9fa !important;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 20px !important;
                overflow-x: auto;
                font-family: 'Fira Code', 'Monaco', 'Consolas', monospace !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                margin: 0 !important;
              }

              .back-btn {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 24px;
                background: #95a5a6;
                color: white;
                text-decoration: none;
                border-radius: 8px;
                transition: background 0.3s ease;
              }

              .back-btn:hover {
                background: #7f8c8d;
              }

              @media (max-width: 768px) {
                .header h1 {
                  font-size: 1.5rem;
                }

                .content {
                  padding: 20px;
                }

                .stats {
                  grid-template-columns: 1fr;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1><i class="fas fa-users"></i> Lista de Usuarios</h1>
                <p>Datos en formato JSON estructurado</p>
              </div>

              <div class="content">
                <div class="stats">
                  <div class="stat-card">
                    <div class="stat-number">${users.length}</div>
                    <div class="stat-label">Total de Usuarios</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${users.length}</div>
                    <div class="stat-label">Total Usuarios</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${users.length > 0 ? Math.round(users.reduce((sum, u) => sum + u.edad, 0) / users.length) : 0}</div>
                    <div class="stat-label">Edad Promedio</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${new Date().toLocaleDateString()}</div>
                    <div class="stat-label">Última Actualización</div>
                  </div>
                </div>

                <div class="json-container">
                  <div class="json-header">
                    <span class="json-title"><i class="fas fa-code"></i> Datos JSON</span>
                    <button class="copy-btn" onclick="copyToClipboard()">
                      <i class="fas fa-copy"></i> Copiar JSON
                    </button>
                  </div>
                  <pre><code class="language-json">${jsonData.replace(/</g, '<').replace(/>/g, '>')}</code></pre>
                </div>

                <a href="/" class="back-btn">
                  <i class="fas fa-arrow-left"></i> Volver al Inicio
                </a>
              </div>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js"></script>
            <script>
              function copyToClipboard() {
                const jsonText = ${JSON.stringify(JSON.stringify(users, null, 2))};
                navigator.clipboard.writeText(jsonText).then(() => {
                  const btn = document.querySelector('.copy-btn');
                  const originalText = btn.innerHTML;
                  btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
                  btn.style.background = '#27ae60';
                  setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#3498db';
                  }, 2000);
                });
              }
            </script>
          </body>
          </html>
        `;
        res.send(html);
      } else {
        
        const response: ApiResponse<Usuario[]> = {
          success: true,
          data: users,
          timestamp: new Date().toISOString()
        };
        res.json(response);
      }
    } catch (error) {
      this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
    }
  }

  
  getUserById(req: Request, res: Response): void {
    try {
      const id = req.params.id;
      if (!id || id.trim().length === 0) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      
      if (!/^[A-Z0-9]+$/.test(id)) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      const user = userService.getUserById(id);
      if (!user) {
        return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
      }

      const response: ApiResponse<Usuario> = {
        success: true,
        data: user,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
    }
  }

  //
  createUser(req: Request, res: Response): void {
    try {
      const userData: CreateUsuarioRequest = req.body;

      
      const validationErrors = userService.validateUserData(userData);
      if (validationErrors.length > 0) {
        return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Datos de usuario inválidos', validationErrors, 400);
      }

      const newUser = userService.createUser(userData);
      const response: ApiResponse<Usuario> = {
        success: true,
        data: newUser,
        timestamp: new Date().toISOString()
      };
      res.status(201).json(response);
    } catch (error) {
      this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
    }
  }

  
  updateUser(req: Request, res: Response): void {
    try {
      const id = req.params.id;
      if (!id || id.trim().length === 0) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      
      if (!/^[A-Z0-9]+$/.test(id)) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      const userData: CreateUsuarioRequest = req.body;

     
      const validationErrors = userService.validateUserData(userData);
      if (validationErrors.length > 0) {
        return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Datos de usuario inválidos', validationErrors, 400);
      }

      const updatedUser = userService.updateUser(id, userData);
      if (!updatedUser) {
        return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
      }

      const response: ApiResponse<Usuario> = {
        success: true,
        data: updatedUser,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
    }
  }

 
  partialUpdateUser(req: Request, res: Response): void {
    try {
      const id = req.params.id;
      if (!id || id.trim().length === 0) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

     
      if (!/^[A-Z0-9]+$/.test(id)) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      const userData: UpdateUsuarioRequest = req.body;

      
      if (Object.keys(userData).length === 0) {
        return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Debe proporcionar al menos un campo para actualizar', null, 400);
      }

     
      const validationErrors = userService.validateUserData(userData);
      if (validationErrors.length > 0) {
        return this.sendErrorResponse(res, 'VALIDATION_ERROR', 'Datos de usuario inválidos', validationErrors, 400);
      }

      const updatedUser = userService.partialUpdateUser(id, userData);
      if (!updatedUser) {
        return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
      }

      const response: ApiResponse<Usuario> = {
        success: true,
        data: updatedUser,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
    }
  }

 
  deleteUser(req: Request, res: Response): void {
    try {
      const id = req.params.id;
      if (!id || id.trim().length === 0) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      
      if (!/^[A-Z0-9]+$/.test(id)) {
        return this.sendErrorResponse(res, 'INVALID_ID', 'ID de usuario inválido', null, 400);
      }

      const deleted = userService.deleteUser(id);
      if (!deleted) {
        return this.sendErrorResponse(res, 'USER_NOT_FOUND', 'Usuario no encontrado', null, 404);
      }

      const response: ApiResponse<null> = {
        success: true,
        data: null,
        timestamp: new Date().toISOString()
      };
      res.json(response);
    } catch (error) {
      this.sendErrorResponse(res, 'INTERNAL_ERROR', 'Error interno del servidor', error);
    }
  }

 
  private sendErrorResponse(
    res: Response,
    code: string,
    message: string,
    details?: any,
    statusCode: number = 500
  ): void {
    const response: ApiResponse<null> = {
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

export const userController = new UserController();