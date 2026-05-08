import type { Metadata } from 'next'
import { Geist, Trispace } from 'next/font/google'
import './globals.css'
import clsx from 'clsx';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const trispace = Trispace({
    variable: '--font-trispace',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'michas.dev',
    description: 'my internet corner',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={clsx(geistSans.variable, trispace.variable)}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                window.addEventListener('pageshow', function(event) {
                                    var navEntries = performance.getEntriesByType('navigation')
                                    var isBackForward = navEntries.length > 0 && navEntries[0].type === 'back_forward'
                                    
                                    if (event.persisted || isBackForward) {
                                        var f = String.fromCharCode(123, 114, 101, 108, 48, 97, 100, 95, 49, 110, 116, 101, 114, 99, 51, 112, 116, 111, 114, 125);

                                        document.body.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: var(--font-trispace); opacity: 0; pointer-events: none;">' + f + '</div>';
                                        
                                        window.location.reload()
                                    }
                                });
                            })();
                        `,
                    }}
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}