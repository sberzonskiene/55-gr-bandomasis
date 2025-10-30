import { Link} from 'react-router';

export function ContainerCard({ container }) {
    return (
        <div className="feature col my-4">
            <h3 className="fs-5 text-body-emphasis mb-3">{container.size} {container.number}</h3>
            <p>Boxes count: {container.boxesCount}</p>
            <p>Boxes neto: {container.boxesNeto}</p>
            <Link to={'/containers/' + container.url_slug} className="icon-link">Read more</Link>
        </div>
    );
}