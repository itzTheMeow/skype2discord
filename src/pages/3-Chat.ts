import { channelman, historyman, messageman, scrollman, socketman } from "..";
import keymap from "../keymap";
import { loadPage, setHexMode } from "../loadPage";
import { showLoader, stopLoader } from "../util/loader";
import setTitle from "../util/setTitle";
import termSize from "../util/termSize";
import clipboard from "clipboardy";
import config from "../config";
import { chatDisabled } from "../util/chatDisabled";
import parse from "../util/parse";
import fetchMessages from "../util/fetchMessages";

let fetched = [];
let chatHigh = null;
let hadMessage = false;
let typing = false;
let lastMessage = "";

const page3 = {
  text: "",
  title: "",
  onload: async () => {
    process.stdin.setEncoding("hex");
    setHexMode(true);
    setTitle(`#${channelman.channel.name || "unknown"} - ${config.productName}`);

    let chatLines = [];
    let maxChatLines = termSize().rows - 4;
    console.log("TOP");

    if (!fetched.includes(channelman.channel.id)) {
      showLoader();
      await fetchMessages(channelman.channel.id);
      stopLoader();
      fetched.push(channelman.channel.id);
    }
    console.log(channelman.channel.messages[0].content);
    let msgs = channelman.channel.messages
      .filter((m) => m.content)
      .sort((m1, m2) => {
        return m1.createdTimestamp > m2.createdTimestamp ? 1 : -1;
      });
    msgs.forEach((message) => {
      chatLines.push(
        ...`${message.member?.nickname || message.author.username}: ${parse(message.content)}${
          message.editedAt ? " (edited)" : ""
        }`.split("\n")
      );
    });

    let min = Math.max(0, chatLines.length - maxChatLines - 1 - scrollman.value);
    let max = chatLines.length - scrollman.value;
    chatLines = chatLines.slice(min, max);
    if (min == 0) chatHigh = true;
    else chatHigh = false;

    let pad = "";
    if (chatLines.length - 1 < maxChatLines)
      pad = "\n".repeat(maxChatLines - (chatLines.length - 1));

    process.stdout.write(`${chatLines.join("\n")}${pad}

${"—".repeat(termSize().columns)}
> ${messageman.message}`);
  },
  keyPress: (k: string) => {
    if (k == "03") return loadPage(2);
    if (k == "1b5b357e" && chatHigh !== true) scrollman.up();
    if (k == "1b5b367e" && scrollman.value > 0) scrollman.down();
    if (!chatDisabled) {
      if (k == "08") messageman.set(messageman.message.substr(0, messageman.message.length - 1));
      else if (k == "1a") messageman.set(historyman.undo());
      else if (k == "0d" && messageman.message) {
        if (messageman.message.trim()) {
          if (messageman.message.startsWith("/nick ")) {
            socketman.socket.emit("setNick", messageman.message.substring("/nick ".length));
          } else socketman.socket.emit("sendMessage", channelman.channel.id, messageman.message);
        }
        messageman.set("");
        lastMessage = historyman.undo();
        historyman.reset();
        typing = false;
      } else if (k == "16") {
        historyman.add(messageman.message);
        messageman.set(
          messageman.message +
            clipboard
              .readSync()
              .split("")
              .filter((ct) => Object.values(keymap).includes(ct))
              .join("")
        );
      } else if (Object.keys(keymap).includes(k)) {
        historyman.add(messageman.message);
        messageman.set(messageman.message + keymap[k]);
      }

      if (messageman.message) {
        if (!hadMessage) {
          hadMessage = true;
          typing = true;
          socketman.socket.emit("type", channelman.channel.id);
        }
      } else {
        hadMessage = false;
        if (typing) {
          typing = false;
          socketman.socket.emit("stopType", channelman.channel.id);
        }
      }
    }
    loadPage(3);
  },
};

export default page3;
