import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles['loader-container']}>
            <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <h1>Carregando</h1>
        </div>
    )
}