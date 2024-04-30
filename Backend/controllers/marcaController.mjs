import sequelize from "../config/config.mjs";

const marcaController = {
    getMarcas: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Marca",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay marcas" });
            }      
        } catch (error) {
            console.error("Error al obtener marcas:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearMarca: async (req, res) => {
        try {
            const { NombreMarca } = req.body;
            await sequelize.query("INSERT INTO Marca (NombreMarca) VALUES (:NombreMarca)",
            {
                replacements: { NombreMarca },
                type: sequelize.QueryTypes.INSERT
            });
            res.status(201).json({ message: "Marca creada correctamente"});
        } catch (error) {
            console.log("Error al subir la marca");
            res.status(500).json("Error interno del servidor");
        }
    },
    actualizarMarca: async (req, res) => {
        try {
            const { MarcaID } = req.params;
            const { NombreMarca } = req.body;

            await sequelize.query("UPDATE Marca SET NombreMarca = :NombreMarca WHERE MarcaID = :MarcaID",
            {
                replacements: { NombreMarca, MarcaID },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(200).json({ message: "Marca actualizada correctamente"});
        } catch (error) {
            console.log("Error al actualizar la marca");
            res.status(500).json("Error interno del servidor");
        }
    },
    eliminarMarca: async (req, res) => {
        try {
            const { MarcaID } = req.params;
            await sequelize.query("DELETE FROM Marca WHERE MarcaID = :MarcaID",
            {
                replacements: { MarcaID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Marca eliminada correctamente"});
        } catch (error) {
            console.log("Error al eliminar la marca");
            res.status(500).json("Error interno del servidor");
        }
    }
}

export default marcaController;