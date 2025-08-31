import { useContext } from "react";
import { AdminBoxesTable } from "../../../components/admin-boxes-table/AdminBoxesTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { BoxesContext } from "../../../context/boxes/BoxesContext";

export function AdminBoxesDraftPage() {
    const { adminBoxes } = useContext(BoxesContext);

    return (
        <main>
            <AdminPageTitle title="Draft boxes" />
            <AdminBoxesTable boxes={adminBoxes.filter(b => b.status_name === 'draft')} />
        </main>
    );
}