import { Disclosure } from "@headlessui/react";
import { CaretUp, PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import BoardNavBtn from "./BoardNavBtn";
import Divider from "./Divider";
import { BoardGroup } from "@/context/BoardContext";

const AddBoardBtn = () => {
  return (
    <div className="flex flex-col pt-4 gap-2">
      <Divider variant="mid" />
      <div
        role="button"
        className="flex items-center px-5 py-3 hover:bg-slate-800 hover:rounded-lg transition-colors "
      >
        <span className="text-gray-300 flex-grow">Add Board</span>
        <PlusCircle className="text-gray-500 flex-grow" size={28} />
      </div>
    </div>
  );
};

const BoardGroup = ({ boardData }: { boardData: BoardGroup }) => {
  const [selectedBoard, setSelectedBoard] = useState<string>(
    boardData.boards[0].id
  );

  return (
    <>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md leading-none bg-secondary-700 flex items-center justify-center">
                  {boardData.name[0]?.toUpperCase() || "N"}
                </div>
                <span>{boardData.name}</span>
              </div>

              <CaretUp
                weight="bold"
                size={20}
                className={`text-secondary-200 ${open && "rotate-180"}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="ps-1 mt-3">
              {boardData.boards.map((item) => {
                return (
                  <BoardNavBtn
                    key={item.id}
                    data={item}
                    selectedBoard={selectedBoard}
                    onClick={() => setSelectedBoard(item.id)}
                  />
                );
              })}
              <AddBoardBtn />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default BoardGroup;
