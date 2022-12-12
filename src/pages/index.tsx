import Head from "next/head";
import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head><title>Inicio | ig.news</title></Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, Seja bem vindo!</span>
          <h1>Notícias sobre o mundo do <span>React</span></h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por apenas R$ 9,90 por mês.</span>
          </p>
        </section>

        <img src="/images/avatar.svg" alt="Imagem Garota Codando" />
      </main>
    </>
  )
}
