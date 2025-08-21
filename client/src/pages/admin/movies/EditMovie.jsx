import { useParams } from "react-router";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";
import { AdminMovieForm } from "../../../components/forms/AdminMovieForm";
import { useContext } from "react";
import { MoviesContext } from "../../../context/movies/MoviesContext";

export function AdminEditMoviePage() {
    const { getAdminMovieByUrlSlug } = useContext(MoviesContext);
    const { movie } = useParams();

    const movieData = getAdminMovieByUrlSlug(movie);

    return (
        <main>
            <AdminPageTitle title="Edit movie" />

            <div className="container">
                <div className="row">
                    {movieData
                        ? <AdminMovieForm movie={movieData} />
                        : (
                            <div className="col-12 col-md-9 mt-5">
                                <Alert text='Norimas filmas nerastas, todėl redagavimas yra neįmanomas.' />
                            </div>
                        )}
                </div>
            </div>
        </main>
    );
}