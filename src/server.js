const cors = require("cors");
const mysql = require("mysql2");
const express = require("express");
const multer = require("multer");

const app = express();
const port = 3001;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: "localhost",
  password: "45350299",
  database: "inventario",
  user: "root"
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos ', err);
  } else {
    console.log('Conexion exitosa a la base de datos');
  }
});

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:8080', // Reemplaza con el dominio de tu aplicación Vue.js
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post('/cargar-imagen', upload.single('imagen'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No se ha seleccionado ningún archivo');
    }

    const buffer = req.file.buffer;

    const query = "INSERT INTO imagenes (imagen) VALUES (?)";
    db.query(query, [buffer], (err, result) => {
      if (err) {
        console.error('Error al cargar la imagen', err);
        res.status(500).send(err);
      } else {
        res.json({ message: 'Imagen cargada exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error al cargar la imagen', error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server iniciado con exito en el puerto ${port}`);
});
