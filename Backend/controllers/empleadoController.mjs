import sequelize from "../config/config.mjs";
import Empleado from "../models/empleado.mjs";
import bcrypt from 'bcrypt';

const empleadoController = {
    getEmpleados: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Empleados",
            {
                type: sequelize.QueryTypes.SELECT
            });

            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay empleados" });
            }
        } catch (error) {
            console.error("Error al obtener empleados:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearEmpleado: async (req, res) => {
        try {
            const { Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Usuario, ContrasenaHash, Estado } = req.body;
            const passwordHash = await Empleado.encryptPassword(ContrasenaHash);
            const result = await sequelize.query("INSERT INTO Empleados (Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Usuario, ContrasenaHash, Estado) VALUES (:Nombre, :Apellido, :Cargo, :Telefono, :CorreoElectronico, :Usuario, :passwordHash, :Estado)", 
            {
                replacements: { Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Usuario, passwordHash, Estado },
                type: sequelize.QueryTypes.INSERT
            });

            if (result.length === 0) {
                res.status(500).send("Error al crear el empleado");
                return;
            }
            res.status(201).json({ message: "Empleado creado" });
        } catch (error) {
            console.error("Error al crear el empleado:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    actualizarEmpleado: async (req, res) => {
        try {
            const { EmpleadoID } = req.params;
            const { Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Usuario, ContrasenaHash, Estado } = req.body;
            const passwordHash = await Empleado.encryptPassword(ContrasenaHash);
            const result = await sequelize.query("UPDATE Empleados SET Nombre = :Nombre, Apellido = :Apellido, Cargo = :Cargo, Telefono = :Telefono, CorreoElectronico = :CorreoElectronico, Usuario = :Usuario, ContrasenaHash = :passwordHash, Estado = :Estado WHERE EmpleadoID = :EmpleadoID",
            {
                replacements: { Nombre, Apellido, Cargo, Telefono, CorreoElectronico, Usuario, passwordHash, Estado, EmpleadoID },
                type: sequelize.QueryTypes.UPDATE
            });

            if (result.length === 0) {
                res.status(500).send("Error al actualizar el empleado");
                return;
            }
            res.status(200).json({ message: "Empleado actualizado" });
        } catch (error) {
            console.error("Error al actualizar el empleado:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    eliminarEmpleado: async (req, res) => {
        try {
            const { EmpleadoID } = req.params;
            const result = await sequelize.query("DELETE FROM Empleados WHERE EmpleadoID = :EmpleadoID",
            {
                replacements: { EmpleadoID },
                type: sequelize.QueryTypes.DELETE
            });                        
            res.status(200).json({ message: "Empleado eliminado" });
        } catch (error) {
            console.error("Error al eliminar el empleado:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
};

export default empleadoController;