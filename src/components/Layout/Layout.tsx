import { Outlet } from "react-router";
import AboutMe from "../AboutMe/AboutMe";

export default function Layout() {
    return (
        <>
            <AboutMe />
            <Outlet />
        </>
    )
}