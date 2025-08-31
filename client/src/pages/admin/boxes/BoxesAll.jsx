import { useContext } from "react";
import { AdminBoxesTable } from "../../../components/admin-boxes-table/AdminBoxesTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { BoxesContext } from "../../../context/boxes/BoxesContext";

export function AdminBoxesAllPage() {
    const { adminBoxes } =useContext(BoxesContext);

    return(
        <main>
            <AdminPageTitle title="All boxes" />
            <AdminBoxesTable boxes={adminBoxes}/>
        </main>
    );
}