import { useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

export default function Home({ userData }) {
  const router = useRouter();
  useEffect(() => {
    if (!userData) router.push("/login");
    else router.push("/main");
  }, []);

  return <div></div>;
}

export async function getServerSideProps(context) {
  const userData = userLogged(context);
  return {
    props: {
      userData,
    },
  };
}

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}
