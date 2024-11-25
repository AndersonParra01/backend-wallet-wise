# **Wallet-Wise**

## **Descripción**

**Wallet-Wise** es una aplicación moderna y eficiente para la gestión de finanzas personales. Te ayuda a ahorrar dinero, controlar tus gastos y planificar tus objetivos financieros de forma inteligente. Diseñada para ser fácil de usar, flexible y única, Wallet-Wise ofrece una solución integral para manejar tus finanzas desde cualquier lugar.

---

## **Características Principales**

1. **Gestión de Gastos:**

   - Registra tus gastos diarios.
   - Organiza tus transacciones en categorías personalizables.
   - Analiza tus patrones de gasto.

2. **Ahorro Inteligente:**

   - Define metas de ahorro.
   - Recibe notificaciones y recomendaciones para alcanzar tus metas.

3. **Planificación Financiera:**

   - Establece presupuestos mensuales.
   - Rastrea tu progreso con gráficas e informes.

4. **Accesibilidad:**

   - Acceso multiplataforma (web y móvil).
   - Sincronización en la nube para que tus datos estén siempre actualizados.

5. **Exportación de Datos:**

   - Exporta tus registros en formato CSV o Excel.

6. **Seguridad:**
   - Autenticación de usuarios con tokens JWT.
   - Protección de datos sensibles mediante cifrado.

---

## **Tecnologías Usadas**

### **Backend:**

- Framework: **NestJS** (con TypeScript).
- Base de Datos: **PostgreSQL** (usando TypeORM).
- Autenticación: **JWT (JSON Web Tokens)**.
- API: RESTful (con posibilidad de GraphQL en el futuro).

### **Frontend:**

- Mobile: **React Native** (o Flutter).
- Web: **React.js**.

### **Infraestructura:**

- Contenedores: **Docker**.
- Despliegue: **AWS** o **Heroku**.

---

## **Requisitos Previos**

Antes de levantar el backend, asegúrate de tener instalado:

1. **Node.js** (v16 o superior): [Descargar Node.js](https://nodejs.org/)
2. **NestJS CLI**:
   ```bash
   npm install -g @nestjs/cli
   ```
3. **PostgreSQL**: Instala PostgreSQL en tu máquina o usa una instancia en la nube.
4. **Docker** (opcional, pero recomendado).

---

## **Cómo Levantar el Backend**

### **1. Clona el Proyecto**

```bash
git clone https://github.com/tuusuario/wallet-wise-backend.git
cd wallet-wise-backend
```

### **2. Instala las Dependencias**

```bash
npm install
```

### **3. Configura el Entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=wallet_wise
JWT_SECRET=tu_secreto
```

### **4. Configura la Base de Datos**

1. Asegúrate de que PostgreSQL esté corriendo.
2. Crea la base de datos:
   ```sql
   CREATE DATABASE wallet_wise;
   ```

### **5. Ejecuta las Migraciones**

Si estás usando TypeORM, ejecuta el siguiente comando para aplicar las migraciones:

```bash
npm run typeorm migration:run
```

### **6. Levanta el Servidor**

Inicia el backend:

```bash
npm run start:dev
```

Accede a la API en: `http://localhost:3000`.

---

## **Estructura de Carpetas**

```plaintext
src/
├── app.controller.ts       // Controlador principal
├── app.module.ts           // Configuración del módulo principal
├── app.service.ts          // Lógica del servicio principal
├── modules/
│   ├── transactions/       // Módulo de transacciones
│   │   ├── transactions.controller.ts
│   │   ├── transactions.service.ts
│   │   └── transactions.entity.ts
│   ├── users/              // Módulo de usuarios
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.entity.ts
├── config/
│   ├── database.config.ts  // Configuración de la base de datos
│   └── jwt.config.ts       // Configuración de JWT
├── main.ts                 // Punto de entrada de la aplicación
```

---

## **API Endpoints**

### **Autenticación**

- `POST /auth/login`: Inicia sesión y devuelve un token JWT.
- `POST /auth/register`: Registra un nuevo usuario.

### **Transacciones**

- `GET /transactions`: Obtiene todas las transacciones del usuario.
- `POST /transactions`: Crea una nueva transacción.
- `PUT /transactions/:id`: Actualiza una transacción.
- `DELETE /transactions/:id`: Elimina una transacción.

### **Usuarios**

- `GET /users/me`: Obtiene los datos del usuario actual.

---

## **Comandos Útiles**

- **Levantar el servidor en desarrollo:**
  ```bash
  npm run start:dev
  ```
- **Compilar el proyecto:**
  ```bash
  npm run build
  ```
- **Ejecutar pruebas:**
  ```bash
  npm run test
  ```

---

## **Próximos Pasos**

- Añadir soporte para **GraphQL**.
- Implementar un dashboard avanzado con gráficas.
- Desarrollar la aplicación móvil con **React Native**.

---

Con esta guía y tu experiencia como programador, tendrás una base sólida para el desarrollo del backend y la aplicación en general.
