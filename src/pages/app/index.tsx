import axios from 'axios';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { ImageUpload } from '../../components/ImageUploader';
import Loader from "../../components/Loader";

type StateProps = {
    id: Number,
    sigla: String,
    nome: String
}

type CityProps = {
    id: Number,
    nome: String
}

export default function App() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [states, setStates] = useState<StateProps[]>([]);
    const [cities, setCities] = useState<CityProps[]>([]);

    const handleSignOut = () => {
        setLoading(true);
        signOut({ callbackUrl: '/' });
    };

    const getStates = async () => {
        setLoading(true);
        await axios.get<StateProps[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then((response: any) => {
                setStates(response.data);
            })
            .catch(error => {
                console.log(error);
                setStates([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChangeState = async (e: BaseSyntheticEvent) => {
        setLoading(true);
        let stateId = e.target.value;
        await axios.get<CityProps[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios?orderBy=nome`)
            .then((response: any) => {
                setCities(response.data);
            })
            .catch(error => {
                console.log(error);
                setCities([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(false);
        getStates();
    }, [setStates]);

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
                <div className="artboard bg-primary p-5 rounded-xl">
                    <h1 className="text-2xl text-bold">Cadastrar novo evento</h1>
                    <form className="overflow-x-auto w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Nome</span>
                                </label>
                                <input type="text" placeholder="Nome" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Data do evento</span>
                                </label>
                                <input type="date" placeholder="Data" className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Local</span>
                                </label>
                                <input type="text" placeholder="Local" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Estado</span>
                                </label>
                                <select id="selectState" className="select select-bordered w-full" data-choose-theme onChange={handleChangeState}>
                                    <option value="">Selecionar</option>
                                    {
                                        states.map((state, index) => {
                                            return <option key={state.id.toString()} value={state.id.toString()}>{state.nome}</option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Cidade</span>
                                </label>
                                <select id="selectCity" className="select select-bordered w-full" data-choose-theme>
                                    <option value="">Selecionar</option>
                                    {
                                        cities.map((city, index) => {
                                            return <option key={city.id.toString()} value={city.id.toString()}>{city.nome}</option>;
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Página do evento</span>
                                </label>
                                <input type="text" placeholder="http://" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <ImageUpload alt="Imagem do Evento" layout="fixed" width={128} height={128} className="h-32 w-32 object-cover rounded" />
                            </div>
                        </div>
                    </form>
                    <h1 className="text-2xl text-bold my-5">Eventos que você cadastrou</h1>
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Local</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="w-80">
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <Image src="/flor_da_vida.jpg" alt={'Banner - '} layout="fixed" width={50} height={50} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Flor da Vida</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-lg">26/03/2022</span>
                                    </td>
                                    <td>Fazenda</td>
                                    <td>Itirapina</td>
                                    <td>SP</td>
                                    <th className="w-10">
                                        <button className="btn btn-primary btn-xs mr-5">Editar</button>
                                        <button className="btn btn-error btn-xs">Excluir</button>
                                    </th>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Local</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                </div>
            </div>
            <Loader showLoader={loading} />
        </>
    )
}