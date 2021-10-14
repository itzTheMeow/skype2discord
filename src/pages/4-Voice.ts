import { channelman, historyman, messageman, micman, scrollman, socketman } from "..";
import { loadPage, setHexMode } from "../loadPage";
import setTitle from "../util/setTitle";
import config from "../config";
import { VoiceChannel } from "../Discord";

const page4 = {
  text: "",
  title: "",
  onload: async () => {
    process.stdin.setEncoding("hex");
    setHexMode(true);
    setTitle(`VC: ${channelman.channel.name || "unknown"} - ${config.productName}`);

    if (!micman.started) {
      console.log("MicManager not started! CTRL+C and rejoin channel.");
    } else {
      let chan = channelman.channel as VoiceChannel;
    }
  },
  keyPress: (k: string) => {
    if (k == "03") return loadPage(2);
  },
};

export default page4;
