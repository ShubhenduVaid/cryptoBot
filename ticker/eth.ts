import Client from "../client";

type ClientResponseSuccess = {
  XETHZGBP: Record<string, string[]>;
};

type ClientResponse = {
  error: any[];
  result: ClientResponseSuccess;
};

const getBTC = async (): Promise<number> => {
  const clientResponse = await Client("ETHGBP");
  const data: ClientResponse = await clientResponse.json();
  return Number(Number(data.result.XETHZGBP.a[0] as any).toFixed(2));
};

export default getBTC;
