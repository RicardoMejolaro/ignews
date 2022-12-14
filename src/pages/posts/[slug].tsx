import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from '../../services/prismicio';
import styles from './post.module.scss';

interface PostProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updateAt: string
    }
}


export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title + '| Ignews'}</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });
    const { slug } = query;

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    };

    const prismic = getPrismicClient(req.cookies);

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