import { useParams } from 'react-router';
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";
import { useContext } from 'react';
import { ContainersContext } from '../../../context/containers/ContainersContext';
import { AdminViewContainerTable } from '../../../components/AdminViewContainerTable';
import { AdminBoxesTable } from '../../../components/admin-boxes-table/AdminBoxesTable';
import { BoxesContext } from '../../../context/boxes/BoxesContext';

export function AdminViewContainerPage() {
    const { getAdminContainerByUrlSlug } = useContext(ContainersContext);
    const { adminBoxes } = useContext(BoxesContext);
    const { container } = useParams();

    const containerData = getAdminContainerByUrlSlug(container);

    return (
        <main>
            <AdminPageTitle title={`View container: "${container}"`} />

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9 mt-5">
                        {
                            containerData
                                ? (
                                    <>
                                        <AdminViewContainerTable data={containerData} />
                                        <AdminBoxesTable boxes={adminBoxes.filter(b => b.container_id === containerData.id)} />
                                    </>
                                )
                                : <Alert text='Norimas konteineris nerastas, todėl jo peržiūra neįmanoma.' />
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}