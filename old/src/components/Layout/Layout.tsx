import styles from './Layout.module.css'

import { Outlet, useMatches } from "react-router";
import AboutMe from "../AboutMe/AboutMe";
import Window from '../Window/Window';
import clsx from 'clsx';

type CurrentHandle = {
    title: string
}

export default function Layout() {
    const matches = useMatches()
    const currentMatch = matches[matches.length - 1]
    const title = (currentMatch.handle as CurrentHandle).title

    return (
        <main className={styles.main}>
            <aside className={clsx(styles.aboutMeContainer, styles.windowContainer)}>
                <Window
                    title="About me"
                >
                    <AboutMe />
                </Window>
            </aside>   
            <section className={clsx(styles.outletContainer, styles.windowContainer)}>
                <Window
                    title={title}
                >
                    <Outlet />
                </Window>
            </section>
        </main>
    )
}