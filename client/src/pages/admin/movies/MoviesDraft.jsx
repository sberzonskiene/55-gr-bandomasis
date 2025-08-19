import { AdminMoviesTable } from "../../../components/admin-movies-table/AdminMoviesTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";

export function AdminMoviesDraftPage() {
    return (
        <main>
            <AdminPageTitle title="Draft movies" />
            <AdminMoviesTable />
        </main>
    );
}