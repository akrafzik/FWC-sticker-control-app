import Layout from "../components/layout";
import classNames from "classnames";
import nookies from "nookies";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getMongoDb } from "../lib/mongodb";
import * as albumRepository from "../lib/repositories/albums";
export default function Page({ info, table, userData }) {
  const router = useRouter();
  if (!userData) {
    useEffect(() => {
      router.push("/login");
    }, []);
    return <></>;
  }
  const countries = Object.keys(table);
  return (
    <div>
      <div className="title">
        <h1 className="text-lg font-medium text-text">Main</h1>
        <p>Total: {info.total}</p>
        <p>Acquired: {info.acquired}</p>
        <p>Remaining: {info.remaining}</p>
      </div>
      <nav>
        <table className="border border-solid border-black m-5 text-xs">
          <tbody>
            {countries.map((country) => {
              return (
                <tr>
                  <td className="border border-solid border-black text-center">
                    {country}
                  </td>
                  {Object.keys(table[country]).map((sticker) => {
                    const tdClass = getDataClass(table[country][sticker]);
                    return <td className={tdClass}>{sticker}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </nav>
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const getDataClass = (completed) => {
  return classNames("border border-solid border-black text-center  ", {
    ["bg-black"]: completed,
  });
};

export async function getServerSideProps(context) {
  const userData = userLogged(context) || null;
  if (!userData) {
    return { props: { info: {}, table: {}, userData } };
  }
  const db = await getMongoDb();
  const albumData = await albumRepository.listMain(db, userData.user);
  return {
    props: {
      ...albumData,
      userData,
    },
  };
}

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}

async function generateAlbum() {
  const cookies = parseCookies(null);
  await fetch("/api/album/generate", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ user: JSON.parse(cookies.userData).user }),
  });
}

async function getAlbumData() {
  const cookies = parseCookies(null);
  const userId = JSON.parse(cookies.userData).user;
  return fetch("/api/albums", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      user: userId,
    },
  });
}
