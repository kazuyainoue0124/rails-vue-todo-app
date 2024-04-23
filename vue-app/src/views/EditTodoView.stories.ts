import type { Meta, StoryObj } from '@storybook/vue3';
import EditTodoView from '@/views/EditTodoView.vue';

const meta: Meta<typeof EditTodoView> = {
  component: EditTodoView
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof EditTodoView>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { EditTodoView },
    setup() {
      return { args };
    },
    template: '<EditTodoView v-bind="args" />'
  }),
  args: {
    //👇 The args you need here will depend on your component
  }
};
