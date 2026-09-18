# Asistente Virtual para Alumnos Ingresantes

Proyecto Integrador — Tecnicatura Superior en Desarrollo de Software.

Asistente virtual web destinado a **alumnos ingresantes del primer cuatrimestre**, que brinda orientación sobre el funcionamiento de la institución, la cursada, las materias, los trámites, el aula virtual (Moodle), los recursos y las preguntas frecuentes.

> ⚠️ **Importante:** la aplicación es **independiente de Moodle**. Moodle solo se usa como punto de acceso mediante un enlace hacia el frontend. No se requiere ningún privilegio administrativo sobre Moodle, ni plugins, ni Web Services.

---

## 1. Descripción

El proyecto es un chat institucional (asistente virtual) con:

- Un **frontend** en React + Vite + TypeScript con una interfaz moderna, limpia, accesible y responsive.
- Un **backend** en Node.js + Express + TypeScript que expone una API REST.
- Un **servicio de respuestas por reglas** (`chatService`) que responde consultas frecuentes. Está aislado para poder reemplazarlo más adelante por un modelo de IA.

En esta primera fase el chat funciona en memoria: la conversación se mantiene mientras la página está abierta y no se persiste en ninguna base de datos.

## 2. Objetivo (prototipo)

Validar rápidamente:

1. El frontend.
2. El backend.
3. La comunicación frontend → backend.
4. El flujo de conversación.
5. El despliegue en Vercel.
6. El acceso al asistente desde Moodle mediante un enlace.

## 3. Arquitectura

```
                    ┌──────────────────┐        HTTP/JSON        ┌──────────────────┐
  Moodle (enlace) ─►│    Frontend      │  ─────────────────────► │     Backend      │
                    │  React + Vite    │   POST /api/chat        │  Express + TS    │
                    │  (Vercel)        │  ◄───────────────────── │  (Vercel API)    │
                    └──────────────────┘       { reply }         └──────────────────┘
```

- El frontend desplegado apunta al backend mediante la variable `VITE_API_URL`.
- El backend responde mediante reglas en `chatService`, listo para reemplazarse por un servicio de IA (RAG + LLM) más adelante.
- No hay dependencia de Moodle: la institución únicamente coloca un enlace en Moodle hacia el frontend desplegado.

## 4. Tecnologías

| Capa     | Tecnología                                                  |
| -------- | ----------------------------------------------------------- |
| Frontend | React 18, Vite, TypeScript, CSS moderno (vanilla), Fetch API |
| Backend  | Node.js, Express, TypeScript, CORS, dotenv                   |
| Pruebas  | Node.js test runner (`node:test`, sin dependencias extra)    |
| Infra    | Vercel (frontend y backend serverless)                       |

## 5. Estructura de carpetas

```
/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # Header, MessageBubble, ChatInput, QuickQuestions, TypingIndicator
│   │   ├── pages/          # ChatPage
│   │   ├── services/       # api.ts (llamadas al backend)
│   │   ├── config/         # preguntas frecuentes, mensaje de bienvenida
│   │   ├── styles/         # index.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── types.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── .env.example
│   └── .gitignore
│
├── backend/
│   ├── api/
│   │   └── index.ts        # función serverless para Vercel
│   ├── src/
│   │   ├── config/         # env.ts, cors.ts
│   │   ├── controllers/    # health.controller.ts, chat.controller.ts
│   │   ├── routes/         # health.routes.ts, chat.routes.ts, index.ts
│   │   ├── services/       # chat.service.ts (respuestas por reglas)
│   │   ├── middleware/     # validate-chat-request.ts, error-handler.ts
│   │   ├── app.ts          # creación de la app Express (independiente del server)
│   │   └── server.ts       # arranque local (app.listen)
│   ├── tests/              # pruebas unitarias del chatService
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json
│   ├── .env.example
│   └── .gitignore
│
├── .gitignore
└── README.md
```

## 6. Instalación

Requisitos: **Node.js 18+** (recomendado 20 o 22) y **npm**.

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

## 7. Ejecución local

### Backend (terminal 1)

```bash
cd backend
cp .env.example .env   # En Windows: copy .env.example .env
npm run dev
```

El backend corre en `http://localhost:3000`.

### Frontend (terminal 2)

```bash
cd frontend
cp .env.example .env   # En Windows: copy .env.example .env
npm run dev
```

El frontend corre en `http://localhost:5173`.

Abrí `http://localhost:5173` en el navegador. El `.env.example` del frontend ya apunta al backend local (`http://localhost:3000`).

### Verificación rápida

```bash
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"¿Cómo ingreso al aula virtual?"}'
```

### Scripts disponibles

| Comando                       | Acción                                        |
| ----------------------------- | --------------------------------------------- |
| `backend: npm run dev`        | Inicia el backend con recarga en caliente     |
| `backend: npm run build`      | Compila TypeScript a `dist/`                  |
| `backend: npm start`          | Ejecuta el build compilado                    |
| `backend: npm test`           | Corre las pruebas unitarias del `chatService` |
| `backend: npm run typecheck`  | Verifica tipos sin emitir (común a ambos)     |
| `frontend: npm run dev`       | Inicia el frontend en `http://localhost:5173` |
| `frontend: npm run build`     | Genera el bundle de producción en `dist/`     |
| `frontend: npm run preview`   | Previsualiza el build de producción           |
| `frontend: npm run typecheck` | Verifica tipos sin emitir                     |

## 8. Variables de entorno

### Backend (`backend/.env`)

| Variable      | Descripción                                                            | Ejemplo                                      |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| `FRONTEND_URL` | Origen permitido para CORS (frontend desplegado)                       | `https://asistente-virtual.vercel.app`      |
| `PORT`         | Puerto del servidor local                                              | `3000`                                       |

En desarrollo, si `FRONTEND_URL` queda vacía, el backend permite `http://localhost:5173` y `http://127.0.0.1:5173` además del valor configurado. En producción, `FRONTEND_URL` debe ser la URL exacta del frontend.

### Frontend (`frontend/.env`)

| Variable       | Descripción                                        | Ejemplo                                         |
| -------------- | -------------------------------------------------- | ----------------------------------------------- |
| `VITE_API_URL` | URL base de la API del backend                     | `https://asistente-virtual-api.vercel.app`     |

> ⚠️ Los archivos `.env` no se versionan. Solo se versionan los `.env.example`. Nunca incluyas secretos en el frontend (todo lo que empiece con `VITE_` se expone en el bundle).

## 9. Endpoints

### `GET /api/health`

Respuesta:

```json
{
  "status": "ok",
  "service": "asistente-virtual-api"
}
```

### `POST /api/chat`

Request:

```json
{
  "message": "¿Cómo ingreso al aula virtual?"
}
```

Respuesta exitosa (200):

```json
{
  "success": true,
  "reply": "Para ingresar al aula virtual, entrá a la plataforma..."
}
```

Errores posibles:

- `400` — mensaje vacío o que supera los 500 caracteres (`{ "success": false, "error": "..." }`).
- `404` — ruta inexistente (`{ "success": false, "error": "Ruta no encontrada." }`).
- `500` — error interno (`{ "success": false, "error": "Error interno del servidor." }`).

### Ejemplos de prueba

```bash
# Health
curl http://localhost:3000/api/health

# Chat válido
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"¿Dónde veo mis horarios?\"}"

# Mensaje vacío → 400
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"\"}"

# Mensaje demasiado largo → 400
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"<600 letras>\"}"
```

Además del suite de pruebas unitarias (`npm test` en `backend/`), podés probar a mano:

- **Error del backend:** detener el backend y enviar un mensaje desde el frontend. Debe mostrarse el aviso de error y la respuesta del asistente indicando que hubo un problema.
- **Backend no disponible:** con el frontend levantado y el backend apagado, el frontend muestra el mensaje de conexión fallida.

## 10. Deployment en Vercel

### Frontend

1. Subí el repositorio a GitHub.
2. En Vercel: **New Project → Import** el repositorio.
3. Seleccioná el directorio raíz del proyecto `frontend` como **Root Directory**.
4. Configurá el framework preset **Vite** (Vercel lo autodetecta) y verificá:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Agregá la variable de entorno:
   - `VITE_API_URL` → `https://TU-BACKEND.vercel.app` (la URL del backend desplegado)
6. **Deploy.**

No se necesita `vercel.json` para el frontend: Vercel configura Vite automáticamente.

### Backend

1. En Vercel: **New Project → Import** el repositorio.
2. Seleccioná el directorio `backend` como **Root Directory**.
3. Agregá la variable de entorno:
   - `FRONTEND_URL` → `https://TU-FRONTEND.vercel.app`
4. **Deploy.**

El backend se despliega como función serverless usando la configuración de `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [{ "src": "api/index.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "api/index.ts" }]
}
```

Archivos que requiere Vercel en el backend:

| Archivo            | Función                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `api/index.ts`     | Exporta la app Express como función serverless                          |
| `vercel.json`      | Indica a Vercel cómo construir y enrutar                                |
| `package.json`     | Dependencias (`express`, `cors`, `dotenv`)                              |
| `src/app.ts` y `src/**` | La aplicación (compilada por `@vercel/node` durante el deploy)      |

> El `server.ts` (con `app.listen`) queda separado de `app.ts`: se usa solo para ejecución local, de modo que la plataforma serverless exporta la app sin depender de un listener.

### Después del deploy

- Verificá `GET https://TU-BACKEND.vercel.app/api/health`.
- Verificá que el frontend desplegado responda preguntas (el navegador debe poder llegar a `VITE_API_URL`).

## 11. Configuración de Moodle

La institución **solo debe agregar un enlace** dentro de Moodle que apunte al frontend desplegado. No se modifica Moodle ni se requieren permisos administrativos especiales.

Pasos típicos desde un curso o la página principal (depende del rol con permisos para agregar recursos):

1. Activar el modo de edición.
2. Agregar un recurso/actividad del tipo **URL** (o un bloque de enlace).
3. En **URL externa**, pegar la dirección del frontend, por ejemplo:
   `https://TU-FRONTEND.vercel.app`
4. Opcional: configurar como **Nueva ventana** y completar la descripción con "Asistente virtual para alumnos ingresantes".
5. Guardar y mostrar.

Con esto, los alumnos entran desde Moodle, el enlace abre la aplicación y el frontend se comunica con el backend desplegado: **no hay ninguna integración técnica con Moodle**.

## 12. Futuras etapas

| Fase | Etapa                                                            | Estado |
| ---- | ---------------------------------------------------------------- | ------ |
| 1    | Prototipo actual: React + Vite + Express + respuestas simuladas  | ✅     |
| 2    | Base de datos                                                    | ⏳     |
| 3    | Carga y administración de documentación institucional            | ⏳     |
| 4    | Sistema RAG (recuperación sobre documentos/PDF)                  | ⏳     |
| 5    | Integración con modelo LLM                                       | ⏳     |
| 6    | Citas/referencias de las fuentes de cada respuesta               | ⏳     |
| 7    | Panel administrativo                                             | ⏳     |
| 8    | Estadísticas de consultas                                        | ⏳     |
| 9    | Autenticación o integración más profunda con Moodle (opcional)   | ⏳     |

La arquitectura prepara esa evolución:

- `chatService` (backend) es el único punto que implementa las respuestas: puede reemplazarse internamente por un servicio de IA sin tocar controladores ni rutas.
- `api.ts` (frontend) centraliza las llamadas al backend.
- El backend ya está separado en `app.ts` / `server.ts` / carpeta `api/` para funcionar tanto local como serverless.

---

## Notas de calidad

- Validación de entrada: los mensajes son requeridos, no vacíos, y están limitados a 500 caracteres.
- CORS configurado por origen (sin `*`). En desarrollo se permiten `localhost:5173`; en producción solo `FRONTEND_URL`.
- Sin secretos en el frontend; variables de entorno por proyecto.
- Estructura modular y sin dependencias innecesarias para facilitar el mantenimiento.