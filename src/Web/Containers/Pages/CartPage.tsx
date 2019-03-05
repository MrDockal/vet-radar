import * as React from 'react';
import { withCart, ICartProps } from '../../Context/CartContext';
import { ICartProduct } from '../../../Model/ICartProduct';
import { StyledH1 } from '../../Components/Styled/StyledH1';
import { CartProductListItem } from '../../Components/Cart/CartProductListItem';
import { CartProductTable } from '../../Components/Cart/CartProductTable';

interface IOwnProps {
	/** */
}

type IProps = IOwnProps & ICartProps;

export class CartPageWithCart extends React.PureComponent<IProps> {
	public render() {
		const showTable = this.props.cart.products.length > 0;
		return (
			<div>
				<StyledH1>Cart</StyledH1>

				{
					showTable ?
						<CartProductTable total={this.props.cart.total}>
							{
								this.props.cart.products.map((product: ICartProduct) => (
									<CartProductListItem
										key={product.name}
										product={product}
										removeProduct={() => this.removeProduct(product)}
										setProductQuantity={(qty: number) => this.setProductQuantity(product, qty)}
									/>
								))
							}
						</CartProductTable>
						:
						<div style={{textAlign: 'center'}}>
							Cart is empty
						</div>
				}
			</div>
		);
	}

	private removeProduct = (product: ICartProduct) => {
		this.props.cart.remove(product);
	}

	private setProductQuantity = (product: ICartProduct, qty: number) => {
		this.props.cart.setQuantity(product, qty);
	}
}

export const CartPage = withCart(CartPageWithCart);
