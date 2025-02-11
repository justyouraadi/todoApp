
const express = require('express')
const connectDB = require('./db')
const Todo = require('./todo')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'server is up' })
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({ status: true, todos });
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

app.patch('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });

    } catch (error) {
        return res.status(500).json({ message: 'Error updating todo', error: error.message });
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });

    } catch (error) {
        return res.status(500).json({ message: 'Error deleting todo', error: error.message });
    }
})

app.listen(port, async () => {
    await connectDB();
    console.log(`Example app listening on port ${port}`)
})