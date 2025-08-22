import { useContext } from 'react';
import { Link } from 'react-router';
import { ContainersContext } from '../../context/containers/ContainersContext';
import { SERVER_ADDRESS } from '../../env';

export function AdminContainersTableRow({ container }) {
    const { deletePublicContainer, deleteAdminContainer } = useContext(ContainersContext);

    function handleDeleteClick() {
        fetch(SERVER_ADDRESS + '/api/admin/containers/' + container.url_slug, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    deletePublicContainer(container.url_slug);
                    deleteAdminContainer(container.url_slug);
                }
            })
            .catch(console.error);
    }

    return (
        <tr>
            <th scope="row">{container.id}</th>
            <td><Link to={"/admin/containers/" + container.url_slug}>{container.title}</Link></td>
            <td>{container.url_slug}</td>
            <td>{container.description}</td>
            <td>{container.moviesCount}</td>
            <td>
                {
                    container.status_name === 'published'
                        ? <span className="badge text-bg-success">Published</span>
                        : <span className="badge text-bg-warning">Draft</span>
                }

            </td>
            <td className="d-flex gap-3">
                <Link className="btn btn-primary btn-sm" to={`/admin/categories/${container.url_slug}/edit`}>Edit</Link>
                <button onClick={handleDeleteClick} className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    );
}