import { channelman, historyman, messageman, scrollman, serverman, socketman } from "..";
import config from "../config";
import { loadPage } from "../loadPage";
import { disableChat } from "../util/chatDisabled";
import fs from "fs";
import mic from "mic";
import socketstream from "socket.io-stream";

let ciMap = {};

const page2 = {
  text: `Press a key to view/join a channel below.
     Or press CTRL+C to go back.`,
  title: `Channel List - ${config.productName}`,
  onload: () => {
    let channels = serverman.server.channels.filter((c) => c.type == "text" || c.type == "news");
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

    channels = serverman.server.channels.filter((c) => c.type == "voice");
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
      if (channelman.channel.type == "voice") {
        socketman.socket.emit("joinVoice", channelman.channel.id);
        socketman.socket.once("joinedVoice", () => {
          let micInstance = mic({
            rate: "16000",
            channels: "1",
            debug: true,
            exitOnSilence: 6,
            fileType: "raw",
          });
          let micInputStream = micInstance.getAudioStream();
          let voiceStream = socketstream.createStream({});

          micInputStream.pipe(voiceStream);
          socketstream(socketman.socket, {}).emit("voiceStream", voiceStream);

          micInputStream.on("processExitComplete", function () {
            console.log("Got SIGNAL processExitComplete");
          });

          micInstance.start();
        });
      } else {
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
    }
  },
};
export default page2;
