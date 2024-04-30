import sequelize from "../config/config.mjs";

const cotizacionController = {
    //Listar todas las cotizaciones
    getCotizaciones : async (req, res) => {
        try {
           const result = await sequelize.query('SELECT * FROM Cotizaciones', { type: sequelize.QueryTypes.SELECT }); 
           res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar cotizaciones:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    crearCotizaciones: async (req, res) => {
        try {
            const { EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento } = req.body;
            await sequelize.query('INSERT INTO Cotizaciones (EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento) VALUES (?, ?, ?, ?, ?, ?)',
            { replacements: [EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento] });
            res.status(200).json({ message: 'Cotización creada correctamente' });
        } catch (error) {
            console.log('Error al crear cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    //Actualizar cotización
    actualizarCotizacion: async (req, res) => {
        try {
            const { CotizacionID } = req.params;
            const { EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento } = req.body;
            await sequelize.query('UPDATE Cotizaciones SET EmpleadoID = ?, ClienteID = ?, VehiculoID = ?, FechaCotizacion = ?, EstadoCotizacion = ?, FechaSeguimiento = ? WHERE CotizacionID = ?',
            { replacements: [EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento, CotizacionID] });
            res.status(200).json({ message: 'Cotización actualizada correctamente' });
        } catch (error) {
            console.log('Error al actualizar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    //Eliminar cotización
    eliminarCotizacion: async (req, res) => {
        try {
            const { CotizacionID } = req.params;
            await sequelize.query('DELETE FROM Cotizaciones WHERE CotizacionID = ?', { replacements: [CotizacionID] });
            res.status(200).json({ message: 'Cotización eliminada correctamente' });
        } catch (error) {
            console.log('Error al eliminar cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default cotizacionController;