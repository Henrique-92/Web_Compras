import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return <h1 className="text-3xl font-bold text-gray-900">{children}</h1>;
}