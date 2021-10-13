import config from "../config";
import { loadPage, setHexMode } from "../loadPage";

const page0 = {
  text: `Press 1 to view channels.
         Press x to get key hex codes.
         Press space to reload.
         Or press CTRL+C to exit.`,
  title: `Boot Menu - ${config.productName}`,
  onload: () => {
    setHexMode(false);
  },
  keyPress: (k: string) => {
    switch (k) {
      case "1":
        loadPage(2);
        break;
      case "x":
        loadPage(1);
        break;
      case " ":
        console.log("Restarting...");
        require("child_process").spawnSync(process.argv[0], process.argv.slice(1), {
          env: { process_restarting: 1 },
          stdio: "inherit",
        });
        process.exit(0);
        break;
      case "\x03":
        process.exit(0);
    }
  },
};

export default page0;
