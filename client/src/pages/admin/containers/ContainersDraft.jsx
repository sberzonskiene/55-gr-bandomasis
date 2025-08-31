import { useContext } from "react";
import { AdminContainersTable } from "../../../components/admin-containers-table/AdminContainersTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { ContainersContext } from "../../../context/containers/ContainersContext";

export function AdminContainersDraftPage() {
    const { adminContainers } = useContext(ContainersContext);

    return (
        <main>
            <AdminPageTitle title="Draft containers" />
            <AdminContainersTable list={adminContainers.filter(item => item.status_name === 'draft')} />
        </main>
    );
}