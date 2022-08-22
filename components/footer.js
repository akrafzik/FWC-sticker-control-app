import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="bg-light flex flex-col justify-center items-center text-center p-5">
        <div className="flex gap-6 pb-5">
          <h1 className=" text-gray-800 font-semibold">
            Build with ❤ by Alec Krafzik
          </h1>
          <FaInstagram className="text-2xl cursor-pointer hover:text-purple-600" />
          <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
          <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
          <FaGithub className="text-2xl cursor-pointer hover:text-blue-600" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
