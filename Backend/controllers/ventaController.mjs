import sequelize from "../config/config.mjs";

const VentaController = {
    getVentas: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Ventas",
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

    getVentaDetalle: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await sequelize.query("SELECT * FROM Ventas WHERE VentaID = :id",
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
    crearVenta: async (req, res) => {
        try {
            const { ClienteID, VehiculoID, EmpleadoID, FechaVenta, PrecioVenta } = req.body;
            const result = await sequelize.query("INSERT INTO Ventas (ClienteID, VehiculoID, EmpleadoID, FechaVenta, PrecioVenta) VALUES (:ClienteID, :VehiculoID, :EmpleadoID, :FechaVenta, :PrecioVenta)",
            {
                replacements: { ClienteID, VehiculoID, EmpleadoID, FechaVenta, PrecioVenta },
                type: sequelize.QueryTypes.INSERT
            });

            res.status(201).json({ message: "Venta creada", VentaID: result[0] });
        } catch (error) {
            console.error("Error al crear la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    actualizarVenta: async (req, res) => {
        try {
            const { id } = req.params;
            const { ClienteID, VehiculoID, EmpleadoID, FechaVenta, PrecioVenta } = req.body;
            await sequelize.query("UPDATE Ventas SET ClienteID = :ClienteID, VehiculoID = :VehiculoID, EmpleadoID = :EmpleadoID, FechaVenta = :FechaVenta, PrecioVenta = :PrecioVenta WHERE VentaID = :id",
            {
                replacements: { ClienteID, VehiculoID, EmpleadoID, FechaVenta, PrecioVenta, id },
                type: sequelize.QueryTypes.UPDATE
            });

            res.status(200).json({ message: "Venta actualizada correctamente" });
        } catch (error) {
            console.error("Error al actualizar la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    eliminarVenta: async (req, res) => {
        try {
            const { id } = req.params;
            await sequelize.query("DELETE FROM Ventas WHERE VentaID = :id",
            {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

            res.status(200).json({ message: "Venta eliminada correctamente" });
        } catch (error) {
            console.error("Error al eliminar la venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
};

export default VentaController;