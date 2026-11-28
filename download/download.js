const product = new URLSearchParams(location.search).get("product");
const links = document.querySelectorAll("#products a[data-product]");
const selected = Array.from(links).find(link => link.dataset.product === product);
if (selected) {
  location.replace(selected.href);
}
