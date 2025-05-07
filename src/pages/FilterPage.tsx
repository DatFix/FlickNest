import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { filterMovies, getAllCategories, getAllCountries } from "../api/api";
import { useEffect, useState } from "react";
import { Categories, Countries, IMovies } from "../interfaces/interfaces";
import { Radio } from "antd";
import { getYearToNow } from "../utils/utils";
import { LANGUAGES } from "../constants/languages";
import CardSkeleton from "../components/CardSkeleton";
import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";

export default function FilterPage() {
    const [tab, setTab] = useState<"categories" | "year" | "orther">('categories')
    const { data: allCategories, loading: allCategoriesLoading, error: allCategoriesError } = useFetch(getAllCategories)
    const { data: allCountries, loading: allCountriesLoading, error: allCountriesError } = useFetch(getAllCountries)
    const [categories, setCategories] = useState<Categories[]>([]);
    const [countries, setCountries] = useState<Countries[]>([]);
    const [categoryValue, setCategoryValue] = useState('')
    const [countriesValue, setCountriesValue] = useState('')
    const { years } = getYearToNow();
    const [yearValue, setYearValue] = useState('');
    const [sortlang, setSortLang] = useState<'vietsub' | 'thuyet-minh' | 'long-tieng' | ''>('')
    const [showDropdown, setShowDropdown] = useState(true)
    const width = window.innerWidth;

    useEffect(() => {
        if (width <= 480){
            setShowDropdown(false)
        }
    }, [width])

    const { data: filterData, loading: filterLoading, error: filterError, refetch: filterRefetch, reset } = useFetch(() => filterMovies({
        category: categoryValue,
        country: countriesValue,
        sort_lang: sortlang,
        year: yearValue as string
    }))

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (categoryValue.trim() || countriesValue.trim() || sortlang.trim() || yearValue) {
                await filterRefetch()
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(searchTimeout)
    }, [categoryValue, countriesValue, sortlang, yearValue])

    console.log(filterData, "filterData");

    const handleSetTab = (tabName: "categories" | "year" | "orther") => {
        setTab(tabName)
    }

    useEffect(() => {
        if (allCategories) {
            setCategories(allCategories)
        }

        if (allCountries) {
            setCountries(allCountries)
        }
    }, [allCategories, allCountries])

    return (
        <div className="max-w-7xl mx-auto min-h-screen">
            {allCategoriesLoading && allCountriesLoading ? (
                <Loading />
            ) : allCategoriesError && allCountriesError ? (
                <p>Error</p>
            ) : allCategories && allCountries &&(
            <div className="w-full pt-20 md:pt-40 grid-cols-1 md:flex gap-5 justify-center px-3 lg:px-0">
                <div className="w-full md:w-2/6 lg:w-2/6">
                    <div className="w-full bg-[#202938] rounded-xl p-5 mb-5">
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-white flex items-center gap-2"><SlidersHorizontal className="size-4" /> Bộ lọc</p>
                            <button onClick={() => setShowDropdown(!showDropdown)}><ChevronDown className="text-gray-400" /></button>
                        </div>

                        <div className={`transition-all duration-200 ${showDropdown ? 'block' : 'hidden'}`}>
                            <div className="flex items-center justify-between my-3 text-gray-400 border-b border-gray-500">
                                <div className={`cursor-pointer font-semibold transition-all duration-200 ${tab === 'categories' ? 'border-b border-[#645be0] text-[#645be0]' : ''}`} onClick={() => handleSetTab('categories')}>Thể Loại</div>
                                <div className={`cursor-pointer font-semibold transition-all duration-200 ${tab === 'year' ? 'border-b border-[#645be0] text-[#645be0]' : ''}`} onClick={() => handleSetTab('year')}>Năm</div>
                                <div className={`cursor-pointer font-semibold transition-all duration-200 ${tab === 'orther' ? 'border-b border-[#645be0] text-[#645be0]' : ''}`} onClick={() => handleSetTab('orther')}>Khác</div>
                            </div>

                            <div className="my-2">
                                <div className={`w-full ${tab === 'categories' ? 'block' : 'hidden'}`}>
                                    <Radio.Group
                                        value={categoryValue}
                                        onChange={(e) => setCategoryValue(e.target.value)}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        {categories?.map((item: Categories) => (
                                            <Radio key={item._id} value={item.slug} className="text-gray-500">
                                                {item.name}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>

                                <div className={`w-full ${tab === 'year' ? 'block' : 'hidden'}`}>
                                    <Radio.Group
                                        value={yearValue}
                                        onChange={(e) => setYearValue(e.target.value)}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        {years?.map((item: number, index: number) => (
                                            <Radio key={index} value={item} className="text-gray-500">
                                                {item}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>

                                <div className={`w-full ${tab === 'orther' ? 'block' : 'hidden'}`}>
                                    <p className="text-[#ff630d] pb-1 font-semibold">Phụ đề</p>
                                    <Radio.Group
                                        value={sortlang}
                                        onChange={(e) => setSortLang(e.target.value)}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        <Radio value="vietsub" className="text-gray-500">Vietsub</Radio>
                                        <Radio value="thuyet-minh" className="text-gray-500">Thuyết minh</Radio>
                                        <Radio value="long-tieng" className="text-gray-500">Lồng tiếng</Radio>
                                    </Radio.Group>


                                    <p className="text-[#ff630d] pb-1 font-semibold">Quốc gia</p>
                                    <Radio.Group
                                        value={countriesValue}
                                        onChange={(e) => setCountriesValue(e.target.value)}
                                        className="grid grid-cols-2 gap-2"
                                    >
                                        {countries?.map((item: Countries) => (
                                            <Radio key={item._id} value={item.slug} className="text-gray-500">
                                                {item.name}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-4/6 lg:w-4/6 mt-5 md:mt-0">
                    <div className="flex items-center gap-2 mb-5">
                        <button className={`bg-[#1d2635] px-2 py-1 text-gray-400 text-sm rounded-full flex items-center gap-1 ${categoryValue.trim() ? '' : 'hidden'}`}
                            onClick={() => setCategoryValue('')}
                        >
                            {categories.find((item) => item.slug === categoryValue)?.name}
                            <X strokeWidth={1} size={15} />
                        </button>

                        <button className={`bg-[#1d2635] px-2 py-1 text-gray-400 text-sm rounded-full flex items-center gap-1 ${yearValue ? '' : 'hidden'}`}
                            onClick={() => setYearValue('')}
                        >
                            {yearValue}
                            <X strokeWidth={1} size={15} />
                        </button>

                        <button className={`bg-[#1d2635] px-2 py-1 text-gray-400 text-sm rounded-full flex items-center gap-1 ${countriesValue.trim() ? '' : 'hidden'}`}
                            onClick={() => setCountriesValue('')}
                        >
                            {countries.find((item) => item.slug === countriesValue)?.name}
                            <X strokeWidth={1} size={15} />
                        </button>

                        <button className={`bg-[#1d2635] px-2 py-1 text-gray-400 text-sm rounded-full flex items-center gap-1 ${sortlang.trim() ? '' : 'hidden'}`}
                            onClick={() => setSortLang('')}
                        >
                            {LANGUAGES[sortlang as keyof typeof LANGUAGES]}
                            <X strokeWidth={1} size={15} />
                        </button>
                    </div>

                    <div>
                        {filterLoading ? (
                            <div className="flex gap-4 overflow-hidden px-3 md:px-0">
                                {[...Array(4)].map((_, index) => (
                                    <CardSkeleton key={index} />
                                ))}
                            </div>
                        ) : filterError ? (
                            <p>Error</p>
                        ) : filterData?.length !== 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full place-items-center">
                                {filterData?.map((item: IMovies, index: number) => (
                                    <MovieCard {...item} key={index} />
                                ))}
                            </div>
                        ) : categoryValue === '' && countriesValue === '' && sortlang === '' && yearValue === '' ? (
                            <div className="flex items-center justify-center text-gray-400 text-xl h-[50vh]">
                                Chưa có dữ liệu
                            </div>
                        ) : (
                            <div className="flex items-center justify-center text-gray-400 text-xl h-[50vh]">
                                Không tìm thấy phim
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
