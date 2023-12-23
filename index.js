const express = require('express');
const machineRouter = require('./routes/machine.routes');
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH']
}));
app.use('/api', machineRouter);


app.listen(PORT);