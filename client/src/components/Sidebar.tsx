import SideBarDisclosure from "./SideBarDisclosure";
import {
  HouseSimple,
  List,
  NotePencil,
  PlusCircle,
  SquaresFour,
  Table,
  TreeStructure,
  UsersThree,
} from "@phosphor-icons/react";
import Divider from "./Divider";

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

const boards = [
  {
    name: "Name",
    subs: [
      {
        icon: <TreeStructure weight="fill" size={28} />,
        text: "Road map",
      },
      {
        icon: <List weight="fill" size={28} />,
        text: "Task",
      },
      {
        icon: <UsersThree weight="fill" size={28} />,
        text: "Members",
      },
    ],
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
    <aside className="flex flex-col w-1/5 pt-20 px-5 border-r border-gray-800 gap-10">
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
          {boards.map((board) => (
            <SideBarDisclosure
              key={board.name}
              name={board.name}
              subs={board.subs}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
