import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'

const Home = () => {
  return (
    <div className="min-w-screen min-h-screen flex-col items-center justify-center bg-slate-700 text-white">
      <Head>
        <title>Balance Checker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main />
    </div>
  )
}

export default Home
