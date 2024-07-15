import { ActionIcon, Modal } from "@mantine/core";
import { usePocket } from "@/components/providers/PocketContext";
import { useItemsStore } from "@/data/store";
import { useDisclosure } from "@mantine/hooks";
import { AddModal } from "@/components/schedule/modal/addModal";
import { BiPlus } from "react-icons/bi";

export const AddItemButton = () => {
  const { initialized } = usePocket();
  const [modalOpened, modalActions] = useDisclosure(false);
  const setEditedItem = useItemsStore((state) => state.setEditedItem);

  function addItemModalShow() {
    setEditedItem(undefined);
    modalActions.open();
  }

  return (
    initialized && (
      <>
        <ActionIcon aria-label="Add item" onClick={addItemModalShow}>
          <BiPlus />
        </ActionIcon>

        <Modal
          opened={modalOpened}
          onClose={modalActions.close}
          title="Add New Item"
        >
          <AddModal actions={modalActions} />
        </Modal>
      </>
    )
  );
};
