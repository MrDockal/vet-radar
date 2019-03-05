import * as React from 'react';
import { StyledHeader } from '../../Components/Styled/StyledHeader';
import { Link } from 'react-router-dom';
import { ICartProps, withCart } from '../../Context/CartContext';
import { numberToCurrency } from '../../Model/numberToCurrency';

interface IOwnProps {
	/**  */
}

type IProps = IOwnProps & ICartProps;

class HeaderWithCart extends React.PureComponent<IProps> {
	public render() {
		return (
			<StyledHeader>
				<Link to="/">Home</Link>
				<Link to="/cart">Go to cart ({numberToCurrency(this.props.cart.total)})</Link>
			</StyledHeader>
		);
	}
}

export const Header = withCart(HeaderWithCart);
