import { PlusCircle } from "@phosphor-icons/react";

const AddListBtn = () => {
  return (
    <div
      role="button"
      className="px-5 py-3 flex items-center gap-3 max-w-fit bg-secondary-500 rounded-lg"
    >
      <span>Add Another List</span>
      <PlusCircle size={20} />
    </div>
  );
};

export default AddListBtn;
