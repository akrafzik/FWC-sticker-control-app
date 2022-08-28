import Sidebar from "./sidebar";
import Footer from "./footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>FWC Sticker Controller</title>
        <meta name="FWC Sticker Controller" content="Created by Alec Krafzik" />
        <link rel="icon" src="/public/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex flex-row justify-start overflow-hidden ">
        <Sidebar />
        <div className="h-screen w-screen flex flex-col justify-start">
          <div className="bg-light-grey flex-1 p-4 overflow-y-auto">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
}
