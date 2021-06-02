import Client from "../client";

type ClientResponseSuccess = {
  XXBTZGBP: Record<string, string[]>;
};

type ClientResponse = {
  error: any[];
  result: ClientResponseSuccess;
};

const getBTC = async (): Promise<string> => {
  const clientResponse = await Client("BTCGBP");
  const data: ClientResponse = await clientResponse.json();
  return data.result.XXBTZGBP.a[0];
};

export default getBTC;
