import React, { useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "../../components";
import { useState } from "react";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helpers";
import icons from "../../ultils/icons";
import { showModal } from "../../store/appSlice";

const { AiOutlineClose } = icons;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isVertifiedEmail, setIsVertifiedEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
    } else toast.info(response.mes, { theme: "colored" });
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  //submit
  const handlesubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    console.log(invalids);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        console.log(response);
        if (response.success) {
          setIsVertifiedEmail(true);
        } else {
          Swal.fire("Oops!", response.mes, "error!");
        }
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Oosp!", rs.mes, "error!");
        }
      }
    }
  }, [payload, isRegister, navigate]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation!", response.mes, "success!").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      Swal.fire("Oops!", response.mes, "error!");
    }
    setIsVertifiedEmail(false);
    setToken("");
  };
  return (
    <div className="w-screen h-screen relative">
      {isVertifiedEmail && (
        <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-overlay flex justify-center py-8 z-50 items-center ">
          <div className="bg-white w-[500px]  rounded-md p-8">
            <h4 className="pb-3">Your enter code:</h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p2 border rounded-md outline-none p-2"
            ></input>
            <button
              type="buton"
              className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4"
              onClick={finalRegister}
            >
              submit
            </button>
          </div>
        </div>
      )}

      {isForgotPassword && (
        <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex justify-center py-8 z-50 ">
          <div className="flex flex-col">
            <label for="email" htmlFor="email" className="text-[18px]">
              Enter your email:
            </label>
            <input
              type="text"
              id="email"
              className="w-[800px] h-[50px] pb-2 border-b outline-none placeholder:text-[15px]"
              placeholder="Ex: abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full flex justify-center pt-3 gap-4">
              <Button
                name="Back"
                handleOnclick={() => setIsForgotPassword(false)}
                style="px-4 py-2 rounded-md text-white bg-red-600 my-2 text-semibold"
              />
              <Button
                name="Submit"
                handleOnclick={handleForgotPassword}
                style="px-4 py-2 rounded-md text-white bg-blue-500 my-2 text-semibold"
              />
            </div>
          </div>
        </div>
      )}

      <img
        src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center">
          <div className="flex w-full justify-center ">
            <h1 className=" w-[90%]  text-[30px] font-semibold text-main mb-8 flex justify-center pl-8">
              {isRegister ? "REGISTER" : "LOGIN"}
            </h1>
            <Link
              to={`/${path.HOME}`}
              className=" hover:underline cursor-pointer w-[10%] text-[25px] text-black px-6"
            >
              <AiOutlineClose />
            </Link>
          </div>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey={"firstname"}
                invalidFields={invalidFields}
                setInvalidField={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey={"lastname"}
                invalidFields={invalidFields}
                setInvalidField={setInvalidFields}
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey={"email"}
            invalidFields={invalidFields}
            setInvalidField={setInvalidFields}
          />

          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey={"mobile"}
              invalidFields={invalidFields}
              setInvalidField={setInvalidFields}
            />
          )}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey={"password"}
            type="password"
            invalidFields={invalidFields}
            setInvalidField={setInvalidFields}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnclick={handlesubmit}
            fw
          />
          <div className="flex  items-center justify-between pt-5 w-full text-[16px]">
            {!isRegister && (
              <span
                className="text-blue-600 hover:text-red-400 cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot your password?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-600 hover:text-red-400 cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create Account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-600 hover:text-red-400 cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Go Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
