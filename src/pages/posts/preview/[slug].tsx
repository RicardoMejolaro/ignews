import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from '../../../services/prismicio';
import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updateAt: string
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{post.title + '| Ignews'}</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div className={`${styles.postContent} ${styles.postPreviewContent}`} dangerouslySetInnerHTML={{ __html: post.content.substring(0, 498) }} />
                    <div className={styles.continueReading}>
                        Quer continuar lendo? 👀
                        <Link href={'/'}>
                            Inscreva-se agora 🤗
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('posts', String(slug), {});

    const post = {
        slug,
        title: response.data.title,
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pr-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    };

    return {
        props: { post }
    }
}