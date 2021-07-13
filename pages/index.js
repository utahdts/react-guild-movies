import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

const movies = [{}];
export default function Home() {
  const [searchText, setSearchText] = useState('');
  const search = () => console.log(searchText);
  return (
    <div className={styles.container}>
      <Head>
        <title>React Guild Movies</title>
        <meta name="description" content="Recordings from React Guild presentations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            React Guild Movies
        </h1>
        <div>
          <input
            className="mt-0 text-gray-500 block w-full border-0 border-b-2 border-gray-300"
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search"
          />
          <input type="button" value="Search" onClick={search}/>
        </div>
      </main>
    </div>
  )
}
