export const getYearToNow = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);
    return {
        years: years,
        currentYear: currentYear
    }
}


