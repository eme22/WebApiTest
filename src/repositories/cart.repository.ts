import {getRepository} from "typeorm";
import {Cart, CartItems} from '../models'


export interface ICartPayload {
    userId: number;
    finished: boolean;
    cartItems: Array<CartItems>;
  }
  
  export const getCarts  = async () :Promise<Array<Cart>> => {
    const cartRepository = getRepository(Cart);
    return cartRepository.find()
  }
  
  export const createCart  = async (payload: ICartPayload) :Promise<Cart> => {
    const cartRepository = getRepository(Cart);
    const cartItemsRepository = getRepository(CartItems);

    console.log(payload)

    var cart = new Cart()

    cart = await cartRepository.save({
      ...cart,
      ...payload
    });

    for (let index = 0; index < payload.cartItems.length; index++) {
       
      payload.cartItems[index] = await cartItemsRepository.save({
        ...payload.cartItems[index],
        cartId : cart.id,
      })
    }


  
    return cart;
  
  }
  
  export const getCart  = async (id: number) :Promise<Cart | null> => {
    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({id})
    if (!cart) return null
    return cart
  }

  export const getCartsByUserId  = async (id: number) :Promise<Array<Cart> | null> => {
    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.find({userId: id})
    if (!cart) return null
    return cart
  }

  export const getActiveCart  = async (id: number) :Promise<Cart | null> => {
    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({userId: id, finished: false})
    if (!cart) return null
    return cart
  }

  export const deleteCart  = async (cart: number | Cart) :Promise<Boolean> => {
    const cartRepository = getRepository(Cart);
    const cart2 = await cartRepository.delete(cart)
    if (!cart2) return false;
    return cart2.affected != 0;
}