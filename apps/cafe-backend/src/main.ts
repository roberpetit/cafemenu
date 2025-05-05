import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const menuFilePath = 'menu.json';
app.use(cors());
app.use(express.json());

app.get('/menu', (req, res) => {
  fs.readFile(menuFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading menu:', err);
      return res.status(500).json({ error: 'Failed to load menu' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/menu', express.json(), (req, res) => {
  fs.writeFile(menuFilePath, JSON.stringify(req.body, null, 2), err => {
    if (err) {
      console.error('Error writing menu:', err);
      return res.status(500).json({ error: 'Failed to save menu' });
    }
    res.json({ success: true });
  });
});
export { app };