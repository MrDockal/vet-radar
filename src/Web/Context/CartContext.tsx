import * as React from 'react';
import { IProduct } from '../../Model/IProduct';
import { ICartProduct } from '../../Model/ICartProduct';

interface ICartContextValue {
	products: ICartProduct[];
	total: number;
	setQuantity(product: IProduct, quantity: number): void;
	addQuantity(product: IProduct, quantity: number): void;
	remove(product: IProduct): void;
}

interface IState {
	cartProducts: ICartProduct[];
}

const Context = React.createContext<ICartContextValue>({} as ICartContextValue);

export class CartContext extends React.PureComponent<{}, IState> {
	private cartProductKey = 'cartProducts';
	public state: IState = {
		cartProducts: []
	};

	public componentDidMount() {
		const stringProducts = window.localStorage.getItem(this.cartProductKey);
		try {
			const cartProducts = JSON.parse(stringProducts || '');
			if (!Array.isArray(cartProducts)) {
				throw new Error('Invalid product data');
			} else {
				this.setState({
					cartProducts,
				});
			}
		} catch (e) {
			console.warn(e);
			window.localStorage.setItem(this.cartProductKey, JSON.stringify([]));
		}
	}

	public render() {
		return (
			<Context.Provider
				value={{
					setQuantity: this.setProductQuantity,
					addQuantity: this.addProductQuantity,
					products: this.state.cartProducts,
					remove: this.removeProduct,
					total: this.getTotal(),
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}

	public componentWillUnmount() {
		this.saveState(this.state);
	}

	public componentDidUpdate() {
		this.saveState(this.state);
	}

	private saveState(state: IState) {
		window.localStorage.setItem(this.cartProductKey, JSON.stringify(state.cartProducts));
	}

	private getTotal = () => {
		return this.state.cartProducts.reduce(
			(cummulated: number, cartProduct: ICartProduct) => cummulated + cartProduct.price * cartProduct.quantity,
			0
		);
	}

	private setProductQuantity = (product: IProduct, quantity: number) => {
		if (quantity <= 0) {
			throw new Error('Invalid product quantity');
		}
		const foundProduct = this.findProductByName(product.name);
		if (!foundProduct) {
			this.setState({
				cartProducts: [
					...this.state.cartProducts,
					{
						...product,
						quantity,
					}
				]
			});
		} else {
			const cartProducts = this.state.cartProducts.map((cartProduct: ICartProduct) => {
				if (cartProduct.name === product.name) {
					return {
						...cartProduct,
						quantity,
					}
				} else {
					return cartProduct;
				}
			})
			this.setState({
				cartProducts,
			});
		}
	}

	private addProductQuantity = (product: IProduct, quantity: number) => {
		const foundProduct = this.findProductByName(product.name);
		if (foundProduct) {
			this.setProductQuantity(product, foundProduct.quantity + quantity);
		} else {
			this.setProductQuantity(product, quantity);
		}
	}

	private removeProduct = (product: IProduct) => {
		const cartProducts = this.state.cartProducts.filter((cartProduct: ICartProduct) => cartProduct.name !== product.name);
		this.setState({
			cartProducts,
		});
	}

	private findProductByName = (name: string) => {
		return this.state.cartProducts.find((cartProduct: ICartProduct) => cartProduct.name === name);
	}
}

export interface ICartProps {
	cart: ICartContextValue;
}

export const withCart = <OwnProps extends {}>(WrappedComponent: React.ComponentType<OwnProps & ICartProps>) => (
	(props: OwnProps) => (
		<Context.Consumer>
			{(value: ICartContextValue) => <WrappedComponent {...props} cart={value} />}
		</Context.Consumer>
	)
);
