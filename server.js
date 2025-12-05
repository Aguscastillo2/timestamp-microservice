const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // Si no mandan fecha → devolver fecha actual
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  let date;

  // Si es número (unix)
  if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Fecha inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Fecha válida
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Servidor funcionando en puerto " + port);
});
