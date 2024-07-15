"use client";

import { useEffect, useTransition } from "react";
import { ActionIcon, Button, LoadingOverlay } from "@mantine/core";
import { Week } from "@/components/schedule/week";
import { useItemsStore } from "@/data/store";
import { usePocket } from "@/components/providers/PocketContext";
import { AddItemButton } from "@/components/mainPage/addItemButton";
import { FillWithSampleDataDialog } from "@/components/mainPage/fillWithSampleDataDialog";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [isAuthPending, startAuthTransition] = useTransition();

  const { user, initialized, logout, loginWithProvider } = usePocket();
  const isAuthorized = !!user;

  const items = useItemsStore((state) =>
    state.itemsList.filter(
      (t) =>
        t.regular ||
        t.endDate.getTime() >=
          Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000)),
    ),
  );
  const initializeItems = useItemsStore((state) => state.initializeItems);
  const fillItems = useItemsStore((state) => state.fillItems);

  async function onLogin() {
    startAuthTransition(async () => {
      await loginWithProvider("google");
    });
  }

  async function onLogout() {
    fillItems([]);
    logout();
  }

  useEffect(() => {
    initializeItems();
  }, []);

  return (
    <>
      <main className="flex flex-col h-dvh p-2 gap-2 text-sm mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <MdOutlineCalendarMonth
              className={"size-6 aspect-square text-main-800"}
            />
            <h1 className="h2 text-center">Mini Schedule</h1>
            <AddItemButton />
          </div>

          {initialized && (
            <div className={"flex items-center gap-2"}>
              <div>
                {isAuthorized ? user?.name || user?.email : "Login with:"}
              </div>
              {isAuthorized ? (
                <Button
                  key={"logout"}
                  size={"xs"}
                  onClick={onLogout}
                  loading={isAuthPending}
                >
                  Logout
                </Button>
              ) : (
                <ActionIcon
                  key={"login"}
                  onClick={onLogin}
                  loading={isAuthPending}
                >
                  <FaGoogle />
                </ActionIcon>
              )}
            </div>
          )}
        </div>

        <div className={"relative grow"}>
          <LoadingOverlay
            visible={!initialized || isAuthPending}
            loaderProps={{ children: "Loading..." }}
          />

          <Week items={initialized ? items : []} />

          <FillWithSampleDataDialog />
        </div>

        <div className="text-sm">
          <Link href={"https://bederdinov.me"} target={"_blank"}>
            Grigorii Bederdinov
          </Link>{" "}
          @ 2024
        </div>
      </main>
    </>
  );
}
