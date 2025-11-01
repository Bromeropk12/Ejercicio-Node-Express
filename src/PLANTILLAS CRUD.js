// Crear un nuevo usuario
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 30,
    email: 'juan@example.com',
    telefono: '123456789'
  })
})
.then(response => response.json())
.then(data => console.log('Usuario creado:', data))
.catch(error => console.error('Error:', error));



// Obtener todos los usuarios
fetch('/users')
.then(response => response.json())
.then(data => console.log('Todos los usuarios:', data))
.catch(error => console.error('Error:', error));




// Obtener un usuario específico (reemplaza 'SQU7QMTL' con el ID real)
fetch('/users/SQU7QMTL')
.then(response => response.json())
.then(data => console.log('Usuario específico:', data))
.catch(error => console.error('Error:', error));




// Actualizar usuario completamente (reemplaza 'ID_DEL_USUARIO' con el ID real)
fetch('/users/SQU7QMTL', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Juan',
    apellido: 'Pérez Actualizado',
    edad: 31,
    email: 'juan@example.com',
    telefono: '987654321'
  })
})
.then(response => response.json())
.then(data => console.log('Usuario actualizado:', data))
.catch(error => console.error('Error:', error));







// Actualizar solo algunos campos (reemplaza 'ID_DEL_USUARIO' con el ID real)
fetch('/users/SQU7QMTL', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    telefono: '555666777',
    edad: 32
  })
})
.then(response => response.json())
.then(data => console.log('Usuario actualizado parcialmente:', data))
.catch(error => console.error('Error:', error));




// Eliminar usuario (reemplaza 'ID_DEL_USUARIO' con el ID real)
fetch('/users/SQU7QMTL', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log('Usuario eliminado:', data))
.catch(error => console.error('Error:', error));

