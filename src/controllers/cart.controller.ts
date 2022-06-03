import { Get, Route, Tags,  Post, Body, Path, Delete } from "tsoa";
import {Cart} from '../models'
import {getCarts, createCart, ICartPayload, getCart, deleteCart, getActiveCart, getCartsByUserId} from '../repositories/cart.repository'

@Route("carts")
@Tags("Cart")
export default class CartController {
  @Get("/all/")
  public async getCarts(): Promise<Array<Cart>> {
    return getCarts()
  }

  @Post("/")
  public async createCart(@Body() body: ICartPayload): Promise<Cart> {
    return createCart(body)
  }
  
  @Get("/all/:id")
  public async getAllUserCarts(@Path() id: string): Promise<Array<Cart> | null> {
    return getCartsByUserId(Number(id))
  }

  @Get("/id/:id")
  public async getCart(@Path() id: string): Promise<Cart | null> {
    return getCart(Number(id))
  }

  @Delete("/id/:id")
  public async deleteCart(@Path() id: string): Promise<Boolean | null> {
    return deleteCart(Number(id))
  }

  @Get("/current/:id")
  public async getCurrentCart(@Path() id: string): Promise<Cart | null> {
    return getActiveCart(Number(id))
  }

  
}