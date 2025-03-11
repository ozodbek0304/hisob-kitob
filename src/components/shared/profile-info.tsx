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
import { TOKEN } from "@/lib/localstorage-keys";
import { useGet } from "@/services/https";
import { USER_ME } from "@/services/api-endpoints";


const ProfileInfo = () => {
  const { data } = useGet(USER_ME)

  function LogOut() {
    window.location.assign("/login");
    localStorage.removeItem(TOKEN);
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          <Avatar className="rounded-full h-9 w-9">
            <AvatarImage src={undefined} alt="customer" />
            <AvatarFallback className="rounded uppercase dark:bg-slate-500 text-success">
              {data?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[300px]  p-0" align="end">
        <DropdownMenuLabel className="flex gap-3 items-center  p-3 pb-1">

          <Avatar className="rounded-full h-9 w-9">
            <AvatarImage src={undefined} alt="customer" />
            <AvatarFallback className="rounded uppercase dark:bg-slate-500 text-success">
            {data?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-sm font-medium text-default-800 capitalize hover:text-primary ">
            {data?.username}
            </div>
          </div>
        </DropdownMenuLabel>


        <DropdownMenuSeparator className="mb-0" />
        <DropdownMenuItem
          onSelect={() => LogOut()}
          className="flex items-center gap-1 text-sm font-medium text-default-600 capitalize  p-3 dark:hover:bg-slate-900 cursor-pointer"
        >
          <LogOutIcon className="h-6 w-6  " />
          Chiqish
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
