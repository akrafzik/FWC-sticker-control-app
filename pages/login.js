import Footer from "../components/footer";
import Head from "next/head";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { FaUser, FaKey } from "react-icons/fa";
import nookies from "nookies";

export default function Home() {
  const router = useRouter();
  function logIn() {
    setCookie(
      null,
      "userData",
      JSON.stringify({ user: "6303f2d24db9291420f087d7" })
    );
    router.push("/main");
  }

  function handleSubmit(data) {
    data.preventDefault();
    if (
      data.target.username.value == "akrafzik" &&
      data.target.password.value == "demo"
    )
      logIn();
  }
  return (
    <>
      <Head>
        <title>FWC Sticker Controller</title>
        <meta name="FWC Sticker Controller" content="Created by Alec Krafzik" />
        <link rel="icon" src="/public/favicon.ico" />
      </Head>
      <div className="h-screen w-screen flex flex-row justify-start overflow-hidden ">
        <div className="h-screen w-screen flex flex-col justify-start">
          <div className="h-screen w-screen flex flex-col items-center justify-center access bg-dark-red">
            <div className="h-3/6 w-6/12 0 rounded-md shadow-2xl bg-white opacity-90 outline outline-dark-red flex flex-col justify-around">
              <div className="flex flex-row justify-center">
                <h1 className="font-bold">
                  Welcome to the FIFA Sticker Album Controller!
                </h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-around h-32"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row justify-center">
                    <div className="flex outline rounded h-8 items-center">
                      <FaUser className="ml-2" />
                      <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="ml-2 border-none outline-0"
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center mt-2">
                    <div className="flex outline rounded h-8 items-center">
                      <FaKey className="ml-2" />
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="ml-2 border-none outline-0"
                      ></input>
                    </div>
                  </div>
                </div>
                {/* <div className="flex">
        <p>Forgot Password</p>
    </div> */}
                <div className="flex flex-row justify-center">
                  <button
                    className="h-8 w-16 rounded bg-dark-red text-white font-bold outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              {/* <div className="flex">
        <button>
          <Link href="/register">Register</Link>
          </button>
        </div> */}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const userData = userLogged(context);
  if (userData)
    return {
      redirect: {
        permanent: false,
        destination: "/main",
      },
    };
}

function userLogged(ctx) {
  const cookies = nookies.get(ctx);
  return cookies.userData ? JSON.parse(cookies.userData) : null;
}
