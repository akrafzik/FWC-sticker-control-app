import Layout from "../components/layout";
import classNames from "classnames";
import nookies from "nookies";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getMongoDb } from "../lib/mongodb";
import * as usersRepository from "../lib/repositories/users";
export default function Page({ ranking, userData }) {
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
        <h1 className="text-lg font-medium text-text">Ranking</h1>
      </div>
      <nav className="h-1/2 w-1/2">
        <table className="border border-solid border-black m-5">
          <thead>
            <tr>
              <td className="border border-solid border-black text-center">#</td>
              <td className="border border-solid border-black text-center">Name</td>
              <td className="border border-solid border-black text-center">Stickers count</td>
            </tr>
          </thead>
          <tbody>
            {ranking.map((user, index) => {
              return (
                <tr>
                  <td className="border border-solid border-black text-center">
                    {index + 1}
                  </td>
                  <td className="border border-solid border-black text-center">
                    {user.name}
                  </td>
                  <td className="border border-solid border-black text-center">
                    {user.count}
                  </td>
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

export async function getServerSideProps(context) {
  const userData = userLogged(context) || null;
  if (!userData) {
    return { props: { ranking: [], userData } };
  }
  const db = await getMongoDb();
  const ranking = await usersRepository.listRanking(db);
  return {
    props: {
      ranking,
      userData,
    },
  };
}

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}
