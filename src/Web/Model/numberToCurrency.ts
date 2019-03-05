
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'NZD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const numberToCurrency = (num: number) => {
	return formatter.format(num);
}
