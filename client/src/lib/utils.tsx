import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item, ListFuncs, ListType, listContext } from "@/contexts/ListContext";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import update from "immutability-helper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useListContext = () => {
  const values = useContext(listContext);
  return { ...values } as const;
};

export const useFetchInitial = () => {
  const {
    setBoardData,
    boardData,
    listFuncs: { setTodos, setActives, setCompleted },
  } = useListContext();
  useEffect(() => {
    fetch("/api/lists")
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setBoardData(data);
          return;
        } else {
          toast.error("Something went wrong, please try again later");
        }
      })
      .catch(() => {
        toast.error("Something went wrong, please try again later");
      });
  }, []);
  useEffect(() => {
    if (boardData) {
      setTodos(boardData.filter((item: Item) => item.list === "todo"));
      setActives(boardData.filter((item: Item) => item.list === "active"));
      setCompleted(boardData.filter((item: Item) => item.list === "completed"));
    }
  }, [boardData]);
  return null;
};

export function shiftTask(
  item: Item,
  list: ListType,
  listFuncs: ListFuncs,
) {
  const fromHandlers = {
    todo: () => {
      listFuncs.setTodos((prev) =>
        update(prev, {
          $splice: [[prev.findIndex((i) => i._id === item._id), 1]],
        })
      );
    },
    active: () => {
      listFuncs.setActives((prev) =>
        update(prev, {
          $splice: [[prev.findIndex((i) => i._id === item._id), 1]],
        })
      );
    },
    completed: () => {
      listFuncs.setCompleted((prev) =>
        update(prev, {
          $splice: [[prev.findIndex((i) => i._id === item._id), 1]],
        })
      );
    },
  };
  const toHandlers = {
    todo: () => {
      item.list = "todo";
      listFuncs.setTodos((prev) => {
        if (prev.findIndex((i) => i._id === item._id) === -1) {
          return [...prev, item];
        }
        return prev;
      });
    },
    active: () => {
      item.list = "active";
      listFuncs.setActives((prev) => {
        if (prev.findIndex((i) => i._id === item._id) === -1) {
          return [...prev, item];
        }
        return prev;
      });
    },
    completed: () => {
      item.list = "completed";
      listFuncs.setCompleted((prev) => {
        if (prev.findIndex((i) => i._id === item._id) === -1) {
          return [...prev, item];
        }
        return prev;
      });
    },
  };

  fromHandlers[item.list]();
  toHandlers[list]();

  let data;
  fetch("/api/lists", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: item._id,
      list,
    }),
  })
    .then(async (res) => {
      data = await res.json();
    })
    .catch(() => {
      toast.error("Something went wrong, please try again later");
    });
  return data;
}
