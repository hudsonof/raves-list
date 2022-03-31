import type { NextPage } from 'next';

const Custom404: NextPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <span className="logo mb-5 error-logo-size"></span>
            <h1 className="text-2xl">404 | Vixe, algo deu errado, não encontrei essa página!</h1>
        </div>
    )
}

export default Custom404