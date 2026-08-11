(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  const reveal = document.querySelectorAll("[data-reveal]");

  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -4% 0px"
    });

    reveal.forEach((element) => observer.observe(element));
  } else {
    reveal.forEach((element) => element.classList.add("is-visible"));
  }

  const header = document.querySelector("#quarto-header");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const brand = document.querySelector(".navbar-brand");
  if (brand) {
    brand.removeAttribute("href");
    brand.setAttribute("aria-label", "BioGeoAI");
    brand.setAttribute("tabindex", "-1");
  }
})();
