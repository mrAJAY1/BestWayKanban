import ICONS from "@/constants/ICONS";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    id?: string;
    name: string;
    icon: string;
  };
  selectedBoard: string;
  onClick: () => void;
};

const BoardNavBtn = ({ data, selectedBoard, onClick }: Props) => {
  const IconComponent = ICONS[data.icon];
  if (!IconComponent) {
    console.warn(`Icon ${data.icon} not found`);
  }
  return (
    <div
      role="button"
      className={cn(
        "flex items-center gap-5 px-2 py-3 rounded-xl transition-colors relative selected before:transition-all overflow-y-hidden overflow-x-visible before:h-0 before:ease-in-out",
        {
          "bg-slate-800 before:h-full overflow-y-visible":
            selectedBoard === data.id,
        }
      )}
      onClick={onClick}
    >
      <span className="text-gray-500 ">
        {IconComponent ? (
          <IconComponent size={28} weight="fill" />
        ) : (
          <div className="w-8 h-8 bg-slate-700 text-xl font-medium flex items-center justify-center rounded">
            {data?.name[0]?.toUpperCase()}
          </div>
        )}
      </span>
      <span className="text-gray-300 flex-grow">{data.name}</span>
    </div>
  );
};

export default BoardNavBtn;
