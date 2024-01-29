import { ComponentProps } from "react";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ children }: ComponentProps<"p">) => {
  return <p className="mb-3 pl-5 font-semibold uppercase">{children}</p>;
};

export default SectionTitle;
