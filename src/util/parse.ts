import chalk from "chalk";
import { serverman } from "..";
import config from "../config";

export default function parse(content: string) {
  let cont = [...content]
    .map((c) => (config.qwerty.includes(c) ? c : "?"))
    .join("")
    .replace(/\*\*\*(.*)\*\*\*/gim, chalk.bold.italic("$1"))
    .replace(/\*\*(.*)\*\*/gim, chalk.bold("$1"))
    .replace(/\*(.*)\*/gim, chalk.italic("$1"))
    .replace(/\_\_(.*)\_\_/gim, chalk.underline("$1"))
    .replace(/\~\~(.*)\~\~/gim, chalk.strikethrough("$1"));

  function doUserMention() {
    let mention: any = cont.match(config.mentionPatterns.user);
    if (!mention) return;
    mention = mention[0];
    let id = mention.slice(2, -1);
    if (id.startsWith("!")) id = id.substring(1);
    let mem = serverman.server.members.find((m) => m.userId == id);
    cont = cont.replace(
      new RegExp(mention, "g"),
      chalk.blueBright(`@${mem?.displayName || "Unknown"}`)
    );
    doUserMention();
  }
  doUserMention();
  function doChannelMention() {
    let mention: any = cont.match(config.mentionPatterns.channel);
    if (!mention) return;
    mention = mention[0];
    let id = mention.slice(2, -1);
    let ch = serverman.server.channels.find((c) => c.id == id);
    cont = cont.replace(new RegExp(mention, "g"), chalk.blueBright(`#${ch?.name || "unknown"}`));
    doChannelMention();
  }
  doChannelMention();
  function doRoleMention() {
    let mention: any = cont.match(config.mentionPatterns.role);
    if (!mention) return;
    mention = mention[0];
    let id = mention.slice(3, -1);
    let role = serverman.server.roles.find((r) => r.id == id);
    cont = cont.replace(new RegExp(mention, "g"), chalk.blueBright(`@${role?.name || "Unknown"}`));
    doRoleMention();
  }
  doRoleMention();
  function doEmojiMention() {
    let mention: any = cont.match(config.mentionPatterns.emoji);
    if (!mention) return;
    mention = mention[0];
    let id = mention.slice(1, -1);
    if (id.startsWith("a")) id = id.substring(1);
    id = id.substring(1);
    id = id.split(":")[0];
    cont = cont.replace(new RegExp(mention, "g"), chalk.magentaBright(`:${id}:`));
    doEmojiMention();
  }
  doEmojiMention();

  return cont;
}
