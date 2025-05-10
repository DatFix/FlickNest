import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { IMovieDetail } from "../interfaces/interfaces";

export const toggleFavoriteMovie = async (movie: IMovieDetail) => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('_id', '==', movie._id)); // kiểm tra theo movie.id
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Đã có phim này => Xoá tất cả bản ghi trùng id
            for (const docSnap of querySnapshot.docs) {
                await deleteDoc(doc(favoritesRef, docSnap.id));
            }
            console.log('Movie removed from favorites');
        } else {
            // Chưa có => Thêm mới
            await addDoc(favoritesRef, {movie});
            console.log('Movie added to favorites');
        }
    } catch (error) {
        console.error('Error toggling favorite movie:', error);
    }
};

export const getFavoriteMovies = async () => {
    try {
        const favoritesRef = collection(db, 'favorites');
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteMovies = querySnapshot.docs.map((doc) =>
            ({ ...doc.data()})
        );
        return favoriteMovies;

    } catch (error) {
        console.error('Error getting favorite movies:', error);
    }
}