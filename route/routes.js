import { Router } from 'express';
import * as Db from '../controller/home.js';

const router = Router();

router.route('/product').get(async (req, res) => {
  try {
    const data = await Db.getProduct();
    res.status(200).json({ data, message: 'get data' });
  } catch (err) {
    res.status(500).send({ error: err, message: 'Server Error' });
  }
});

router.route('/product/:id').get(async (req, res) => {
  try {
    const data = await Db.getProductById(req.params.id);
    const CategoryID = data[0].CategoryID
    const Categories = await Db.getCategorizedByID(CategoryID)
    res.status(200).json({ data,Categories, message: 'get by id'});
  } catch (err) {
    res.status(500).send({ error: err, message: 'Server Error' });
  }
});

export default router;
