import * as React from "react";
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { AppState } from '../../pages/App/App'

interface LayoutProps{
    children: React.ReactElement
    app: AppState
    setApp: React.Dispatch<React.SetStateAction<any>>
}

export default function Layout({children , app , setApp}: LayoutProps) {
    return (
        <>
        <Header app={app} setApp={setApp} />
        <main className="">{children}</main>
        <Footer />
        </>
    );
  }