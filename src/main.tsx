import { Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner"
import { MainProvider } from "./providers/main-provider"
import { queryClient } from "./lib/query-client"
import Spinner from "./components/ui/spinner"
import App from "./app"

// Render the app
const rootElement = document.getElementById("app")!
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(
        <Suspense fallback={<Spinner />}>
            <QueryClientProvider client={queryClient}>
                <MainProvider>
                    <App />
                </MainProvider>
                <Toaster />
            </QueryClientProvider>
        </Suspense>,
    )
}
