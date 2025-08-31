import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { AdminContainerForm } from "../../../components/forms/AdminContainerForm";
import { SERVER_ADDRESS } from "../../../env";

export function AdminNewContainerPage() {
    return (
        <main>
            <AdminPageTitle title="New container" />

            <div className="container">
                <div className="row">
                    <AdminContainerForm
                        api={SERVER_ADDRESS + "/api/admin/containers"}
                        method="POST" />
                </div>
            </div>
        </main>
    );
}