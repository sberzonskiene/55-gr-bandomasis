import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

export function AdminDasboardPage() {
    const { email } = useContext(UserContext);

    return (
        <main>
            <h3>Welcome to dashboard!!!</h3>
            <p>Email: {email}</p>
        </main>
    );
}