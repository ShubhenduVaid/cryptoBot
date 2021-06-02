import Client from "../client";

type ClientResponseSuccess = {
  XETHZGBP: Record<string, string[]>;
};

type ClientResponse = {
  error: any[];
  result: ClientResponseSuccess;
};

const getBTC = async () => {
  const clientResponse = await Client("ETHGBP");
  const data: ClientResponse = await clientResponse.json();
  return data.result.XETHZGBP.a[0];
};

export default getBTC;
