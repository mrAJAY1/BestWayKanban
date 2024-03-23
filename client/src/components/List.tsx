import { Trash } from "@phosphor-icons/react";
import ListActions from "./ListActions";
import Card from "./Card";
import { Item, ListType } from "@/contexts/ListContext";
import { useDrop } from "react-dnd";
import { shiftTask, useListContext, useLiveUpdates } from "@/lib/utils";

type Props = {
  name: string;
  cards: Item[];
  list: ListType;
};

const List = ({ name, cards, list }: Props) => {
  const { listFuncs, setData } = useListContext();
  useLiveUpdates();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: Item) => {
      shiftTask(item, list, listFuncs).then((data) => {
        setData(data as { from: ListType; item: Item[] });
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      className={`flex flex-col gap-5 p-5 w-1/4 flex-shrink-0 h-fit rounded-xl  ${
        isOver ? "bg-slate-800" : "bg-slate-900"
      }`}
      ref={drop}
    >
      <div className="flex justify-between">
        <h3>{name}</h3>
        <button>
          <Trash size={22} />
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {cards?.map((card, index) => (
          <Card index={index} key={card?._id} cardData={card} />
        ))}
      </div>
      <ListActions list={list} />
    </div>
  );
};

export default List;
