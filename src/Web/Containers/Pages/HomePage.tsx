import * as React from 'react';
import { IProduct } from '../../../Model/IProduct';
import { ProductPreview } from '../../Components/Product/ProductPreview';
import { withCart, ICartProps } from '../../Context/CartContext';
import { StyledFlex } from '../../Components/Styled/StyledFlex';
import { StyledH1 } from '../../Components/Styled/StyledH1';

interface IOwnProps {
	products: IProduct[];
}

type IProps = IOwnProps & ICartProps;

class HomePageWithCart extends React.PureComponent<IProps> {
	public render() {
		return (
			<div>
				<StyledH1>HomePage</StyledH1>
				<StyledFlex>
				{
					this.props.products.map((product: IProduct) => (
						<ProductPreview key={product.name} product={product} addProduct={() => this.addProduct(product)}/>
					))
				}
				</StyledFlex>
			</div>
		);
	}

	private addProduct = (product: IProduct) => {
		this.props.cart.addQuantity(product, 1);
	}
}

export const HomePage = withCart(HomePageWithCart);
