import { useState } from "react";
import logo from "../../assets/images/naa_logo_favicon.png";
import profimage from '../../assets/images/image.jpg';
import { IoIosArrowDown } from "react-icons/io";
import { RiHome5Line } from "react-icons/ri";
import { PiBookOpenTextThin } from "react-icons/pi";
import { IoPartlySunnyOutline, IoSettingsOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";

function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Menyu məlumatları alt başlıqlarla birlikdə
  const menus = [
    {
      id: "postMedia",
      icon: <RiHome5Line className="text-[20px]" /> ,
      label: "NAA Website",
      subMenus: ["Post", "Media Library", "System Settings"],
    },
    {
      id: "library",
      icon: <PiBookOpenTextThin className="text-[20px]" />,
      label: "Library",
      subMenus: ["Books", "Journals", "Archives"],
    },
    {
      id: "meteorology",
      icon: <IoPartlySunnyOutline className="text-[20px]" /> ,
      label: "Meteorology",
      subMenus: ["Forecast", "Climate Data", "Satellite Images"],
    },
    {
      id: "museum",
      icon: <BsBank className="text-[20px]" /> ,
      label: "Museum",
      subMenus: ["Exhibits", "Tickets", "Events"],
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-[318px] h-full rounded-2xl border border-[#F7F7F7] py-6 shadow-[#EBEBEB40]">
      
      {/* Logo */}
      <div className="flex gap-1.5 pl-3 items-center">
        <img src={logo} alt="Logo" className="w-[51px] h-[30px]" />
        <p className="font-medium text-[18px] font-lato">NAA Control Panel</p>
      </div>

      <hr className="w-[318px] text-[#f3f3f3]" />

      {/* Accordion Menu */}
      <div className="flex flex-col gap-2 p-3">
        {menus.map((menu) => (
          <div key={menu.id}>
            {/* Başlıq */}
            <button
              onClick={() => toggleMenu(menu.id)}
              className={`w-full text-left p-5 font-medium rounded-xl flex gap-2 justify-between items-center font-lato
                ${openMenu === menu.id ? "bg-[#243C7B] text-white" : "bg-white text-[#787486]"}
                 duration-200 transition-all
              `}
            >
              <div className="flex items-center gap-2 font-medium ">
                {menu.icon}
                {menu.label}
              </div>

              {/* Arrow Icon */}
              <IoIosArrowDown
                className={`transition-transform duration-200 ${openMenu === menu.id ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            {/* Alt Menyu */}
            {openMenu === menu.id && (
              <div className="flex flex-col p-5 mt-1 text-[#787486] gap-4 border rounded-xl border-[#f7f7f7]  shadow-[#EBEBEB40]">
                {menu.subMenus.map((sub, index) => (
                  <button
                    key={index}
                    className="text-sm hover:text-[#243C7B] text-left transition-colors duration-200"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <hr className="w-[318px] text-[#f3f3f3]" />
      <div className="flex items-center rounded-xl gap-2 m-5 border p-5 border-[#f7f7f7]  shadow-[#EBEBEB40] text-[#787486]">
        <IoSettingsOutline />
        Settings
      </div>
      <div className="flex gap-2 items-center m-5 p-5 rounded-xl bg-[#243C7B]">
        
          <img src={profimage} alt="" className="w-[38px] h-[38px] rounded-[50%] object-cover  " />
        
        <div>
          <p className="text-white">Khayal Ahmadli</p>
          <p className="text-[#D1D1D1]">khahmadli</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
