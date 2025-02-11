import setting from "../assets/setting.png";
import profile from "../assets/profile.png";
import notification from "../assets/notification.png"

function Header() {
    return(
        <div className="flex row items-center justify-between px-[40px] w-full ">
            <Logo />
            <Buttons />
            <Features />
        </div>
    )
}

function Logo(){
    return(
        <p className="font-opensans text-6 text-bold "> E-Pay Finance</p>
    )
}

function Buttons() {
    return(
        <div className="flex row items-center justify-between w-[394px] h-[38px] ">
            <p className="cursor-pointer font-opensans text-[16px] flex column items-center w-[22px] h-[70px] "><link  href="#" >Overview </link> </p>
            <p className="cursor-pointer font-opensans text-[16px] flex column items-center w-[22px] h-[70px] "><link href="#" >Transactions </link></p>
            <p className="cursor-pointer font-opensans text-[16px] flex column items-center w-[22px] h-[70px] "><link href="#" >Accounts </link></p>
            <p className="cursor-pointer font-opensans text-[16px] flex column items-center w-[22px] h-[70px] "><link  href="#" >Cards </link> </p>
            <p className="cursor-pointer font-opensans text-[16px] flex column items-center w-[22px] h-[70px] "><link  href="#" >Invoice </link></p>
            <p className="cursor-pointer font-opensans text-[16px] flex column items-center w-[22px] h-[70px] "><link  href="#" >Insight </link></p>
        </div>
    )
}

function Features() {
    return(
                  <div className=" flex row items-center gap-[4px] w-[138px] h-[42px] ">
                    <img className="w-[24px] h-[24px] " src={notification} alt="notification icon" />
                    <img className="w-[24px] h-[24px] " src={profile} alt="profile icon" />
                    <img className="w-[24px] h-[24px] "src={setting} alt="setting icon" />
                  </div>
    )
}

export default Header;