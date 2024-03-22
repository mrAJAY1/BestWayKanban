import {
  HouseSimple,
  NotePencil,
  PlusCircle,
  SquaresFour,
  Table,
} from "@phosphor-icons/react";
import Divider from "./Divider";
import BoardGroup from "./BoardGroup";

import boardGroups from "@/mocks/mock.json";

const tabs = [
  {
    name: "All",
    icon: <SquaresFour size={28} />,
    current: true,
  },
  {
    name: "Home",
    icon: <HouseSimple size={28} />,
    current: false,
  },
  {
    name: "Mail",
    icon: <NotePencil size={28} />,
    current: false,
  },
  {
    name: "Feed",
    icon: <Table size={28} />,
    current: false,
  },
];

const SideBarNavs = () => {
  return (
    <div className="flex flex-col px-10 pt-8 gap-10 mt-10">
      {tabs.map((item) => (
        <button
          className="flex w-full items-center justify-start gap-5 text-secondary-300 font-medium"
          key={item.name}
        >
          <span>{item.icon}</span>
          <span className="font-medium">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-2/4 lg:w-1/5 pt-20 px-5 border-r border-gray-800 gap-10">
      <h1 className="text-4xl font-bold text-center">Trello</h1>
      <SideBarNavs />
      <Divider variant="dark" />
      <div className="flex flex-col gap-5">
        <div role="button" className="flex justify-between items-center mx-7">
          <span className="text-sm tracking-wider">BOARDS</span>
          <span>
            <PlusCircle weight="regular" className="text-gray-400" size={30} />
          </span>
        </div>
        <div className="ps-6">
          {boardGroups.data.map((board) => (
            <BoardGroup key={board.id} boardData={board} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
