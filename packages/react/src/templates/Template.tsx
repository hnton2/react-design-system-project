import React, { FC } from "react";

interface TemplateProps {
  children: React.ReactNode;
}

const Template: FC<TemplateProps> = ({ children }) => {
  return (
    <>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </>
  );
};

export default Template;
