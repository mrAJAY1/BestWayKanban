import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useFetchInitial, useListContext } from "@/lib/utils";
import AddListBtn from "./AddListBtn";
import List from "./List";


const BoardPanel = () => {
  useFetchInitial();
  const { todos, actives, completed } = useListContext();
  return (
    <div className="mt-10 flex gap-10 w-full overflow-x-auto flex-grow">
      <DndProvider backend={HTML5Backend}>
        <List name="To Do" cards={todos} list="todo" />
        <List name="On Going" cards={actives} list="active" />
        <List name="Completed" cards={completed} list="completed" />
      </DndProvider>

      <AddListBtn />
    </div>
  );
};

export default BoardPanel;
