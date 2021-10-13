export default function setTitle(text: string) {
  // changes the title of the console window
  process.stdout.write(String.fromCharCode(27) + "]0;" + text + String.fromCharCode(7));
}
