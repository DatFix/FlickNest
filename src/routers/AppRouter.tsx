import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";
import WatchPage from "../pages/WatchPage";
import SearchPage from "../pages/SearchPage";
import FilterPage from "../pages/FilterPage";

export default function AppRouter() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:slug" element={<DetailsPage />} />
            <Route path="/watch/:slug" element={<WatchPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/filter" element={<FilterPage />} />
        </Routes>
    </div>
  )
}
