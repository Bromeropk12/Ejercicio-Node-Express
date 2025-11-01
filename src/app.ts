import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 8080;

// Middleware básico
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/users', userRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'User Management API'
  });
});

// Ruta raíz con Hello World y botones de navegación
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Gestión de Usuarios</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #141e30, #243b55);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          overflow: hidden;
        }

        .liquid-bg {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 0, 150, 0.25), transparent 50%),
                      radial-gradient(circle at 70% 70%, rgba(0, 200, 255, 0.25), transparent 50%);
          animation: moveLiquid 12s infinite alternate ease-in-out;
          filter: blur(80px);
          z-index: -1;
        }

        @keyframes moveLiquid {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(10%, -10%) scale(1.2); }
        }

        .container {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 50px 40px;
          max-width: 800px;
          width: 100%;
          text-align: center;
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          animation: glassFloat 6s ease-in-out infinite alternate;
        }

        @keyframes glassFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-15px); }
        }

        h1 {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 2rem;
          background: linear-gradient(120deg, #ff6ec7, #7873f5, #4ade80);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite linear, wave 4s infinite ease-in-out;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes wave {
          0%,100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        .buttons-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1.2rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 25px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          color: white;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .btn::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, rgba(255,255,255,0.4), transparent 70%);
          transform: rotate(0deg);
          animation: spin 4s linear infinite;
        }

        .btn span {
          position: relative;
          z-index: 2;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }

        .btn-primary {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        }

        .btn-secondary {
          background: linear-gradient(45deg, #4ecdc4, #44a08d);
        }

        @media (max-width: 768px) {
          h1 { font-size: 2.8rem; }
          .btn { padding: 1rem 2rem; font-size: 1rem; }
        }
      </style>
    </head>
    <body>
      <div class="liquid-bg"></div>
      <div class="container">
        <h1>Hola Mundo 🌎</h1>
        <div class="buttons-container">
          <button class="btn btn-primary" onclick="openCrudPanel()">
            <span>🛠️ Administrar Usuarios</span>
          </button>
          <button class="btn btn-secondary" onclick="viewUsers()">
            <span>👥 Ver Usuarios</span>
          </button>
        </div>
      </div>

      <script>
        function openCrudPanel() {
          window.open('/admin', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        }
        function viewUsers() {
          window.open('/users', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
        }
      </script>
    </body>
    </html>
  `);
});


// Middleware de manejo de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    },
    timestamp: new Date().toISOString()
  });
});

// Ruta de administración CRUD
app.get('/admin', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Administración de Usuarios</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          color: #333;
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .header h1 {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .header p {
          color: #7f8c8d;
          font-size: 1.1rem;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }

        .form-section, .users-section {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .section-title {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 3px solid #3498db;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #2c3e50;
        }

        .form-group input, .form-group select {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: #3498db;
          background: white;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .form-group input.error {
          border-color: #e74c3c;
          background: #fdf2f2;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 5px;
          display: none;
        }

        .btn-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 120px;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(45deg, #3498db, #2980b9);
          color: white;
        }

        .btn-primary:hover {
          background: linear-gradient(45deg, #2980b9, #21618c);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
        }

        .btn-success {
          background: linear-gradient(45deg, #27ae60, #229954);
          color: white;
        }

        .btn-success:hover {
          background: linear-gradient(45deg, #229954, #1e8449);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
        }

        .btn-warning {
          background: linear-gradient(45deg, #f39c12, #e67e22);
          color: white;
        }

        .btn-warning:hover {
          background: linear-gradient(45deg, #e67e22, #d35400);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
        }

        .btn-danger {
          background: linear-gradient(45deg, #e74c3c, #c0392b);
          color: white;
        }

        .btn-danger:hover {
          background: linear-gradient(45deg, #c0392b, #a93226);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
        }

        .users-list {
          max-height: 500px;
          overflow-y: auto;
        }

        .user-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 15px;
          border-left: 4px solid #3498db;
          transition: all 0.3s ease;
        }

        .user-card:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }

        .user-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .user-id {
          font-weight: bold;
          color: #3498db;
          font-size: 1.1rem;
        }

        .user-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 0.9rem;
        }

        .user-info div {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .user-actions {
          display: flex;
          gap: 5px;
          margin-top: 10px;
        }

        .btn-small {
          padding: 6px 12px;
          font-size: 0.8rem;
          min-width: auto;
        }

        .status-message {
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          display: none;
        }

        .status-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
          }

          .header h1 {
            font-size: 2rem;
          }

          .btn-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><i class="fas fa-users-cog"></i> Administración de Usuarios</h1>
          <p>Gestiona los usuarios del sistema con operaciones CRUD completas</p>
        </div>

        <div class="main-content">
          <div class="form-section">
            <h2 class="section-title">
              <i class="fas fa-user-plus"></i>
              Gestión de Usuario
            </h2>

            <div id="statusMessage" class="status-message"></div>

            <form id="userForm">
              <input type="hidden" id="userId" value="">

              <div class="form-group">
                <label for="nombre"><i class="fas fa-user"></i> Nombre *</label>
                <input type="text" id="nombre" required>
                <div class="error-message" id="nombreError">El nombre es requerido</div>
              </div>

              <div class="form-group">
                <label for="apellido"><i class="fas fa-user-tag"></i> Apellido *</label>
                <input type="text" id="apellido" required>
                <div class="error-message" id="apellidoError">El apellido es requerido</div>
              </div>

              <div class="form-group">
                <label for="edad"><i class="fas fa-birthday-cake"></i> Edad *</label>
                <input type="number" id="edad" min="0" max="150" required>
                <div class="error-message" id="edadError">La edad debe ser un número entre 0 y 150</div>
              </div>

              <div class="form-group">
                <label for="email"><i class="fas fa-envelope"></i> Email *</label>
                <input type="email" id="email" required>
                <div class="error-message" id="emailError">El email debe tener un formato válido</div>
              </div>

              <div class="form-group">
                <label for="telefono"><i class="fas fa-phone"></i> Teléfono *</label>
                <input type="text" id="telefono" required>
                <div class="error-message" id="telefonoError">El teléfono es requerido</div>
              </div>

              <div class="btn-group">
                <button type="submit" class="btn btn-primary" id="submitBtn">
                  <i class="fas fa-save"></i>
                  <span id="submitText">Crear Usuario</span>
                </button>
                <button type="button" class="btn btn-warning" onclick="clearForm()">
                  <i class="fas fa-eraser"></i>
                  Limpiar
                </button>
                <button type="button" class="btn btn-secondary" onclick="loadUsers()">
                  <i class="fas fa-sync"></i>
                  Actualizar Lista
                </button>
              </div>
            </form>
          </div>

          <div class="users-section">
            <h2 class="section-title">
              <i class="fas fa-list"></i>
              Lista de Usuarios
            </h2>

            <div class="users-list" id="usersList">
              <div style="text-align: center; padding: 40px; color: #7f8c8d;">
                <i class="fas fa-spinner fa-spin fa-2x"></i>
                <p style="margin-top: 15px;">Cargando usuarios...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script>
        let currentUserId = null;

        // Cargar usuarios al iniciar
        document.addEventListener('DOMContentLoaded', loadUsers);

        // Validación en tiempo real
        document.getElementById('nombre').addEventListener('input', () => validateField('nombre'));
        document.getElementById('apellido').addEventListener('input', () => validateField('apellido'));
        document.getElementById('edad').addEventListener('input', () => validateField('edad'));
        document.getElementById('email').addEventListener('input', () => validateField('email'));
        document.getElementById('telefono').addEventListener('input', () => validateField('telefono'));

        // Manejar envío del formulario
        document.getElementById('userForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          if (validateForm()) {
            if (currentUserId) {
              await updateUser(currentUserId);
            } else {
              await createUser();
            }
          }
        });

        async function createUser() {
          const userData = getFormData();
          showLoading(true);

          try {
            const response = await fetch('/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (result.success) {
              showMessage('Usuario creado exitosamente', 'success');
              clearForm();
              loadUsers();
            } else {
              showMessage('Error: ' + result.error.message, 'error');
            }
          } catch (error) {
            showMessage('Error de conexión', 'error');
          }

          showLoading(false);
        }

        async function updateUser(id) {
          const userData = getFormData();
          showLoading(true);

          try {
            const response = await fetch(\`/users/\${id}\`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (result.success) {
              showMessage('Usuario actualizado exitosamente', 'success');
              clearForm();
              loadUsers();
            } else {
              showMessage('Error: ' + result.error.message, 'error');
            }
          } catch (error) {
            showMessage('Error de conexión', 'error');
          }

          showLoading(false);
        }

        async function deleteUser(id) {
          if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return;

          try {
            const response = await fetch(\`/users/\${id}\`, { method: 'DELETE' });
            const result = await response.json();

            if (result.success) {
              showMessage('Usuario eliminado exitosamente', 'success');
              loadUsers();
            } else {
              showMessage('Error: ' + result.error.message, 'error');
            }
          } catch (error) {
            showMessage('Error de conexión', 'error');
          }
        }

        async function loadUsers() {
          try {
            const response = await fetch('/users');
            const result = await response.json();

            if (result.success) {
              displayUsers(result.data);
            } else {
              showMessage('Error al cargar usuarios', 'error');
            }
          } catch (error) {
            showMessage('Error de conexión', 'error');
          }
        }

        function displayUsers(users) {
          const usersList = document.getElementById('usersList');

          if (users.length === 0) {
            usersList.innerHTML = '<div style="text-align: center; padding: 40px; color: #7f8c8d;"><i class="fas fa-users fa-2x"></i><p style="margin-top: 15px;">No hay usuarios registrados</p></div>';
            return;
          }

          usersList.innerHTML = users.map(user => \`
            <div class="user-card">
              <div class="user-header">
                <span class="user-id">#\${user.id}</span>
                <div class="user-actions">
                  <button class="btn btn-small btn-warning" onclick="editUser('\${user.id}')">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-small btn-danger" onclick="deleteUser('\${user.id}')">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="user-info">
                <div><i class="fas fa-user"></i> \${user.nombre} \${user.apellido}</div>
                <div><i class="fas fa-birthday-cake"></i> \${user.edad} años</div>
                <div><i class="fas fa-envelope"></i> \${user.email}</div>
                <div><i class="fas fa-phone"></i> \${user.telefono}</div>
              </div>
            </div>
          \`).join('');
        }

        function editUser(id) {
          fetch(\`/users/\${id}\`)
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                const user = result.data;
                document.getElementById('userId').value = user.id;
                document.getElementById('nombre').value = user.nombre;
                document.getElementById('apellido').value = user.apellido;
                document.getElementById('edad').value = user.edad;
                document.getElementById('email').value = user.email;
                document.getElementById('telefono').value = user.telefono;

                document.getElementById('submitText').textContent = 'Actualizar Usuario';
                document.getElementById('submitBtn').className = 'btn btn-success';

                currentUserId = user.id;
              }
            })
            .catch(error => showMessage('Error al cargar usuario', 'error'));
        }

        function clearForm() {
          document.getElementById('userForm').reset();
          document.getElementById('userId').value = '';
          document.getElementById('submitText').textContent = 'Crear Usuario';
          document.getElementById('submitBtn').className = 'btn btn-primary';
          currentUserId = null;

          // Limpiar errores
          document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
          document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
        }

        function getFormData() {
          return {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            edad: parseInt(document.getElementById('edad').value),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim()
          };
        }

        function validateForm() {
          const fields = ['nombre', 'apellido', 'edad', 'email', 'telefono'];
          let isValid = true;

          fields.forEach(field => {
            if (!validateField(field)) {
              isValid = false;
            }
          });

          return isValid;
        }

        function validateField(fieldName) {
          const field = document.getElementById(fieldName);
          const errorElement = document.getElementById(fieldName + 'Error');
          let isValid = true;

          field.classList.remove('error');
          errorElement.style.display = 'none';

          const value = field.value.trim();

          switch (fieldName) {
            case 'nombre':
            case 'apellido':
            case 'telefono':
              if (!value) {
                isValid = false;
              }
              break;
            case 'edad':
              const edad = parseInt(value);
              if (!value || isNaN(edad) || edad < 0 || edad > 150) {
                isValid = false;
              }
              break;
            case 'email':
              const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
              if (!value || !emailRegex.test(value)) {
                isValid = false;
              }
              break;
          }

          if (!isValid) {
            field.classList.add('error');
            errorElement.style.display = 'block';
          }

          return isValid;
        }

        function showMessage(message, type) {
          const statusElement = document.getElementById('statusMessage');
          statusElement.textContent = message;
          statusElement.className = \`status-message status-\${type}\`;
          statusElement.style.display = 'block';

          setTimeout(() => {
            statusElement.style.display = 'none';
          }, 5000);
        }

        function showLoading(show) {
          const submitBtn = document.getElementById('submitBtn');
          const submitText = document.getElementById('submitText');

          if (show) {
            submitBtn.disabled = true;
            submitText.innerHTML = '<span class="loading"></span> Procesando...';
          } else {
            submitBtn.disabled = false;
            submitText.innerHTML = currentUserId ? 'Actualizar Usuario' : 'Crear Usuario';
          }
        }
      </script>
    </body>
    </html>
  `);
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Ruta no encontrada'
    },
    timestamp: new Date().toISOString()
  });
});

export default app;