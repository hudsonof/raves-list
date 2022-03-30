import { Rave } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import Loader from '../components/Loader';
import { prisma } from '../lib/prisma';

type RavesProps = {
  raves: Rave[]
}

const Home: NextPage<RavesProps> = ({ raves }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const themes = ["forest", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "light", "dark"];

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    themeChange(false);
    setLoading(false);
  }, []);

  if (!loading) {
    return (
      <>
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-row items-center">
            <Image src="/ohm-white.svg" alt="Raves List" width={50} height={50} />
            <h1 className='pl-5'>Raves List</h1>
          </div>
          <div className="flex flex-row items-end">
            <button className="btn mr-5" onClick={() => { setLoading(true); router.push('/signin') }}>Entrar</button>
            <div>
              <label htmlFor="selectTema" className="text-sm font-medium leading-none">
                Selecione um tema
              </label>
              <br />
              <select id="selectTema" className="select select-bordered" data-choose-theme>
                <option value="">Padrão</option>
                {
                  themes.map((theme, index) => {
                    return <option key={index} value={theme}>{capitalizeFirstLetter(theme)}</option>;
                  })
                }
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full p-5">
          <div className="artboard grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-primary p-5 rounded-xl">
            {
              raves.map((rave: Rave) => {
                return (
                  <div className="card bg-base-100 shadow-xl flex flex-row" key={rave.id}>
                    <figure><Image src="/flor_da_vida.jpg" alt="Banner - Flor da Vida" layout="fixed" width={110} height={150} /></figure>
                    <div className="card-body p-5">
                      <h2 className="card-title">{rave.name}</h2>
                      <div className="card-actions">
                        <div className="badge badge-outline">{rave.date}</div>
                        <div className="badge badge-outline">Fazenda Meia Lua</div>
                        <div className="badge badge-outline">{rave.city}</div>
                        <div className="badge badge-outline">{rave.state}</div>
                      </div>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-xs">Página do Evento</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </>
    )
  } else {
    return <Loader />
  }
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const raves: Rave[] = await prisma.rave.findMany();

  const data = raves.map(rave => {
    return {
      id: rave.id,
      name: rave.name,
      date: rave.date.toLocaleDateString(),
      city: rave.city,
      state: rave.state,
    }
  });

  return {
    props: {
      raves: data
    }
  }
}