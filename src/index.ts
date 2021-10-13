import fs from "fs";
import rl from "readline";
import io from "socket.io-client";
import fetch from "node-fetch";

import setTitle from "./util/setTitle";
import config from "./config";
import { hexMode, loadPage, pageNum, press, setHexMode } from "./loadPage";
import ServerManager from "./managers/ServerManager";
import ChannelManager from "./managers/ChannelManager";
import ScrollManager from "./managers/ScrollManager";
import HistoryManager from "./managers/HistoryManager";
import ChatMessageManager from "./managers/ChatMessageManager";
import SocketManager from "./managers/SocketManager";
import fetchMessages from "./util/fetchMessages";
import { TextChannel } from "./Discord";

if (process.cwd().endsWith("node")) process.chdir("../");

console.clear();
console.log("Booting...");

const TOKEN = String(fs.readFileSync("TOKEN"));
const PROXY = String(fs.readFileSync("PROXY"));
const VERSION = Number(String(fs.readFileSync("VERSION")));
let serverman = new ServerManager();
let channelman = new ChannelManager();
let messageman = new ChatMessageManager();
let scrollman = new ScrollManager();
let historyman = new HistoryManager();
let socketman = new SocketManager();
let outdated = false;

setTitle("Logging in...");
let inter = rl.createInterface({ input: process.stdin, output: process.stdout });
inter.question(`Enter proxy URL or press enter to use current. (${PROXY})\n> `, (proxyUrl) => {
  proxyUrl = proxyUrl || PROXY;
  if (proxyUrl !== PROXY) fs.writeFileSync("PROXY", proxyUrl);
  inter.close();

  let socket = io(proxyUrl);
  socketman.set(socket);

  require("keypress")(process.stdin);

  console.log(`Connecting to ${proxyUrl}...`);
  setTitle("Connecting...");

  socket.on("disconnect", () => {
    loadPage(0);
    console.clear();
    console.log("Socket disconnected... Reload client!");
    socket.close();
  });

  socket.once("connect", async () => {
    setTitle("Connected!");
    console.clear();
    console.log("Connected to proxy server.");

    process.stdin.setMaxListeners(Infinity);

    console.log("Checking for updates...");
    fetch("http://raw.githubusercontent.com/itzTheMeow/tdsclient/master/VERSION")
      .then(async (hasVersion) => {
        if (VERSION < Number(await hasVersion.text())) outdated = true;

        let hexKey = "";

        socket.on("botready", (bot) => {
          console.log(`${bot.tag} is online!`);
          console.log("Getting main guild...");
          socket.emit("guild", config.guild);

          socket.once("doneguild", (s) => {
            serverman.data(s);

            process.stdin.on("keypress", (k) => {
              if (!hexMode) {
                press(k);
                hexKey = "";
                return;
              }
              hexKey += k;
              if (hexKey.length >= 2) {
                if (
                  (hexKey.startsWith("1b") ||
                    hexKey.startsWith("1b5") ||
                    hexKey.startsWith("1b5b")) &&
                  !hexKey.endsWith("7e") &&
                  !hexKey.endsWith("41") &&
                  !hexKey.endsWith("42") &&
                  !hexKey.endsWith("43") &&
                  !hexKey.endsWith("44") &&
                  hexKey.length < 8
                )
                  return;
                press(hexKey);
                hexKey = "";
              }
            });

            loadPage(0);
          });

          socket.on("messageCreate", async (message) => {
            if (!message.content || !message.guild || !serverman.server?.channels) return;
            let ind = serverman.server.channels.indexOf(
              serverman.server.channels.find((c) => c.id == message.channel.id)
            );
            (serverman.server.channels[ind] as TextChannel).messages.push(message);
            if (message.author.id == bot.id) scrollman.reset();
            loadPage(3);

            if (message.author.bot || !message.content.startsWith(config.prefix)) return;

            let args = message.content.substring(config.prefix.length).split(" ");
            let command = args.shift();

            switch (command) {
              case "xd":
                socket.emit("sendMessage", message.channel.id, "xd");
                break;
            }
          });
          socket.on("messageUpdate", async (message) => {
            if (!message.content || !message.guild) return;
            await fetchMessages(message.channel.id);
            if (channelman.channel.id == message.channel.id && pageNum == 3) loadPage(3);
          });
        });

        console.log("Logging in...");
        socket.emit("login", TOKEN);
      })
      .catch((err) => {
        console.log("Failed version check.");
        console.log(err);
      });
  });

  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
});

export { serverman, channelman, messageman, scrollman, historyman, socketman, outdated };
