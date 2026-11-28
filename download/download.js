// Set to the deployed download Worker's HTTPS origin when it is ready.
const downloadOrigin = "";
const editions = new Map([
  ["kotopo", "kotopo"],
  ["kotoq", "kotoq"],
  ["kotovim-standard", "kotoVim Standard"],
  ["kotovim-lite", "kotoVim Lite"],
]);

const product = new URLSearchParams(location.search).get("product");
const title = editions.get(product);
if (title) {
  document.getElementById("products").remove();
  const english = document.documentElement.lang === "en";
  const languageLink = document.getElementById("language");
  const alternate = new URL(languageLink.href);
  alternate.searchParams.set("product", product);
  languageLink.href = alternate.href;
  document.querySelector("h1").textContent = english ? title + " download" : title + " のダウンロード";
  if (downloadOrigin) {
    const destination = new URL("/terms/" + product, downloadOrigin);
    if (destination.protocol === "https:") {
      destination.searchParams.set("lang", english ? "en" : "ja");
      const link = document.createElement("a");
      link.href = destination.href;
      link.textContent = english ? "Continue to the terms of use" : "利用規約へ進む";
      document.getElementById("availability").replaceChildren(link);
      location.replace(destination.href);
    }
  }
}
