import styles from './Loader.module.css';
interface LoaderProp {
    showLoader: boolean;
}

export default function Loader(props: LoaderProp) {
    return (
        <div className={styles['loader-container']} style={{ display: props.showLoader ? 'flex' : 'none' }}>
            <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <h1>Carregando</h1>
        </div>
    )
}