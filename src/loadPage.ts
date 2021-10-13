import page0 from "./pages/0-BootMenu";
import page1 from "./pages/1-HexCodes";
import page2 from "./pages/2-ChannelList";
import page3 from "./pages/3-Chat";
import setTitle from "./util/setTitle";

type page = {
  text: string;
  title: string;
  onload: Function;
  keyPress: Function;
};

let pages: page[] = [page0, page1, page2, page3];
let hexMode = false;
let pageNum = 0;
let press: Function;

export function loadPage(num: number) {
  let page = pages[num];
  pageNum = num;
  if (page.title) setTitle(page.title);
  console.clear();
  process.stdin.setEncoding("utf8");
  hexMode = false;
  if (page.text) console.log(page.text.replace(new RegExp(" ".repeat(9), "g"), ""));
  page.onload();
  press = page.keyPress;
}

export function setHexMode(val: boolean) {
  hexMode = val;
}
export { hexMode, press, pageNum };
