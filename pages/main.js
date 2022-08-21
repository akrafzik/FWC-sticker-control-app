import Layout from "../components/layout";

export default function Page({ info, table }) {
  return (
    <div>
      <div className="title">
      <h1 className="text-lg font-medium text-text">Main</h1>
      <button>Teste</button>
      </div>
      <nav>
        <ul className="flex flex-wrap mt-5">
          {/* {countries.map((country) => {
            return (
              <li className="mr-2 mt-2">
                <Link href={getLink(country.title)}>
                  <div className="container">
                    <Card data={{ ...country, type: "country" }} />
                  </div>
                </Link>
              </li>
            );
          })} */}
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
      info: {total: 670, acquired: 240, remaining: 430  },
      table: {
        "Brazil": {"01": true, "02": false, "03": true, "04": false, "05": true, "06": false, "07": true, "08": false},
        "Germany": {"01": true, "02": false, "03": true, "04": false, "05": true, "06": false, "07": true, "08": false},
        "Qatar": {"01": true, "02": false, "03": true, "04": false, "05": true, "06": false, "07": true, "08": false},
      }
    }, // will be passed to the page component as props
  };
}
