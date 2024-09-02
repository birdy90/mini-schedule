import { Button, Dialog, Text } from "@mantine/core";
import { useItemsStore } from "@/data/store";
import { sampleData } from "@/data";
import { useEffect, useState } from "react";

export const FillWithSampleDataDialog = () => {
  const [stateKey, setStateKey] = useState<"fill">();
  const { itemsList, fillItems } = useItemsStore();

  function fillWithSampleData() {
    fillItems(sampleData);
    setStateKey(undefined);
  }

  useEffect(() => {
    fillWithSampleData();
  }, []);

  useEffect(() => {
    if (itemsList.length === 0) {
      setStateKey("fill");
    }
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
    </>
  );
};
