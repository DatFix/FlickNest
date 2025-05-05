import React from 'react';
import { Carousel } from 'antd';
import useFetch from '../hooks/useFetch';
import { getThumbnailMovie } from '../api/api';
import { IMovies } from '../interfaces/interfaces';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Banner: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const navigate = useNavigate()

  const { data: thumbnailMovie } = useFetch(getThumbnailMovie)

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 md:left-2 -left-1 -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
      >
        <ChevronLeft absoluteStrokeWidth size={40} strokeWidth={2} className='text-white/80' />
      </div>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 md:right-2 -right-2 -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
      >
        <ChevronRight absoluteStrokeWidth size={40} strokeWidth={2} className='text-white/80' />
      </div>
    );
  };


  return (
    <div className='md:min-h-screen relative md:pt-0 pt-14'>
      <Carousel afterChange={onChange} autoplay autoplaySpeed={5000} arrows fade pauseOnHover={false} prevArrow={<PrevArrow />} nextArrow={<NextArrow />} dots={false}>
        {thumbnailMovie?.items?.map((item: IMovies, index: number) => (
          <div className='relative' key={index}>
            <img
              src={`https://phimimg.com/${item.thumb_url}`}
              alt={`Thumbnail for ${item.origin_name || 'movie'}`}
              className='object-cover aspect-video w-full md:h-[100vh]'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-gradient-to-tr from-black to-black/10'></div>
            <div className='absolute bottom-[15%] left-[8%] md:left-[5%] md:bottom-[30%] text-white w-[70vw] md:w-[60vw] lg:w-[35vw]'>
              <h2 className='text-lg md:text-3xl lg:text-4xl font-playwight font-bold md:leading-[3.2rem]'>{item.name || 'Untitled'}</h2>
              <div className='flex items-center gap-1 md:my-5 my-1'>
                <p className='px-1.5 py-0.5 bg-gray-500 inline-block italic text-[10px] md:text-[12px] rounded-sm'>{item.quality}</p>
                <p className='px-1.5 py-0.5 bg-gray-500 inline-block italic text-[10px] md:text-[12px] rounded-sm'>{item.lang}</p>
              </div>
              <button className='md:px-3 md:py-2 px-1.5 py-1 bg-[#ff630d] text-gray-900 text-[12px] font-bold uppercase flex items-center justify-center gap-2 transition-all duration-100 hover:bg-[#f77b39] active:translate-y-1'
                onClick={() => navigate(`/details/${item.slug}`)}
              >
                <Play absoluteStrokeWidth className='size-3.5 md:size-5' /> Xem ngay {item.episode_current}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;