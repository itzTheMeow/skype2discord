const express = require("express");
const app = express();
const server = require("http").createServer(app);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("ok");
});

const listener = server.listen(6001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

const io = require("socket.io")(server);
const iostream = require("socket.io-stream");
const Discord = require("discord.js");
const DiscordVoice = require("@discordjs/voice");

let clients = {};

io.on("connection", async (socket) => {
  console.log("Socket connected!");
  socket.on("login", (d) => {
    let guild;
    let bot = new Discord.Client({
      intents: Object.values(Discord.Intents.FLAGS), // fuck you discord lmao
    });
    bot.on("ready", async () => {
      await bot.user.fetch();
      socket.emit("botready", bot.user.toJSON());
    });
    bot.login(d);
    clients[socket.id] = bot;

    let sendHook;
    async function getSendHook(ch) {
      if (!sendHook || sendHook.deleted)
        sendHook =
          (await guild.fetchWebhooks()).find((w) => w.owner.id == bot.user.id) ||
          (await ch.createWebhook("TDSClient"));

      await sendHook.edit({
        name: bot.user.username,
        avatar: bot.user.displayAvatarURL(),
        channel: ch.id,
      });
      return sendHook;
    }
    async function sendMessage(id, content) {
      let channel = bot.channels.cache.get(id);
      if (!channel) return;
      let hook = await getSendHook(channel, channel.guild.me.displayName);
      hook.send(content);
      (await channel.send("$TDSClient.stopTypingEventTrigger")).delete();
    }

    socket.on("disconnect", () => {
      bot.destroy();
    });

    let fetchedAuthors = [];
    bot.on("messageCreate", async (message) => {
      if (message.content == "$TDSClient.stopTypingEventTrigger") return;
      let json = message.toJSON();
      if (message.author.discriminator !== "0000") {
        if (!fetchedAuthors.includes(message.author.id)) {
          await message.author.fetch();
          fetchedAuthors.push(message.author.id);
        }
        json.author = message.author.toJSON();
      } else {
        json.author = json.member = {
          ...message.author,
          ...{
            tag: message.author.username,
            nickname: message.author.username,
            displayName: message.author.username,
          },
        };
      }
      json.channel = message.channel.toJSON();
      if (message.attachments) json.attachments = message.attachments.map((a) => a.toJSON());
      if (message.guild) json.guild = message.guild.toJSON();
      if (message.member) json.member = message.member.toJSON();
      socket.emit("messageCreate", json);
    });
    bot.on("messageUpdate", async (message) => {
      if (message.content == "$TDSClient.stopTypingEventTrigger") return;
      let json = message.toJSON();
      if (message.author.discriminator !== "0000") {
        if (!fetchedAuthors.includes(message.author.id)) {
          await message.author.fetch();
          fetchedAuthors.push(message.author.id);
        }
        json.author = message.author.toJSON();
      } else {
        json.author = json.member = {
          ...message.author,
          ...{
            tag: message.author.username,
            nickname: message.author.username,
            displayName: message.author.username,
          },
        };
      }
      json.channel = message.channel.toJSON();
      if (message.attachments) json.attachments = message.attachments.map((a) => a.toJSON());
      if (message.guild) json.guild = message.guild.toJSON();
      if (message.member) json.member = message.member.toJSON();
      socket.emit("messageUpdate", json);
    });

    socket.on("guild", async (id) => {
      let g = bot.guilds.cache.get(id);
      await g.members.fetch();
      await g.roles.fetch();
      let json = g.toJSON();
      json.channels = g.channels.cache
        .filter((c) => c.permissionsFor(c.guild.me).has("VIEW_CHANNEL"))
        .map((c) => {
          let json = c.toJSON();
          json.canSend = c.permissionsFor(c.guild.me).has("SEND_MESSAGES");
          if (c.parent) json.parent = c.parent.toJSON();
          return json;
        });
      json.members = g.members.cache.map((m) => m.toJSON());
      json.roles = g.roles.cache.map((r) => r.toJSON());
      socket.emit("doneguild", json);
      guild = g;
    });

    let fetched = [];
    socket.on("fetchMessages", async (id) => {
      let channel = bot.channels.cache.get(id);
      if (!channel) channel = await bot.channels.fetch(id);
      if (!channel) return;
      let messages = channel.messages?.cache || [];
      if (!fetched.includes(channel?.id)) {
        await channel.messages?.fetch({
          limit: 100,
          before: channel.messages.cache?.last()?.id,
        });
        await channel.messages?.fetch({
          limit: 100,
          before: channel.messages.cache?.last()?.id,
        });
        messages = channel.messages?.cache;
      }
      socket.emit(
        "messages",
        channel.id,
        messages.map((msg) => {
          let json = msg.toJSON();
          json.author = {
            username: msg.author.username,
            tag: msg.author.tag,
          };
          if (msg.attachments) json.attachments = msg.attachments.map((a) => a.toJSON());
          if (msg.member) json.member = msg.member.toJSON();
          return json;
        })
      );
    });

    socket.on("sendMessage", async (id, content) => {
      sendMessage(id, content);
    });
    socket.on("setNick", (name) => {
      guild.me.setNickname(name);
    });
    socket.on("type", (id) => {
      bot.channels.cache.get(id)?.sendTyping();
    });
    socket.on("stopType", async (id) => {
      (await bot.channels.cache.get(id)?.send("$TDSClient.stopTypingEventTrigger"))?.delete();
    });

    socket.on("joinVoice", (id) => {
      bot.channels.cache.get(id)?.socket.emit("joinedVoice");
    });
    iostream(socket).on("voiceStream", (stream) => {});
  });
});
