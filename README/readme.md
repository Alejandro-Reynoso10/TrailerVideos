# Documentación de API de Mi Proyecto

Este repositorio contiene el código fuente de una API para TRAILERFLIX, una plataforma de streaming de películas y series. La API está construida utilizando Node.js y Express.js, y utiliza Sequelize como ORM para interactuar con una base de datos. Esta documentación proporciona información sobre los endpoints disponibles en la API de Mi Proyecto, cómo utilizarlos y ejemplos de código.

## Requisitos previos

Antes de ejecutar la API, asegúrese de tener instalados los siguientes componentes:

- "dotenv"
- "express"
- "mysql2"
- "sequelize"

## Configuración

1. Clona este repositorio en tu máquina local.

2. En la raíz del proyecto, crea un archivo `.env` y configura las siguientes variables de entorno:

   - DB_SCHEMA
   - DB_USER
   - DB_PASSWORD
   - DB_HOST
   - PORT

## Lista de Endpoints

A continuación se muestra una tabla que lista todos los endpoints disponibles en la API:

| Endpoint                  | Descripción                                   |
|---------------------------|-----------------------------------------------|
| GET /                     | Página de inicio de la API                    |
| GET /categorias           | Obtiene información de todas las categorías   |
| GET /catalogo             | Obtiene el catálogo completo                 |
| GET /catalogo/:id         | Obtiene información de una película/serie por ID |
| GET /catalogo/nombre/:nombre | Filtra películas/series por nombre         |
| GET /catalogo/genero/:genero | Filtra películas/series por género       |

## Uso de Endpoints

### 1. Página de inicio (GET /)

Este endpoint devuelve un mensaje de bienvenida.

Ejemplo de solicitud:


curl -X GET http://localhost:3001/

## para obtener por categoria 
curl -X GET http://localhost:3001/categorias
 
> repuesta ```
 [
  {
    "id": 1,
    "nombre": "Acción"
  },
  {
    "id": 2,
    "nombre": "Comedia"
  },
  {
    "id": 3,
    "nombre": "Drama"
  }
  // ...
] ```
## Para obtener por /catalogo
curl -X GET http://localhost:3001/catalogo 
 Para obtener el catálogo completo con rutas absolutas a las imágenes , retorna la informacion en un json. 
 > ejemplo de repuesta `{
		"id": 1,
		"poster": "http://localhost:3001/posters/1.jpg",
		"titulo": "The Crown",
		"categoria": 1,
		"resumen": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
		"temporadas": 4,
		"trailer": ""
	},  `
## Para obtener por /catalogo/:id
curl -X GET http://localhost:3001/catalogo/:id
 Para filtrar por código de la película/serie , retorna una repuesta de tipo json .

 >ejemplo de repuesta 
	`{ "id": 1,
	"poster": "/posters/1.jpg",
	"titulo": "The Crown",
	"categoria": 1,
	"resumen": "Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.",
	"temporadas": 4,
	"trailer": ""
}` 
## Para obtener por /catalogo/nombre/:nombre
curl -X GET http://localhost:3001/catalogo/nombre/:nombre
Para filtrar por nombre o parte del nombre ,correponde al titulo de la pelicula, devuelve una repuesta en formato json.
> ejemplo de repuesta 
`[
	{
		"id": 3,
		"poster": "/posters/3.jpg",
		"titulo": "The Mandalorian",
		"categoria": 1,
		"resumen": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
		"temporadas": 2,
		"trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
	}
] ` 

## Para obtener por /catalogo//genero/:genero
curl -X GET http://localhost:3001/catalogo/genero/:genero
Para fitrar por genero., retorna una repuesta de tipo json .
>ejemplo de repuesta
`{
	"id": 33,
	"poster": "/posters/33.jpg",
	"titulo": "Soy leyenda",
	"categoria": 2,
	"resumen": "Años después de que una plaga mate a la mayoría de la humanidad y transforme al resto en monstruos, el único superviviente en la ciudad de Nueva York lucha valientemente para encontrar una cura.",
	"temporadas": 0,
	"trailer": "https://www.youtube.com/embed/dtKMEAXyPkg",
	"genero": "Ciencia ficción" 
}` 

##  Configuración y middleware

```javascript // Importa el módulo Express para crear una aplicación web.
const express = require('express');
// Crea una instancia de la aplicación Express.
const app = express();
// ... (otras importaciones y configuraciones) 
``` 

##  Configuración y middleware
```javascript
// Ruta de inicio
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la TRAILERFLIX, puedes buscar por categorías, por catálogo, si sabes el ID puedes buscar catálogo por ID o por nombre, y género de tu película favorita.");
});

// Endpoint para obtener información de todas las categorías existentes
app.get("/categorias", async (req, res, next) => {
  // ... (manejo de categorías)
});

// Endpoint para obtener el catálogo completo con rutas absolutas a las imágenes
app.get("/catalogo", async (req, res, next) => {
  // ... (manejo del catálogo)
});

// Endpoint para filtrar por código de la película/serie
app.get("/catalogo/:id", async (req, res, next) => {
  // ... (manejo por ID)
});

// Endpoint para filtrar por nombre o parte del nombre de la película
app.get("/catalogo/nombre/:nombre", async (req, res, next) => {
  // ... (manejo por nombre)
});

// Endpoint para filtrar por género
app.get("/catalogo/genero/:genero", async (req, res, next) => {
  // ... (manejo por género)
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});  
```
## 4. Middleware para gestionar errores

 ```javascript // Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Registra el error en la consola para fines de depuración
  res.status(err.status || 500).json({ error: err.message || 'Tenemos un problema. Estamos trabajando en ello.' });
});
``` 


  ## 5. EJEMPLO DE TABLA

| Columna | Tipo de dato | Descripción |
|---|---|---|
| id | int | Identificador de la categoría |
| categoria | varchar(255) | Nombre de la categoría |

**Restricciones:**

* `fk_categoria`: Clave foránea que referencia la columna `categoria` de la tabla `titulos`.

**Engine:**

* `innodb`: Motor de almacenamiento de MySQL.


### Este es un ejemplo de como se relacionan las tablas sql.
  ![ejemplo de reciones de tablas n-n o n-m](https://i.stack.imgur.com/euNPD.png)