import { useParams } from 'react-router';
import { useContext } from 'react';
import { BoxesContext } from '../../context/boxes/BoxesContext';
import defaultImgUrl from '../../assets/default.png';
import notFoundImgUrl from '../../assets/not-found.png';
import { ContainersContext } from '../../context/containers/ContainersContext';
import { SERVER_ADDRESS } from '../../env';


export function BoxInnerPage() {
    const { box } = useParams();
    const { getPublicBoxByUrlSlug } = useContext(BoxesContext);
    const { publicContainers } = useContext(ContainersContext);

    const boxData = getPublicBoxByUrlSlug(box);

    if (!boxData) {
        return (
            <main className="min-page-height">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-5">
                            <h1 className="display-1">404</h1>
                            <p className="fs-2">Box not found</p>
                        </div>
                        <img src={notFoundImgUrl} alt="Box thumbnail" className="col-12 col-lg-3 object-fit-contain" />
                    </div>
                </div>
            </main>
        );
    }

    const containerData = publicContainers.find(con => con.id === boxData.container_id);

    if (!containerData) {
        return (
            <main className="min-page-height">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 mb-5">
                            <h1 className="display-1">404</h1>
                            <p className="fs-2">Box not found</p>
                        </div>
                        <img src={notFoundImgUrl} alt="Box thumbnail" className="col-12 col-lg-3 object-fit-contain" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-page-height">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 mb-5">
                        <strong className="d-inline-block mb-2 text-primary-emphasis">{containerData.size} {containerData.number}</strong>
                        <h1 className="display-2">{boxData.title}</h1>
                        <p className="card-text mb-3">Neto: {boxData.neto} g</p>
                        <p className="card-text mb-3">Flammable: 
                            {
                                boxData.type_f_id === 1
                                    ? <span className="badge text-bg-danger">Yes</span>
                                    : <span className="badge text-bg-warning">No</span>
                            }
                        </p>
                        <p className="card-text mb-3">Perishable:
                            {
                                boxData.type_p_id === 1
                                    ? <span className="badge text-bg-danger">Yes</span>
                                    : <span className="badge text-bg-warning">No</span>
                            }
                        </p>
                    </div>
                    <img src={boxData.img ? (SERVER_ADDRESS + '/img/boxes/' + boxData.img) : defaultImgUrl} alt="Box thumbnail" className="col-12 col-lg-4 object-fit-contain" />
                </div>
            </div>
        </main>
    );
}