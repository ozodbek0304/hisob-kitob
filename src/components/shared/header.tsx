import { Printer } from "lucide-react"
import ThemeButton from "./theme-button"
import ProfileInfo from "./profile-info"

export const Header = () => {
    return (
        <header className="z-50 sticky top-0  ">

           <div className="flex w-full bg-gray-50 dark:bg-slate-950 p-4 shadow justify-end">
           <div className="items-center flex justify-end gap-2">
           <ThemeButton />
           <Printer/>
           <ProfileInfo/>
           </div>
           </div>
        </header>
    )
}