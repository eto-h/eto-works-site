(() => {
  const picker = document.getElementById("site-language");
  const storageKey = "kotopo.displayLanguage";
  const url = new URL(location.href);
  const supported = value => Object.prototype.hasOwnProperty.call(kotopoMessages, value);
  function browserLanguage(tag) {
    const primary = tag.split("-")[0].toLowerCase();
    return primary === "zh" ? "zh-Hans" : primary;
  }
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch (_) { /* Storage may be disabled. */ }
  const preferred = (navigator.languages || [navigator.language]).map(browserLanguage).find(supported);
  const explicit = url.searchParams.get("lang");
  const initial = supported(explicit) ? explicit : url.hash === "#en" ? "en" :
    supported(saved) ? saved : preferred || "en";

  function apply(language) {
    const strings = kotopoMessages[language];
    document.documentElement.lang = language;
    picker.value = language;
    for (const element of document.querySelectorAll("[data-text]")) {
      const parts = strings[element.dataset.text].split(/(\[[^\]]+\])/);
      element.replaceChildren(...parts.map(part => {
        if (!part.startsWith("[")) return part;
        const key = document.createElement("kbd");
        key.textContent = part.slice(1, -1);
        return key;
      }));
    }
    document.querySelector("[data-nav-label]").setAttribute("aria-label", strings.productLinks);
    const title = document.body.dataset.title;
    document.title = strings[title] + (title === "homeTitle" ? "" : " | kotopo") + " | eto works";
    document.querySelector('meta[name="description"]').content =
      strings[document.body.dataset.description].replace(/[\[\]]/g, "");
    for (const link of document.querySelectorAll("a[href]")) {
      const target = new URL(link.href);
      if (target.origin !== location.origin || !target.pathname.startsWith("/kotopo/")) continue;
      target.searchParams.set("lang", language);
      link.href = target.toString();
    }
    document.dispatchEvent(new Event("kotopo-language"));
  }
  apply(initial);
  picker.closest("label").hidden = false;
  picker.addEventListener("change", () => {
    const language = picker.value;
    try { localStorage.setItem(storageKey, language); } catch (_) { /* Links retain the choice. */ }
    const current = new URL(location.href);
    current.searchParams.set("lang", language);
    history.replaceState(null, "", current);
    apply(language);
  });
})();
