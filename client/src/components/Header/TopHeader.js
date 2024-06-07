import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { logout, clearMessage } from "../../store/user/userSlice";
import Swal from "sweetalert2";

const { AiOutlineLogout } = icons;
const TopHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);
  return (
    <div className="h-[45px] w-full bg-orange-600 flex items-center justify-center">
      <div className="w-main flex justify-between text-slate-50">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn && current ? (
          <div className="flex gap-2 items-center">
            <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
            <span
              onClick={() => dispatch(logout())}
              className="hover:rounded-full hover:bg-gray-300 hover:text-main cursor-pointer p-2"
            >
              <AiOutlineLogout size={18} />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
