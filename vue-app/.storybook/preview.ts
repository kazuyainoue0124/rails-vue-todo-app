import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3';
import { withVuetifyTheme } from './withVuetifyTheme.decorator';
import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia';

const pinia = createPinia();
setup((app) => {
  app.use(pinia)
});

setup((app) => {
  app.use(vuetify)
});

const preview: Preview = {
  parameters: {
    decorators: { withVuetifyTheme },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
