import { jwtService } from "../app/jwtService";
import { MenuItem } from "./types";

let keyCount = 0;

export const handleAuthResponse = (data: any): void => {
  jwtService.remove();
  jwtService.set(data.accessToken);
  jwtService.setRole(data.role);
};

export const createMenuItem = ({
  icon,
  label,
  key,
  title,
  style,
  children,
  onClick,
}: {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  key?: React.Key | null;
  title?: string;
  style?: any;
  children?: MenuItem[];
  onClick?: any;
}): MenuItem => {
  return {
    onClick,
    style,
    title,
    key: key ?? ++keyCount,
    icon,
    children,
    label,
  } as MenuItem;
};
