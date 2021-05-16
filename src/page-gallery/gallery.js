import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as $ from "jquery";
import "lightbox2/dist/css/lightbox.min.css";
import lightbox from "lightbox2/dist/js/lightbox";
import galleries from "./galleries";

$(function () {
  handleNonExistingGallery();
  createGallery();
  createGalleryHeader();
  lightbox.option({
    albumLabel: "picture %1 of %2",
    fadeDuration: 300,
    resizeDuration: 150,
    wrapAround: true,
  });
});

function handleNonExistingGallery() {
  const galleryName = getUrlParameter("g");
  if (
    galleryName === undefined ||
    galleries[galleryName] === undefined ||
    galleries[galleryName] === null
  ) {
    const galleryName = getUrlParameter("g");
    const galleryTitle = document.getElementById("galleryTitle");
    galleryTitle.textContent = "Gallery '" + galleryName + "' not found";
    const galleryDesc = document.getElementById("galleryDesc");
    galleryDesc.textContent =
      "The requested gallery doesn't exist. Check available galleries via menu";
    throw new Error("Gallery not found");
  }
}

function createGallery() {
  const galleryName = getUrlParameter("g");
  const gallery = galleries[galleryName];
  for (const galleryImage of gallery) {
    const galleryContainer = document.getElementById("galleryContainer");
    const div = document.createElement("div");
    div.className = "card";
    const a = document.createElement("a");
    a.href = galleryImage.src;
    a.dataset.lightbox = "gallery";
    a.dataset.title = galleryImage.title;
    div.appendChild(a);
    const img = document.createElement("img");
    img.src = galleryImage.src;
    img.alt = galleryImage.title;
    img.className = "card-img-top img-thumbnail";
    a.appendChild(img);
    galleryContainer.appendChild(div);
  }
}

function createGalleryHeader() {
  const galleryName = getUrlParameter("g");
  const galleryTitle = document.getElementById("galleryTitle");
  galleryTitle.textContent = galleryName;
  const galleryDesc = document.getElementById("galleryDesc");
  galleryDesc.textContent = galleryName;
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.lightbox = lightbox;
window["$"] = $;
window["jQuery"] = $;
window["jquery"] = $;
