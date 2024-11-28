// upload.mjs
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Definir __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta de destino
const destinationFolder = path.join(__dirname, '../images/carusel');

// Verificar si la carpeta existe y crearla si es necesario
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Guardando archivo en:', destinationFolder);  // Log para verificar la ruta de destino
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});



const fileFilter = (req, file, cb) => {
  console.log('Tipo de archivo recibido en el filtro:', file.mimetype); // Log para depurar tipo MIME
  console.log('Detalles del archivo:', file); // Log para ver otros atributos del archivo
  
  // Aceptar cualquier archivo cuyo MIME comience con 'image/'
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true); // Aceptar archivo
  } else {
    console.error('Error: Tipo de archivo no soportado. Solo se permiten imágenes.');
    cb(new Error('Tipo de archivo no soportado. Solo se permiten imágenes.'), false); // Rechazar archivo
  }
};

const uploadg = multer({
  storage: storage,
  fileFilter: fileFilter
});

export default uploadg;
