import Layout from "../components/layout";
import Link from "next/link";
import Card from "../components/card";

export default function Page({ countries }) {
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
                <Link href={getLink("63017a1417a4531c0ee95aa5")}>
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
  return {
    props: {
      countries: [
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
        { title: "Brazil", identifier: "BRA", completed: true, remaining: 0 },
        {
          title: "Germany",
          identifier: "GER",
          completed: false,
          remaining: 10,
        },
      ],
    }, // will be passed to the page component as props
  };
}

const getLink = (id) => `/countries/${id}`;
