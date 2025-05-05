import {
  ArrowUp,
  ChevronRight,
  Facebook,
  Globe,
  Instagram,
  Mail,
  Smartphone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../assets/television.png'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              {/* <div className="h-8 w-8 bg-gradient-to-br from-orange-700 to-[#ff630d] rounded flex items-center justify-center">
                <Film className="h-4 w-4 text-white" />
              </div> */}
              <img src={logo} alt="logo" />
              <span className="ml-3 text-white font-medium text-lg">
                FlickNest
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Nền tảng xem phim trực tuyến hàng đầu Việt Nam với kho phim đa
              dạng, chất lượng cao và cập nhật liên tục.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  <span>Trang chủ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/filter"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  <span>Lọc phim</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  <span>Tìm kiếm</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  <span>Phim mới</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  <span>Phim phổ biến</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-1" />
                  <span>Phim sắp chiếu</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white font-medium mb-4">Thể loại</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Hành động</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Tình cảm</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Hài hước</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Kinh dị</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Viễn tưởng</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Hoạt hình</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Phiêu lưu</span>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center"
              >
                <ChevronRight className="h-4 w-4 mr-1" />
                <span>Tâm lý</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-4">Liên hệ & Đăng ký</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                <span className="text-gray-400">support@movieapp.com</span>
              </li>
              <li className="flex items-start">
                <Smartphone className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                <span className="text-gray-400">+84 123 456 789</span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                <span className="text-gray-400">www.movieapp.com</span>
              </li>
            </ul>
            <div>
              <h4 className="text-white text-sm font-medium mb-2">
                Đăng ký nhận thông báo
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="bg-gray-800 text-white rounded-l-md py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md px-4 transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 py-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-medium mb-2">
                Tải ứng dụng FlickNest
              </h3>
              <p className="text-gray-400 text-sm">
                Xem phim mọi lúc, mọi nơi trên thiết bị di động của bạn
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="block">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6124/6124997.png"
                  alt="Download on App Store"
                  className="h-10"
                />
              </a>
              <a href="#" className="block">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5977/5977575.png"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FlickNest. Tất cả các quyền được
            bảo lưu.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              Điều khoản sử dụng
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              Trợ giúp
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-indigo-400 transition-colors"
            >
              FAQ
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="hidden md:flex items-center justify-center h-10 w-10 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
