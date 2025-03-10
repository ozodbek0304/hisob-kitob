"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon } from "lucide-react";


const ProfileInfo = () => {
  function LogOut() {
    window.location.assign("/auth");
    localStorage.clear();
  }





  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          <Avatar className="rounded-full h-9 w-9">
            <AvatarImage src={undefined} alt="customer" />
            <AvatarFallback className="rounded uppercase dark:bg-slate-500 text-success">
              OA
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[300px] dark:bg-slate-950 p-0" align="end">
        <DropdownMenuLabel className="flex gap-3 items-center  p-3 pb-1">

          <Avatar className="rounded-full h-9 w-9">
            <AvatarImage src={undefined} alt="customer" />
            <AvatarFallback className="rounded uppercase dark:bg-slate-500 text-success">
            OA
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-sm font-medium text-default-800 capitalize hover:text-primary ">
            Ozodbek Abdisamatov
            </div>
            <div
              className="text-xs text-default-600 hover:text-primary"
            >
              +998 93 102 30 42
            </div>
          </div>
        </DropdownMenuLabel>


        <DropdownMenuSeparator className="mb-0 dark:bg-slate-950" />
        <DropdownMenuItem
          onSelect={() => LogOut()}
          className="flex items-center gap-1 text-sm font-medium text-default-600 capitalize  p-3 dark:hover:bg-slate-800 cursor-pointer"
        >
          <LogOutIcon className="h-6 w-6  " />
          Chiqish
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
