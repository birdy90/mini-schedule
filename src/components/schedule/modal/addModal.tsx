import { useForm, Validator } from "@tanstack/react-form";
import {
  BaseModalProps,
  ScheduleDayItem,
  ScheduleDayItemPayload,
} from "@/types";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { deserializePayload, preparePayload } from "@/utils/schedule";
import { z } from "zod";
import { ActionIcon, Button, Checkbox, Input, Popover } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useDraggingStore, useItemsStore } from "@/data/store";
import { usePocket } from "@/components/providers/PocketContext";
import { BsTrash } from "react-icons/bs";
import { format } from "date-fns";

export const AddModal = (props: BaseModalProps) => {
  const { allowDragging, cancelDragging } = useDraggingStore();
  const { pb, user } = usePocket();
  const [isApiPending, setApiTransition] = useState(false);
  const { editedItem, clearEditedItem, addItem, updateItem, deleteItem } =
    useItemsStore();

  const form = useForm<ScheduleDayItem, Validator<ScheduleDayItem>>({
    validatorAdapter: zodValidator(),
    defaultValues: editedItem ?? {
      title: "",
      regular: true,
      background: false,
      startDate: new Date(),
      endDate: new Date(),
    },
    onSubmit: ({ value }) => {
      setApiTransition(true);

      try {
        const id = value.id;

        const payload: ScheduleDayItemPayload = preparePayload(
          value,
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
          addItem({ ...value, id: temporalId });
        } else {
          if (user) {
            pb?.collection("miniSchedule").update(id, payload);
          }
          updateItem(value.id, value);
        }

        clearEditedItem();
      } catch (e) {
        console.error(e);
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

  useEffect(() => {
    cancelDragging();
    return () => allowDragging();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <form.Field
        validators={{ onChange: z.string().min(1, "Event name is required") }}
        name="title"
      >
        {(field) => {
          const error =
            field.state.meta.errors.length && field.state.meta.errors[0];
          return (
            <div className="flex flex-col">
              <Input.Wrapper
                label="Event name"
                description={
                  form.state.values.startDate &&
                  form.state.values.endDate && (
                    <>
                      {format(form.state.values.startDate, "iiii")}
                      ,&nbsp;
                      {format(form.state.values.startDate, "p")}
                      &nbsp;&mdash;&nbsp;
                      {format(form.state.values.endDate, "p")}
                    </>
                  )
                }
                required={true}
                error={error}
              >
                <Input
                  data-autofocus
                  error={field.state.meta.errors[0]}
                  name={field.name}
                  value={field.state.value}
                  placeholder="Put event name here"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && form.handleSubmit()}
                />
              </Input.Wrapper>
            </div>
          );
        }}
      </form.Field>

      <form.Field name="regular">
        {(field) => (
          <Checkbox
            id="regular-input"
            checked={field.state.value as boolean}
            label="Is a regular event"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              field.handleChange((e.target as HTMLInputElement).checked)
            }
          />
        )}
      </form.Field>

      <form.Field name="background">
        {(field) => (
          <Checkbox
            id="background-input"
            checked={field.state.value as boolean}
            label="Is a background event"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              field.handleChange((e.target as HTMLInputElement).checked)
            }
          />
        )}
      </form.Field>

      <div className={"flex justify-between"}>
        <Button onClick={form.handleSubmit} loading={isApiPending}>
          Save
        </Button>
        {editedItem && (
          <Popover position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon
                size={"lg"}
                color={"red"}
                aria-label="Delete item"
                loading={isApiPending}
              >
                <BsTrash />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Button onClick={handleDeletion} color={"red"} size={"xs"}>
                Confirm
              </Button>
            </Popover.Dropdown>
          </Popover>
        )}
      </div>
    </div>
  );
};
