import {ConnectionOptions} from 'typeorm'
import {User, Cart, CartItems, Category, Item, Promo} from '../models'

const config : ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "eme22",
  database: process.env.POSTGRES_DB || "comida",
  entities: [User, Cart, CartItems, Category, Item, Promo],
  synchronize: true,
  logging: true
}

export default config