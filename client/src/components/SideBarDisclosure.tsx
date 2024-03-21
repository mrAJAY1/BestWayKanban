import { Disclosure } from "@headlessui/react";
import { CaretUp, PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SideBarDisclosure = ({
  name,
  subs,
}: {
  name: string;
  subs: { icon: React.ReactElement; text: string }[];
}) => {
  const [selectedSub, setSelectedSub] = useState<number>(1);

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md leading-none bg-secondary-700 flex items-center justify-center">
                  {name?.slice(0, 1).toUpperCase() || "N"}
                </div>
                <span>{name}</span>
              </div>

              <CaretUp
                weight="bold"
                size={20}
                className={`text-secondary-200 ${open && "rotate-180"}`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="ps-1 mt-3">
              {subs.map((item, index) => (
                <div
                  key={index}
                  role="button"
                  className={cn(
                    "flex items-center gap-5 px-2 py-3 rounded-xl transition-colors relative selected before:transition-all overflow-y-hidden overflow-x-visible before:h-0 before:ease-in-out",
                    {
                      "bg-[#36363659] before:h-full overflow-y-visible":
                        selectedSub === index,
                    }
                  )}
                  onClick={() => setSelectedSub(index)}
                >
                  <span className="text-gray-500 ">{item.icon}</span>
                  <span className="text-gray-300 flex-grow">{item.text}</span>
                  <span className={selectedSub === index ? "block" : "hidden"}>
                    <PlusCircle size={20} />
                  </span>
                </div>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default SideBarDisclosure;
