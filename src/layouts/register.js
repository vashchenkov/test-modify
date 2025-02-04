import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */
export function registerLayouts(app) {
  const layouts = [DefaultLayout];

  Object.entries(layouts).forEach(([, layout]) => {
    if (layout !== undefined)
      app.component(layout.__name, defineComponent(layout));
  });
}
