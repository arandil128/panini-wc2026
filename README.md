# ⚽ Álbum Panini WC 2026 — Digital

> Porque sí, somos adultos. Y sí, igual coleccionamos figuritas.

Trackea tu álbum del Mundial 2026 desde la compu. Marcá las que pegaste, registrá tus repetidas, escaneá paquetes con la cámara y exportá tu lista para intercambiar con amigos. Todo con el estilo visual del álbum físico — fondo pergamino, colores Panini, figuritas que hacen *pop* cuando las pegás.

---

## ✨ Qué tiene

### 📊 Dashboard
- Progreso total del álbum con porcentaje y barra dorada
- Todas las secciones (países + especiales) con su bandera y progreso individual
- Expandís cada sección y ves las figuritas una por una
- Badge **✦ Completo** cuando llenás un país entero

### 🃏 Figuritas interactivas
- Click para marcar como pegada → animación de *sticker pop*
- Las especiales tienen efecto **shimmer** brillante
- Click en una ya pegada → confirmación antes de desmarcarla (sin accidentes)

### ⌨️ Pegar por código
- Ingresás los códigos a mano (`ARG17`, `BRA5`, `FWC1`...)
- Pegás varios de una sola vez separados por espacio, coma o enter
- Valida los códigos en tiempo real y te dice cuáles son inválidos

### 📷 OCR — Escaneá el sobre
- Subís una foto del sobre con los códigos impresos
- La app los detecta automáticamente con reconocimiento de texto
- Confirmás y pegás todo de una

### 📦 Repetidas
- Llevás el conteo de tus repetidas por figurita
- Sumás y restás cantidad con los botones + / −
- Sabés exactamente qué tenés para intercambiar

### 📤 Exportar
- Exportá tu lista de **faltantes** o **repetidas** en `TXT`, `CSV` o `JSON`
- Ideal para compartir por WhatsApp o armar un Excel con lo que te falta

### 🌙 Modo oscuro
- Toggle entre modo claro (pergamino) y oscuro (navy profundo)
- Se guarda automáticamente

---

## 🛠️ Stack

| Parte | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Base de datos | SQLite via Prisma ORM |
| OCR | Tesseract.js |
| Deploy | Docker + docker-compose |

---

## 🚀 Cómo instalarlo

### Opción A — Local (modo dev)

**Requisitos:** Node.js 18+ instalado.

**1. Clonar el repo**
```bash
git clone https://github.com/arandil128/panini-wc2026.git
cd panini-wc2026
```

**2. Configurar el backend**
```bash
cd backend
npm install
```

Creá un archivo `.env` adentro de `backend/`:
```env
DATABASE_URL="file:./album.db"
```

Aplicá el schema a la base de datos:
```bash
npx prisma migrate deploy
```

Arrancá el server:
```bash
npm run dev
```
> El backend queda en `http://localhost:3000`. La primera vez que arranca, hace el seed automático con todas las figuritas del álbum.

**3. Configurar el frontend** (en otra terminal)
```bash
cd frontend
npm install
npm run dev
```
> El frontend queda en `http://localhost:5173` y ya proxea las llamadas a la API al backend automáticamente.

---

### Opción B — Docker (modo producción)

**Requisitos:** Docker + Docker Compose instalados.

```bash
git clone https://github.com/arandil128/panini-wc2026.git
cd panini-wc2026
docker-compose up -d
```

Y listo. La app corre en `http://localhost:3000`. Los datos persisten en un volumen de Docker aunque reinicies el contenedor.

---

## 📁 Estructura del proyecto

```
panini-wc2026/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Modelos de DB
│   │   └── seed.js           # Carga las 670 figuritas del álbum
│   └── src/
│       ├── routes/           # API endpoints
│       ├── data/             # JSON con el catálogo completo
│       └── server.js
└── frontend/
    └── src/
        ├── components/
│       │   ├── dashboard/    # Progreso general + secciones
│       │   ├── sticker/      # StickerCard con animaciones
│       │   ├── entry/        # Pegado por código
│       │   ├── ocr/          # Escaneo de sobres
│       │   ├── duplicates/   # Gestión de repetidas
│       │   ├── export/       # Exportar listas
│       │   └── layout/       # Navbar + Shell
│       ├── store/            # Estado global (Zustand)
│       └── api/              # Cliente Axios
```

---

## 🔌 API endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/sections` | Lista de secciones con progreso |
| GET | `/api/sections/:id/stickers` | Figuritas de una sección |
| GET | `/api/collection/stats` | Stats globales |
| POST | `/api/collection` | Pegar figuritas (`{ codes: [...] }`) |
| DELETE | `/api/collection/:id` | Desmarcar una figurita |
| GET | `/api/duplicates` | Lista de repetidas |
| POST | `/api/duplicates` | Agregar/actualizar repetida |
| PUT | `/api/duplicates/:id` | Sumar/restar cantidad |
| DELETE | `/api/duplicates/:id` | Eliminar repetida |
| POST | `/api/ocr` | Subir imagen para escanear |
| GET | `/api/export/missing?format=txt\|csv\|json` | Exportar faltantes |
| GET | `/api/export/duplicates?format=txt\|csv\|json` | Exportar repetidas |

---

## 🧑‍💻 Contribuir

1. Fork del repo
2. Creá un branch (`git checkout -b feature/mi-mejora`)
3. Hacé tus cambios y commiteá (`git commit -m 'feat: mi mejora'`)
4. Push al branch (`git push origin feature/mi-mejora`)
5. Abrí un Pull Request

---

## 📄 Licencia

ISC — hacé lo que quieras con esto. Si te sirve para completar el álbum antes que tus amigos, mejor.

---

<div align="center">
  Hecho con ☕ y muchos sobres de figuritas
</div>
