import Layout from "../components/layout";
import Link from "next/link";
import Card from "../components/card";
import nookies from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getMongoDb } from "../lib/mongodb";
import * as albumRepository from "../lib/repositories/albums";

export default function Page({ countries, userData }) {
  const router = useRouter();
  if (!userData) {
    useEffect(() => {
      router.push("/login");
    }, []);
    return <></>;
  }
  return (
    <div>
      <div className="title">
        <h1 className="text-lg font-medium text-text title">Countries</h1>
      </div>
      <nav>
        <ul className="flex flex-wrap mt-5">
          {countries.map((country) => {
            return (
              <li className="mr-2 mt-2">
                <Link href={getLink(country._id)}>
                  <div className="container">
                    <Card data={{ ...country, type: "country" }} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const userData = userLogged(context) || null;
  if (!userData) {
    return { props: { countries: [], userData } };
  }
  const db = await getMongoDb();
  const countries = await albumRepository.listCountries(db, userData.user);
  return {
    props: {
      countries,
      userData,
    },
  };
}

const getLink = (id) => `/countries/${id}`;

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}
