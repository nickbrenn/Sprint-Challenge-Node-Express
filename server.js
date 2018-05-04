const express = require("express");

const actionRoutes = require("./routes/actionRoutes");
const projectRoutes = require("./routes/projectRoutes");

const server = express();
const CORS = require("cors");

server.use(express.json());
server.use(CORS());

server.use("/actions", actionRoutes);
server.use("/projects", projectRoutes);

server.get("/", (req, res) => {
  res.send("The API is up");
});

server.listen(5000, () => console.log("\nThe server is a listenin'\n"));
