import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  FaFlag,
  FaSignOutAlt,
  FaArrowLeft,
  FaTable,
  FaMedal,
} from "react-icons/fa";
import Image from "next/image";
import { destroyCookie } from "nookies";

const menuItems = [
  { id: 1, label: "Main", icon: FaTable, link: "/main" },
  { id: 2, label: "Countries", icon: FaFlag, link: "/countries" },
  { id: 3, label: "Ranking", icon: FaMedal, link: "/ranking" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "px-4 pt-8 pb-4 bg-dark-gray flex justify-between flex-col border-r-2 border-dark-red",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-dark-gray absolute right-0 outline outline-offset-2 outline-dark-red hover:bg-light-lighter",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (index) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter hover:text-black rounded w-full overflow-hidden whitespace-nowrap mt-2",
      {
        ["bg-dark-red text-white outline outline-offset-2 outline-dark-red"]:
          activeMenu?.id === index + 1,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const logout = () => {
    destroyCookie(null, "userData");
    router.push("/login");
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <Image src="/favicon.ico" alt="logo" width="64" height="64" />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              2022 Sticker
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <FaArrowLeft />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(index);
            return (
              <div className={classes}>
                <Link href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span className={classNames("text-md font-medium")}>
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${getNavItemClasses({})} px-4 py-5`} onClick={logout}>
        <div style={{ width: "2.5rem" }}>
          <FaSignOutAlt />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium")}>Logout</span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
