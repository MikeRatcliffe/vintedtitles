"use strict";

function extractTitleFromAlt(img) {
  const alt = img?.getAttribute("alt") || "";
  if (!alt) return "";

  // Find the first metadata field (Brand, Marque, etc.)
  const metadataFields = [
    "Brand", "Marque", "Marca", "Marke", "Značka", "Varemærke",
    "Kaubamärk", "Tuotemerkki", "Επωνυμία", "Marka", "Márka",
    "Merk", "Prekių ženklas", "Zīmols", "Varumärke", "Blagovna znamka",
    "Condition", "État", "Estado", "Zustand", "Stav", "Artiklens stand",
    "Seisukord", "Kunto", "Κατάσταση", "Stanje", "Állapot", "Condizioni",
    "Būklė", "Stāvoklis", "Staat", "Stare", "Skick", "Stare",
    "Size", "Taille", "Talla", "Größe", "Velikost", "Størrelse",
    "Suurus", "Tamaño", "Koko", "Μέγεθος", "Veličina", "Méret",
    "Taglia", "Dydis", "Izmēri", "Maat", "Rozmiar", "Tamanho",
    "Mărime", "Storlek", "Velikost", "Veľkosť"
  ];

  const regex = new RegExp(`(${metadataFields.join("|")}):`, "i");
  const match = alt.match(regex);

  if (match) {
    return alt.substring(0, match.index).replace(/,\s*$/, "").trim();
  }

  return alt.trim();
}

function addTitle(container) {
  const itemId = container.getAttribute("data-testid")?.match(/product-item-id-(\d+)/)?.[1] ||
    container.querySelector("[data-testid$='--overlay-link']")?.href?.match(/\/items\/(\d+)/)?.[1];

  if (!itemId) return;

  // Remove existing title
  container.querySelector(".vinted-title")
    ?.closest('.new-item-box__description')?.remove();

  const img = container.querySelector("[data-testid$='--image--img']");
  const fullTitle = extractTitleFromAlt(img);
  const brandEl = container.querySelector("[data-testid$='--description-title']");

  if (fullTitle && brandEl) {
    const titleEl = document.createElement("p");
    titleEl.className = "vinted-title";
    titleEl.textContent = fullTitle;

    const titleDiv = document.createElement("div");
    titleDiv.className = "new-item-box__description";
    titleDiv.appendChild(titleEl);

    const descriptionContentEl = brandEl.closest('[data-testid*="--description--content"]');
    if (descriptionContentEl) {
      const firstFlexbox = Array.from(descriptionContentEl.children)
        .find(child => child.classList.contains('u-flexbox'));
      descriptionContentEl.insertBefore(titleDiv, firstFlexbox || descriptionContentEl.firstChild);
    }
  }
}

function addAllTitles() {
  document.querySelectorAll("[data-testid^='product-item-id-'].new-item-box__container")
    .forEach(addTitle);

  document.querySelectorAll("[data-testid='feed-item']")
    .forEach(container => {
      if (!container.closest('[data-testid="feed-braze--promo-box"]')) {
        addTitle(container);
      }
    });
}

function startObserver() {
  let debounceTimer = null;
  const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(addAllTitles, 100);
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: true });
}

function init() {
  addAllTitles();
  startObserver();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
