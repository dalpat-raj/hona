import { InputProps } from "@/lib/definations";
import React from "react";

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  name,
  id,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full lowercase py-1 px-4 border border-gray-200 bg-white rounded-sm outline-none  focus:border-gray-400 text-sm text-black"
    />
  );
};

export default Input;
