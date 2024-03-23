import { ChatCircle, Paperclip, PlusCircle } from "@phosphor-icons/react";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import { ListType } from "@/contexts/ListContext";

const ListActions = ({ list }: { list: ListType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex items-center gap-5">
      <button className="flex items-center gap-5 flex-grow" onClick={openModal}>
        <PlusCircle
          size={28}
          weight="fill"
          className=" fill-slate-600 rounded-full"
        />
        <span>Add Card</span>
      </button>
      <AddTaskModal isOpen={isOpen} closeModal={closeModal} list={list} />
      <div className="flex gap-2 items-center text-slate-800">
        <button className="flex items-center">
          <span>1</span>
          <ChatCircle size={24} />
        </button>
        <button className="flex items-center">
          <span>1</span>
          <Paperclip size={24} />
        </button>
        A
      </div>
    </div>
  );
};

export default ListActions;
