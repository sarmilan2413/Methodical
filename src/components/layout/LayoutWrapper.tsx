import { ReactNode } from "react";
import AppLayout from "./AppLayout";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default LayoutWrapper;