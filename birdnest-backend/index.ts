import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/', (_req, res) => {
  res.send('ok');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
