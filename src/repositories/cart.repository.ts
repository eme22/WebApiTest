import {getRepository} from "typeorm";
import {Cart, CartItems} from '../models'


export interface ICartPayload {
    userId: number;
    finished: boolean;
    cartItems: Array<CartItems>;
  }
  
  export const getCarts  = async () :Promise<Array<Cart>> => {
    const cartRepository = getRepository(Cart);
    const cartItemsRepository = getRepository(CartItems);

    var carts = await cartRepository.find();

    for (let index = 0; index < carts.length; index++) {
      const cart = carts[index];
      cart.cartItems = await cartItemsRepository.find({cartId: cart.id});
      carts[index]  = cart;
    }

    return carts
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
    const cartItemsRepository = getRepository(CartItems);


    const cart = await cartRepository.findOne({id})

    if (!cart) return null

    cart.cartItems = await cartItemsRepository.find({cartId: id});

    return cart
  }

  export const getCartsByUserId  = async (id: number) :Promise<Array<Cart> | null> => {
    const cartRepository = getRepository(Cart);
    const cartItemsRepository = getRepository(CartItems);

    const carts = await cartRepository.find({userId: id})
    if (!carts) return null

    
    for (let index = 0; index < carts.length; index++) {
      const cart = carts[index];
      cart.cartItems = await cartItemsRepository.find({cartId: cart.id});
      carts[index]  = cart;
    }

    return carts
  }

  export const getActiveCart  = async (id: number) :Promise<Cart | null> => {
    const cartRepository = getRepository(Cart);
    const cartItemsRepository = getRepository(CartItems);
    
    const cart = await cartRepository.findOne({userId: id, finished: false})
    if (!cart) return null

    cart.cartItems = await cartItemsRepository.find({cartId: id});

    return cart
  }

  export const deleteCart  = async (cart: number | Cart) :Promise<Boolean> => {
    const cartRepository = getRepository(Cart);
    const cart2 = await cartRepository.delete(cart)
    if (!cart2) return false;
    return cart2.affected != 0;
}