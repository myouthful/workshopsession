import backarrow from "../assets/backarrow.png";
import { useState } from "react";
import loginlockicon from "../assets/loginlockicon.png";
import axios from "axios";

function MobileSignIn() {
  return (
    <div className="bg-darkgreen h-screen w-screen flex-col flex items-center">
      <div className="flex items-center gap-[16px] bg-darkgreen mt-[53px]">
        <img src={backarrow} className="w-[16px] h-[16px]" alt="back button" />
        <p className="w-fit font-opensans font-medium text-white text-[20px] ">
          Sign in
        </p>
      </div>
      <div className="w-screen flex-col flex items-center rounded-t-md bg-white ">
        <div className="flex-col gap-[10px] flex items-center mt-[20px]">
          <p
            className="
           font-opensans "
          >
            Welcome Back
          </p>
          <p
            className="
           font-opensans "
          >
            Hello there, sign in to continue
          </p>
        </div>
        <div>
          <img
            className="w-[150px] h-[150px] "
            src={loginlockicon}
            alt="login icon"
          />
        </div>
        <form action="">
          <div className="flex flex-col gap-[10px] mt-[20px]">
            <input
              type="text"
              placeholder="Email"
              className="w-[250px] h-[50px] border-2 border-darkgreen rounded-md pl-[10px]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[250px] h-[50px] border-2 border-darkgreen rounded-md pl-[10px]"
            />
          </div>
          <div className="flex flex-col font-opensans gap-[10px] mt-[20px]">
            <p>Forgot Password?</p>
          </div>
          <button className="bg-button-blue  w-[250px] font-opensans h-[50px] rounded-md mt-[20px]">
            Sign in
          </button>
        </form>
        <div className="flex flex-col font-opensans gap-[10px] mt-[20px]">
          <p>Don't have an account? Sign up</p>
        </div>
      </div>
    </div>
  );
}

export default MobileSignIn;
