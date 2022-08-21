import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const footerStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%"
};
function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
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
