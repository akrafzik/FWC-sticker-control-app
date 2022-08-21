import Layout from "../components/layout";
import Link from "next/link";

export default function Page({ countries }) {
  return (
    <div>
      <h1>Countries</h1>
      <nav>
        <ul>
          {countries.map((country) => {
            return (
              <li>
                <Link href={getLink(country)}><div>{country}</div></Link>
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
      countries: ["Brasil", "Alemanha"],
    }, // will be passed to the page component as props
  };
}

const getLink = (country) => (`/countries/${country}`)
