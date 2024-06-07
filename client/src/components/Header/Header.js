import React, { Fragment, memo, useEffect, useState } from "react";
import a from "../../assets/a.jpg";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { BsHandbagFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const { BsTelephone, TfiEmail, BsCart, FaUserAlt, RiPhoneFill, MdEmail } =
  icons;

const Header = () => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="border-b flex w-main h-[110px]  justify-between">
      <Link to={`/${path.HOME}`}>
        <img
          src={a}
          alt="a"
          className="object-contain h-[90px] pt-[10px] "
        ></img>
      </Link>
      <div className=" flex py-[36px] ">
        <div className="flex flex-col items-center px-6 border-r text-[13px]">
          <span className="flex gap-4 items-center">
            <BsTelephone color="orange" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r text-[13px]">
          <span className="flex gap-4 items-center">
            <TfiEmail color="orange" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
          <BsCart color="orange" />

          <span>0 items</span>
        </div>
        {current && (
          <Fragment>
            <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
              <BsHandbagFill color="red" />
              <span> 0 item</span>
            </div>
            <Link
              className="cursor-pointer flex items-center justify-center px-6 gap-2 relative"
              to={
                `+current.role === 1945`
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
              id="profile"
            >
              <FaUserCircle color="red" />
              <span>Profile</span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};
export default Header;
