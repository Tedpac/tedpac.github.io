import { initializeTemplateCore } from "./template-core.js";
import { AnimationManager } from "./animation-manager.js";
import { initializeEmailAddressHandler } from "./email-address-handler.js";

initializeTemplateCore();

const animationManager = new AnimationManager();
animationManager.startAnimation();

initializeEmailAddressHandler();
