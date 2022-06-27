import { Get, Route, Tags,  Post, Body, Path, Delete, Inject, Patch } from "tsoa";
import {Promo} from '../models'
import {getPromos, createPromo, IPromoPayload, getPromo, deletePromo, updatePromo} from '../repositories/promo.repository'

@Route("promos")
@Tags("Promo")
export default class PromoController {
  @Get("/")
  public async getPromos(): Promise<Array<Promo>> {
    return getPromos()
  }

  @Post("/")
  public async createPromo(@Body() body: IPromoPayload, @Inject() buffer: Buffer, @Inject() fileExtension: string): Promise<Promo> {
    return createPromo(body, buffer, fileExtension)
  }

  @Patch("/")
  public async updatePromo(@Body() body: IPromoPayload,  @Inject() buffer: Buffer, @Inject() fileExtension: string): Promise<Boolean> {
    return updatePromo(body, buffer, fileExtension)
  }

  @Get("/:id")
  public async getPromo(@Path() id: string): Promise<Promo | null> {
    return getPromo(Number(id))
  }

  @Delete("/:id")
  public async deletePromo(@Path() id: string): Promise<Boolean | null> {
    return deletePromo(Number(id))
  }
}