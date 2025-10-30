import { useContext } from "react";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";
import { AdminEditContainerForm } from "../../../components/forms/AdminEditContainerForm";
import { ContainersContext } from "../../../context/containers/ContainersContext";
import { useParams } from "react-router";
import { SERVER_ADDRESS } from "../../../env";

export function AdminEditContainerPage() {
    const { getAdminContainerByUrlSlug } = useContext(ContainersContext);
    const { container } = useParams();

    const containerData = getAdminContainerByUrlSlug(container);

    return (
        <main>
            <AdminPageTitle title={`Edit container: "${container}"`} />

            <div className="container">
                <div className="row">
                    {
                        containerData
                            ? <AdminEditContainerForm
                                api={SERVER_ADDRESS + "/api/admin/containers/" + containerData.url_slug}
                                method="PUT"
                                container={containerData} />
                            : (
                                <div className="col-12 col-md-9 mt-5">
                                    <Alert text='Norimas konteineris nerastas, todėl redagavimas yra neįmanomas.' />
                                </div>
                            )
                    }
                </div>
            </div>
        </main>
    );
}