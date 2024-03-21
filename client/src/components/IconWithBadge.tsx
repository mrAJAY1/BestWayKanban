import React from "react";

const IconWithBadge = ({ Icon }: { Icon: React.ReactNode }) => {
  return (
    <div className="relative">
      {Icon}
      <span className="border-4 border-red-500 rounded-full absolute right-0.5 top-0.5"></span>
    </div>
  );
};

export default IconWithBadge;
