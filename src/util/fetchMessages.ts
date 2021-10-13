import { channelman, serverman, socketman } from "..";

export default async function fetchMessages(id) {
  return new Promise((res) => {
    socketman.socket.emit("fetchMessages", id);
    socketman.socket.once("messages", (cid, messages) => {
      try {
        serverman.server.channels.forEach((c, i) => {
          if (c.id == cid) {
            let ch = serverman.server.channels[i];
            ch.messages = messages;
            serverman.server.channels[i] = ch;
          }
        });
        if (channelman.channel.id == cid) channelman.channel.messages = messages;
      } catch (e) {}
      res(void 0);
    });
  });
}
