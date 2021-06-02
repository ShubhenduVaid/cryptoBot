import fetch from "node-fetch";

const url = "https://api.kraken.com/0/public/Ticker?pair=";

const Client = async (pair: string): Promise<any> =>
  await fetch(url + pair, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

export default Client;
