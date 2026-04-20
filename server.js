const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Dados de exemplo (simulando uma base de dados)
let vaults = [
  { id: 1, name: "Milestone A - MVP", released: 5000, total: 20000 },
  { id: 2, name: "Milestone B - Marketing", released: 0, total: 15000 }
];

// Listar vaults
app.get('/vaults', (req, res) => {
  res.json(vaults); // O teu frontend espera o array direto aqui
});

// Atualizar vault (o que os teus botões chamam)
app.post('/update', (req, res) => {
  const { id, action } = req.body;
  
  vaults = vaults.map(v => {
    if (v.id === id) {
      // Exemplo de lógica: cada clique liberta 1000€
      return { ...v, released: v.released + 1000 };
    }
    return v;
  });

  // ... resto das tuas rotas (get /vaults, post /update)

  res.json(vaults); 
});

// ESTA É A PARTE FINAL CORRETA:
const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0', () => {
  console.log("---------------------------------- ");
  console.log(`Helios Backend ativo na porta: ${port}`);
  console.log("---------------------------------- ");
});
