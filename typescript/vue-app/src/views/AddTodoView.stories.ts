import type { Meta, StoryObj } from '@storybook/vue3';
import AddTodoView from '@/views/AddTodoView.vue';

const meta: Meta<typeof AddTodoView> = {
  component: AddTodoView
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof AddTodoView>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { AddTodoView },
    setup() {
      return { args };
    },
    template: '<AddTodoView v-bind="args" />'
  }),
  args: {
    //👇 The args you need here will depend on your component
  }
};
