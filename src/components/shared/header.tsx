import { Printer } from "lucide-react"
import ThemeButton from "./theme-button"
import ProfileInfo from "./profile-info"
import FullScreenToggle from "./full-screen";

export const Header = () => {
    const printPage = () => {
        window.print();
    };

    return (
        <header className="z-50 sticky top-0  ">

            <div className="flex w-full bg-background px-4 py-2 shadow justify-end">
                <div className="items-center flex justify-end gap-2">
                    <FullScreenToggle/>
                    <ThemeButton />
                    <span className="cursor-pointer hover:text-red-500" onClick={printPage}><Printer /></span>

                    <ProfileInfo />
                </div>
            </div>
        </header>
    )
}