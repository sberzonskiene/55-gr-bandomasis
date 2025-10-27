import { Link } from 'react-router';

export function ContainerCard({ container }) {
    return (
        <div className="feature col my-4">
            <h3 className="fs-4 text-body-emphasis">{container.number}</h3>
            <p>{container.size}</p>
            <p>Boxes count: {container.boxesCount}</p>
            <p>Boxes neto: 0{container.boxesNeto}</p>
            <Link to={'/containers/' + container.url_slug} className="icon-link">Read more</Link>
        </div>
    );
}