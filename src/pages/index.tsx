import Head from "next/head";
import { GetStaticProps } from "next";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from './home.module.scss';
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head><title>Inicio | ig.news</title></Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, Seja bem vindo!</span>
          <h1>Notícias sobre o mundo do <span>React</span></h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por apenas {product.amount} por mês.</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Imagem Garota Codando" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MEbwRKZ8pYAm8JKyZZQRprk', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount ? (price.unit_amount / 100) : 9.9)
  }

  return {
    props: { product },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}