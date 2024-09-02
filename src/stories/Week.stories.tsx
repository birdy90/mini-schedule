import { Meta, StoryObj } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import { Week } from "@/components/schedule/week";
import { OrientationProvider } from "@/components/providers/OrientationContext";
import { testWeekItems } from "@/stories/data";

const meta = {
  title: "Calendar/Week",
  component: Week,
  decorators: [
    (Story) => {
      return (
        <MantineProvider>
          <div className={"w-full h-[calc(100dvh-2rem)]"}>
            <Story />
          </div>
        </MantineProvider>
      );
    },
  ],
} satisfies Meta<typeof Week>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    items: testWeekItems,
  },
  decorators: [
    (Story) => (
      <OrientationProvider orientation={"horizontal"}>
        <Story />
      </OrientationProvider>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    items: testWeekItems,
  },
  decorators: [
    (Story) => (
      <OrientationProvider orientation={"vertical"}>
        <Story />
      </OrientationProvider>
    ),
  ],
};
