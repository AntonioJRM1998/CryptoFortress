import { cryptoUserCoins } from "./crypto-user.model"

export interface cryptoMonedas{
    crypto_id:number
    crypto_name:string
    crypto:cryptoUserCoins[]
    asset:string
    icon:string
    stock:number
    value:number
}