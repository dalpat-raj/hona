"use client";
import React from "react";

interface UserData {
  userPhone: string;
}

const PhoneForm: React.FC<UserData> = ({ userPhone }) => {
  return (
    <div className="w-2/5 max-lg:w-full">
      <div className="mb-4 flex items-center gap-6">
        <h2 className="text-[16px] font-bold text-blue">
          Mobile Number
        </h2>
      </div>

      <div className="flex items-end max-sm:flex-col max-sm:items-start gap-6">
        <div className="w-4/5 max-sm:w-full">
          <label className="text-[13px] text-gray-400">
            Mobile Number
          </label>

          <input
            value={userPhone || ""}
            readOnly
            className="w-full py-2 px-4 border border-gray-200 bg-bga rounded-sm outline-none text-sm text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneForm;