import { Outlet } from "react-router";

export function PublicLayout() {
    return (
        <>
            <header>HEADER CONTENT</header>
            <Outlet />
            <footer>FOOTER CONTENT</footer>
        </>
    )
}