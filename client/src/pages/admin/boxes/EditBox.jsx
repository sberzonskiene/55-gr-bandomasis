import { useParams } from "react-router";
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";
import { AdminBoxForm } from "../../../components/forms/AdminBoxForm";
import { useContext } from "react";
import { BoxesContext } from "../../../context/boxes/BoxesContext";
import { SERVER_ADDRESS } from "../../../env";

export function AdminEditBoxPage() {
    const { getAdminBoxByUrlSlug } = useContext(BoxesContext);
    const { box } = useParams();

    const boxData = getAdminBoxByUrlSlug(box);

    return (
        <main>
            <AdminPageTitle title="Edit box" />

            <div className="container">
                <div className="row">
                    {boxData
                        ? <AdminBoxForm
                            api={SERVER_ADDRESS + '/api/admin/boxes/' + boxData.url_slug}
                            method="PUT"
                            box={boxData} />
                        : (
                            <div className="col-12 col-md-9 mt-5">
                                <Alert text='Norima dėžė nerasta, todėl redagavimas yra neįmanomas.' />
                            </div>
                        )}
                </div>
            </div>
        </main>
    );
}