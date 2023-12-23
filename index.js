const express = require('express');
const machineRouter = require('./routes/machine.routes');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use('/api', machineRouter);

app.listen(PORT);