import sequelize from "../config/config.mjs";

const DetalleVentaController = {
    getDetalleVentas: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM DetalleVentas",
            {
                type: sequelize.QueryTypes.SELECT
            });

            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay ventas" });
            }
        } catch (error) {
            console.error("Error al obtener ventas:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getDetalleVenta: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await sequelize.query("SELECT * FROM DetalleVentas WHERE DetalleVentaID = :id",
            {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT
            });

            if (result.length === 0) {
                res.status(404).send("Venta no encontrada");
                return;
            }

            res.json(result[0]);
        } catch (error) {
            console.error("Error al obtener la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearDetalleVenta: async (req, res) => {
        try {
            const { VentaID, VehiculoID, Cantidad } = req.body;
            const result = await sequelize.query("INSERT INTO DetalleVentas (VentaID, VehiculoID, Cantidad) VALUES (:VentaID, :VehiculoID, :Cantidad)",
            {
                replacements: { VentaID, VehiculoID, Cantidad },
                type: sequelize.QueryTypes.INSERT
            });

            res.status(201).json({ message: "Venta creada", DetalleVentaID: result[0] });
        } catch (error) {
            console.error("Error al crear la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    actualizarDetalleVenta: async (req, res) => {
        try {
            const { id } = req.params;
            const { VentaID, VehiculoID, Cantidad } = req.body;
            await sequelize.query("UPDATE DetalleVentas SET VentaID = :VentaID, VehiculoID = :VehiculoID, Cantidad = :Cantidad WHERE DetalleVentaID = :id",
            {
                replacements: { VentaID, VehiculoID, Cantidad, id },
                type: sequelize.QueryTypes.UPDATE
            });

            res.json({ message: "Venta actualizada" });
        } catch (error) {
            console.error("Error al actualizar la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    eliminarDetalleVenta: async (req, res) => {
        try {
            const { id } = req.params;
            await sequelize.query("DELETE FROM DetalleVentas WHERE DetalleVentaID = :id",
            {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

            res.json({ message: "Venta eliminada" });
        } catch (error) {
            console.error("Error al eliminar la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
};

export default DetalleVentaController;