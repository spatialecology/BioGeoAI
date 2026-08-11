const galleryItems = [

  // First image = large featured rectangle
  {
    image: "",
    location: "",
    story: ""
  },

  // Images below = square gallery
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" },
  { image: "", location: "", story: "" }

];


document.addEventListener("DOMContentLoaded", function () {

  const featured = document.getElementById("gallery-featured");
  const grid = document.getElementById("gallery-grid");

  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("gallery-modal-image");
  const locationEl = document.getElementById("gallery-location");
  const storyEl = document.getElementById("gallery-story");
  const closeButton = document.querySelector(".gallery-close");


  function applyImage(element, item) {

    if (!item.image) return;

    element.style.backgroundImage =
      `url("${item.image}")`;

    element.classList.add("has-image");
  }


  function openModal(item) {

    if (!modal) return;

    modalImage.style.backgroundImage =
      item.image
        ? `url("${item.image}")`
        : "";

    locationEl.textContent =
      item.location || "";

    storyEl.textContent =
      item.story || "";

    locationEl.hidden = !item.location;
    storyEl.hidden = !item.story;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }


  function closeModal() {

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }


  /* FEATURED RECTANGLE */

  const featuredItem = galleryItems[0];

  if (featured && featuredItem) {

    applyImage(featured, featuredItem);

    featured.addEventListener("click", function () {
      openModal(featuredItem);
    });

    featured.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        openModal(featuredItem);
      }
    });
  }


  /* SQUARES */

  if (grid) {

    galleryItems.slice(1).forEach(function (item, index) {

      const square = document.createElement("button");

      square.type = "button";

      square.className =
        `gallery-square photo-slot gallery-tone-${(index % 4) + 1}`;

      square.setAttribute(
        "aria-label",
        `Open photograph ${index + 1}`
      );

      applyImage(square, item);

      square.addEventListener("click", function () {
        openModal(item);
      });

      grid.appendChild(square);
    });
  }


  closeButton?.addEventListener(
    "click",
    closeModal
  );


  modal?.addEventListener(
    "click",
    function (event) {
      if (event.target === modal) {
        closeModal();
      }
    }
  );


  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
  );

});
