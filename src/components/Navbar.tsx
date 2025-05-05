import { AlignJustify, Clapperboard, Film, Home, Search, SlidersHorizontal, Tv, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const [showDrawer, setShowDrawer] = useState(false);

    const menuItems = [
        { label: "Trang Chủ", icon: <Home size={16} />, path: "/" },
        { label: "Phim Bộ", icon: <Clapperboard size={16} />, path: "/movies" },
        { label: "Phim Lẻ", icon: <Film size={16} />, path: "/series" },
        { label: "TV Shows", icon: <Tv size={16} />, path: "/tv-shows" },
        { label: "Thể Loại", icon: <SlidersHorizontal size={16} />, path: "/filter" },
        { label: "Tìm Kiếm", icon: <Search size={16} />, path: "/search" },
    ];

    return (
        <div className="w-full h-14 bg-opacity-80 bg-[#24252a] flex items-center px-5 text-white fixed z-50 top-0">
            {/* Desktop Navbar */}
            <div className="max-w-7xl mx-auto w-full hidden md:flex items-center justify-between">
                <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <div className="h-8 w-8 bg-gradient-to-br from-orange-700 to-[#ff630d] rounded flex items-center justify-center">
                        <Film className="h-4 w-4 text-white" />
                    </div>
                    <span className="ml-3 text-white font-medium text-lg">Movie App</span>
                </div>
                <ul className="flex items-center gap-5 ml-auto">
                    {menuItems.map((item, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer hover:text-[#ff630d] transition-all duration-200 text-lg flex items-center gap-2"
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Navbar */}
            <div className="w-full flex md:hidden items-center justify-between">
                <div className="flex items-center gap-2" onClick={() => navigate("/")}>
                    <div className="h-8 w-8 bg-gradient-to-br from-orange-700 to-[#ff630d] rounded flex items-center justify-center">
                        <Film className="h-4 w-4 text-white" />
                    </div>
                    <span className="ml-2 font-semibold text-white">Movie App</span>
                </div>
                <button onClick={() => setShowDrawer(true)}>
                    <AlignJustify className="text-white" />
                </button>
            </div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[80vw] bg-[#1f1f1f] text-white z-50 transform transition-transform duration-300 ease-in-out ${showDrawer ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setShowDrawer(false)}>
                        <X />
                    </button>
                </div>
                <ul className="flex flex-col gap-4 p-4">
                    {menuItems.map((item, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer hover:text-[#ff630d] transition-all duration-200 text-base flex items-center gap-3"
                            onClick={() => {
                                navigate(item.path);
                                setShowDrawer(false);
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Overlay when drawer open */}
            {showDrawer && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setShowDrawer(false)}
                />
            )}
        </div>
    );
}
