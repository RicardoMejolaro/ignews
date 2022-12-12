import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SingInButton() {
    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button type='button' className={styles.singInButton}>
            <FaGithub color='#04d361' />
            Ricardo Mejolaro
            <FiX color='#737380' />
        </button>
    ) : (
        <button type='button' className={styles.singInButton}>
            <FaGithub color='#eba417' />
            Entre com o seu Github
        </button>
    )
}