import Layout from "../../components/layout";
import Card from "../../components/card";
import ConfirmDialog from "../../components/dialog";
import Link from "next/link";
import { getMongoDb } from "../../lib/mongodb";
import * as albumRepository from "../../lib/repositories/albums";
import nookies from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
function Page({ country, stickers, info, completed, userData }) {
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
        <div className="flex gap-6 items-center">
          <h1 className="text-lg font-medium text-text">
            <Link href="/countries">Countries</Link>&nbsp;/&nbsp;
            {String(country).toUpperCase()}
          </h1>
          <p>Total: {info.total}</p>
          <p>Acquired: {info.acquired}</p>
          <p>Remaining: {info.remaining}</p>
        </div>
        <div className="flex">
          <ConfirmDialog data={{ type: "apply" }} />
          <ConfirmDialog data={{ type: "cancel" }} />
        </div>
      </div>
      {completed && (
        <div className="title bg-green-900 text-white font-black justify-center">
          <h1>TEAM COMPLETED</h1>
        </div>
      )}
      <nav>
        <ul className="flex flex-wrap mt-5">
          {stickers.map((sticker) => {
            return (
              <li className="mr-2 mt-2">
                <div className="container">
                  <Card data={sticker} />
                </div>
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
    return { props: { userData } };
  }
  const db = await getMongoDb();
  const countryDetails = await albumRepository.getCountry(
    db,
    context.params.country,
    userData.user
  );
    console.log('countryDetails :>> ', countryDetails);
  return {
    props: { userData, ...countryDetails },
  };
}

async function getCountryData(countryId) {
  const cookies = parseCookies(null);
  return fetch(`/api/country/${countryId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      user: JSON.parse(cookies.userData).user,
    },
  });
}

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}

export default Page;
