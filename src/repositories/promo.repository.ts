import {Double, getRepository} from "typeorm";
import {Promo} from '../models'

import fs from 'fs';

export interface IPromoPayload {
  id: number;
  name: string;
  description: string;
  discount: number;
  data: File;
}

export const getPromos  = async () :Promise<Array<Promo>> => {
  const promoRepository = getRepository(Promo);
  return promoRepository.find()
}

export const updatePromo  = async (payload: IPromoPayload, buffer: Buffer, extension: string) :Promise<Boolean> => {
  const promoRepository = getRepository(Promo);

  var promo = await promoRepository.update({id: payload.id} , {
    name: payload.name,
    description: payload.description,
    discount: payload.discount
  });

  if (promo == null) return false;

  const image = "/img/promo/"+payload.id+extension;

  fs.writeFileSync("./public"+ image, buffer);

  await promoRepository.update(payload.id, {image})

  return promo.affected != 0;

}

export const createPromo  = async (payload: IPromoPayload, buffer: Buffer, extension: string) :Promise<Promo> => {
  const promoRepository = getRepository(Promo);
  var promo = new Promo()


  promo = await promoRepository.save({
    ...promo,
    ...payload
  })

  const image = "/img/promo/"+promo.id+extension;

  fs.writeFileSync( "./public"+image, buffer);

  promo.image = image;

  await promoRepository.update(promo.id, promo)

  return promo

}

export const getPromo  = async (id: number) :Promise<Promo | null> => {
  const promoRepository = getRepository(Promo);
  const promo = await promoRepository.findOne({id})
  if (!promo) return null
  return promo
}

export const deletePromo  = async (promo: number | Promo) :Promise<Boolean> => {
    const promoRepository = getRepository(Promo);
    const promo2 = await promoRepository.delete(promo)
    if (!promo2) return false;
    return promo2.affected != 0;
}



