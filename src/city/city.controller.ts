import express, { Request, Response, NextFunction } from 'express';
import { City } from './city.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

async function findAll(req: Request, res: Response){
  try{
    const cities = await em.find(City, {});
    res.status(200).json({message:'found all cities',data: cities});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findOne(req: Request, res: Response){
  try{
  const id = req.params.id;
  const city = await em.findOneOrFail(City, {id});
  res
    .status(200)
    .json({message: 'found one city', data: city});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function add(req: Request, res: Response){
  try{
    const city = em.create(City, req.body);
    await em.flush();
    res
      .status(201)
      .json({message:'city created',data: city});  
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
};
  
  async function update(req: Request, res: Response){
    try{
      const id = req.params.id;
      const city = em.getReference(City, id);
      em.assign(city, req.body);
      await em.flush();
      res
        .status(200)
        .json({message: 'city updated', data: city});
    }
    catch (error: any) {
      res.status(500).json({message: error.message});
    }
  };
  
 async function remove(req: Request, res: Response){
  try{
    const id = req.params.id;
    const city = em.getReference(City, id);
    await em.removeAndFlush(city);
    res
      .status(200)
      .json({message: 'city deleted', data: city});
  }
  catch (error: any) {
    res.status(500).json({message: error.message});
  }
};

async function findCityByPostCode(req: Request, res: Response) {
  try {
    const postCode = req.params.postCode;
    const city = await em.findOne(City, { postCode });

    if (city) {
      res.status(200).json({ message: 'found one city', data: city });
    } else {
      res.status(404).json({ message: 'city not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

async function findCitiesByProvince(req: Request, res: Response) {
  try {
    const provinceId = req.params.provinceId;
    const cities = await em.find(City, { province: { id: provinceId } });

    res.status(200).json({ message: 'found cities by province', data: cities });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
  
export const controller = {  
  findAll, 
  findOne,
  add,
  update,
  remove,
  findCityByPostCode,
  findCitiesByProvince
};
