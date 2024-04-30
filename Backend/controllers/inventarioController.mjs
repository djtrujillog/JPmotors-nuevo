import sequelize from "../config/config.mjs";

const inventarioController = {
    getInventario: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Inventario",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay inventario" });
            }      
        } catch (error) {
            console.error("Error al obtener inventario:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearInventario: async (req, res) => {
        try {
            const { VehiculoID, CantidadStock, Ubicacion } = req.body;
            await sequelize.query("INSERT INTO Inventario (VehiculoID, CantidadStock, Ubicacion) VALUES (:VehiculoID, :CantidadStock, :Ubicacion)",
            {
                replacements: { VehiculoID, CantidadStock, Ubicacion },
                type: sequelize.QueryTypes.INSERT
            });
            res.status(201).json({ message: "Inventario creado correctamente"});
        } catch (error) {
            console.log(error);
            console.log("Error al subir el inventario");
            res.status(500).json("Error interno del servidor");
        }
    },
    actualizarInventario: async (req, res) => {
        try {
            const { InventarioID } = req.params;
            const { VehiculoID, CantidadStock, Ubicacion } = req.body;

            await sequelize.query("UPDATE Inventario SET VehiculoID = :VehiculoID, CantidadStock = :CantidadStock, Ubicacion = :Ubicacion WHERE InventarioID = :InventarioID",
            {
                replacements: { VehiculoID, CantidadStock, Ubicacion, InventarioID },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(200).json({ message: "Inventario actualizado correctamente"});
        } catch (error) {
            console.log("Error al actualizar el inventario");
            res.status(500).json("Error interno del servidor");
        }
    }, 
    eliminarInventario: async (req, res) => {
        try {
            const { InventarioID } = req.params;
            await sequelize.query("DELETE FROM Inventario WHERE InventarioID = :InventarioID",
            {
                replacements: { InventarioID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Inventario eliminado correctamente"});
        } catch (error) {
            console.log("Error al eliminar el inventario");
            res.status(500).json("Error interno del servidor");
        }
    }
};

export default inventarioController;