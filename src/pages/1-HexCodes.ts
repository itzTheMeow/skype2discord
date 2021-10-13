import config from "../config";
import { loadPage, setHexMode } from "../loadPage";

const page1 = {
  text: `Press any key to see it's hex code.
         Or press CTRL+C to go back.`,
  title: `Hex Codes - ${config.productName}`,
  onload: () => {
    process.stdin.setEncoding("hex");
    setHexMode(true);
  },
  keyPress: (k: string) => {
    if (k == "03") return loadPage(0);
    console.log(`Code: '${k}'`);
  },
};
export default page1;
