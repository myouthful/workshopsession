import setting from "../assets/setting.png";
import profile from "../assets/profile.png";
import notification from "../assets/notification.png";
import { useState ,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Header() {
    return(
        <div className="fixed top-0 left-0 right-0 z-50 bg-darkgreen flex row items-center py-[8px] justify-between px-[50px] w-full ">
            <Logo />
            <Buttons />
            <Features />
        </div>
    )
}

function Logo(){
    return(
        <p className="font-opensans text-6 font-semibold text-mustardyellow "> E-Pay Finance</p>
    )
}

function Buttons() {
    const [activeLink, setActiveLink] = useState(() => {
        // Initialize from localStorage or default to 'Overview'
        return localStorage.getItem('activeLink') || 'Overview'
    });
    const navigate = useNavigate();

    // Update localStorage whenever activeLink changes
    useEffect(() => {
        localStorage.setItem('activeLink', activeLink);
    }, [activeLink]);

    const handleClick = (link) => {
        setActiveLink(link);
        if (link === 'Transactions') {
            navigate('/transfer');
        } else if (link === 'Overview') {
            navigate('/');
        }
    };
    const links = ['Overview', 'Transactions', 'Accounts', 'Cards', 'Invoice', 'Insight'];

    return(
        <div className="flex row items-center justify-between gap-[28px] w-[540px] h-[38px] ">
            {links.map((link) => (
                <p 
                    key={link}
                    className={`cursor-pointer font-opensans font-thin text-[12px] flex column items-center h-[38px] px-3 py-2 rounded ${
                        activeLink === link ? 'bg-mustardyellow text-white font-medium' : 'text-white'
                    }`}
                    onClick={() => handleClick(link)}
                >
                    {link}
                </p>
            ))}
        </div>
    );
}


function Features() {
    return(
                  <div className=" flex row items-center gap-[12px]  h-[42px] ">
                    <img className="w-[18px] h-[18px] " src={notification} alt="notification icon" />
                    <img className="w-[18px] h-[18px] " src={profile} alt="profile icon" />
                    <img className="w-[18px] h-[18px] "src={setting} alt="setting icon" />
                  </div>
    )
}

export default Header;