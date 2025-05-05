export const getFavoriteMovie = async () => {
    try {
        const respone = JSON.parse(localStorage.getItem("favorites") || "[]");
        return respone;
    } catch (error) {
        console.error(error);
    }
}