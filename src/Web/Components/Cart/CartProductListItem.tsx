import * as React from 'react';
import { ICartProduct } from '../../../Model/ICartProduct';
import { numberToCurrency } from '../../Model/numberToCurrency';

export interface IProps {
	product: ICartProduct;
	setProductQuantity(quantity: number): void;
	removeProduct(): void;
}

export interface IState {
	qty: number;
}

export class CartProductListItem extends React.PureComponent<IProps, IState> {
	private inputRef = React.createRef<HTMLInputElement>();

	public state: IState = {
		qty: this.props.product.quantity
	}

	public componentDidMount() {
		this.setState({
			qty: this.props.product.quantity
		});
	}

	public render() {
		const total = this.props.product.quantity * this.props.product.price;
		return (
			<tr>
				<td>{this.props.product.name}</td>
				<td>{numberToCurrency(this.props.product.price)}</td>
				<td>
					<input
						type="number"
						ref={this.inputRef}
						value={this.state.qty}
						onChange={this.onChange}
						onKeyUp={this.onKeyUp}
						onBlur={this.onBlur}
					/>
				</td>
				<td>{numberToCurrency(total)}</td>
				<td>
					<a href="#" onClick={this.props.removeProduct}>Remove</a>
				</td>
			</tr>
		);
	}

	private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const qty = (parseInt(e.target.value) <= 0) ? 1 : parseInt(e.target.value);
		this.setState({
			qty,
		})
	}

	private onBlur = () => {
		if (!Number.isNaN(this.state.qty)) {
			this.props.setProductQuantity(this.state.qty);
		}
	}

	private onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			this.inputRef.current && this.inputRef.current.blur();
		}
	}
}
