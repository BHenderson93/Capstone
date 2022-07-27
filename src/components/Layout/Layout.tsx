import * as React from "react";
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { AppState } from '../../pages/App/App'

interface LayoutProps{
    children: React.ReactElement
    app: AppState
}

export default function Layout({children , app}: LayoutProps) {
    return (
        <>
        <Header app={app}/>
        <main>{children}</main>
        <Footer />
        </>
    );
  }