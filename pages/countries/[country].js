import Layout from "../../components/layout";

function Page({ country }) {
  return (
    <div>
      <h1>{country}</h1>
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
    },
  };
}

export default Page;
