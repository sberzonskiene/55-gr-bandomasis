import { useContext } from 'react';
import { ContainersContext } from '../context/containers/ContainersContext';

export function BoxCard({ box }) {
    const { publicContainers } = useContext(ContainersContext);
    const containerData = publicContainers.find(c => c.id === box.container_id);

    if (!containerData) {
        return;
    }

    return (
        <div className="col-12 col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col-12 col-lg-8 p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary-emphasis">{containerData.title}</strong>
                    <h3 className="mb-0">{box.title}</h3>
                    <p className="card-text mb-auto">{box.neto}</p>
                    <p className="card-text mb-auto">{box.perishable}</p>
                    <a href={"/boxs/" + box.url_slug} className="icon-link gap-1 icon-link-hover stretched-link">
                        Continue reading
                    </a>
                </div>
            </div>
        </div>
    );
}