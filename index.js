console.clear();
console.log("Booting...");

const config = {
  prefix: "v!",
  guild: "832290972880470117",
  productName: "TDSClient",
  keyListMap: "123456789abcdefghijklmnopqrstuvwxyz".split(""),
  qwerty:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-+={[}]|\\\"':;<,>.?/~`\n ",
  keymap: require("./keymap.json") || {},
  loading: [".  ", ".. ", "...", " ..", "  .", " ..", "...", ".. "],
  mentionPatterns: {
    user: /<@!?(\d{17,19})>/g,
    role: /<@&(\d{17,19})>/g,
    channel: /<#(\d{17,19})>/g,
  },
};

const fs = require("fs");
const termSize = require("./term-size");
const rl = require("readline");
const clipboard = require("clipboardy");
const TOKEN = String(fs.readFileSync("TOKEN"));
const PROXY = String(fs.readFileSync("PROXY"));
const chalk = require("chalk");
const io = require("socket.io-client");
const mic = require("mic");

function setTitle(text) {
  process.stdout.write(String.fromCharCode(27) + "]0;" + text + String.fromCharCode(7));
}

setTitle("Logging in...");
let inter = rl.createInterface({ input: process.stdin, output: process.stdout });
inter.question(`Enter proxy URL or press enter to use current. (${PROXY})\n> `, (proxyUrl) => {
  proxyUrl = proxyUrl || PROXY;
  if (proxyUrl !== PROXY) fs.writeFileSync("PROXY", proxyUrl);
  inter.close();

  let socket = io(proxyUrl);

  require("keypress")(process.stdin);

  console.log(`Connecting to ${proxyUrl}...`);
  setTitle("Connecting...");

  socket.on("connect", () => {
    setTitle("Connected!");
    console.clear();
    console.log("Connected to proxy server.");

    process.stdin.setMaxListeners(Infinity);

    let hexMode = false;
    let hexKey = "";
    let press = function () {};
    let pageNum;
    let server;

    async function fetchMessages(id) {
      return new Promise((res) => {
        socket.emit("fetchMessages", id);
        socket.once("messages", (cid, messages) => {
          try {
            server.channels.forEach((c, i) => {
              if (c.id == cid) {
                let ch = server.channels[i];
                ch.messages = messages;
                server.channels[i] = ch;
              }
            });
            if (channel.id == cid) channel.messages = messages;
          } catch (e) {}
          res();
        });
      });
    }

    let loader;
    function showLoader() {
      if (loader) clearInterval(loader);
      let loadNum = 0;
      loader = setInterval(() => {
        let loading = config.loading[loadNum];
        let padTop = (" ".repeat(termSize().columns) + "\n").repeat(
          Math.floor(termSize().rows / 2) - 2
        );
        let padLeft = " ".repeat(Math.ceil((termSize().columns - loading.length / 2) / 2) + 2);
        process.stdout.write(`${padTop}\n${padLeft}${loading}${padTop}`);
        loadNum++;
        if (loadNum == config.loading.length) loadNum = 0;
      }, 200);
    }
    function stopLoader() {
      if (loader) clearInterval(loader);
    }

    function loadPage(num) {
      let page = pages[num];
      pageNum = num;
      if (page.title) setTitle(page.title);
      console.clear();
      process.stdin.setEncoding("utf8");
      hexMode = false;
      if (page.text) console.log(page.text.replace(new RegExp(" ".repeat(11), "g"), ""));
      page.onload();
      press = page.keyPress;
    }

    function parse(content) {
      let cont = [...content]
        .map((c) => (config.qwerty.includes(c) ? c : "?"))
        .join("")
        .replace(/\*\*\*(.*)\*\*\*/gim, chalk.bold.italic("$1"))
        .replace(/\*\*(.*)\*\*/gim, chalk.bold("$1"))
        .replace(/\*(.*)\*/gim, chalk.italic("$1"))
        .replace(/\_\_(.*)\_\_/gim, chalk.underline("$1"))
        .replace(/\~\~(.*)\~\~/gim, chalk.strikethrough("$1"));

      function doUserMention() {
        let mention = cont.match(config.mentionPatterns.user);
        if (!mention) return;
        mention = mention[0];
        let id = mention.slice(2, -1);
        if (id.startsWith("!")) id = id.substring(1);
        let mem = server.members.find((m) => m.userId == id);
        cont = cont.replace(
          new RegExp(mention, "g"),
          chalk.blueBright(`@${mem?.displayName || "Unknown"}`)
        );
        doUserMention();
      }
      doUserMention();
      function doChannelMention() {
        let mention = cont.match(config.mentionPatterns.channel);
        if (!mention) return;
        mention = mention[0];
        let id = mention.slice(2, -1);
        let ch = server.channels.find((c) => c.id == id);
        cont = cont.replace(
          new RegExp(mention, "g"),
          chalk.blueBright(`#${ch?.name || "unknown"}`)
        );
        doChannelMention();
      }
      doChannelMention();
      function doRoleMention() {
        let mention = cont.match(config.mentionPatterns.role);
        if (!mention) return;
        mention = mention[0];
        let id = mention.slice(3, -1);
        let role = server.roles.find((r) => r.id == id);
        cont = cont.replace(
          new RegExp(mention, "g"),
          chalk.blueBright(`@${role?.name || "Unknown"}`)
        );
        doRoleMention();
      }
      doRoleMention();

      return cont;
    }

    let ciMap = {};
    let channel;
    let chatMessage = "";
    let chatDisabled = false;
    let globalError = "";
    let history = [];
    let lastMessage = "";
    let fetched = [];
    let scrollPos = 0;
    let chatHigh = null;
    let hadMessage = false;
    let typing = false;

    const pages = [
      {
        text: `Press 1 to view channels.
           Press x to get key hex codes.
           Press space to reload.
           Or press CTRL+C to exit.`,
        title: `Boot Menu - ${config.productName}`,
        onload: () => {
          hexMode = false;
        },
        keyPress: (k) => {
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
      },
      {
        text: `Press any key to see it's hex code.
           Or press CTRL+C to go back.`,
        title: `Hex Codes - ${config.productName}`,
        onload: () => {
          process.stdin.setEncoding("hex");
          hexMode = true;
        },
        keyPress: (k) => {
          if (k == "03") return loadPage(0);
          console.log(`Code: '${k}'`);
        },
      },
      {
        text: `Press a key to view/join a channel below.
           Or press CTRL+C to go back.`,
        title: `Channel List - ${config.productName}`,
        onload: () => {
          let channels = server.channels.filter(
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

          channels = server.channels.filter((c) => c.type == "GUILD_VOICE");
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
            channel = server.channels.find((c) => c.id == ciMap[k]);
            if (channel.type == "GUILD_VOICE") return;
            if (!channel.canSend) {
              chatDisabled = true;
              chatMessage = "READ ONLY";
            } else {
              chatDisabled = false;
              chatMessage = "";
              history = [];
            }
            scrollPos = 0;
            loadPage(3);
          }
        },
      },
      {
        text: "",
        title: "",
        onload: async () => {
          process.stdin.setEncoding("hex");
          hexMode = true;
          setTitle(`#${channel?.name || "unknown"} - ${config.productName}`);

          let chatLines = [];
          let maxChatLines = termSize().rows - 4;
          console.log("TOP");

          if (!fetched.includes(channel?.id)) {
            showLoader();
            await fetchMessages(channel.id);
            stopLoader();
            fetched.push(channel.id);
          }
          console.log(channel.messages[0].content);
          let msgs = channel.messages
            .filter((m) => m.content)
            .sort((m1, m2) => {
              return m1.createdTimestamp > m2.createdTimestamp ? 1 : -1;
            });
          msgs.forEach((message) => {
            chatLines.push(
              ...`${message.member?.nickname || message.author.username}: ${parse(
                message.content
              )}${message.editedAt ? " (edited)" : ""}`.split("\n")
            );
          });

          let min = Math.max(0, chatLines.length - maxChatLines - 1 - scrollPos);
          let max = chatLines.length - scrollPos;
          chatLines = chatLines.slice(min, max);
          if (min == 0) chatHigh = true;
          else chatHigh = false;

          let pad = "";
          if (chatLines.length - 1 < maxChatLines)
            pad = "\n".repeat(maxChatLines - (chatLines.length - 1));

          process.stdout.write(`${chatLines.join("\n")}${pad}

${"—".repeat(termSize().columns)}
> ${chatMessage}`);
        },
        keyPress: (k) => {
          if (k == "03") return loadPage(2);
          if (k == "1b5b357e" && chatHigh !== true) scrollPos++;
          if (k == "1b5b367e" && scrollPos > 0) scrollPos--;
          if (!chatDisabled) {
            if (k == "08") chatMessage = chatMessage.substr(0, chatMessage.length - 1);
            else if (k == "1a") chatMessage = history.pop();
            else if (k == "0d" && chatMessage) {
              if (chatMessage.trim()) {
                if (chatMessage.startsWith("/nick ")) {
                  socket.emit("setNick", chatMessage.substring("/nick ".length));
                } else socket.emit("sendMessage", channel.id, chatMessage);
              }
              chatMessage = "";
              lastMessage = history.pop();
              history = [];
              typing = false;
            } else if (k == "16") {
              history.push(chatMessage);
              chatMessage += clipboard
                .readSync()
                .split("")
                .filter((ct) => Object.values(config.keymap).includes(ct))
                .join("");
            } else if (Object.keys(config.keymap).includes(k)) {
              history.push(chatMessage);
              chatMessage += config.keymap[k];
            }

            if (chatMessage) {
              if (!hadMessage) {
                hadMessage = true;
                typing = true;
                socket.emit("type", channel.id);
              }
            } else {
              hadMessage = false;
              if (typing) {
                typing = false;
                socket.emit("stopType", channel.id);
              }
            }
          }
          loadPage(3);
        },
      },
      {
        text: "",
        title: "Error.",
        onload: () => {
          console.log("An error occured: ");
          console.log(globalError);
          console.log("Press any key to continue.");
        },
        keyPress: (k) => {
          loadPage(0);
        },
      },
    ];

    socket.on("botready", (bot) => {
      console.log(`${bot.tag} is online!`);
      console.log("Getting main guild...");
      socket.emit("guild", config.guild);

      socket.once("doneguild", (s) => {
        server = s;

        process.stdin.on("keypress", (k) => {
          if (!hexMode) {
            press(k);
            hexKey = "";
            return;
          }
          hexKey += k;
          if (hexKey.length >= 2) {
            if (
              (hexKey.startsWith("1b") || hexKey.startsWith("1b5") || hexKey.startsWith("1b5b")) &&
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
        if (!message.content || !message.guild) return;
        let ind = server.channels.indexOf(server.channels.find((c) => c.id == message.channel.id));
        server.channels[ind].messages.push(message);
        if (message.author.id == bot.id) scrollPos = 0;
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
        if (id == message.channel.id && pageNum == 3) loadPage(3);
      });
    });

    console.log("Logging in...");
    socket.emit("login", TOKEN);
  });

  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
});
