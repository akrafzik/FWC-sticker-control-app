import Layout from "../../components/layout";
import Card from "../../components/card";
function Page({ country, stickers }) {
  return (
    <div>
      <h1 className="text-lg font-medium text-text">
        {String(country).toUpperCase()}
      </h1>
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
  return {
    props: {
      country: params.country,
      stickers: [
        { title: "01", identifier: "BRA", completed: true },
        {
          title: "02",
          identifier: "BRA",
          completed: false
        },
        { title: "03", identifier: "BRA", completed: true },
        {
          title: "04",
          identifier: "BRA",
          completed: false
        },
        { title: "05", identifier: "BRA", completed: true },
        {
          title: "06",
          identifier: "BRA",
          completed: false
        },
        { title: "07", identifier: "BRA", completed: true },
        {
          title: "08",
          identifier: "BRA",
          completed: false
        },
        { title: "09", identifier: "BRA", completed: true },
        {
          title: "10",
          identifier: "BRA",
          completed: false
        },
        { title: "11", identifier: "BRA", completed: true },
        {
          title: "12",
          identifier: "BRA",
          completed: false
        },
        { title: "13", identifier: "BRA", completed: true },
        {
          title: "14",
          identifier: "BRA",
          completed: false
        },
        { title: "15", identifier: "BRA", completed: true },
        {
          title: "16",
          identifier: "BRA",
          completed: false
        },
        { title: "17", identifier: "BRA", completed: true },
        {
          title: "18",
          identifier: "BRA",
          completed: false
        },
        { title: "19", identifier: "BRA", completed: true },
        {
          title: "20",
          identifier: "BRA",
          completed: false
        },
      ]
    },
  };
}

export default Page;
