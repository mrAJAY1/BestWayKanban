import {
  Calendar,
  CalendarX,
  EnvelopeSimple,
  Square,
  UserPlus,
} from "@phosphor-icons/react";
import IconWithBadge from "./IconWithBadge";

const iconData = [
  {
    icon: <Calendar size={28} />,
    text: "Calendar",
  },
  {
    icon: <IconWithBadge Icon={<Square size={28} />} />,
    text: "Notifications",
  },
  {
    icon: <EnvelopeSimple size={28} />,
    text: "Inbox",
  },
  {
    icon: <CalendarX size={28} />,
    text: "Leave",
  },
  {
    icon: <UserPlus size={28} />,
    text: "Attendance",
  },
];

const Icons = () => {
  return (
    <>
      {iconData.map((i) => (
        <button
          key={i.text}
          className="flex flex-col items-center gap-1 text-secondary-300 font-medium"
        >
          {i.icon}
          <span className="text-xs font-medium">{i.text}</span>
        </button>
      ))}
    </>
  );
};

const Header = () => {
  return (
    <header className="h-24 flex justify-end items-center px-24 gap-10">
      <div className="flex gap-14">
        <Icons />
      </div>
      <img
        className="w-14 h-14 rounded-full"
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        alt="Rounded avatar"
      />
    </header>
  );
};

export default Header;
