import express from 'express';

const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
