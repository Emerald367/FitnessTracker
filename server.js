const express = require('express');
const app = express();
app.use(express.json());
const env = require('dotenv').config;
const supabase = require('./db.js')
const PORT = 6000;


































































app.listen(6000, () => console.log(`Server has started on port: ${PORT}`));

module.exports = app;