import sequelize from "../config/config.mjs";

const motorController = {
    getMotores: async (req, res) => {
        try {
            const result = await sequelize.query("SELECT * FROM Motor",
            {
                type: sequelize.QueryTypes.SELECT
            });
        
            if(result.length > 0){
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "No hay motores" });
            }      
        } catch (error) {
            console.error("Error al obtener motores:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crearMotor: async (req, res) => {
        try {
            const { VehiculoID, Tipo, Cilindros, Cilindrada, Servotronic, TipoMotor, Combustible, DetallesCilindros, FuncionECO, FuncionAutoStartStop, FrenoEstacionamiento, SistemaTraccion, CajaCambios, HP, Torque, Aceleracion0_100 } = req.body;
            await sequelize.query("INSERT INTO Motor (VehiculoID, Tipo, Cilindros, Cilindrada, Servotronic, TipoMotor, Combustible, DetallesCilindros, FuncionECO, FuncionAutoStartStop, FrenoEstacionamiento, SistemaTraccion, CajaCambios, HP, Torque, Aceleracion0_100 ) VALUES (:VehiculoID, :Tipo, :Cilindros, :Cilindrada, :Servotronic, :TipoMotor, :Combustible, :DetallesCilindros, :FuncionECO, :FuncionAutoStartStop, :FrenoEstacionamiento, :SistemaTraccion, :CajaCambios, :HP, :Torque, :Aceleracion0_100 )",
            {
                replacements: { VehiculoID, Tipo, Cilindros, Cilindrada, Servotronic, TipoMotor, Combustible, DetallesCilindros, FuncionECO, FuncionAutoStartStop, FrenoEstacionamiento, SistemaTraccion, CajaCambios, HP, Torque, Aceleracion0_100  },
                type: sequelize.QueryTypes.INSERT
            });
            res.status(201).json({ message: "Motor creado correctamente"});
        } catch (error) {
            console.log(error);
            console.log("Error al subir el motor");
            res.status(500).json("Error interno del servidor");
        }
    },
    actualizarMotor: async (req, res) => {
        try {
            const { MotorID } = req.params;
            const { VehiculoID, Tipo, Cilindros, Cilindrada, Servotronic, TipoMotor, Combustible, DetallesCilindros, FuncionECO, FuncionAutoStartStop, FrenoEstacionamiento, SistemaTraccion, CajaCambios, HP, Torque, Aceleracion0_100 } = req.body;

            await sequelize.query("UPDATE Motor SET VehiculoID = :VehiculoID, Tipo = :Tipo, Cilindros = :Cilindros, Cilindrada = :Cilindrada, Servotronic = :Servotronic, TipoMotor = :TipoMotor, Combustible = :Combustible, DetallesCilindros = :DetallesCilindros, FuncionECO = :FuncionECO, FuncionAutoStartStop = :FuncionAutoStartStop, FrenoEstacionamiento = :FrenoEstacionamiento, SistemaTraccion = :SistemaTraccion, CajaCambios = :CajaCambios, HP = :HP, Torque = :Torque, Aceleracion0_100 = :Aceleracion0_100 WHERE MotorID = :MotorID",
            {
                replacements: { VehiculoID, Tipo, Cilindros, Cilindrada, Servotronic, TipoMotor, Combustible, DetallesCilindros, FuncionECO, FuncionAutoStartStop, FrenoEstacionamiento, SistemaTraccion, CajaCambios, HP, Torque, Aceleracion0_100, MotorID },
                type: sequelize.QueryTypes.UPDATE
            });
            res.status(200).json({ message: "Motor actualizado correctamente"});
        } catch (error) {
            console.log("Error al actualizar el motor");
            res.status(500).json("Error interno del servidor");
        }
    },
    eliminarMotor: async (req, res) => {
        try {
            const { MotorID } = req.params;
            await sequelize.query("DELETE FROM Motor WHERE MotorID = :MotorID",
            {
                replacements: { MotorID },
                type: sequelize.QueryTypes.DELETE
            });
            res.status(200).json({ message: "Motor eliminado correctamente"});
        } catch (error) {
            console.log("Error al eliminar el motor");
            res.status(500).json("Error interno del servidor");
        }
    }
};

export default motorController;