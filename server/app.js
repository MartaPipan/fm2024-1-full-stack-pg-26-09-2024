const express = require("express");
const cors = require("cors");
const router = require("./routes");
const { handleErrors } = require("./handleErrors");
const app = express();

app.use(cors());

// Налаштування доступу до статичних файлів
app.use(express.static("../public"));
app.use(express.json());


// Роутери
app.use("/", router);
// if we have admin panel
// app.use('/admin', adminRouter);

// Обробка помилок
app.use(handleErrors);

module.exports = app;
