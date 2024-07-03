'use client';

import {ScheduleDayItem} from "@/types";
import {useEffect, useState} from "react";
import {useScheduleData} from "@/hooks/useScheduleData";
import {BiPlus} from "@react-icons/all-files/bi/BiPlus";
import {ActionIcon} from "@mantine/core";
import {Week} from "@/components/schedule/week";

export default function Home() {
  // const store = useModalStore();

  // const { $pb } = useNuxtApp();

  // const authData = useState<Pick<BaseAuthStore, "token" | "model">>({
  //   token: "",
  //   model: null,
  // });
  const [initialized, setInitialized] = useState(false);
  const [storedItems, setStoredItems] = useScheduleData();

  // const isAuthorized = computed(() => {
  //   return authData.value && authData.value.token && authData.value.model;
  // });

  function addItemModalShow() {
    // store.openModal({ component: AddItemModal });
  }

  function onAddItem(item: ScheduleDayItem) {
    // storedItems.value.push(item);
  }

  async function onLogin() {
    // await $pb.collection("users").authWithOAuth2({ provider: "google" });
  }

  async function onLogout() {
    // $pb.authStore.clear();
  }

  useEffect(() => {
    setInitialized(true);

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
            <div className="flex justify-center items-center gap-4">
              <h1 className="h2 text-center">Mini Schedule</h1>
              <ActionIcon aria-label="Add item" onClick={addItemModalShow}>
                <BiPlus />
              </ActionIcon>
            </div>

            {/*    <template v-if="initialized">*/}
            {/*      <UiButton v-if="isAuthorized" onClick="onLogout">Logout</UiButton>*/}
            {/*    <UiButton v-else onClick="onLogin">Login</UiButton>*/}
            {/*</template>*/}
          </div>

          <Week items={storedItems} />

          <div className="text-sm">Grigorii Bederdinov @ 2024</div>
        </main>
      </>
  );
}
