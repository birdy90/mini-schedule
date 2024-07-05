"use client";

import { useEffect, useState } from "react";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import { ActionIcon, Button, Modal } from "@mantine/core";
import { Week } from "@/components/schedule/week";
import { useDisclosure } from "@mantine/hooks";
import { AddModal } from "@/components/schedule/modal/addModal";
import { useItemsStore } from "@/data/store";
import { sampleData } from "@/data";

export default function Home() {
  const [modalOpened, modalActions] = useDisclosure(false);

  // const store = useModalStore();

  // const { $pb } = useNuxtApp();

  // const authData = useState<Pick<BaseAuthStore, "token" | "model">>({
  //   token: "",
  //   model: null,
  // });
  const [initialized, setInitialized] = useState(false);
  const items = useItemsStore((state) => state.itemsList);
  const setEditedItem = useItemsStore((state) => state.setEditedItem);
  const initializeItems = useItemsStore((state) => state.initializeItems);
  const fillItems = useItemsStore((state) => state.fillItems);

  // const isAuthorized = computed(() => {
  //   return authData.value && authData.value.token && authData.value.model;
  // });

  function addItemModalShow() {
    setEditedItem(undefined);
    modalActions.open();
  }

  function fillWithSampleData() {
    fillItems(sampleData);
  }

  async function onLogin() {
    // await $pb.collection("users").authWithOAuth2({ provider: "google" });
  }

  async function onLogout() {
    // $pb.authStore.clear();
  }

  useEffect(() => {
    setInitialized(true);
    initializeItems();

    // authData.value = { token: $pb.authStore.token, model: $pb.authStore.model };
    //
    // $pb.authStore.onChange((token, model) => {
    //   authData.value = { token, model };
    // });
  }, []);

  return (
    <>
      <main className="flex flex-col h-dvh p-2 gap-2 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <h1 className="h2 text-center">Mini Schedule</h1>
            {initialized && (
              <>
                <ActionIcon aria-label="Add item" onClick={addItemModalShow}>
                  <BiPlus />
                </ActionIcon>

                {items.length === 0 && (
                  <Button
                    size={"xs"}
                    variant={"light"}
                    onClick={fillWithSampleData}
                  >
                    Fill with sample data
                  </Button>
                )}
              </>
            )}
          </div>

          {/*    <template v-if="initialized">*/}
          {/*      <UiButton v-if="isAuthorized" onClick="onLogout">Logout</UiButton>*/}
          {/*    <UiButton v-else onClick="onLogin">Login</UiButton>*/}
          {/*</template>*/}
        </div>

        <Week items={items} />

        <div className="text-sm">Grigorii Bederdinov @ 2024</div>

        <Modal
          opened={modalOpened}
          onClose={modalActions.close}
          title="Add New Item"
        >
          <AddModal actions={modalActions} />
        </Modal>
      </main>
    </>
  );
}
