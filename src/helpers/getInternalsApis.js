export const getPlatforms = async () => {
	const urlGetPlatforms = `https://myholdingsapi.herokuapp.com/api/platforms`;
	const response = await fetch(urlGetPlatforms);
	const result = await response.json();
	return result.platforms;
};

export const getCashs = async () => {
	const urlGetCashs = `https://myholdingsapi.herokuapp.com/api/cash`;
	const response = await fetch(urlGetCashs);
	const result = await response.json();
	return result.cashs;
};

export const getPlatformByName = async (name) => {
	const urlGetPlatforms = `https://myholdingsapi.herokuapp.com/api/platforms/${name}`;
	try {
		const response = await fetch(urlGetPlatforms, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result.msg;
	} catch (error) {
		return error;
	}
};

export const getCashByName = async (name) => {
	const urlGetCash = `https://myholdingsapi.herokuapp.com/api/cash/${name}`;
	try {
		const response = await fetch(urlGetCash, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result.msg;
	} catch (error) {
		return error;
	}
};

export const updatePlatform = async (platf, sats) => {
	const urlGetPlatforms = `https://myholdingsapi.herokuapp.com/api/platforms/update`;
	try {
		const response = await fetch(urlGetPlatforms, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: platf, satoshis: sats }),
		});
		const result = await response.json();
		return result;
	} catch (error) {
		return error;
	}
};

export const updateCash = async (name, usd, eur) => {
	const urlPutCash = `https://myholdingsapi.herokuapp.com/api/cash/update`;
	try {
		const response = await fetch(urlPutCash, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: name, usd: usd, eur: eur }),
		});
		const result = await response.json();
		return result;
	} catch (error) {
		return error;
	}
};

export const getCoins = async () => {
	const urlGetCoins = `https://myholdingsapi.herokuapp.com/api/coins`;
	try {
		const response = await fetch(urlGetCoins, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result.coins;
	} catch (error) {
		return error;
	}
};
