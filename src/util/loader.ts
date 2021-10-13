import config from "../config";
import termSize from "./termSize";

let loader;
export function showLoader() {
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
export function stopLoader() {
  if (loader) clearInterval(loader);
}
