import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from "../../components/Loader";

export default function App() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const handleSignOut = () => {
        setLoading(true);
        signOut({ callbackUrl: '/' });
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head>
                <title>Painel - Raves List</title>
            </Head>

            <div className="flex flex-row justify-between p-5">
                <div className="flex flex-row items-center">
                    <span className="logo"></span>
                    <h1 className='pl-5'>Raves List - Dashboard</h1>
                </div>
                <div className="flex flex-row items-end">
                    <button className="btn mr-5" onClick={() => { setLoading(true); router.push('/') }}>Inicio</button>
                    <button className="btn mr-5" onClick={handleSignOut}>Sair</button>
                </div>
            </div>

            <div className="overflow-x-auto w-full p-5 pt-0">
                <div className="artboard grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-primary p-5 rounded-xl">
                </div>
            </div>
            <Loader showLoader={loading} />
        </>
    )
}