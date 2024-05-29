import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import myRoutes from '../route/routes.js';

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', myRoutes);

app.listen(8080, () => {
  console.log('DB server running');
});
