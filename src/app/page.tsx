"use client";

import { useEffect } from "react";
import { Week } from "@/components/schedule/week";
import { useItemsStore } from "@/data/store";
import { FillWithSampleDataDialog } from "@/components/mainPage/fillWithSampleDataDialog";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const items = useItemsStore((state) =>
    state.itemsList.filter(
      (t) =>
        t.regular ||
        t.endDate.getTime() >=
          Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000)),
    ),
  );
  const { initializeItems, initialized } = useItemsStore();

  useEffect(() => {
    initializeItems();
  }, [initializeItems]);

  return (
    <>
      <main className="flex flex-col h-dvh p-2 gap-2 text-sm mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <MdOutlineCalendarMonth
              className={"size-6 aspect-square text-main-800"}
            />
            <h1 className="h2 hidden sm:block text-center">Mini Schedule</h1>
          </div>
        </div>

        <div className={"relative grow"}>
          <Week items={items} />

          {initialized && <FillWithSampleDataDialog />}
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
