import { BTCPrice } from "../types/BTCPrice";
// const NewApiKey = 'a46eab76-c095-4785-96df-272c7a1da2dc';
const API_KEY = 'ecbfab10-585f-4a7f-8da8-0ae5e2a1da67';
const baseUrl = 'https://coin-realy.mobilauto.com.ua';
const endpoint = '/v1/cryptocurrency/quotes/latest';

const url_proxy = `${baseUrl}${endpoint}?id=1&CMC_PRO_API_KEY=${API_KEY}`;

export const getBTCPrice = async(): Promise<BTCPrice> => {
  try {
    const response = await fetch(url_proxy);

    const btcPrice: number = await response.json()
      .then(data => data.data[1].quote.USD.price);
      
    return {
      price: btcPrice,
      time: (new Date()).toString(),
    };
  } catch(e) {
    throw new Error("Failed to fetch");
  }
};
