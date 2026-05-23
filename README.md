# EcoVision AI — Frontend MVP

## Setup rápido

```bash
npm create vite@latest ecovision -- --template react-ts
cd ecovision

# Instalar dependencias
npm install axios lucide-react framer-motion react-dropzone
npm install tailwindcss @tailwindcss/vite
```

## Estructura de archivos

Copia los archivos generados a tu proyecto respetando esta estructura:

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── UploadBox.tsx
│   ├── ResultCard.tsx
│   ├── Loader.tsx
│   └── StatsCard.tsx
├── pages/
│   └── Home.tsx
├── services/
│   └── api.ts
├── types/
│   └── analysis.ts
├── App.tsx
└── index.css
```

## Variables de entorno

Crea un archivo `.env` en la raíz:

```
VITE_API_URL=http://localhost:8000
```

## Activar backend real

En `src/pages/Home.tsx`, cambia:

```ts
const USE_MOCK = false; // ← cuando el backend esté listo
```

## Dependencias instaladas

| Librería         | Uso                        |
| ---------------- | -------------------------- |
| `framer-motion`  | Animaciones y transiciones |
| `react-dropzone` | Drag & drop de imágenes    |
| `lucide-react`   | Iconos                     |
| `axios`          | Peticiones HTTP al backend |
| `tailwindcss`    | Estilos utilitarios        |
