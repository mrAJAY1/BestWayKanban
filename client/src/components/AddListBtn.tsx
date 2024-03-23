import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import AddListModal from "./AddListModal";

const AddListBtn = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-5 py-3 flex items-center gap-3 justify-center bg-secondary-500 rounded-lg flex-shrink-0 h-fit"
      >
        <span>Add Another List</span>
        <PlusCircle size={20} />
      </button>
      <AddListModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default AddListBtn;
