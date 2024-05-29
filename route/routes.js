import { Router } from 'express';
import * as Db from '../controller/home.js';
import multer from 'multer'
import path from 'path'
const router = Router();
const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, 'public/images')
  },
  filename: (req, file ,cb)=>{
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})  
const upload = multer({
  storage:storage
})
  
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
    const SupplierID = data[0].SupplierID
    const Categories = await Db.getCategorizedByID(CategoryID)
    const Supplier = await Db.getSupplierByID(SupplierID)
    res.status(200).json({ data,Categories,Supplier, message: 'get by id'});
  } catch (err) {
    res.status(500).send({ error: err, message: 'Server Error' }); 
  }
});
router.route('/addProduct/upload').post(upload.single('image'), async (req,res)=>{
    console.log(req.body)
    let product = {
      ProductName: req.body.ProductName,
      SupplierID: parseInt(req.body.SupplierID),
      CategoryID: parseInt(req.body.CategoryID),
      Unit: req.body.Unit,
      Price: parseFloat(req.body.Price),
      Pictures: req.file.filename // or req.file.path if you want to save the full path
    };
    console.log("test value",req.file.filename);
  try{
    const result = await Db.postProducts(product);
    if(result === null){return res.status(400).send({error:err,message:"Bad request"})
    }else{
      return res.status(200).json({result,message:"Post Data success"})
    }
  }catch(err){
    console.log(err)
  }
});
router.route('/addProduct/choice').get(async(req,res)=>{
  try{
    const suppliers = await Db.getSuppliers();
    const units = await Db.getUnits();
    const Categories = await Db.getCategorize();
    res.status(200).json({suppliers,units,Categories,message:"get Choices"})
  }catch(err){
    console.log(err)
  }
})
export default router;
