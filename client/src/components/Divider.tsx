const Divider = ({ variant }: { variant: string }) => {
  const variants: Record<string, string> = {
    light: "border-gray-300",
    dark: "border-gray-800",
    mid: "border-gray-600",
  };

  return <hr className={`w-full ${variants[variant]}`} />;
};

export default Divider;
