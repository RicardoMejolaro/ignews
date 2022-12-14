import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import styles from './styles.module.scss';

export function SingInButton() {
    const { data: session, status } = useSession();

    return status === 'authenticated' ? (
        <button
            type='button'
            className={styles.singInButton}
            title='Sair'
            onClick={() => signOut()}
        >
            <FaGithub color='#04d361' />
            {session.user?.name}
            <GoSignOut color='#04d361' />
        </button>
    ) : (
        <button
            type='button'
            className={styles.singInButton}
            title='Entrar com seu Github'
            onClick={() => signIn('github')}
        >
            <FaGithub color='#eba417' />
            Entre com o seu Github
            <GoSignIn color='#eba417' />
        </button>
    )
}