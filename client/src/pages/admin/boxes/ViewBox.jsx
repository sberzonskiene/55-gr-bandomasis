import { useParams } from 'react-router';
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";
import { useContext } from 'react';
import { BoxesContext } from '../../../context/boxes/BoxesContext';
import { AdminViewBoxTable } from '../../../components/AdminViewBoxTable';

export function AdminViewBoxPage() {
    const { getAdminBoxByUrlSlug } = useContext(BoxesContext);
    const { box } = useParams();

    const boxData = getAdminBoxByUrlSlug(box);

    return (
        <main>
            <AdminPageTitle title="View box" />

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9 mt-5">
                        {
                            boxData
                                ? <AdminViewBoxTable boxData={boxData} />
                                : <Alert text='Norima dėžė nerasta, todėl jos peržiūra neįmanoma.' />
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}