import { Rave } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { prisma } from '../lib/prisma';

type RavesProps = {
  raves: Rave[]
}

const Home: NextPage<RavesProps> = ({ raves }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const themes = ["forest", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "light", "dark"];

  const [loading, setLoading] = useState(true);
  const [ravesData, setRavesData] = useState<Rave[]>(raves);

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChangeTheme = (e: BaseSyntheticEvent) => {
    setTheme(e.target.value);
  };

  const handleSearchRave = (e: BaseSyntheticEvent) => {
    setRavesData(searchRaveByFilter(e.target.value));
  };

  const searchRaveByFilter = (filter: string) => {
    filter = filter.toLowerCase();

    if (filter.length === 0) {
      return raves;
    }

    return raves.filter(rave => {
      //alert(rave.date + ' - ' + new Date(rave.date));
      return rave.name.toLowerCase().includes(filter)
        || rave.city.toLowerCase().includes(filter)
        || rave.state.toLowerCase().includes(filter)
    });
  };

  useEffect(() => {
    setTheme(theme);
    setLoading(false);
  }, [theme, setTheme]);

  return (
    <>
      <div className="flex flex-row justify-between p-5">
        <div className="flex flex-row items-center">
          <span className="logo"></span>
          <h1 className='pl-5'>Raves List</h1>
        </div>
        <div className="flex flex-row items-end">
          <button className="btn mr-5" onClick={() => { setLoading(true); router.push('/signin') }}>Entrar</button>
          <div>
            <label htmlFor="selectTema" className="text-sm font-medium leading-none">
              Selecione um tema
            </label>
            <br />
            <select id="selectTema" className="select select-bordered" data-choose-theme onChange={handleChangeTheme} value={theme}>
              <option value="system">Padrão</option>
              {
                themes.map((theme, index) => {
                  return <option key={index} value={theme}>{capitalizeFirstLetter(theme)}</option>;
                })
              }
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full p-5 pt-0">
        <div className="navbar">
          <div className="flex w-full">
            <div className="form-control w-1/2">
              <input type="text" placeholder="Buscar rave" onChange={handleSearchRave} className="input input-bordered mb-5" />
            </div>
          </div>
        </div>

        <div className="artboard grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-primary p-5 rounded-xl">
          {
            ravesData.map((rave: Rave) => {
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
          <h1 style={{ display: ravesData.length === 0 ? 'block' : 'none' }}>Ops, não encontrei nenhum role com esse filtro!</h1>
        </div>
      </div>
      <Loader showLoader={loading} />
    </>
  )
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