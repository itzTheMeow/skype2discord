const config = {
  prefix: "v!",
  guild: "832290972880470117",
  productName: "TDSClient",
  keyListMap: "123456789abcdefghijklmnopqrstuvwxyz".split(""),
  qwerty:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_-+={[}]|\\\"':;<,>.?/~`\n ",
  loading: [".  ", ".. ", "...", " ..", "  .", " ..", "...", ".. "],
  mentionPatterns: {
    user: /<@!?(\d{17,19})>/g,
    role: /<@&(\d{17,19})>/g,
    channel: /<#(\d{17,19})>/g,
    emoji: /<a?:(.*):(\d{17,19})>/g,
  },
};
export default config;
