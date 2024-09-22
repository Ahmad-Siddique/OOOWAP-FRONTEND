"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const HeaderDropdown = ({ loginInfo, logOut }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10">
        <div
          className="bg-center w-10 h-10 rounded-full bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${loginInfo.user.image})` }}
        ></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary mt-1 text-black">
        <DropdownMenuLabel>
          <div className="pb-2 flex flex-col gap-1 border-b border-black/30">
            <h1 className="text-lg font-bold">{loginInfo.user.firstName}</h1>
            <p className="text-xs text-black/80 font-normal">
              Balance:{" "}
              <span className="text-black text-sm font-bold">
                ${loginInfo.user.balance?.toFixed(2)}
              </span>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/deposit">Deposit Money</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/withdraw">Withdraw Money</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => logOut()}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
