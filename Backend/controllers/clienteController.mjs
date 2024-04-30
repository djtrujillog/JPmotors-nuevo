import sequelize from "../config/config.mjs";

const clienteController = {
    getClientes: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Clientes",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay clientes" });
            }      
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearCliente: async (req, res) => {
        try {
            const { Nombre, Apellido, Direccion, Telefono, CorreoElectronico } = req.body;
            await sequelize.query("INSERT INTO Clientes (Nombre, Apellido, Direccion, Telefono, CorreoElectronico) VALUES (:Nombre, :Apellido, :Direccion, :Telefono, :CorreoElectronico)",
            {
                replacements: { Nombre, Apellido, Direccion, Telefono, CorreoElectronico },
                type: sequelize.QueryTypes.INSERT
            });
            res.status(201).json({ message: "Cliente creado correctamente"});
        } catch (error) {
            console.log(error);
            console.log("Error al subir el cliente");
            res.status(500).json("Error interno del servidor");
        }
    },
    actualizarCliente: async (req, res) => {
        try {
            const { ClienteID } = req.params;
            const { Nombre, Apellido, Direccion, Telefono, CorreoElectronico } = req.body;

            await sequelize.query("UPDATE Clientes SET Nombre = :Nombre, Apellido = :Apellido, Direccion = :Direccion, Telefono = :Telefono, CorreoElectronico = :CorreoElectronico WHERE ClienteID = :ClienteID",
            {
                replacements: { Nombre, Apellido, Direccion, Telefono, CorreoElectronico, ClienteID },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(200).json({ message: "Cliente actualizado correctamente"});
        } catch (error) {
            console.log("Error al actualizar el cliente");
            res.status(500).json("Error interno del servidor");
        }
    }, 
    eliminarCliente: async (req, res) => {
        try {
            const { ClienteID } = req.params;
            await sequelize.query("DELETE FROM Clientes WHERE ClienteID = :ClienteID",
            {
                replacements: { ClienteID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Cliente eliminado correctamente"});
        } catch (error) {
            console.log("Error al eliminar el cliente");
            res.status(500).json("Error interno del servidor");
        }
    }
};

export default clienteController;