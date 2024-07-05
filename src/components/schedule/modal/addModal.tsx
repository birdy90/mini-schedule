import { TimeRangeBlock } from "@/components/schedule/modal/timeRangeBlock";
import { useForm } from "@tanstack/react-form";
import { PlainScheduleDayItem, ScheduleDayItem } from "@/types";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { dateRangeToTimeIndex, fromPlainItem, toPlainItem } from "@/utils";
import { z } from "zod";
import {
  ActionIcon,
  Button,
  Checkbox,
  Input,
  SegmentedControl,
  Timeline,
} from "@mantine/core";
import { Day } from "@/components/schedule/day";
import { useAtom } from "jotai";
import { editedItemAtom } from "@/data/stores";
import { ChangeEvent } from "react";
import { BsTrash } from "@react-icons/all-files/bs/BsTrash";

interface AddModalProps {
  onSave?: (item: ScheduleDayItem) => void;
}

export const AddModal = (props: AddModalProps) => {
  const [editedItem, setEditedItem] = useAtom(editedItemAtom);
  const today = new Date();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const datesIntervalValue = [
    new Date(`2024-06-20 ${Math.max(Math.min(today.getHours(), 23), 8)}:00:00`),
    new Date(
      `2024-06-20 ${Math.max(Math.min(today.getHours(), 23), 8) + 1}:00:00`,
    ),
  ] as [Date, Date];

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: editedItem
      ? toPlainItem(editedItem)
      : ({
          title: "",
          timeRange: dateRangeToTimeIndex(datesIntervalValue),
          regular: true,
          background: false,
          day: new Date().getDay() || 7,
        } as PlainScheduleDayItem),
    onSubmit: async ({ value }) => {
      setEditedItem(undefined);
      props.onSave?.(fromPlainItem(value));
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <form.Field
        validators={{ onChange: z.string().min(1, "Event name is required") }}
        name="title"
        children={(field) => {
          const error =
            field.state.meta.errors.length && field.state.meta.errors[0];
          return (
            <div className="flex flex-col">
              <Input.Wrapper label="Event name" required={true} error={error}>
                <Input
                  id="title-input"
                  error={field.state.meta.errors[0]}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Put event name here"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Input.Wrapper>
            </div>
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state]}
        children={([data]) => (
          <>
            <div className="flex flex-col gap-1">
              <Timeline />
              <Day
                items={[{ ...data.values, preview: true }]}
                className="h-14"
              />
            </div>

            <form.Field
              name="day"
              children={(field) => (
                <div>
                  <SegmentedControl
                    fullWidth
                    color="main"
                    data={daysOfWeek}
                    onChange={(name: string) => {
                      field.handleChange(
                        daysOfWeek.findIndex((t) => name === t) + 1,
                      );
                    }}
                  />
                </div>
              )}
            />

            <form.Field
              name="timeRange"
              children={(field) => (
                <TimeRangeBlock field={field} subscriptionData={data} />
              )}
            />

            <form.Field
              name="regular"
              children={(field) => (
                <Checkbox
                  id="regular-input"
                  checked={field.state.value as boolean}
                  label="Is a regular event"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    field.handleChange((e.target as HTMLInputElement).checked)
                  }
                />
              )}
            />

            <form.Field
              name="background"
              children={(field) => (
                <Checkbox
                  id="background-input"
                  checked={field.state.value as boolean}
                  label="Is a background event"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    field.handleChange((e.target as HTMLInputElement).checked)
                  }
                />
              )}
            />
          </>
        )}
      />

      <div className={"flex justify-between"}>
        <Button onClick={form.handleSubmit}>Save</Button>
        {editedItem && (
          <ActionIcon
            size={"lg"}
            color={"red"}
            aria-label="Delete item"
            onClick={form.handleSubmit}
          >
            <BsTrash />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
