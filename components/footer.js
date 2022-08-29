import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="bg-dark-gray flex flex-col justify-center items-center text-center p-2 border-t-2 border-dark-red">
        <div className="flex gap-6">
          <h1 className="font-semibold">Build with ❤ by Alec Krafzik</h1>
          <a href="https://www.instagram.com/akrafzik/">
            <FaInstagram className="text-2xl cursor-pointer hover:text-purple-600" />
          </a>
          <a href="https://www.facebook.com/AlecKrafzik/">
            <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
          </a>
          <a href="https://www.linkedin.com/in/aleckfzk/">
            <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
          </a>
          <a href="https://github.com/akrafzik">
            <FaGithub className="text-2xl cursor-pointer hover:text-blue-600" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
