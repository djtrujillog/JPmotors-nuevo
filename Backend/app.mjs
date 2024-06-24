import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/config.mjs';
import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';
import cotizacionRouter from './routes/cotizacion.Routes.mjs';
import { connectFTP, listFiles } from './controllers/ftpClient.mjs';
import multer from 'multer';

const app = express();

app.set('port', process.env.PORT || 4000);

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para analizar las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta de prueba
app.get('/', (req, res) => res.json({ message: 'API JP Motors Gt' }));

// Routing
app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
app.use('/marcas', marcasRouter);
app.use('/cotizaciones', cotizacionRouter);

// Endpoint para listar archivos FTP bajo demanda
app.get('/list-files', async (req, res) => {
    try {
        const files = await listFiles();
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Probar la conexión a la base de datos antes de sincronizar
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');

    // Iniciar la sincronización de Sequelize
    return sequelize.sync({ force: false });
  })
  .then(async () => {
    console.log('Base de datos sincronizada.');

    // Conectar al servidor FTP
    await connectFTP();

    // Iniciar el servidor
    app.listen(app.get('port'), function() {
      console.log('Servidor escuchando en el puerto ' + app.get('port'));
    });
  })
  .catch((error) => {
    console.log('Error al conectar con la base de datos:', error);
  });
