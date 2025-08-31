import { useContext } from "react";
import { AdminContainersTable } from "../../../components/admin-containers-table/AdminContainersTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { ContainersContext } from "../../../context/containers/ContainersContext";

export function AdminContainersAllPage() {
    const { adminContainers } = useContext(ContainersContext);

    return (
        <main>
            <AdminPageTitle title="All containers" />
            <AdminContainersTable list={adminContainers} />
        </main>
    );
}