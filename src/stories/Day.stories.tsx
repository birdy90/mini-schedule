import { DayItem } from "@/components/schedule/dayItem";
import { Meta, StoryObj } from "@storybook/react";
import { dayItem } from "@/stories/data";
import { toSimplifiedItem } from "@/utils";
import { MantineProvider } from "@mantine/core";

const meta = {
  title: "Calendar/Day",
  component: DayItem,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
} satisfies Meta<typeof DayItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    item: toSimplifiedItem(dayItem),
  },
};

export const RegularBackground: Story = {
  args: {
    item: {
      ...toSimplifiedItem(dayItem),
      background: true,
    },
  },
};

export const Eventual: Story = {
  args: {
    item: {
      ...toSimplifiedItem(dayItem),
      regular: false,
    },
  },
};

export const EventualBackground: Story = {
  args: {
    item: {
      ...toSimplifiedItem(dayItem),
      regular: false,
      background: true,
    },
  },
};
