import * as React from 'react';
import { IProduct } from '../../../Model/IProduct';
import { StyledProductPreview } from '../Styled/StyledProductPreview';
import { numberToCurrency } from '../../Model/numberToCurrency';

export interface IProps {
	product: IProduct;
	addProduct(): void;
}

export const ProductPreview = (props: IProps) => {
	return (
		<StyledProductPreview>
			<h2>{props.product.name}</h2>
			<div>{numberToCurrency(props.product.price)}</div>
			<a href="#" onClick={props.addProduct}>Add to cart</a>
		</StyledProductPreview>
	);
};
