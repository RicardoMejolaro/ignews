import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismicio';
import styles from './styles.module.scss';

type Posts = {
    slug: string,
    title: string,
    excerpt: string,
    updateAt: string
}
interface PostsProps {
    posts: Posts[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <a href="" key={post.slug}>
                            <time>{post.updateAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    ))}

                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getAllByType('posts')



    const posts = response.map(post => {
        return {
            slug: post.uid,
            title: post.data.title,
            excerpt: post.data.content.find((content: { type: string; }) => content.type === 'paragraph')?.text ?? '',
            updateAt: new Date(post.last_publication_date).toLocaleDateString('pr-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        };

    });

    return {
        props: { posts }, // Will be passed to the page component as props
    }
}