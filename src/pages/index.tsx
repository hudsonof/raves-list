import moment from 'moment';
import 'moment/locale/pt-br';
import type { GetServerSideProps, NextPage } from 'next';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { prisma } from '../lib/prisma';

type RaveProps = {
  id: String;
  name: String;
  date: Date;
  place: String;
  city: String;
  state: String;
  url: String;
  image: String;
}

type RavesProps = {
  raves: RaveProps[]
}

const Home: NextPage<RavesProps> = ({ raves }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const themes = ["forest", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "light", "dark"];
  const monthsMap = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const weekdayMap = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const [loading, setLoading] = useState(true);
  const [ravesData, setRavesData] = useState<RaveProps[]>(raves);

  const capitalizeFirstLetter = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleChangeTheme = (e: BaseSyntheticEvent) => {
    setTheme(e.target.value);
  };

  const handleSearchRave = (e: BaseSyntheticEvent) => {
    setRavesData(searchRaveByKeywork(e.target.value));
  };

  const searchRaveByKeywork = (keywork: string) => {
    keywork = keywork.toLowerCase();

    if (keywork.length === 0) {
      return raves;
    }

    let filterMonth = monthsMap.filter(month => month.toLowerCase().includes(keywork));
    let monthFiltered = filterMonth.length > 0 ? monthsMap.indexOf(filterMonth[0]) + 1 : 0;

    return raves.filter(rave => {
      return rave.name.toLowerCase().includes(keywork)
        || rave.city.toLowerCase().includes(keywork)
        || rave.state.toLowerCase().includes(keywork)
        || rave.place.toLowerCase().includes(keywork)
        || moment.utc(rave.date).format('M') == monthFiltered.toString()
        || moment.utc(rave.date).format('YYYY') == keywork
        || moment.utc(rave.date).format('ddd').includes(keywork)
        || moment.utc(rave.date).format('DD/MM/YYYY').includes(keywork)
    });
  };

  useEffect(() => {
    setTheme(theme);
    setLoading(false);
  }, [theme, setTheme]);

  return (
    <>
      <Head>
        <title>Raves List</title>
      </Head>
      <div className="flex flex-row justify-between p-5">
        <div className="flex flex-row items-center">
          <span className="logo"></span>
          <h1 className='pl-5'>Raves List</h1>
        </div>
        <div className="flex flex-row items-end">
          <button className="btn mr-5" onClick={() => { setLoading(true); router.push('/signin') }}>Entrar</button>
          <div>
            <select id="selectTema" className="select select-bordered" data-choose-theme onChange={handleChangeTheme} value={theme}>
              <option value="system">Tema</option>
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
            <div className="form-control w-full lg:w-1/2">
              <input type="text" placeholder="Buscar rave" onChange={handleSearchRave} className="input input-bordered mb-5" />
            </div>
          </div>
        </div>

        <div className="artboard grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-primary p-5 rounded-xl">
          {
            ravesData.map((rave: RaveProps) => {
              return (
                <div className="card bg-base-100 shadow-xl flex flex-row" key={rave.id.toString()}>
                  <figure><Image src="/flor_da_vida.jpg" alt={'Banner - ' + rave.name} layout="fixed" width={110} height={150} /></figure>
                  <div className="card-body p-5">
                    <h2 className="card-title">{rave.name}</h2>
                    <div className="card-actions">
                      <div className="badge badge-outline">{weekdayMap[new Date(moment(rave.date).toDate().getTime()).getDay() + 1]}</div>
                      <div className="badge badge-outline">{moment.utc(rave.date).format('DD/MM/YYYY')}</div>
                      <div className="badge badge-outline">{rave.place}</div>
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
          <h1 style={{ display: ravesData.length === 0 ? 'block' : 'none' }}>Ops, não encontrei nenhum role!</h1>
        </div>
      </div>
      <Loader showLoader={loading} />
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const raves: RaveProps[] = await prisma.rave.findMany();

  const data = raves.map(rave => {
    return {
      id: rave.id,
      name: rave.name,
      date: new Date(rave.date.getTime()).toISOString(),
      place: rave.place,
      url: rave.url,
      image: rave.image,
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