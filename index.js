const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const data = [
  {
    id: 1,
    nombre: 'Marco',
    ocupacion: 'Estudiante',
    edad: 19,
  },
  {
    id: 2,
    nombre: 'Jesus',
    ocupacion: 'Estudiante',
    edad: 18,
  },
  {
    id: 3,
    nombre: 'Camila',
    ocupacion: 'Estudiante',
    edad:21,
  },
  {
    id: 4,
    nombre: 'Hector',
    ocupacion: 'Estudiante',
    edad: 23,
  },
  {
    id: 5,
    nombre: 'Emilio',
    ocupacion: 'Estudiante',
    edad: 20,
  },
  
];

app.get('/', (req, res) => {
  res.send('Hola, bienvenido a la primera API Rest de Marco :)');
});

app.get('/data/all', (req, res) => {
  res.status(200).json(data);
});

app.get('/data', (req, res) => {
  const query_nombre = req.query.nombre;
  const query_ocupacion = req.query.ocupacion;
  if (query_nombre && query_ocupacion) {
    const filtro = data.filter(
      (item) => item.nombre == query_nombre && item.ocupacion == query_ocupacion
    );
    if (filtro.length > 0) {
      res.status(200).json(filtro);
    } else {
      res.status(404).json({ message: 'No encontrado' });
    }
  } else {
    res.status(302).redirect('/data/all');
  }
});

app.get('/data/:id', (req, res) => {
  const id_user = req.params.id;
  const encontrado = data.find((item) => item.id == id_user);
  if (encontrado) {
    res.status(200).json(encontrado);
  } else {
    res.status(404).json({ message: 'No encontrado' });
  }
});

app.post('/data', (req, res) => {
  const user_body = req.body;
  data.push(user_body);
  res.status(201).json(data);
});

app.put('/data/:id', (req, res) => {
  const user_body = req.body;
  const param = req.params.id;
  const encontrado = data.findIndex((item) => item.id == param);
  if (encontrado != -1) {
    data[encontrado] = user_body;
    res.status(201).json(data);
  } else {
    res.status(404).json({ message: 'No encontrado' });
  }
});

// Nueva ruta PATCH
app.patch('/data/:id', (req, res) => {
  const user_body = req.body;
  const param = req.params.id;
  const encontrado = data.findIndex((item) => item.id == param);
  if (encontrado != -1) {
    data[encontrado] = { ...data[encontrado], ...user_body };
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: 'No encontrado' });
  }
});

// Nueva ruta DELETE
app.delete('/data/:id', (req, res) => {
  const param = req.params.id;
  const encontradoIndex = data.findIndex((item) => item.id == param);
  if (encontradoIndex != -1) {
    data.splice(encontradoIndex, 1);
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: 'No encontrado' });
  }
});

app.listen(port, () => {
  console.log('Servicio escuchando el puerto: ', port);
});
