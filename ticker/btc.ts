import Client from "../client";

type ClientResponseSuccess = {
  XXBTZGBP: Record<string, string[]>;
};

type ClientResponse = {
  error: any[];
  result: ClientResponseSuccess;
};

const getBTC = async (): Promise<number> => {
  const clientResponse = await Client("BTCGBP");
  const data: ClientResponse = await clientResponse.json();
  return Number(Number(data.result.XXBTZGBP.a[0]).toFixed(2));
};

export default getBTC;
