export const porc = (price, buy) => {
	return (((price - buy) / buy) * 100).toFixed(2);
};
