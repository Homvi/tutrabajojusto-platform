import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function GlobalLayout({ children }: PropsWithChildren) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    );
}
