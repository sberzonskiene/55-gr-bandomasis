import { useContext } from "react";
import { AdminContainersTable } from "../../../components/admin-containers-table/AdminContainersTable";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { ContainersContext } from "../../../context/containers/ContainersContext";

export function AdminContainersPublishedPage() {
    const { adminContainers } = useContext(ContainersContext);

    return (
        <main>
            <AdminPageTitle title="Published containers" />
            <AdminContainersTable list={adminContainers.filter(item => item.status_name === 'published')} />
        </main>
    );
}