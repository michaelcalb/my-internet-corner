import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home,
                handle: { title: 'Home' }
            },
            {
                path: 'projects',
                Component: Projects,
                handle: { title: 'Projects' }
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
])

export default router