# TopSell Admin - Panel de Administración

Panel de administración para TopSell E-commerce construido con React + Vite.

## 🚀 Características

- ✅ Autenticación con JWT
- ✅ Gestión de Usuarios
- ✅ Gestión de Productos
- ✅ Gestión de Categorías
- ✅ Gestión de Marcas
- ✅ Gestión de Banners
- ✅ Gestión de Cotizaciones
- ✅ Gestión de Contactos
- ✅ Dashboard con estadísticas y gráficos

## 📋 Requisitos Previos

- Node.js 16+ 
- npm o yarn
- Backend de TopSell ejecutándose

## ⚙️ Configuración

### 1. Variables de Entorno

Copia el archivo de ejemplo y configura las variables de entorno:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones:

```env
VITE_API_BASE_URL=http://localhost:8080
```

**Archivos de entorno disponibles:**
- `.env.local` - Desarrollo local (no se sube a git)
- `.env.production` - Archivo para producción (las variables se configuran en Vercel)
- `.env.example` - Plantilla de ejemplo

**Configuración en Vercel (Producción):**

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a `Settings > Environment Variables`
3. Agrega la variable:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** URL de tu API en producción (ej: `https://api.topsell.com`)
   - **Environment:** Production

### 2. Instalación

```bash
npm install
```

### 3. Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Build para Producción

```bash
npm run build
```

### 5. Preview de Producción

```bash
npm run preview
```

## 🔑 Credenciales de Acceso

Para acceder al panel de administración, debes tener un usuario con rol `ADMIN` en el backend.

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── config/         # Configuración de la app
├── context/        # Context API (Auth)
├── hooks/          # Custom hooks
├── layouts/        # Layouts principales
├── pages/          # Páginas de la aplicación
├── services/       # Servicios de API
└── assets/         # Recursos estáticos
```

## 🛠️ Tecnologías Utilizadas

- React 18
- Vite
- Ant Design
- Axios
- React Router DOM
- Recharts

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta ESLint

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
