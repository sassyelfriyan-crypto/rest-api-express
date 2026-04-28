require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

const port = process.env.PORT || 3000;

app.use(express.json());

// root
app.get('/', (req, res) => {
  res.send('API jalan 🚀');
});

// ✅ GET
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ✅ POST
app.post('/api/products', (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  db.query(
    'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
    [name, price, stock],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: 'Produk berhasil ditambahkan',
        id: result.insertId
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
