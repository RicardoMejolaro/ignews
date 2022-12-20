import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismicio';
import Prismic from '@prismicio/client';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>React do zero: componentização, propriedades e estado</strong>
                        <p>Esse post é a primeira parte da série “React do zero”. Se você chegou até o React sem utilizar nenhuma outra biblioteca componentizada como Vue, Angular ou Polymer, provavelmente deve ter sofrido ou até estar sofrendo para entender o que é um componente, por que separar o código em componentes, o que é estado, wtf é Redux, etc… Fica tranquilo, nesse post você vai entender tudo isso.</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>React do zero: componentização, propriedades e estado</strong>
                        <p>Esse post é a primeira parte da série “React do zero”. Se você chegou até o React sem utilizar nenhuma outra biblioteca componentizada como Vue, Angular ou Polymer, provavelmente deve ter sofrido ou até estar sofrendo para entender o que é um componente, por que separar o código em componentes, o que é estado, wtf é Redux, etc… Fica tranquilo, nesse post você vai entender tudo isso.</p>
                    </a>
                    <a href="">
                        <time>12 de março de 2021</time>
                        <strong>React do zero: componentização, propriedades e estado</strong>
                        <p>Esse post é a primeira parte da série “React do zero”. Se você chegou até o React sem utilizar nenhuma outra biblioteca componentizada como Vue, Angular ou Polymer, provavelmente deve ter sofrido ou até estar sofrendo para entender o que é um componente, por que separar o código em componentes, o que é estado, wtf é Redux, etc… Fica tranquilo, nesse post você vai entender tudo isso.</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.getAllByType('posts')

    console.log(JSON.stringify(response, null, 2));

    return {
        props: { response }, // Will be passed to the page component as props
    }
}