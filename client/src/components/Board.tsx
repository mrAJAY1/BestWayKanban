import { Funnel } from "@phosphor-icons/react";
import BoardPanel from "./BoardPanel";
import ListContextProvider from "@/contexts/ListContext";

const Board = ({ title }: { title: string }) => {
  return (
    <section className="flex-grow flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">{title}</h2>
        <div
          role="button"
          className="flex gap-1 items-center px-5 py-2 rounded-lg bg-slate-800"
        >
          <Funnel size={16} />
          <span>Filter</span>
        </div>
      </div>
      <ListContextProvider>
        <BoardPanel />
      </ListContextProvider>
    </section>
  );
};

export default Board;
