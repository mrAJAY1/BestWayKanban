import {
  TreeStructure,
  IconProps,
  UsersThree,
  ListChecks,
  PlusCircle,
} from "@phosphor-icons/react";

const ICONS: Record<string, (props: IconProps) => JSX.Element> = {
  TreeStructure: (props: IconProps) => <TreeStructure {...props} />,
  ListChecks: (props: IconProps) => <ListChecks {...props} />,
  UsersThree: (props: IconProps) => <UsersThree {...props} />,
  PlusCircle: (props: IconProps) => <PlusCircle {...props} />,
};
export default ICONS;
