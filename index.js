
const express = require('express')
const connectDB = require('./db')
const Todo = require('./todo')
const app = express()
const port = 3000

app.use(express.json())

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'server is up' })
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({status:true,todos});
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching todos', error: err.message });
    }
})

app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }
        const newTodo = new Todo({
            title,
            description,
        });
        await newTodo.save();
        return res.status(201).json(newTodo);
    } catch (err) {
        return res.status(500).json({ message: 'Error creating todo', error: err.message });
    }
})

app.listen(port,async () => {
    await connectDB();
  console.log(`Example app listening on port ${port}`)
})
    