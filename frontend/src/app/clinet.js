import { createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";


export const client = createThirdwebClient({
  // use `secretKey` for server side or script usage
  clientId:"2c28257152e6a732d8a97dbf793eb33b",
  //secretKey: "oSaIfOGcMZXtX8524I5NrjufCrAGh9Nu39RzC3lRT-mAAakagSV9qwT_KGye3F1FSXiRsMYpfNE-HNHkGXBNRg",
  chain:sepolia
});
