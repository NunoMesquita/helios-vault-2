const mongoose = require('mongoose');

// Usa o MESMO link que usaste no seed.js
const mongoURI = "mongodb+srv://nunofcmesquita_db_user:niuhhvuih3uib@helios-database.gpzrrej.mongodb.net/?appName=HELIOS-DATABASE&retryWrites=true&w=majority";
mongoose.connect(mongoURI)
  .then(() => console.log("Ligado ao Atlas"))
  .catch(err => console.log("Erro:", err));

const Vault = mongoose.model('Vault', new mongoose.Schema({
  id: Number,
  name: String,
  released: Number,
  total: Number
}));

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Rota para o investidor ver os Vaults (Lê do MongoDB)
app.get('/vaults', async (req, res) => {
  try {
    const vaults = await Vault.find();
    res.json(vaults);
  } catch (err) {
    res.status(500).json({ error: "Erro ao procurar no espaço" });
  }
});

// 2. Rota para libertar fundos (Grava no MongoDB)
app.post('/update', async (req, res) => {
  const { id, action } = req.body;
  try {
    // A cada clique, aumenta 1000€ no campo 'released'
    await Vault.findOneAndUpdate({ id: id }, { $inc: { released: 1000 } });
    
    // Devolve a lista atualizada para o ecrã do investidor mudar na hora
    const atualizados = await Vault.find();
    res.json(atualizados);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o cofre" });
  }
});

// 3. Iniciar o servidor (Porta para o Render)
const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Helios Vault operativo na porta ${port}`);
});
