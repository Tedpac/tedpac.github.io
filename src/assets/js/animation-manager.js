/* global ResizeObserver, VANTA */

const ANIMATION_CONTAINER_ID = "animation-container";

/** Delay in milliseconds to debounce the animation resize event. */
const ANIMATION_RESIZE_DEBOUNCE_DELAY = 200;

/**
 * The animation breakpoints are objects that contain the properties to adjust the animation's
 * appearance on different screen sizes. The default Bootstrap breakpoints are used as a basis:
 * https://getbootstrap.com/docs/5.3/layout/grid/#grid-options
 *
 * Each animation breakpoint has the following properties:
 * - minWidth: the minimum width of the viewport for the breakpoint.
 * - size: affects the size of the animation by a scale factor.
 * - brightness: the brightness of the animation.
 * - yOffset: the vertical offset of the animation.
 */
const ANIMATION_BREAKPOINTS = [
  { minWidth: 1400, size: 1, brightness: 0.8, yOffset: 0 }, // xxl
  { minWidth: 1200, size: 0.9, brightness: 0.75, yOffset: 0 }, // xl
  { minWidth: 992, size: 0.9, brightness: 0.7, yOffset: 0 }, // lg
  { minWidth: 768, size: 0.8, brightness: 0.6, yOffset: 0.06 }, // md
  { minWidth: 576, size: 0.8, brightness: 0.55, yOffset: 0.065 }, // sm
  { minWidth: 0, size: 0.7, brightness: 0.55, yOffset: 0.055 }, // xs
];

const DEFAULT_ANIMATION_OPTIONS = {
  mouseControls: true,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  backgroundColor: 0x0,
};

/**
 * Creates a debounced function that delays the invocation of the provided function. It is useful
 * for functions that are triggered by events that occur very quickly.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay the function call.
 *
 * @returns {Function} Returns a new debounced function.
 */
function debounce(func, delay) {
  let debounceTimer;
  return function (/** @type {any} */ ...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

class AnimationManager {
  #animationContainer = document.getElementById(ANIMATION_CONTAINER_ID);
  #animation = null;
  #lastDrawnViewportWidth = null;

  /**
   * Returns the width of the viewport. It is primarily used for calculating the size of the
   * animation, as the animation container occupies the entire viewport when there aren't scroll
   * bars present. This approach helps prevent the animation from resizing when the vertical scroll
   * bar appears or disappears.
   *
   * @returns {number} The width of the viewport.
   */
  static getViewportWidth() {
    return window.innerWidth;
  }

  /**
   * Returns the animation breakpoint based on the current viewport width.
   *
   * @see {@link ANIMATION_BREAKPOINTS}
   *
   * @returns {Object} The animation breakpoint.
   */
  static getAnimationBreakpoint() {
    return ANIMATION_BREAKPOINTS.find(
      (breakpoint) => AnimationManager.getViewportWidth() >= breakpoint.minWidth
    );
  }

  #drawAnimation() {
    const animationBreakpoint = AnimationManager.getAnimationBreakpoint();

    // @ts-ignore
    this.#animation = VANTA.HALO({
      ...DEFAULT_ANIMATION_OPTIONS,
      el: this.#animationContainer,
      size: animationBreakpoint.size,
      yOffset: animationBreakpoint.yOffset,
    });

    this.#animationContainer.style.filter = `brightness(${animationBreakpoint.brightness})`;
    this.#lastDrawnViewportWidth = AnimationManager.getViewportWidth();
  }

  #eraseAnimation() {
    if (this.#animation !== null) {
      this.#animation.destroy();
      this.#animation = null;
    }
  }

  #redrawAnimation() {
    // It is not necessary to redraw the animation if the viewport width has not changed.
    if (AnimationManager.getViewportWidth() !== this.#lastDrawnViewportWidth) {
      this.#eraseAnimation();
      this.#drawAnimation();
    }
  }

  /**
   * Redraws the animation when there is a change in the size of the animation container, which
   * allows the animation to be responsive. The debouncing technique is used to prevent redrawing
   * from being triggered too frequently.
   */
  #redrawAnimationOnResize() {
    const debouncedRedrawAnimation = debounce(
      this.#redrawAnimation.bind(this),
      ANIMATION_RESIZE_DEBOUNCE_DELAY
    );
    new ResizeObserver((entries, observer) => {
      debouncedRedrawAnimation();
    }).observe(this.#animationContainer);
  }

  startAnimation() {
    if (this.#animation !== null) {
      throw new Error("The animation has already been started.");
    }

    this.#drawAnimation();
    this.#redrawAnimationOnResize();
  }
}

export { AnimationManager };
