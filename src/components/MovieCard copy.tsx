import { Tooltip } from "antd";
import { IMovies } from "../interfaces/interfaces";
import { Bookmark, Play, ScanSearch, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { scrollToTop } from "../utils/utils";

interface MovieCardProps extends IMovies {
  refetchFavorites?: () => Promise<void>;
}

export default function MovieCard({ movie, refetchFavorites }: MovieCardProps) {
  const [viewInfor, setViewInfor] = useState(false);
  const width = window.innerWidth;
  const [bookmarked, setBookmarked] = useState(false);

  const handleViewInfor = () => {
    setViewInfor(!viewInfor);
    console.log(viewInfor);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");

    const alreadyExists = existing.some(
      (item: { movie: { _id: string } }) => item.movie._id === movie._id
    );

    let updated;

    if (alreadyExists) {
      // Nếu đã tồn tại thì xoá
      updated = existing.filter(
        (item: { movie: { _id: string } }) => item.movie._id !== movie._id
      );
    } else {
      // Nếu chưa có thì thêm
      updated = [...existing, { movie }];
    }


    localStorage.setItem("favorites", JSON.stringify(updated));
  }, [bookmarked]);

  const respone = JSON.parse(localStorage.getItem("favorites") || "[]")

  const router = useNavigate();

  console.log(respone.some((item: any) => item.movie._id === movie._id));

  useEffect(() => {
    if (bookmarked && respone.some((item: any) => item.movie._id === movie._id)) {
      if (refetchFavorites) {
        refetchFavorites();

      }
    }
  }, [respone])

  return (
    <div
      className="relative group flex-shrink-0 w-[10rem] md:w-[15rem]"
      onClick={() => { router(`/details/${movie.slug}`), scrollToTop() }}
    >
      <div className="w-full relative">
        <img
          src={movie.poster_url}
          alt={movie.poster_url || "img"}
          className="w-full object-cover h-[15rem] md:h-[22rem]"
          loading="lazy"
        />
        <button
          className="absolute right-0 top-0 bg-black/30 text-white p-0.5 m-1 md:hidden z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleViewInfor();
          }}
        >
          {viewInfor ? <X className="" /> : <ScanSearch />}
        </button>
        <div className="my-2">
          <h1 className="text-white text-sm font-semibold truncate">
            {movie.name}
          </h1>
          <div className="flex items-center justify-between mt-1">
            <p className="text-gray-400 text-xs">{movie.year}</p>
            <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
              {movie?.tmdb?.vote_average.toFixed(1)}{" "}
              <Star absoluteStrokeWidth size={10} strokeWidth={1} />
            </p>
          </div>
        </div>
      </div>
      <div
        className={`absolute bg-black inset-0 opacity-0 transition-all duration-100 cursor-pointer md:group-hover:opacity-90 ${viewInfor ? "opacity-100" : ""
          }`}
      ></div>
      <div
        className={`absolute flex flex-col justify-between p-3 top-0 opacity-0 md:group-hover:opacity-100 cursor-pointer transition-all duration-100 left-0 right-0 bottom-0 z-10 ${viewInfor ? "opacity-100" : ""
          }`}
      >
        <div>
          <p className="text-white text-sm font-semibold">{movie.name}</p>
          <p className="text-gray-500 text-[12px] hidden md:block">
            {movie.origin_name}
          </p>
          <p className="text-[#ff630d] text-[12px]">
            {movie.quality} - {movie.lang} -
            {movie.episode_current?.includes(" Hoàn Tất") ||
              movie.episode_current?.includes("Full")
              ? movie.episode_current
              : ` ${movie.episode_current} / ${movie.episode_total}`}
          </p>
          <p className="text-white text-[12px] text-justify mt-2">
            {movie.content.length > (width > 480 ? 300 : 100)
              ? movie.content.substring(0, width > 480 ? 300 : 100) + "..."
              : movie.content}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Tooltip
            placement="top"
            title={`Xem Ngay ${movie.time}`}
            trigger={["hover"]}
            color="#ff630d"
            overlayInnerStyle={{ color: "#fff" }}
          >
            <button className="p-1">
              <Play absoluteStrokeWidth color="#ff630d" />
            </button>
          </Tooltip>

          {/* <h1 className="text-white text-3xl">sdkl {respone.some((item: any) => item.movie._id === movie._id)}</h1> */}

          <Tooltip
            placement="top"
            title={`${bookmarked ? "Đã yêu thích" : "Yêu thích"}`}
            trigger={["hover"]}
            color="#ff630d"
            overlayInnerStyle={{ color: "#fff" }}
          >
            <button
              className={`${bookmarked ? "bg-[#ff630d]" : ""
                } p-1 transition-all duration-200`}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark();
              }}
            >
              <Bookmark
                absoluteStrokeWidth
                color={`${bookmarked ? "#fff" : "#ff630d"}`}
              />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
