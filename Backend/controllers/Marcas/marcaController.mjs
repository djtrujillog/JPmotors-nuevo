import express from 'express';
import sequelize from "../../config/config.mjs";

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

    getMarcaById : async (req, res) =>
    {
        const id = req.params.id;
        try {
            var query = "SELECT m.* ";
            query = query + "FROM jpmotors_bd.Marca m ";
            query = query + "WHERE m.MarcaID =" + id;

            const result = await sequelize.query(query, 
                {type: sequelize.QueryTypes.SELECT}
            );

            if (result.length <= 0)
                throw new Error("No se encontró ningún registro con el id " + id);

            res.status(200).json(result);
        } catch (error) {
            console.log('Error al ejecutar getMarcaById');
            res.status(500).send("Error interno del servidor");
        }
    },
    getMarcaByNombre : async (req, res) =>
    {
        const nombre = req.params.nombre;
        try {
            var query = "SELECT m.* ";
            query = query + "FROM jpmotors_bd.Marca m ";
            query = query + "WHERE m.NombreMarca like '%" + nombre + "%'";

            const result = await sequelize.query(query, 
                {type: sequelize.QueryTypes.SELECT}
            );

            if (result.length <= 0)
                throw new Error("No se encontró ningún registro con el id " + id);

            res.status(200).json(result);
        } catch (error) {
            console.log('Error al ejecturar getMarcaByNombre');
            res.status(500).send("Error interno del servidor " + error.message);
        }
    }
}


export default marcaController;