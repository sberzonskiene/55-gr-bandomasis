import { useContext } from 'react';
import { ContainersContext } from '../context/containers/ContainersContext';
import defaultImgUrl from '../assets/default.png';
import { SERVER_ADDRESS } from '../env';
import { Link } from 'react-router';

export function BoxCard({ box }) {
    const { publicContainers } = useContext(ContainersContext);
    const containerData = publicContainers.find(con => con.id === box.container_id);

    if (!containerData) {
        return;
    }

    return (
        <div className="col-12 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col-12 col-lg-8 p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary-emphasis">{containerData.size}/{containerData.number}</strong>
                    <h3 className="mb-0">{box.title}</h3>
                    <p className="card-text mb-auto">Neto: {box.neto} g</p>
                    <p className="card-text mb-auto">Flammable: {
                        box.type_f_id === 1
                            ? <span className="badge text-bg-danger">Yes</span>
                            : <span className="badge text-bg-warning">No</span>
                    }</p>
                    <p className="card-text mb-auto">Perishable: {
                        box.type_p_id === 1
                            ? <span className="badge text-bg-danger">Yes</span>
                            : <span className="badge text-bg-warning">No</span>
                    }</p>
                    <Link to={"/boxes/" + box.url_slug} className="icon-link gap-1 icon-link-hover stretched-link">
                        Continue reading
                    </Link>
                </div>
                <div className="col-4 d-none d-lg-block">
                    <img className="w-100 h-100 object-fit-cover" src={box.img ? (SERVER_ADDRESS + '/img/boxes/' + box.img) : defaultImgUrl} alt="Box thumbnail" />
                </div>
            </div>
        </div>
    );
}