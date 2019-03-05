import * as React from 'react';
import { numberToCurrency } from '../../Model/numberToCurrency';
import { StyledTable } from '../Styled/StyledTable'

interface IProps {
	total: number;
}

export class CartProductTable extends React.PureComponent<IProps> {
	public render() {
		return (
			<StyledTable>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.children
					}
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th>{numberToCurrency(this.props.total)}</th>
						<th></th>
					</tr>
				</tbody>
			</StyledTable>
		);
	}
}