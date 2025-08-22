import { useContext } from 'react';
import { Link } from 'react-router';
import { ContainersContext } from '../../context/containers/ContainersContext';
import { SERVER_ADDRESS } from '../../env';
import { BoxesContext } from '../../context/boxes/BoxesContext';

export function AdminBoxesTableRow({ box }) {
    const { adminContainers } = useContext(ContainersContext);
    const { deletePublicMovie, deleteAdminMovie } = useContext(BoxesContext);

    if (!adminContainers.length) {
        return;
    }

    function handleDeleteClick() {
        fetch(SERVER_ADDRESS + '/api/admin/boxes/' + box.url_slug, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    deletePublicMovie(box.url_slug);
                    deleteAdminMovie(box.url_slug);
                }
            })
            .catch(console.error);
    }

    return (
        <tr>
            <th scope="row">{box.id}</th>
            <td><Link to={"/admin/movies/" + box.url_slug}>{box.title}</Link></td>
            <td>{
                box.description
                    ? <span className="badge text-bg-success">Provided</span>
                    : <span className="badge text-bg-warning">Empty</span>
            }</td>
            <td>{
                box.duration_in_minutes
                    ? formatDuration(box.duration_in_minutes)
                    : <span className="badge text-bg-warning">Not selected</span>
            }</td>
            <td>
                {
                    box.category_id
                        ? adminContainers.find(c => c.id === box.container_id).title
                        : <span className="badge text-bg-warning">Not selected</span>
                }
            </td>
            <td>
                {
                    box.status_name === 'published'
                        ? <span className="badge text-bg-success">Published</span>
                        : <span className="badge text-bg-warning">Draft</span>
                }
            </td>
            <td>
                <div className="d-flex gap-3">
                    <Link className="btn btn-primary btn-sm" to={`/admin/boxes/${box.url_slug}/edit`}>Edit</Link>
                    <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">Delete</button>
                </div>
            </td>
        </tr >
    );
}