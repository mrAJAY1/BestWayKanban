import { Dialog, Transition } from "@headlessui/react";
import { PlusCircle, X } from "@phosphor-icons/react";
import { Fragment, useState } from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};
const AddListModal = ({ isOpen, closeModal }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const createList = () => {
    if (title === "") {
      setError("Title cannot be empty");
      return;
    }
    setTitle("");
    setError("");
    closeModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setTitle("");
          setError("");
          closeModal();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle shadow-xl transition-all relative">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-center"
                >
                  Add List
                </Dialog.Title>
                <button
                  className="absolute top-7 right-7"
                  onClick={() => {
                    setTitle("");
                    setError("");
                    closeModal();
                  }}
                >
                  <X weight="bold" />
                </button>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="relative">
                    {error && (
                      <span className="text-red-500 text-xs absolute -top-3.5 left-1.5">
                        {error}
                      </span>
                    )}
                    <input
                      className={`bg-slate-800 px-5 py-3 rounded-lg outline-none placeholder:italic w-full border ${
                        error ? "border-red-500" : " border-transparent"
                      }`}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter list title"
                      type="text"
                    />
                  </div>

                  <button
                    onClick={createList}
                    className="px-5 py-3 flex items-center gap-3 justify-center bg-secondary-500 rounded-lg flex-shrink-0 h-fit"
                  >
                    Add List <PlusCircle size={20} />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddListModal;
