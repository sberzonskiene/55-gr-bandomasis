import { useContext } from "react";
import { AdminBoxesTable } from "../../../components/admin-boxes-table/AdminBoxesTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { BoxesContext } from "../../../context/boxes/BoxesContext";

export function AdminBoxesPublishedPage() {
    const { adminBoxes } = useContext(BoxesContext);

    return (
        <main>
            <AdminPageTitle title="Published boxes" />
            <AdminBoxesTable boxes={adminBoxes.filter(b => b.status_name === 'published')} />
        </main>
    );
}