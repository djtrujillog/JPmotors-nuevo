import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import axios from 'axios'; // Importa Axios para solicitudes HTTP
import cron from 'node-cron'; // Importa node-cron
import sequelize from './config/config.mjs';
import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';
import cotizacionRouter from './routes/cotizacion.Routes.mjs';
import empleadosRouter from './routes/empleados.routes.mjs';
import clienteRouter from './routes/cliente.routes.mjs';
import seguimientoRouter from './routes/seguimiento.routes.mjs';
import mailRouter from './routes/mail.routes.mjs';
import migracion from './routes/migracion.routes.mjs';
import image from './routes/image.routes.mjs';

const app = express();

// Obtener el directorio actual desde import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Usar la ruta de imágenes con el directorio actual
app.use('/images', express.static(path.join(__dirname, '../images')));
app.set('port', process.env.PORT || 4000);

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => res.json({ message: 'API JP Motors GT Diciembre 2 2024 By J&M' }));

app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
app.use('/marcas', marcasRouter);
app.use('/cotizaciones', cotizacionRouter);
app.use('/empleados', empleadosRouter);
app.use('/clientes', clienteRouter);
app.use('/seguimientos', seguimientoRouter);
app.use('/mail', mailRouter);
app.use('/migracion', migracion);
app.use('/image', image);

let keepAliveInterval = null; // Variable para almacenar el intervalo

// Función para iniciar el Keep-Alive
function startKeepAlive() {
  if (keepAliveInterval) return; // Si ya está en ejecución, no iniciar de nuevo
  keepAliveInterval = setInterval(() => {
    const timestamp = new Date().toISOString();
    axios.get(`http://localhost:${app.get('port')}/`)
      .then(() => console.log(`[${timestamp}] Keep-alive ejecutado con éxito.`))
      .catch((err) => console.error(`[${timestamp}] Error en keep-alive:`, err.message));
  }, 300000); // Cada 5 minutos (300000 ms)
  console.log('Keep-alive iniciado.');
}

// Función para detener el Keep-Alive
function stopKeepAlive() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('Keep-alive detenido.');
  }
}

// Programar el inicio y la detención del Keep-Alive
cron.schedule('0 7 * * *', () => {
  console.log('Iniciando Keep-Alive a las 7:00 AM (América Central)');
  startKeepAlive();
}, {
  timezone: 'America/Guatemala' // Huso horario de América Central
});

cron.schedule('0 22 * * *', () => {
  console.log('Deteniendo Keep-Alive a las 10:00 PM (América Central)');
  stopKeepAlive();
}, {
  timezone: 'America/Guatemala' // Huso horario de América Central
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(app.get('port'), () => {
      console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

export default app;
