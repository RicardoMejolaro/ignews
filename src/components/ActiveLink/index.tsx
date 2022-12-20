import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
    text: string;
    activeClassName: string;
}

export default function ActiveLink({ text, activeClassName, href }: ActiveLinkProps) {
    const { asPath } = useRouter();

    const className = asPath === href ? activeClassName : ''

    return (
        <Link href={href} className={className}>
            {text}
        </Link>
    );
}