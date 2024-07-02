(() => {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        for (const e of selectEl) {
          e.addEventListener(type, listener);
        }
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      const section = select(this.hash);
      if (section) {
        e.preventDefault();

        const navbar = select("#navbar");
        const header = select("#header");
        const sections = select("section", true);
        const navlinks = select("#navbar .nav-link", true);

        for (const item of navlinks) {
          item.classList.remove("active");
        }

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          const navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        if (this.hash == "#header") {
          header.classList.remove("header-top");
          for (const item of sections) {
            item.classList.remove("section-show");
          }
          return;
        }

        if (!header.classList.contains("header-top")) {
          header.classList.add("header-top");
          setTimeout(() => {
            for (const item of sections) {
              item.classList.remove("section-show");
            }
            section.classList.add("section-show");
          }, 350);
        } else {
          for (const item of sections) {
            item.classList.remove("section-show");
          }
          section.classList.add("section-show");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const initial_nav = select(window.location.hash);

      if (initial_nav) {
        const header = select("#header");
        const navlinks = select("#navbar .nav-link", true);

        header.classList.add("header-top");

        for (const item of navlinks) {
          if (item.getAttribute("href") == window.location.hash) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        }

        setTimeout(() => {
          initial_nav.classList.add("section-show");
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  const skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: (direction) => {
        const progress = select(".progress .progress-bar", true);
        for (const el of progress) {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        }
      },
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      const portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          for (const el of portfolioFilters) {
            el.classList.remove("filter-active");
          }
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();
