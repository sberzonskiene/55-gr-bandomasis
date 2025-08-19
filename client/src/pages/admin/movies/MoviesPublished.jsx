import { AdminMoviesTable } from "../../../components/admin-movies-table/AdminMoviesTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";

export function AdminMoviesPublishedPage() {
    return (
        <main>
            <AdminPageTitle title="Published movies" />
            <AdminMoviesTable />
        </main>
    );
}