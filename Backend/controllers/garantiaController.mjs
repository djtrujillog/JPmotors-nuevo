import sequelize from "../config/config.mjs";

const garantiaController = {
    getGarantias: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Garantia",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay garantías" });
            }      
        } catch (error) {
            console.error("Error al obtener garantías:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearGarantia: async (req, res) => {
        try {
            const { VehiculoID, Duracion, Condiciones } = req.body;
            await sequelize.query("INSERT INTO Garantia (VehiculoID, Duracion, Condiciones) VALUES (:VehiculoID, :Duracion, :Condiciones)",
            {
                replacements: { VehiculoID, Duracion, Condiciones },
                type: sequelize.QueryTypes.INSERT
            });
            res.status(201).json({ message: "Garantía creada correctamente"});
        } catch (error) {
            console.log(error);
            console.log("Error al subir la garantía");
            res.status(500).json("Error interno del servidor");
        }
    },
    actualizarGarantia: async (req, res) => {
        try {
            const { GarantiaID } = req.params;
            const { VehiculoID, Duracion, Condiciones } = req.body;

            await sequelize.query("UPDATE Garantia SET VehiculoID = :VehiculoID, Duracion = :Duracion, Condiciones = :Condiciones WHERE GarantiaID = :GarantiaID",
            {
                replacements: { VehiculoID, Duracion, Condiciones, GarantiaID },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(200).json({ message: "Garantía actualizada correctamente"});
        } catch (error) {
            console.log("Error al actualizar la garantía");
            res.status(500).json("Error interno del servidor");
        }
    }, 
    eliminarGarantia: async (req, res) => {
        try {
            const { GarantiaID } = req.params;
            await sequelize.query("DELETE FROM Garantia WHERE GarantiaID = :GarantiaID",
            {
                replacements: { GarantiaID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Garantía eliminada correctamente"});
        } catch (error) {
            console.log("Error al eliminar la garantía");
            res.status(500).json("Error interno del servidor");
        }
    }
};

export default garantiaController;