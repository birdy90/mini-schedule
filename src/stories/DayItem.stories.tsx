import { DayItem } from "@/components/schedule/dayItem";
import { Meta, StoryObj } from "@storybook/react";
import { testDayItem } from "@/stories/data";
import { toSimplifiedItem } from "@/utils";
import { MantineProvider } from "@mantine/core";
import { OrientationProvider } from "@/components/providers/OrientationContext";
import { useEffect } from "react";
import { useDraggingStore } from "@/data/store";

const meta = {
  title: "Calendar/DayItem",
  component: DayItem,
  decorators: [
    (Story) => {
      const { allowDragging, cancelDragging } = useDraggingStore();
      useEffect(() => {
        cancelDragging();
        return () => allowDragging();
      }, []);

      return (
        <MantineProvider>
          <OrientationProvider>
            <div className={"size-16"}>
              <Story />
            </div>
          </OrientationProvider>
        </MantineProvider>
      );
    },
  ],
} satisfies Meta<typeof DayItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    item: toSimplifiedItem(testDayItem),
  },
};

export const RegularBackground: Story = {
  args: {
    item: {
      ...toSimplifiedItem(testDayItem),
      background: true,
    },
  },
};

export const Eventual: Story = {
  args: {
    item: {
      ...toSimplifiedItem(testDayItem),
      regular: false,
    },
  },
};

export const EventualBackground: Story = {
  args: {
    item: {
      ...toSimplifiedItem(testDayItem),
      regular: false,
      background: true,
    },
  },
};
