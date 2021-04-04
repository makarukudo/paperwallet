import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import QRCode from 'react-qr-code'
import { useWallet } from 'use-wallet'
import styles from '../styles/Home.module.css'

const cryptos = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
}

export default function Home() {
  const wallet = useWallet()
  const [name, setName] = useState('Wallet Name')
  const [address, setAddress] = useState('0x0000000')
  const [value, setValue] = useState('')
  const [crypto, setCrypto] = useState('eth')

  useEffect(() => {
    if (wallet.status == 'connected') {
      setAddress(wallet.account)
    }
    console.log(wallet);

  }, [wallet.status])

  return (
    <div className={styles.container}>
      <Head>
        <title>Appdeture Paper Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Paper Wallet Generator</h1>
        <div className={styles.hiddenPrint} style={{ marginBottom: 20 }}>
          <button onClick={() => wallet.connect()} style={{ marginRight: 10 }}>Connect via MetaMask</button>
          <button onClick={() => window.print()}>Print</button>
        </div>
        <form className={`${styles.form} ${styles.hiddenPrint}`}>
          <input placeholder="Name of this wallet" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Your Crypto Address" value={address} onChange={e => setAddress(e.target.value)} />
          <textarea onChange={e => setValue(e.target.value)} className={styles.input} />
          <div>{value != '' && value.trim().split(' ').length + ' words'}</div>
        </form>
        <div className={styles.paper}>
          <div className={styles.paperHeading}>
            <img src="/eth.svg" style={{ float: `left`, marginRight: 10 }} />
            <div>
              <div>{name} - {cryptos[crypto]}</div>
              <strong>{address}</strong>
            </div>
          </div>
          <div className={styles.paperBody}>
            <div style={{ marginRight: 10, flex: 1, fontSize: 12 }}>
              <strong>ADDRESS</strong><br />
              <QRCode value={`https://etherscan.io/address/${address}`} size={160} />
            </div>
            <div style={{ flex: 1, fontSize: 12 }}>
              <strong>SEED WORDS / PRIVATE KEY</strong><br />
              <QRCode value={value} size={160} />
            </div>
          </div>
          <div className={styles.paperFooter}>
            <div>Developed by <strong>Appdeture</strong></div>
            <div>
              {wallet.balance && (wallet.balance / Math.pow(10, 18))}
            </div>
          </div>
        </div>

        <hr style={{ borderWidth: 1, borderColor: `black` }} />

        <div className={`${styles.paper} ${styles.paperClone}`}>
          <div className={styles.paperHeading}>
            <img src="/eth.svg" style={{ float: `left`, marginRight: 10 }} />
            <div>
              <div>{name} - {cryptos[crypto]}</div>
              <strong>{address}</strong>
            </div>
          </div>
          <div className={styles.paperBody}>
            <div style={{ marginRight: 10, flex: 1, fontSize: 12 }}>
              <strong>ADDRESS</strong><br />
              <QRCode value={`https://etherscan.io/address/${address}`} size={160} />
            </div>
            <div style={{ flex: 1, fontSize: 12 }}>
              <strong>SEED WORDS / PRIVATE KEY</strong><br />
              <QRCode value={value} size={160} />
            </div>
          </div>
          <div className={styles.paperFooter}>
            <div>Developed by <strong>Appdeture</strong></div>
            <div>
              {wallet.balance && (wallet.balance / Math.pow(10, 18))}
            </div>
          </div>
        </div>

      </main>

    </div>
  )
}

// <select onChange={e => setCrypto(e.target.value)}>
//   {
//     Object.keys(cryptos).map((symbol, sIndex) => <option value={symbol} key={sIndex}>{cryptos[symbol]}</option>)
//   }
// </select>
