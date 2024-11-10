import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/plus-jakarta-sans";

export const metadata: Metadata = {
    title: "ReCall",
    description:
        "A platform to stream video into the ReCall API for face detection and recognition.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                style={{ fontFamily: "Plus Jakarta Sans Variable, sans-serif" }}
                className={`light antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
