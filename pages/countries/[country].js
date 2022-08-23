import Layout from "../../components/layout";
import Card from "../../components/card";
import ConfirmDialog from "../../components/dialog";
import Link from "next/link";
import { getMongoDb } from "../../lib/mongodb";
import * as albumRepository from "../../lib/repositories/albums";
function Page({ country, stickers, totals, completed }) {
  return (
    <div>
      <div className="title">
        <div className="flex gap-6 items-center">
          <h1 className="text-lg font-medium text-text">
            <Link href="/countries">Countries</Link>&nbsp;/&nbsp;
            {String(country).toUpperCase()}
          </h1>
          <p>Total: {totals.total}</p>
          <p>Acquired: {totals.acquired}</p>
          <p>Remaining: {totals.remaining}</p>
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

export async function getServerSideProps({ params }) {
  const db = await getMongoDb();
  const countryDetail = await albumRepository.getCountry(
    db,
    params.country,
    "6303f2d24db9291420f087d7" // mudar para cookie
  );
  return {
    props: countryDetail,
  };
}

export default Page;
