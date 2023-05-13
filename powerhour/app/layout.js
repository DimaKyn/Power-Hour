import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from "../components/navbar/Navbar";
import Style from "../styles/Navbar.module.css";
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Power Hour',
  description: 'The workout app for you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        
      </Head>
      <body>{children}
      <Navbar />
      </body>
      
      
    </html>
  )
}
