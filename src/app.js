const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require("./routes/index");
const http = require("http");
const initSocket = require("./sockets/socket");
const mongoose = require("mongoose") 

mongoose.connect("mongodb+srv://leoperaltalp24:CpaD4lmKeF6WddJr@cluster0.4usbq.mongodb.net/productos?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch((err) => console.error("Error de conexión:", err));

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine({
      extname: '.handlebars',
      defaultLayout: 'main',
      partialsDir: path.join(__dirname, 'views', 'partials'),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"))
app.get("/", (req, res) => {
    res.render("realTimeProducts");
});

app.use("/", routes);

module.exports = { app, server };