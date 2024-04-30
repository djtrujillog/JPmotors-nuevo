import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/config.mjs';

import authRouters from './routes/auth.routes.mjs';
import dashboardRouters from './routes/dashboard.routes.mjs';
import vehiculosRouter from './routes/vehiculo.routes.mjs';
import marcasRouter from './routes/marca.routes.mjs';
import clientesRouter from './routes/cliente.routes.mjs';
import empleadosRouter from './routes/empleado.routes.mjs';
import ventaRouter from './routes/venta.routes.mjs';
import detalleVentaRouter from './routes/detalleVentas.routes.mjs';
import garantiaRouter from './routes/garantia.routes.mjs';
import inventarioRouter from './routes/inventario.routes.mjs';
import motorRouter from './routes/motor.routes.mjs';
import seguridadVehiculoRouter from './routes/seguridadVehiculo.routes.mjs';
import interiorRouter from './routes/interior.routes.mjs';
import cotizacionRouter from './routes/cotizacion.routes.mjs';
import detalleCotizacionRouter from './routes/detalleCotizacion.routes.mjs';

// Iniciar la conexión a la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos conectada');
  })
  .catch((error) => {
    console.log('Error al conectar con la base de datos:', error);
  });

const app = express();
const PORT = 4000;

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware para analizar las solicitudes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.use('/auth', authRouters);
app.use('/dashboard', dashboardRouters);
app.use('/vehiculos', vehiculosRouter);
app.use('/marcas', marcasRouter);
app.use('/clientes', clientesRouter);
app.use('/empleados', empleadosRouter);
app.use('/ventas', ventaRouter);
app.use('/detalle-ventas', detalleVentaRouter);
app.use('/garantias', garantiaRouter);
app.use('/inventario', inventarioRouter);
app.use('/motores', motorRouter);
app.use('/seguridad-vehiculos', seguridadVehiculoRouter);
app.use('/interiores', interiorRouter);
app.use('/cotizaciones', cotizacionRouter);
app.use('/detalle-cotizaciones', detalleCotizacionRouter);


// Iniciar el servidor
app.listen(PORT, function() {
  console.log('Servidor escuchando en el puerto ' + PORT);
});