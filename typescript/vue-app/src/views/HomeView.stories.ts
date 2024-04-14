import type { Meta, StoryObj } from '@storybook/vue3';
import HomeView from '@/views/HomeView.vue';

const meta: Meta<typeof HomeView> = {
  component: HomeView
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof HomeView>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { HomeView },
    setup() {
      return { args };
    },
    template: '<HomeView v-bind="args" />'
  }),
  args: {
    //👇 The args you need here will depend on your component
  }
};
