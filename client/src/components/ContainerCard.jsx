import { Link } from 'react-router';

export function ContainerCard({ container }) {
    return (
        <div className="feature col my-4">
            <h3 className="fs-2 text-body-emphasis">{container.title}</h3>
            <p>{container.size}</p>
            <Link to={'/containers/' + container.url_slug} className="icon-link">Read more</Link>
        </div>
    );
}