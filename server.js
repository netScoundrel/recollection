const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/login', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: Email: ${req.body.email} Password: ${req.body.password}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));