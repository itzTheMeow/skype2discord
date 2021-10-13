import { channelman, historyman, messageman, scrollman, serverman } from "..";
import config from "../config";
import { loadPage } from "../loadPage";
import { disableChat } from "../util/chatDisabled";

let ciMap = {};

const page2 = {
  text: `Press a key to view/join a channel below.
     Or press CTRL+C to go back.`,
  title: `Channel List - ${config.productName}`,
  onload: () => {
    let channels = serverman.server.channels.filter(
      (c) => c.type == "GUILD_TEXT" || c.type == "GUILD_NEWS"
    );
    let ci = 0;
    let category = "";
    ciMap = {};

    channels
      .sort((c1, c2) => {
        return c1.rawPosition > c2.rawPosition ? 1 : -1;
      })
      .forEach((c) => {
        if (category !== c.parent?.name) {
          category = c.parent.name;
          console.log(`\n${category}`);
        }
        console.log(`${config.keyListMap[ci]}> #${c.name}`);
        ciMap[config.keyListMap[ci]] = c.id;
        ci++;
      });

    channels = serverman.server.channels.filter((c) => c.type == "GUILD_VOICE");
    category = "";

    channels
      .sort((c1, c2) => {
        return c1.rawPosition > c2.rawPosition ? 1 : -1;
      })
      .forEach((c) => {
        if (category == "") {
          console.log("\n-- Voice Channels --");
          category = "vc";
        }
        console.log(`${config.keyListMap[ci]}> ${c.name}`);
        ciMap[config.keyListMap[ci]] = c.id;
        ci++;
      });
  },
  keyPress: (k) => {
    if (k == "\x03") return loadPage(0);
    if (ciMap[k]) {
      channelman.data(serverman.server.channels.find((c) => c.id == ciMap[k]));
      if (channelman.channel.type == "GUILD_VOICE") return;
      if (!channelman.channel.canSend) {
        disableChat(true);
        messageman.set("READ ONLY");
      } else {
        disableChat(false);
        messageman.set("");
        historyman.reset();
      }
      scrollman.reset();
      loadPage(3);
    }
  },
};
export default page2;
