// Importa el módulo Express para crear una aplicación web.
const express = require('express');
// Crea una instancia de la aplicación Express.
const app = express();
// Importa el módulo 'sequelize' para interactuar con la base de datos.
const sequelize = require('./src/conexion/connection');
// Importa modelos de base de datos definidos en otros archivos.
const Actores = require('./src/modelos/actores');
const categoria = require('./src/modelos/categoria');
const genero = require('./src/modelos/genero');
const generotitulo = require('./src/modelos/generotitulo');
const reparto = require('./src/modelos/reparto');
const titulos = require('./src/modelos/titulos');
// Importa el operador 'Op' de Sequelize para realizar operaciones avanzadas en la base de datos.
const { Op } = require('sequelize');
// se define el puerto guardado en el archivo .env o en su defecto el 3001
const port = process.env.PORT || 3001;
//se utiliza para configurar Express para que pueda analizar las solicitudes entrantes con formato JSON
app.use(express.json());
//Este middleware se utiliza combinado para realizar tareas de inicialización de la base de datos antes de que la aplicación comience a gestionar solicitudes de clientes.
app.use(async (req, res, next) => {
  try {
    // Intenta autenticar la conexión a la base de datos utilizando Sequelize.
    await sequelize.authenticate();
    // Sincroniza los modelos de datos con la base de datos.
    await Actores.sync();
    await categoria.sync();
    await genero.sync();
    await generotitulo.sync();
    await reparto.sync();
    await titulos.sync();
    //  Llama a la siguiente función en la cadena de middleware.
    // Esto permite que la solicitud continúe su flujo y sea manejada por otras rutas o middleware.
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Registra el error en la consola para fines de depuración
  res.status(err.status || 500).json({ error: err.message || 'Tenemos un problema. Estamos trabajando en ello.' });
});

// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la TRAILERFLIX, puedes buscar por categorías, por catálogo, si sabes el ID puedes buscar catálogo por ID o por nombre, y género de tu película favorita.");
});

// Endpoint para obtener información de todas las categorías existentes
app.get("/categorias", async (req, res, next) => {
  try {
    const categorias = await categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    next(error);
  }
});

// Endpoint para obtener el catálogo completo con rutas absolutas a las imágenes
app.get("/catalogo", async (req, res, next) => {
  try {
    const catalogo = await titulos.findAll();
    const catalogoConRutaAbsoluta = catalogo.map((titulo) => {
      // Construir la URL absoluta de la imagen basada en la URL actual del servidor
      const rutaImagenAbsoluta = `${req.protocol}://${req.get('host')}${titulo.poster}`;
      // Crear un nuevo objeto con la ruta absoluta a la imagen
      return {
        ...titulo.toJSON(),
        poster: rutaImagenAbsoluta
      };
    });
    
    res.status(200).json(catalogoConRutaAbsoluta);
  } catch (error) {
    next(error);
  }
});

// Endpoint para filtrar por código de la película/serie
app.get("/catalogo/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const titulo = await titulos.findOne({ where: { id: id } });
    if (titulo) {
      res.status(200).json(titulo);
    } else {
      const error = new Error('No se encontró el título con el código proporcionado');
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});


// Endpoint para filtrar por nombre o parte del nombre ,correponde al titulo de la pelicula
app.get("/catalogo/nombre/:nombre", async (req, res, next) => {
  const nombre = req.params.nombre;
  try {
    const titulosFiltrados = await titulos.findAll({
      where: {
        titulo: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
    if (titulosFiltrados.length === 0) {
      res.status(404).json({ error: 'No encontrado', description: 'No se encontraron títulos con el nombre proporcionado' });
    } else {
      res.status(200).json(titulosFiltrados);
    }
  } catch (error) {
    next(error);
  }
});
//Endpoint para fitrar por genero.
app.get("/catalogo/genero/:genero", async (req, res, next) => {
  const genero = req.params.genero;
  try {
    const titulosFiltrados = await Titulos.findAll({
      include: [
        {
          model: GeneroTitulo,
          where: {
            idGenero: genero
          }
        }
      ]
    });
    res.status(200).json(titulosFiltrados);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
