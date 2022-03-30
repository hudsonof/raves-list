import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

export default function App() {
    const [loading, setLoading] = useState(true);

    const handleSignOut = () => {
        setLoading(true);
        signOut({ callbackUrl: '/' });
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            <h1>Hello Dashboard</h1>
            <button className="btn" onClick={handleSignOut}>Sair</button>
            <Loader showLoader={loading} />
        </div>
    )
}