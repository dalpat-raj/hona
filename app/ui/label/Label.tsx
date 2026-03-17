import { LabelProps } from "@/lib/definations";
import React from "react";

const Label: React.FC<LabelProps> = ({ htmlFor = "id", title }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-green-700 mb-1"
    >
      {title}
    </label>
  );
};

export default Label;
