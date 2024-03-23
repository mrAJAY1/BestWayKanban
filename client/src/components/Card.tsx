import { useDrag } from "react-dnd";
import { Item } from "@/contexts/ListContext";

type Props = {
  cardData: Item;
  index: number;
};

const Card = ({ cardData, index }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { ...cardData, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`rounded-lg flex flex-col overflow-hidden ${
        isDragging ? "opacity-50" : ""
      } `}
      ref={drag}
    >
      {cardData?.title && (
        <span className="p-3 flex-grow bg-gray-600">{cardData.title}</span>
      )}
      {cardData?.img && (
        <img
          loading="lazy"
          className="max-h-[300px]"
          src={cardData.img}
          alt=""
        />
      )}
    </div>
  );
};

export default Card;
