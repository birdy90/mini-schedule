import { TimeRangeBlock } from "@/components/schedule/modal/timeRangeBlock";
import { useForm } from "@tanstack/react-form";
import {
  BaseModalProps,
  ScheduleDayItemPayload,
  SimplifiedScheduleDayItem,
} from "@/types";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  dateRangeToTimeIndex,
  deserializePayload,
  fromSimplifiedItem,
  preparePayload,
  toSimplifiedItem,
} from "@/utils/schedule";
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
import { ChangeEvent, useState } from "react";
import { useItemsStore } from "@/data/store";
import { usePocket } from "@/components/providers/PocketContext";
import { daysOfWeek } from "@/data";
import { BsTrash } from "react-icons/bs";

export const AddModal = (props: BaseModalProps) => {
  const { pb, user } = usePocket();
  const [isApiPending, setApiTransition] = useState(false);
  const editedItem = useItemsStore((state) => state.editedItem);
  const clearEditedItem = useItemsStore((state) => state.clearEditedItem);
  const addItem = useItemsStore((state) => state.addItem);
  const updateItem = useItemsStore((state) => state.updateItem);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const today = new Date();

  const datesIntervalValue = [
    new Date(`2024-06-20 ${Math.max(Math.min(today.getHours(), 23), 8)}:00:00`),
    new Date(
      `2024-06-20 ${Math.max(Math.min(today.getHours(), 23), 8) + 1}:00:00`,
    ),
  ] as [Date, Date];

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: editedItem
      ? toSimplifiedItem(editedItem)
      : ({
          title: "",
          timeRange: dateRangeToTimeIndex(datesIntervalValue),
          regular: true,
          background: false,
          day: new Date().getDay() || 7,
        } as SimplifiedScheduleDayItem),
    onSubmit: ({ value }) => {
      setApiTransition(true);

      try {
        const id = value.id;

        const data = fromSimplifiedItem(value);
        const payload: ScheduleDayItemPayload = preparePayload(
          data,
          pb?.authStore.model,
        );

        if (id === undefined) {
          const temporalId = "temp-id";
          if (user) {
            pb
              ?.collection("miniSchedule")
              .create<ScheduleDayItemPayload>(payload)
              .then((newItem) => {
                updateItem(temporalId, deserializePayload(newItem));
              });
          }
          addItem({ ...data, id: temporalId });
        } else {
          if (user) {
            pb?.collection("miniSchedule").update(id, payload);
          }
          updateItem(data.id, data);
        }

        clearEditedItem();
      } catch {
        setApiTransition(false);
      } finally {
        props.actions.close();
      }
    },
  });

  async function handleDeletion() {
    if (!editedItem || !editedItem.id) return;

    setApiTransition(true);

    try {
      if (user) {
        await pb?.collection("miniSchedule").delete(editedItem.id);
      }
      deleteItem(editedItem);
    } catch {
      setApiTransition(false);
    } finally {
      props.actions.close();
    }
  }

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
                    defaultValue={daysOfWeek[data.values.day - 1]}
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
        <Button onClick={form.handleSubmit} loading={isApiPending}>
          Save
        </Button>
        {editedItem && (
          <ActionIcon
            size={"lg"}
            color={"red"}
            aria-label="Delete item"
            loading={isApiPending}
            onClick={handleDeletion}
          >
            <BsTrash />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
