import { signOut } from "next-auth/react";

export default function App() {
    return (
        <div>
            <h1>Hello Dashboard</h1>
            <button className="btn" onClick={() => signOut({ callbackUrl: '/' })}>Sair</button>
        </div>
    )
}