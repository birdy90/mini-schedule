import { Meta, ReactRenderer, StoryObj } from "@storybook/react";
import { testDayItem } from "@/stories/data";
import { MantineProvider } from "@mantine/core";
import { Day } from "@/components/schedule/day";
import { toSimplifiedItem } from "@/utils";
import { OrientationProvider } from "@/components/providers/OrientationContext";
import { DecoratorFunction } from "@storybook/csf";
import { useDraggingStore } from "@/data/store";
import { useEffect } from "react";

const meta = {
  title: "Calendar/Day",
  component: Day,
  args: {
    items: [toSimplifiedItem(testDayItem)],
  },
  decorators: [
    (Story) => {
      const { allowDragging, cancelDragging } = useDraggingStore();
      useEffect(() => {
        cancelDragging();
        return () => allowDragging();
      }, []);

      return (
        <MantineProvider>
          <Story />
        </MantineProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const verticalDecorator: DecoratorFunction<ReactRenderer> = (Story) => (
  <OrientationProvider orientation={"vertical"}>
    <div className={"h-[calc(100dvh-2rem)] w-20"}>
      <Story />
    </div>
  </OrientationProvider>
);

const horizontalDecorator: DecoratorFunction<ReactRenderer> = (Story) => (
  <OrientationProvider orientation={"horizontal"}>
    <div className={"w-full h-20"}>
      <Story />
    </div>
  </OrientationProvider>
);

export const Horizontal: Story = {
  decorators: [horizontalDecorator],
};

export const Vertical: Story = {
  decorators: [verticalDecorator],
};

export const HorizontalToday: Story = {
  args: {
    index: new Date().getDay() || 7,
  },
  decorators: [horizontalDecorator],
};

export const VerticalToday: Story = {
  args: {
    index: new Date().getDay() || 7,
  },
  decorators: [verticalDecorator],
};
