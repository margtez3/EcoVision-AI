# EcoVision AI — Frontend MVP

Aplicación web de clasificación de residuos con IA que permite a los usuarios cargar imágenes y recibir recomendaciones de reciclaje en tiempo real, con detalles sobre tipo de material, tiempo de degradación y contenedor apropiado.

## 📋 Descripción General

**EcoVision AI** es una aplicación web moderna que utiliza inteligencia artificial para clasificar residuos automáticamente. Los usuarios cargan una imagen de un objeto de desecho y el sistema proporciona información detallada sobre cómo reciclarlo correctamente, incluyendo el tipo de contenedor, tiempo de degradación, clasificación de material y recomendaciones ambientales personalizadas.

---

## 🏗️ Stack Tecnológico

- **Frontend Framework**: React 19.2.6 + TypeScript
- **Build Tool**: Vite 8.0.12
- **Styling**: Tailwind CSS 4.3.0
- **Animaciones**: Framer Motion 12.40.0
- **HTTP Client**: Axios 1.16.1
- **Drag & Drop**: React Dropzone 15.0.0
- **Icons**: Lucide React 1.16.0
- **Tipografías**: Instrument Sans, Syne (Google Fonts)
- **Dev Tools**: ESLint, TypeScript 6.0.2, Babel React Compiler

---

## 📁 Estructura Detallada del Proyecto

### **src/components/** - Componentes Reutilizables

#### 1. **NavBar.tsx**

- Barra de navegación superior del sitio
- Logo "EcoVision AI" con ícono de reciclaje
- Marca de versión (MVP v0.1)
- Diseño responsivo con bordes en verde tenue

#### 2. **HeroSection.tsx**

- Sección introductoria con animación al cargar
- Título: "Clasifica residuos con inteligencia artificial"
- Descripción del servicio
- Badge animado con indicador de estado en tiempo real

#### 3. **UploadBox.tsx** ⭐ Componente Principal

- Área interactiva drag & drop para imágenes
- Formatos aceptados: JPG, PNG, WEBP, HEIC
- Estados: Dropzone vacío → Preview de imagen → Análisis
- Animaciones fluidas con Framer Motion
- Integración con `react-dropzone` para máxima compatibilidad
- Botón alternativo para selección manual de archivos

#### 4. **ResultCard.tsx**

- Muestra resultados detallados del análisis con:
  - **Objeto detectado** (ej: "Botella de plástico PET")
  - **Categoría**: Reciclable, Orgánico, No reciclable, Peligroso
  - **Contenedor**: azul, verde, gris, naranja, rojo
  - **Tiempo de degradación**: años
  - **Material**: clasificación específica
  - **Confianza IA**: porcentaje de exactitud (0-100%)
  - **Recomendaciones**: instrucciones personalizadas de reciclaje
- Grid de 2 columnas para estadísticas
- Botón para reiniciar el análisis

#### 5. **StatsCard.tsx**

- Componente reutilizable para mostrar estadísticas individuales
- Props: `label`, `value`, `accent` (color personalizado)
- Usado en ResultCard para información organizada y consistente

#### 6. **Loader.tsx**

- Spinner animado con 2 anillos concéntricos girando en direcciones opuestas
- Muestra 4 pasos secuenciales del análisis:
  1. Detectando objeto…
  2. Clasificando material…
  3. Calculando impacto ambiental…
  4. Generando recomendación…
- Animaciones con transiciones escalonadas

### **src/pages/** - Vistas Principales

#### **Home.tsx** - Orquestador Principal

- Página principal que gestiona el flujo completo de la aplicación
- **State Management** con estados de la aplicación:
  - `idle`: Esperando carga de imagen
  - `preview`: Imagen cargada, vista previa lista
  - `loading`: Procesando análisis en servidor
  - `result`: Mostrando resultados del análisis
  - `error`: Error durante el análisis
- **Funciones principales**:
  - `handleImageReady()`: Guarda imagen y URL preview
  - `handleAnalyze()`: Envía la imagen al backend o muestra datos mock
  - `handleReset()`: Limpia estados para nuevo análisis
- Toggle `USE_MOCK = false` para activar API real
- Orquesta: HeroSection → UploadBox/Loader/ResultCard basado en estado

### **src/services/** - Servicios de API

#### **api.service.ts**

- **`analyzeImage(file: File)`**:
  - Envía imagen al endpoint `POST /analyze` del backend
  - Usa FormData con multipart/form-data
  - Base URL: `import.meta.env.VITE_API_URL` (fallback: `http://localhost:4000`)
- **`mockResult`**: Objeto de ejemplo para desarrollo
  ```json
  {
    "object": "Botella de plástico PET",
    "category": "Reciclable",
    "container": "Azul",
    "containerColor": "blue",
    "degradation": "450 años",
    "material": "PET #1",
    "confidence": 94,
    "recommendation": "Lavar antes de reciclar y retirar la tapa..."
  }
  ```

### **src/types/** - Tipos TypeScript

#### **analysis.ts**

```typescript
export interface AnalysisResult {
  object: string;
  category: "Reciclable" | "Orgánico" | "No reciclable" | "Peligroso";
  container: string;
  containerColor: "blue" | "green" | "gray" | "orange" | "red";
  degradation: string;
  material: string;
  confidence: number;
  recommendation: string;
  imageUrl?: string; // URL en Azure Blob Storage
  fileName?: string; // Nombre en Azure
  analysisDate?: string; // ISO timestamp
}

export type AppState = "idle" | "preview" | "loading" | "result" | "error";
```

---

## 🎨 Diseño Visual

- **Color primario**: Verde (#22c55e) - temática ambiental
- **Background**: Negro oscuro (#0a0f0a) para contraste
- **Tipografías**:
  - Display: **Syne** (titulares, bold, secciones)
  - Cuerpo: **Instrument Sans** (texto regular)
  - Monospace: Datos técnicos y valores
- **Principios**: Minimalista, accesible (WCAG), moderno
- **Animaciones**: Transiciones suaves con Framer Motion

---

## ☁️ Servicios Azure Integrados

### **1. Azure Blob Storage**

- **Propósito**: Almacenamiento de imágenes cargadas por usuarios
- **Endpoint**: `https://ecovisionstorage.blob.core.windows.net/`
- **Contenedor**: `uploads/` para archivos de usuario
- **Integración**: Se devuelve `imageUrl` en `AnalysisResult` para visualización
- **Seguridad**: SAS tokens para acceso temporal a URLs públicas
- **Durabilidad**: Replicación geo-redundante (GRS)

### **2. Azure Cognitive Services - Computer Vision**

- **Propósito**: Análisis y clasificación de imágenes con IA
- **Características principales**:
  - Detección de objetos (residuos)
  - Análisis visual para clasificación
  - Extracción de metadatos de imagen
  - OCR opcional para etiquetas
- **Integration**: Backend procesa imagen → Computer Vision API → Resultados
- **Confidence Score**: Devuelto en el campo `confidence` (0-100%)

### **3. Azure App Service**

- **Propósito**: Hosting del backend Python/Node que procesa análisis
- **Configuración**: Runtime personalizado para modelo de IA
- **Escalado**: Auto-scale basado en carga de peticiones
- **Entorno**: Producción con slots para staging

### **4. Azure Container Registry (ACR)**

- **Propósito**: Almacenamiento privado de imágenes Docker
- **Uso**: Guardar contenedores del backend de IA
- **Repositorio**: `ecovisionai.azurecr.io/backend`
- **Seguridad**: Acceso autenticado, webhooks de integración CI/CD

### **5. Azure SQL Database**

- **Propósito**: Persistencia de análisis, historial y estadísticas
- **Tablas principales**:
  - `analyses`: Resultados de análisis con timestamp
  - `users`: Información de usuarios (opcional)
  - `statistics`: Agregados de categorías y materiales
- **Backups**: Automáticos diarios, retención 35 días
- **Seguridad**: Firewall, encriptación TDE

### **6. Azure Key Vault**

- **Propósito**: Gestión segura de credenciales y secretos
- **Secretos almacenados**:
  - API keys de Computer Vision
  - Conexión strings de SQL Database
  - Credenciales de Blob Storage SAS
  - CORS headers y configuración
- **Acceso**: Managed Identity desde App Service

### **7. Azure Monitor & Application Insights**

- **Propósito**: Monitoreo, logging y telemetría
- **Métricas**:
  - Tiempo de procesamiento de análisis
  - Tasa de error/éxito
  - Uso de recursos (CPU, memoria)
  - Análisis de disponibilidad
- **Logs**: Query con KQL en Log Analytics Workspace
- **Alertas**: Notificaciones en caso de fallos o anomalías

### **8. Azure Static Web Apps (Frontend)**

- **Propósito**: Hosting de la aplicación React
- **Características**:
  - CDN global incluido
  - SSL automático
  - Staging automático en pull requests
  - Integración GitHub Actions
- **Deployment**: Automático desde rama main
- **Performance**: Edge caching, compresión automática

---

## 🚀 Instalación y Setup

### Setup rápido

```bash
# Crear proyecto con Vite
npm create vite@latest ecovision -- --template react-ts
cd ecovision

# Instalar todas las dependencias
npm install axios lucide-react framer-motion react-dropzone
npm install tailwindcss @tailwindcss/vite

# Dependencias de tipado
npm install --save-dev @types/react @types/react-dom typescript
```

### Estructura de archivos

```
src/
├── components/
│   ├── NavBar.tsx
│   ├── HeroSection.tsx
│   ├── UploadBox.tsx
│   ├── ResultCard.tsx
│   ├── Loader.tsx
│   └── StatsCard.tsx
├── pages/
│   └── Home.tsx
├── services/
│   └── api.service.ts
├── types/
│   └── analysis.ts
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

---

## ⚙️ Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz:

```env
# Backend API
VITE_API_URL=http://localhost:4000

# Azure Blob Storage (opcional para desarrollo)
VITE_AZURE_STORAGE_ACCOUNT=ecovisionstorage
VITE_AZURE_CONTAINER=uploads
```

### Archivo `.env.production`

```env
VITE_API_URL=https://ecovision-api.azurewebsites.net
VITE_ENVIRONMENT=production
```

### Activar backend real

En `src/pages/Home.tsx`, cambia:

```typescript
const USE_MOCK = false; // ← cuando el backend esté listo
```

---

## 📊 Scripts Disponibles

```bash
npm run dev       # Inicia servidor de desarrollo (puerto 3000)
npm run build     # Compilación TypeScript + Vite (optimizado)
npm run lint      # Validación con ESLint
npm run preview   # Vista previa del build de producción
```

---

## 📈 Flujo de Uso

```
1. Usuario accede a la aplicación
   ↓
2. Ve HeroSection + UploadBox vacío
   ↓
3. Carga imagen (drag & drop o clic)
   ↓
4. Vista previa de imagen
   ↓
5. Clic en "Analizar"
   ↓
6. Estado Loading (spinner con pasos)
   ↓
7. Backend procesa:
   - Envía a Azure Computer Vision
   - Obtiene clasificación de objeto
   - Consulta base datos para categoría
   - Genera recomendación
   ↓
8. ResultCard muestra resultados con recomendación
   ↓
9. Usuario puede "Analizar nueva imagen" (vuelve al paso 2)
```

---

## 🔄 Ciclo de Análisis Detallado

```
Frontend (React)
    ↓ [Imagen + FormData]
Backend (Python/Node)
    ↓ [POST /analyze]
Azure Computer Vision API
    ↓ [detectObject()]
Modelo de IA
    ↓ [Clasificación + Confidence]
Azure SQL Database
    ↓ [Obtener recomendaciones]
Genera respuesta
    ↓ [AnalysisResult JSON]
Azure Blob Storage
    ↓ [Guardar imagen]
Frontend recibe
    ↓ [Muestra ResultCard]
```

---

## ✨ Características Implementadas

✅ Interfaz responsiva y atractiva
✅ Drag & drop de imágenes con validación
✅ Animaciones fluidas y transiciones
✅ Tipado fuerte con TypeScript
✅ Sistema de estados bien definido
✅ Componentes reutilizables y modulares
✅ Mock data para desarrollo sin backend
✅ Integración lista para servicios Azure
✅ Manejo de errores robusto
✅ Performance optimizado con Vite

---

## 🔐 Seguridad

- Variables de entorno separadas por ambiente
- No exponer credenciales en código
- Azure Key Vault para secretos
- CORS configurado correctamente
- Validación de archivos (tipo y tamaño)
- SAS tokens temporales para URLs de imágenes

---

## 📝 Dependencias Principales

| Librería         | Versión  | Uso                        |
| ---------------- | -------- | -------------------------- |
| `react`          | ^19.2.6  | Framework UI               |
| `framer-motion`  | ^12.40.0 | Animaciones y transiciones |
| `react-dropzone` | ^15.0.0  | Drag & drop de imágenes    |
| `lucide-react`   | ^1.16.0  | Iconos SVG                 |
| `axios`          | ^1.16.1  | Peticiones HTTP al backend |
| `tailwindcss`    | ^4.3.0   | Estilos utilitarios        |
| `vite`           | ^8.0.12  | Build tool y dev server    |

---

## 🤝 Próximos Pasos

- [ ] Integrar autenticación (Azure AD B2C)
- [ ] Dashboard de historial de análisis
- [ ] Estadísticas de usuario
- [ ] Modelo de IA local para offline
- [ ] Progressive Web App (PWA)
- [ ] Soporte multiidioma
- [ ] Análisis de tendencias de reciclaje
