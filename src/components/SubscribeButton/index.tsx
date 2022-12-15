import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const { data: session } = useSession();

    const handleSubscribe = () => {
        if (!session) {
            signIn('githubId')
            return;
        }

        // criação da checkout session

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Inscreva-se agora
        </button>
    );
}