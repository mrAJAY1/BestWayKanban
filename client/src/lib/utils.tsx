import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item, ListFuncs, ListType, listContext } from "@/contexts/ListContext";
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import update from "immutability-helper";
import useSocket from "@/socket/useSocket";

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

export function shiftTask(item: Item, list: ListType, listFuncs: ListFuncs) {
  const itemCopy = JSON.parse(JSON.stringify(item));
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

  return new Promise((resolve, reject) => {
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
      .then(() => {
        const data = {
          from: itemCopy.list,
          item: item,
        };
        resolve(data);
      })
      .catch(() => {
        toast.error("Something went wrong, please try again later");
        reject();
      });
  });
}

export const useLiveUpdates = () => {
  const socket = useSocket();
  const { data, listFuncs } = useListContext();
  const isInitialRender = useRef(true);

  const toHandler: Record<
    ListType,
    (data: { from: ListType; item: Item }) => void
  > = {
    todo: (data) => {
      listFuncs.setTodos((prev) => {
        console.log(data.item, "todo");
        if (prev.findIndex((i) => i._id === data.item._id) === -1) {
          return [...prev, data.item];
        }
        return prev;
      });
    },
    active: (data) => {
      listFuncs.setActives((prev) => {
        if (prev.findIndex((i) => i._id === data.item._id) === -1) {
          return [...prev, data.item];
        }
        return prev;
      });
    },
    completed: (data) => {
      listFuncs.setCompleted((prev) => {
        if (prev.findIndex((i) => i._id === data.item._id) === -1) {
          return [...prev, data.item];
        }
        return prev;
      });
    },
  };

  const fromHandlers: Record<
    ListType,
    (data: { from: ListType; item: Item }) => void
  > = {
    todo: (data) => {
      listFuncs.setTodos((prev) => {
        return prev.filter((i) => i._id !== data.item._id);
      });
    },
    active: (data) => {
      listFuncs.setActives((prev) => {
        console.log(data.item);
        return prev.filter((i) => i._id !== data.item._id);
      });
    },
    completed: (data) => {
      listFuncs.setCompleted((prev) => {
        return prev.filter((i) => i._id !== data.item._id);
      });
    },
  };

  useEffect(() => {
    if (isInitialRender.current) isInitialRender.current = false;
  }, []);

  useEffect(() => {
    if (socket && data && !isInitialRender.current) {
      socket.emit("shiftCard", data);
    }
  }, [socket, data]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveShift", (data: { from: ListType; item: Item }) => {
        // console.log(data);
        fromHandlers[data.from](data);
        toHandler[data.item.list](data);
      });
    }
  }, [socket]);
};
