    import sequelize from "../../config/config.mjs";
    import CotizacionClass from '../../models/cotizacion.mjs'

    const cotizacionController = {
        getCotizacionesByEstado: async (req, res) => {
            const estado = req.params.estado;

            if (estado.length <= 0)
                throw new Error("No definió un estado para hacer la busqueda");

            try {
                var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
                query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
                query = query + "FROM jpmotors_bd.Cotizaciones c ";
                query = query + "INNER JOIN jpmotors_bd.Empleados e ";
                query = query + "   on e.EmpleadoID = c.EmpleadoID ";
                query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
                query = query + "   on cl.ClienteID = c.ClienteID ";
                query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
                query = query + "	on v.VehiculoID = c.VehiculoID ";
                query = query + "WHERE c.EstadoCotizacion = '" + estado + "'";

                const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

                if (result.length <= 0)
                    throw new Error('No se encontró niguna coincidencia para el Empleado con ID: ' + idEmpleado);

                res.status(200).json(result);
            }
            catch (error) {
                console.log('Error al ejecutar getCotizacion ' + error);
                res.status(500).send('Error interno del servidor ' + error);
            }
        },
        getCotizacionesByVehiculo: async (req, res) => {
            const idVehiculo = req.params.id;

            try {
                var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
                query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
                query = query + "FROM jpmotors_bd.Cotizaciones c ";
                query = query + "INNER JOIN jpmotors_bd.Empleados e ";
                query = query + "   on e.EmpleadoID = c.EmpleadoID ";
                query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
                query = query + "   on cl.ClienteID = c.ClienteID ";
                query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
                query = query + "	on v.VehiculoID = c.VehiculoID ";
                query = query + "WHERE c.VehiculoId = " + idVehiculo;

                const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

                if (result.length <= 0)
                    throw new Error('No se encontró niguna coincidencia para el Empleado con ID: ' + idEmpleado);

                res.status(200).json(result);
            }
            catch (error) {
                console.log('Error al ejecutar getCotizacion ' + error);
                res.status(500).send('Error interno del servidor ' + error);
            }
        },
        getCotizacionesByEmpleado: async (req, res) => {
            const idEmpleado = req.params.id;
            try {
                var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
                query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
                query = query + "FROM jpmotors_bd.Cotizaciones c ";
                query = query + "INNER JOIN jpmotors_bd.Empleados e ";
                query = query + "   on e.EmpleadoID = c.EmpleadoID ";
                query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
                query = query + "   on cl.ClienteID = c.ClienteID ";
                query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
                query = query + "	on v.VehiculoID = c.VehiculoID ";
                query = query + "WHERE c.EmpleadoID = " + idEmpleado;
                const result = await sequelize.query(query,
                    {
                        type: sequelize.QueryTypes.SELECT
                    }
                );

                if (result.length <= 0)
                    throw new Error('No se encontró niguna coincidencia para el Empleado con ID: ' + idEmpleado);

                res.status(200).json(result);
            }
            catch (error) {
                console.log('Error al ejecutar getCotizacion ' + error);
                res.status(500).send('Error interno del servidor ' + error);
            }
        },

        getCotizacionById: async (req, res) => {
            const id = req.params.id;
            try {
                var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
                query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
                query = query + "FROM jpmotors_bd.Cotizaciones c ";
                query = query + "INNER JOIN jpmotors_bd.Empleados e ";
                query = query + "   on e.EmpleadoID = c.EmpleadoID ";
                query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
                query = query + "   on cl.ClienteID = c.ClienteID ";
                query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
                query = query + "	on v.VehiculoID = c.VehiculoID ";
                query = query + "WHERE CotizacionID =" + id;
                const result = await sequelize.query(query,
                    {
                        type: sequelize.QueryTypes.SELECT
                    });

                if (result.length <= 0)
                    throw new Error('No se encontró ningún registro con el id ' + id)

                res.status(200).json(result);
            }
            catch (error) {
                console.log('Error al ejecutar getCotizacion ' + error);
                res.status(500).send('Error interno del servidor ' + error);
            }
        },

        getCotizaciones: async (req, res) => {
            try {
                var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
                query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
                query = query + "FROM jpmotors_bd.Cotizaciones c ";
                query = query + "INNER JOIN jpmotors_bd.Empleados e ";
                query = query + "   on e.EmpleadoID = c.EmpleadoID ";
                query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
                query = query + "   on cl.ClienteID = c.ClienteID ";
                query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
                query = query + "	on v.VehiculoID = c.VehiculoID ";

                const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
                res.status(200).json(result);
            } catch (error) {
                console.log('Error al listar cotizaciones:', error);
                res.status(500).send('Error interno del servidor ' + error);
            }
        },
        getCotizacionesByParameteres: async (req, res) => {
            // ejemplo del body que se debe recibir/enviar 
            /*
            {
                "FechaInicial" : "2024-01-01",
                "FechaFinal" : "2024-12-31",
                "ClienteId" : 19,
                "VehiculoId" : 64
            }

            Todos los campos del json podrian ser nulos en diferentes combinaciones
            */ 
            const { FechaInicial, FechaFinal, ClienteId, VehiculoId } = req.body;  

            try {
                var query = "SELECT c.*, concat(e.Nombre, ' ' , e.Apellido) as NombreEmpleado, concat(cl.Nombre, ' ', cl.Apellido) as NombreCliente, ";
                query = query + "concat(v.Modelo, ' ', v.Marca, ' ', v.Anio) as VehiculoDescripcion ";
                query = query + "FROM jpmotors_bd.Cotizaciones c ";
                query = query + "INNER JOIN jpmotors_bd.Empleados e ";
                query = query + "   on e.EmpleadoID = c.EmpleadoID ";
                query = query + "INNER JOIN jpmotors_bd.Clientes cl ";
                query = query + "   on cl.ClienteID = c.ClienteID ";
                query = query + "INNER JOIN jpmotors_bd.Vehiculos v ";
                query = query + "	on v.VehiculoID = c.VehiculoID ";
                query = query + "WHERE 1= 1 "

                if (FechaInicial != null) {
                    query = query + " AND c.FechaCotizacion >= '" + FechaInicial + "'";
                }

                if (FechaFinal != null){
                    query = query + "  AND c.FechaCotizacion <= '" + FechaFinal + "'";
                }

                if (ClienteId != null) {
                    query = query + " AND c.ClienteID = " + ClienteId;
                }

                if (VehiculoId != null) {
                    query = query + " AND c.VehiculoID = " + VehiculoId;
                }

                const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

                if (result.length <= 0) {
                    res.status(404).json("No se encontraron registros para los parámetros enviados");
                    return;
                }

                //metiendo a la clase como arreglo
                const cotizaciones = result.map(r => new CotizacionClass(r.NombreEmpleado, r.NombreCliente, r.VehiculoDescripcion, r.CotizacionID, r.EmpleadoID, r.ClienteID, r.VehiculoID, r.FechaCotizacion, r.EstadoCotizacion, r.FechaSeguimiento));

                // conviertiendo solo los id's para recuperar solo los que me interan
                const ids = result.map(c => c.CotizacionID).join(',');

                query = "SELECT s.*, t.Descripcion ";
                query = query + "FROM jpmotors_bd.Seguimientos s ";
                query = query + "INNER JOIN jpmotors_bd.Seguimientos_Tipo t ";
                query = query + "ON s.SeguimientoTipoID = t.SeguimientoID ";
                query = query + "WHERE s.CotizacionID IN (" + ids + ")"

                const resultSeguimientos = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

                //console.log(seguimientos);
                cotizaciones.forEach(c => {
                    let segs = resultSeguimientos.filter(s => s.CotizacionID == c.cotizacionId);
                    c.agregarSeguimientos(segs);

                });

                res.status(200).json(cotizaciones);
            } catch (error) {
                console.log('Error al insertar cotización', error);
                res.status(500).send('Error interno del servidor' + error);
            }

        },
        post: async (req, res) => {
            const { CotizacionID, EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento } = req.body;
            console.log(EmpleadoID);
            try {
                var query = 'INSERT INTO Cotizaciones (EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento) ';
                query = query + 'VALUES ';
                query = query + '(?, ?, ?, ?, ?, ?) ';
                console.log(query);
                const result = await sequelize.query(query,
                    {
                        replacements: [EmpleadoID, ClienteID, VehiculoID, FechaCotizacion, EstadoCotizacion, FechaSeguimiento],
                        type: sequelize.QueryTypes.INSERT
                    });
                res.status(200).json({ message: 'Cotización guardada con éxito', result });
            } catch (error) {
                console.log('Error al insertar cotización', error);
                res.status(500).send('Error interno del servidor' + error);
            }
        },

        put: async (req, res) => {
            try {
                const { CotizacionID, EmpleadoID, ClienteID, VehiculoID, EstadoCotizacion, FechaSeguimiento } = req.body;
        
                // Usar parámetros seguros para evitar SQL Injection
                let query = `
                    UPDATE Cotizaciones 
                    SET EmpleadoID = :EmpleadoID, 
                        ClienteID = :ClienteID, 
                        VehiculoID = :VehiculoID, 
                        EstadoCotizacion = :EstadoCotizacion, 
                        FechaSeguimiento = :FechaSeguimiento
                    WHERE CotizacionID = :CotizacionID;
                `;
        
                const result = await sequelize.query(query, {
                    replacements: {
                        EmpleadoID, 
                        ClienteID, 
                        VehiculoID, 
                        EstadoCotizacion, 
                        FechaSeguimiento,
                        CotizacionID
                    },
                    type: sequelize.QueryTypes.UPDATE
                });
        
                res.status(200).json({ message: 'Cotización actualizada correctamente', result });
            } catch (error) {
                console.log('Error al actualizar cotización:', error);
                res.status(500).send('Error interno del servidor');
            }
        },
        

        delete: async (req, res) => {
            try {
                const id = req.params.id;
                var query = "UPDATE Cotizaciones SET EstadoCotizacion = 'Anulada'";
                query = query + " WHERE CotizacionID =" + id;
                console.log(query);
                const result = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
                res.status(200).json({ message: 'Cotización actualizada correctamente', result });
            } catch (error) {
                console.log('Error al eliminar cotización:', error);
                res.status(500).send('Error interno del servidor');
            }
        }
    }

    export default cotizacionController;
