"use strict";

for (const input of document.querySelectorAll("[data-filter]")) {
  const rows = input.closest("section").querySelectorAll("tbody tr");
  input.closest(".kv-search").hidden = false;
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    for (const row of rows) row.hidden = !row.textContent.toLowerCase().includes(query);
  });
}

for (const button of document.querySelectorAll("[data-copy]")) {
  if (!navigator.clipboard) continue;
  button.hidden = false;
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(source.textContent);
      button.nextElementSibling.textContent = button.dataset.done;
    } catch {
      button.nextElementSibling.textContent = button.dataset.error;
    }
  });
}
