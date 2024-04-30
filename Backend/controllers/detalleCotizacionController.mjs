import sequelize from "../config/config.mjs";

const detalleCotizacionController = {
    //Listar todos los detalles de cotizaciones
    getDetallesCotizaciones : async (req, res) => {
        try {
           const result = await sequelize.query('SELECT * FROM DetalleCotizaciones', { type: sequelize.QueryTypes.SELECT }); 
           res.status(200).json(result);
        } catch (error) {
            console.log('Error al listar detalles de cotizaciones:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    crearDetalleCotizacion: async (req, res) => {
        try {
            const { CotizacionID, VehiculoID, Cantidad } = req.body;
            await sequelize.query('INSERT INTO DetalleCotizaciones (CotizacionID, VehiculoID, Cantidad) VALUES (?, ?, ?)',
            { replacements: [CotizacionID, VehiculoID, Cantidad] });
            res.status(200).json({ message: 'Detalle de cotización creado correctamente' });
        } catch (error) {
            console.log('Error al crear detalle de cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    //Actualizar detalle de cotización
    actualizarDetalleCotizacion: async (req, res) => {
        try {
            const { DetalleCotizacionID } = req.params;
            const { CotizacionID, VehiculoID, Cantidad } = req.body;
            await sequelize.query('UPDATE DetalleCotizaciones SET CotizacionID = ?, VehiculoID = ?, Cantidad = ? WHERE DetalleCotizacionID = ?',
            { replacements: [CotizacionID, VehiculoID, Cantidad, DetalleCotizacionID] });
            res.status(200).json({ message: 'Detalle de cotización actualizado correctamente' });
        } catch (error) {
            console.log('Error al actualizar detalle de cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    //Eliminar detalle de cotización
    eliminarDetalleCotizacion: async (req, res) => {
        try {
            const { DetalleCotizacionID } = req.params;
            await sequelize.query('DELETE FROM DetalleCotizaciones WHERE DetalleCotizacionID = ?', { replacements: [DetalleCotizacionID] });
            res.status(200).json({ message: 'Detalle de cotización eliminado correctamente' });
        } catch (error) {
            console.log('Error al eliminar detalle de cotización:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default detalleCotizacionController;