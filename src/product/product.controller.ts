import express, { Request, Response, NextFunction } from 'express';
import { Product } from './product.entity.js';
import { orm } from '../shared/db/orm.js';
//import path from 'path';

const em = orm.em;


async function findAll(req: Request, res: Response){
  try{
    const products = await em.find(Product, {});
    res.status(200).json({message:'found all products',data: products});
  } catch (error: any) {
    res.status(404).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const product = await em.findOneOrFail(Product, {id});//
  res
    .status(200)
    .json({message: 'found one product', data: product});
  }
  catch (error: any) {
    res.status(404).json({message: error.message});
  }
};

async function add(req: Request, res: Response) {
  try {
    const { name, description, price, stock, category, supplier } = req.body;
    let imagePath = '';

    if (req.file) {
      imagePath = 'uploads/' + req.file.filename;
    }

    const existingProduct = await em.findOne(Product, { name });

    if (existingProduct) {
      return res.status(303).json({ message: 'Error', error: 'El producto ya existe' });
    }

    const product = em.create(Product, {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: imagePath,
      category,
      supplier
    });

    await em.persistAndFlush(product);

    res.status(201).json({ message: 'Producto creado con éxito', data: product });
  } catch (error: any) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
}


// async function add(req: Request, res: Response) {
//   try {
//     upload.single('image')(req, res, async (err: any) => {
//       if (err) {
//         return res.status(400).json({ error: 'Error al subir la imagen' });
//       }

//       // if (!req.file) {
//       //   return res.status(400).json({ error: 'No se ha adjuntado ninguna imagen' });
//       // }

//       const { name, description, price, stock, image, category, supplier } = req.body;
//      // const imageFileName = req.file.filename;
//       //const image = 'uploadsProductsPhotographs/' + imageFileName;
      
//       const product = em.create(Product, { name, description, price, stock, image, category, supplier });
//       await em.flush();

//       res.status(201).json({ message: 'product created', data: product });
//     });
//   } catch (error: any) {
//     console.error(error); // Agregamos una impresión de error para depurar
//     res.status(404).json({ message: error.message });
//   }
// };

  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const existingProduct = await em.findOne(Product, { id });
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const newName = req.body.name;
      if (newName !== existingProduct.name) {
        const duplicateProduct = await em.findOne(Product, { name: newName });
        if (duplicateProduct) {
          return res.status(400).json({ message: 'Error', error: 'The new name is already used' });
        }
      }
      em.assign(existingProduct, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'product updated', data: existingProduct});
    }
    catch (error: any) {
      res.status(404).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const product = await em.findOne(Product, { id });
    if (!product) {
      return res.status(404).json({ message: 'Province not found' });
    }
    await em.removeAndFlush(product);
    res
      .status(200)
      .json({message: 'product deleted', data: product});
  }
  catch (error: any) {
    res.status(404).json({message: error.message});
  }
}

async function listByCategory(req: Request, res: Response){
  try{
    const category = req.params.category;
    const products = await em.find(Product, {category});
    res.status(200).json({message:'found all products',data: products});
  }
  catch (error: any) {
    res.status(404).json({message: error.message});
  }
}

// async function orderProductStock(req: Request, res: Response){
//   const cart = req.body.cart;
//   const {products} = cart;
//   try{
//     for (const product of products) {
//       const productToUpdate = await em.findOneOrFail(Product, {id: product.id});
//       productToUpdate.stock -= product.quantity;
//       await em.flush();
//     }
//   } catch (error: any) {
//     res.status(404).json({message: error.message});
//   }
// };

async function findProductByName(req: Request, res: Response) {
  try {
    const name = req.params.name;
    const product = await em.findOne(Product, { name });

    if (product) {
      res.status(200).json({ message: 'found one product', data: product });
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

export const controller = {  
  findAll, 
  findOne,
  add,
  update,
  remove,
  listByCategory,
  //orderProductStock,
  findProductByName
};
