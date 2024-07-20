import type { Meta, StoryObj } from "@storybook/react";
import Select from "../molecules/Select";
import "@ds.p/scss/lib/Select.css";
import React from "react";

const options = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "grey", label: "Grey" },
];

const renderOptionExample = ({ option, getOptionRecommendedProps }) => (
  <p {...getOptionRecommendedProps({ className: "custom" })}>{option.label}</p>
);

const meta: Meta<typeof Select> = {
  title: "Example/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component: "Select component for choosing an option from a dropdown.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label for the select component" },
    options: { control: "object", description: "Options for the select dropdown" },
    renderOption: {
      control: false,
      description: "Custom render function for options",
      table: {
        type: { summary: "function" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options,
  },
};

export const Custom: Story = {
  args: {
    options,
    renderOption: renderOptionExample,
  },
  parameters: {
    docs: {
      source: {
        code: `
<Select
  options={[
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
    { value: "grey", label: "Grey" },
  ]}
  renderOption={({ option, getOptionRecommendedProps }) => (
    <p {...getOptionRecommendedProps({ className: "custom" })}>
      {option.label}
    </p>
  )}
/>
        `,
      },
    },
  },
};
