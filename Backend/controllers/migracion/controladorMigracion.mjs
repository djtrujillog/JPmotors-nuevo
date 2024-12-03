// controllers/migracion/controladorMigracion.mjs
import fs from 'fs';
import path from 'path';
import sequelize from '../../config/config.mjs';  // Asegúrate de importar correctamente la configuración de sequelize
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual (equivalente a __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la ruta del directorio donde se guardarán las imágenes
const imagesDirectory = path.join(__dirname, '../../images');

// Crear la carpeta "images" si no existe
if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory);
}

export const migracionController = {
  extraerYGuardarImagenes: async (req, res) => {
    try {
      // Obtener vehículos con imágenes en formato BLOB
      const vehiculos = await sequelize.query(
        "SELECT VehiculoID, Imagen FROM Vehiculos WHERE Imagen IS NOT NULL",
        { type: sequelize.QueryTypes.SELECT }
      );

      // Iterar sobre cada vehículo y guardar su imagen
      for (const vehiculo of vehiculos) {
        const { VehiculoID, Imagen } = vehiculo;

        // Ruta y nombre de archivo de la imagen
        const filePath = path.join(imagesDirectory, `${VehiculoID}.jpg`);

        // Guardar el BLOB como un archivo de imagen
        fs.writeFileSync(filePath, Buffer.from(Imagen));

        // Crear la URL de la imagen
        const imageUrl = `https://cotizaciones-jpmotors.onrender.com/images/${VehiculoID}.jpg`;

        // Actualizar la base de datos con la URL de la imagen
        await sequelize.query("UPDATE Vehiculos SET ImagenUrl = :imageUrl WHERE VehiculoID = :id", {
          replacements: { imageUrl, id: VehiculoID },
          type: sequelize.QueryTypes.UPDATE,
        });

        console.log(`Imagen de VehiculoID ${VehiculoID} guardada en /images y URL actualizada.`);
      }

      // Enviar respuesta exitosa al cliente
      res.status(200).send("Migración de imágenes completada exitosamente.");
    } catch (error) {
      // Manejo de errores
      console.error("Error durante la migración de imágenes:", error);
      res.status(500).send("Error durante la migración de imágenes.");
    }
  },
};
