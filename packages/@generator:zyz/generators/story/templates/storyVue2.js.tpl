import <%= storyComponentName %> from "./<%= storyComponentName %>.vue";

//👇 This default export determines where your story goes in the story list
export default {
  title: "<%= storyComponentName %>",
  component: <%= storyComponentName %>,
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    variant: {
      control: {
        type: "radio",
        options: ["primary", "secondary"],
      },
    },
  },
  // “Args” are Storybook’s mechanism for defining those arguments in a single JavaScript object. 
  // Args can be used to dynamically change props, slots, styles, inputs, etc. 
  args: {},
  // Parameters are a set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons.
  parameters: {},
  // A decorator is a way to wrap a story in extra “rendering” functionality. 
  // When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
  decorators: [
    () => ({ template: '<div style="margin: 2em;"><story/></div>' }),
  ],
};

// we pass the args as the first argument to the story function. 
// The second argument is the “context” which contains things like the story parameters etc.
const Template = (args, { argTypes }) => ({
  components: { <%= storyComponentName %> },
  // props: { args },
  props: Object.keys(argTypes),
  // Storybook provides all the args in a $props variable.
  // Each arg is also available as their own name.
  template: '<<%= storyComponentName %> v-bind="$props" v-on="$props"/>',
});

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* 👇 The args you need here will depend on your component */
};
