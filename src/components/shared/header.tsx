import { Printer } from "lucide-react"
import ThemeButton from "./theme-button"
import ProfileInfo from "./profile-info"

export const Header = () => {
    const printPage = () => {
        window.print();
    };

    return (
        <header className="z-50 sticky top-0  ">

            <div className="flex w-full bg-background p-4 shadow justify-end">
                <div className="items-center flex justify-end gap-2">
                    <ThemeButton />
                    <span className="cursor-pointer hover:text-red-500" onClick={printPage}><Printer /></span>

                    <ProfileInfo />
                </div>
            </div>
        </header>
    )
}