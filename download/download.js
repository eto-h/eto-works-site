(() => {
  let previous;
  try { previous = new URL(document.referrer); } catch { /* Direct or undisclosed. */ }
  const internal = previous?.origin === location.origin;
  const host = previous?.hostname.toLowerCase() || "";
  const sourceKey = "eto-download-source";
  let source = "direct-or-unknown";
  if (host && !internal) {
    if (/(^|\.)(x\.com|twitter\.com|t\.co)$/.test(host)) source = "x";
    else if (/(^|\.)github\.com$/.test(host)) source = "github";
    else if (/^(www\.)?google\.(com|co\.jp|co\.uk|de|fr|es|co\.kr|com\.tw|com\.hk)$/.test(host)
      || /(^|\.)(bing\.com|search\.yahoo\.co\.jp|duckduckgo\.com|baidu\.com|search\.naver\.com)$/.test(host)) source = "search";
    else source = "other";
  }
  try {
    if (internal) {
      const stored = JSON.parse(sessionStorage.getItem(sourceKey));
      if (stored && stored.until > Date.now() && ["x", "github", "search", "other"].includes(stored.source)) source = stored.source;
    } else if (source !== "direct-or-unknown") {
      sessionStorage.setItem(sourceKey, JSON.stringify({ source, until: Date.now() + 3_600_000 }));
    } else {
      sessionStorage.removeItem(sourceKey);
    }
  } catch { /* Downloads also work with browser storage disabled. */ }

  const links = document.querySelectorAll("#products a[data-product]");
  if (!links.length) return;
  let via = previous ? "external" : "unknown";
  if (internal) {
    const section = previous.pathname.split("/")[1];
    via = ["kotovim", "kotopo", "kotoq"].includes(section) ? section :
      (!section || section === "index.html" ? "site-home" : "site-other");
  }
  const product = new URLSearchParams(location.search).get("product");
  for (const link of links) {
    const url = new URL(link.href);
    url.searchParams.set("source", source);
    url.searchParams.set("via", via);
    link.href = url.href;
  }
  const selected = Array.from(links).find(link => link.dataset.product === product);
  if (selected) location.replace(selected.href);
})();
