import { IProduct } from "./IProduct";

export interface ICartProduct extends IProduct {
	quantity: number;
}
