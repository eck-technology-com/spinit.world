import { headingfont,mainfont } from "@/app/fonts"
import "@a/globals.css"
import Header from "@c/header/header"

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={`${headingfont.variable} ${mainfont.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}