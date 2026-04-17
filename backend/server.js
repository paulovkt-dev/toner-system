const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 COLOCA SUA URL DO ATLAS AQUI
mongoose.connect("mongodb+srv://vicktorpaulo011_db_user:C6t2fq5LN42XUCDk@cluster0.omh5jq8.mongodb.net/toner?retryWrites=true&w=majority")
.then(() => console.log("MongoDB conectado!"))
.catch(err => console.log(err));

// MODELS
const Toner = mongoose.model("Toner", {
  nome: String,
  cheio: Number,
  vazio: Number
});

const Pesagem = mongoose.model("Pesagem", {
  modelo: String,
  peso: Number,
  porcentagem: Number,
  data: { type: Date, default: Date.now }
});

// ROTAS
app.post("/modelos", async (req, res) => {
  const toner = new Toner(req.body);
  await toner.save();
  res.json(toner);
});

app.get("/modelos", async (req, res) => {
  const modelos = await Toner.find();
  res.json(modelos);
});

app.post("/pesagem", async (req, res) => {
  const pesagem = new Pesagem(req.body);
  await pesagem.save();
  res.json(pesagem);
});

app.get("/historico", async (req, res) => {
  const historico = await Pesagem.find().sort({ data: -1 });
  res.json(historico);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});