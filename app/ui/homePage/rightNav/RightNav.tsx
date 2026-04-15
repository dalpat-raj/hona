import React from "react";
import UserIcon from "./UserIcon";
import SearchIcon from "./SearchIcon";
import CartIcon from "./CartIcon";

const RightNav = () => {
  return (
    <div className="w-full flex justify-between items-center gap-4 max-sm:gap-4 max-sm:pr-2">
      <SearchIcon />
      <UserIcon />
      <CartIcon />
    </div>
  );
};

export default RightNav;
