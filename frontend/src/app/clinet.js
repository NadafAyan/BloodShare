import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { sepolia,defineChain } from "thirdweb/chains";


export const client = createThirdwebClient({
  // use `secretKey` for server side or script usage
  clientId:"2c28257152e6a732d8a97dbf793eb33b",
  //secretKey: "oSaIfOGcMZXtX8524I5NrjufCrAGh9Nu39RzC3lRT-mAAakagSV9qwT_KGye3F1FSXiRsMYpfNE-HNHkGXBNRg",
  chain:baseSepolia
});

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xEfA93B667ADaDD20e309A7C45C37802c3055840D",
});
