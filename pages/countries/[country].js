import Layout from "../../components/layout";
import Card from "../../components/card";
import ConfirmDialog from "../../components/dialog";
import Link from "next/link";
import { getMongoDb } from "../../lib/mongodb";
import * as albumRepository from "../../lib/repositories/albums";
import nookies from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { parseCookies } from "nookies";

function Page({ country, stickers, info, completed, userData, countryCode }) {
  async function cardClicked(sticker) {
    await updateSticker(
      countryCode,
      `${sticker.identifier}${sticker.title}`,
      !sticker.completed
    );
    Router.reload(window.location.pathname);
  }
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
        {false && (
          <div className="flex">
            <ConfirmDialog data={{ type: "apply" }} />
            <ConfirmDialog data={{ type: "cancel" }} />
          </div>
        )}
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
                <div className="container" onClick={() => cardClicked(sticker)}>
                  <Card data={sticker} clickFunc />
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
  countryDetails.stickers = countryDetails.stickers.map((sticker) => {
    sticker.checked = false;
    return sticker;
  });
  return {
    props: { userData, ...countryDetails, countryCode: context.params.country },
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

async function updateSticker(countryId, sticker, selected) {
  const cookies = parseCookies(null);
  return fetch(`/api/country/${countryId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user: JSON.parse(cookies.userData).user,
      sticker,
      selected,
    }),
  });
}

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}
export default Page;
