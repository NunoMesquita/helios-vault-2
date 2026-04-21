const mongoose = require('mongoose');

// COLA AQUI O TEU LINK DO MONGODB ATLAS (o mesmo do server.js)
const mongoURI = "mongodb+srv://nunofcmesquita_db_user:btmhgNv6OyrpGwDT@helios-database.xxxx.mongodb.net/helios?retryWrites=true&w=majority";

const vaultSchema = new mongoose.Schema({
  id: Number,
  name: String,
  released: Number,
  total: Number
});

const Vault = mongoose.model('Vault', vaultSchema);

async function seed() {
  await mongoose.connect(mongoURI);
  
  // Limpa o que lá estiver para não duplicar
  await Vault.deleteMany({});

  // Cria os teus marcos reais
  const initialVaults = [
    { id: 1, name: "Lunar-01: Base de Alunagem", released: 0, total: 500000 },
    { id: 2, name: "Orbital-X: Satélite de Comunicação", released: 0, total: 250000 },
    { id: 3, name: "Helios Gate: Estação Solar", released: 0, total: 1000000 }
  ];

  await Vault.insertMany(initialVaults);
  console.log("🚀 Projetos espaciais lançados na base de dados!");
  process.exit();
}

seed();
