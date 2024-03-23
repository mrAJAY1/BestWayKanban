import { createContext, useState } from "react";

export type ListType = "todo" | "active" | "completed";
export type Item = {
  _id?: string;
  title?: string;
  img?: string;
  list: ListType;
};

export type ListFuncs = {
  setTodos: React.Dispatch<React.SetStateAction<Item[]>>;
  setActives: React.Dispatch<React.SetStateAction<Item[]>>;
  setCompleted: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const listContext = createContext<{
  todos: Item[];
  actives: Item[];
  completed: Item[];
  boardData: Item[];
  listFuncs: ListFuncs;
  data: { from: ListType; item: Item[] } | null;
  setData: React.Dispatch<
    React.SetStateAction<{ from: ListType; item: Item[] } | null>
  >;
  setBoardData: React.Dispatch<React.SetStateAction<Item[]>>;
}>({
  todos: [],
  actives: [],
  completed: [],
  boardData: [],
  data: null,
  setData: () => {},
  setBoardData: () => {},
  listFuncs: {
    setTodos: () => {},
    setActives: () => {},
    setCompleted: () => {},
  },
});

export default function ListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [boardData, setBoardData] = useState<Item[]>([]);
  const [todos, setTodos] = useState<Item[]>([]);
  const [actives, setActives] = useState<Item[]>([]);
  const [completed, setCompleted] = useState<Item[]>([]);
  const [data, setData] = useState<{ from: ListType; item: Item[] } | null>(
    null
  );
  return (
    <listContext.Provider
      value={{
        todos,
        data,
        setData,
        actives,
        completed,
        boardData,
        setBoardData,
        listFuncs: {
          setTodos,
          setActives,
          setCompleted,
        },
      }}
    >
      {children}
    </listContext.Provider>
  );
}
