import { Button, Dialog, Modal, Text } from "@mantine/core";
import { useItemsStore } from "@/data/store";
import { sampleData } from "@/data";
import { usePocket } from "@/components/providers/PocketContext";
import { useEffect, useState, useTransition } from "react";
import { ScheduleDayItemPayload } from "@/types";
import { deserializePayload, preparePayload } from "@/utils";

export const FillWithSampleDataDialog = () => {
  const [isRequestPending, startRequestTransition] = useTransition();
  const [stateKey, setStateKey] = useState<"fill" | "transfer">();

  const itemsList = useItemsStore((state) => state.itemsList);
  const fillItems = useItemsStore((state) => state.fillItems);
  const { pb, user } = usePocket();

  function fillWithSampleData() {
    fillItems(sampleData);
    setStateKey(undefined);
  }

  async function saveTemporaryItems() {
    startRequestTransition(async () => {
      const promises = itemsList.map(async (item) => {
        const payload: ScheduleDayItemPayload = preparePayload(
          item,
          pb?.authStore.model,
          true,
        );
        await pb
          ?.collection("miniSchedule")
          .create(payload, { $autoCancel: false });
      });
      await Promise.all(promises);
      setStateKey(undefined);
    });
  }

  function clearTemporaryItems() {
    fillItems([]);
    setStateKey(undefined);
  }

  useEffect(() => {
    if (!user) {
      if (!itemsList.length) {
        setStateKey("fill");
      }
      return;
    } else {
      setStateKey(undefined);
    }

    pb
      ?.collection<ScheduleDayItemPayload>("miniSchedule")
      .getList(1, 50, {
        filter: `regular = true || endDate >= '${new Date().toISOString().split("T")[0]}'`,
      })
      .then((resultList) => {
        if (resultList?.items && resultList?.items.length > 0) {
          fillItems(resultList?.items.map(deserializePayload));
          setStateKey(undefined);
        } else if (itemsList.length > 0) {
          setStateKey("transfer");
        }
      });
  }, [user?.id]);

  useEffect(() => {
    if (user) return;
    setStateKey(itemsList.length > 0 ? undefined : "fill");
  }, [itemsList]);

  return (
    <>
      <Dialog
        opened={stateKey === "fill"}
        withCloseButton
        onClose={() => setStateKey(undefined)}
      >
        <Text mb="xs" fw={600}>
          Your timetable is empty
        </Text>

        <div className="flex flex-end items-center">
          <Text size="sm" style={{ flex: 1 }}>
            Would you like to fill it with sample data?
          </Text>
          <Button onClick={fillWithSampleData}>Fill it</Button>
        </div>
      </Dialog>

      <Modal
        opened={stateKey === "transfer"}
        onClose={() => setStateKey(undefined)}
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        title={"Current data is not saved!"}
      >
        <div className={"flex flex-col gap-4"}>
          <Text size="sm">
            The data is in local storage now. It will be erased after logout.
            Would you like to add it to your account?
          </Text>

          <div className="flex gap-2 w-full">
            <Button
              className={"grow"}
              onClick={saveTemporaryItems}
              loading={isRequestPending}
            >
              Save
            </Button>
            <Button
              className={"grow"}
              onClick={clearTemporaryItems}
              color={"red"}
              variant={"light"}
              disabled={isRequestPending}
            >
              Clear
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
