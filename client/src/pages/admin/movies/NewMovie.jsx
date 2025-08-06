import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { AdminMovieForm } from "../../../components/forms/AdminMovieForm";

export function AdminNewMoviePage() {
    return (
        <main>
            <AdminPageTitle title="New movie" />

            <div className="container">
                <div className="row">
                    <AdminMovieForm />
                </div>
            </div>
        </main>
    );
}