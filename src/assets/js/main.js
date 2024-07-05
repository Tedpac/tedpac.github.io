import { initializeTemplateCore } from "./template-core.js";
import { AnimationManager } from "./animation-manager.js";
import { initializeEmailAddressHandler } from "./email-address-handler.js";

initializeTemplateCore();

const animationManager = new AnimationManager();
animationManager.startAnimation();

initializeEmailAddressHandler();

// Navigate to the header when the name link is clicked.
document.getElementById("name-link").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("header-link").click();
});

// Navigate to the contact section when the "contact me" link is clicked.
document.getElementById("contact-me-link").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("contact-link").click();
});
