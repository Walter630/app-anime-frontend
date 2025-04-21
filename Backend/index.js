// backend/index.js
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

let todos = [
    {
      "title": "Chaisaw Main",
      "descrition": "anime de motossera",
      "image": "https://upload.wikimedia.org/wikipedia/pt/4/49/Chainsaw_Man_-_Capa_-_Volume_1.jpg",
      "id": 1
    },
    {
      "title": "Naruto",
      "descrition": "Anime",
      "id": 2,
      "image": "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg"
    },
    {
      "title": "Estudar composition API",
      "descrition": "asd",
      "id": 3,
      "image": "/imgs/jujutsu.jpg"
    },
    {
      "id": 4,
      "title": "sla mash",
      "descrition": "Anime mais aleatorio",
      "completed": false
    },
    {
      "title": "marinha",
      "descrition": "anime de Marinha",
      "id": 5
    },
    {
      "title": "Pokemon",
      "descrition": "Lutas sal",
      "id": 6
    }
  ]

  app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const updated = req.body;
  
    todos = todos.map(todo => todo.id == id ? { ...todo, ...updated } : todo);
  
    res.json(updated);
  });

  app.use(cors()) // <- ISSO resolve seu problema
  app.use(express.json())

app.get('/todos', (req, res) => {
  res.json(todos)
})


// 3) Fallback para SPA — só depois das APIs e arquivos estáticos
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist'))
// })

app.listen(3000, () => {
  console.log('🚀 Backend rodando em http://localhost:3001')
})