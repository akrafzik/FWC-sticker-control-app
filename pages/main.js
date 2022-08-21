import Layout from "../components/layout";
import classNames from "classnames";

export default function Page({ info, table }) {
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
        <table className="main m-5">
          {countries.map((country) => {
            return (
              <tr>
                <td className="p-2">{country}</td>
                {
                  Object.keys(table[country]).map((sticker) => {
                    const tdClass = getDataClass(table[country][sticker]);
                    return (
                      <td className={tdClass}>{sticker}</td>
                    )
                  })
                }
              </tr>
            );
          })}
        </table>
      </nav>
    </div>
  );
}

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const getDataClass = (completed) => {
  return classNames(
    "pr-2 main",
    {
      ["bg-black"]: completed,
    }
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      info: { total: 670, acquired: 240, remaining: 430 },
      table: {
        Brazil: {
          "01": true,
          "02": false,
          "03": true,
          "04": false,
          "05": true,
          "06": false,
          "07": true,
          "08": false,
        },
        Germany: {
          "01": true,
          "02": false,
          "03": true,
          "04": false,
          "05": true,
        },
        Qatar: {
          "01": true,
          "02": false,
          "03": true,
          "04": false,
          "05": true,
          "06": false,
          "07": true,
          "08": false,
          "09": true,
          "10": false,
        },
      },
    }, // will be passed to the page component as props
  };
}
