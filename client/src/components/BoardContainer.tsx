import { Funnel } from "@phosphor-icons/react";
import Board from "./Board";

const BoardContainer = ({ title }: { title: string }) => {
  return (
    <section>
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
      <Board />
    </section>
  );
};

export default BoardContainer;
