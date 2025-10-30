import { useContext, useState } from "react";
import { ContainersContext } from "../../context/containers/ContainersContext";
import { useNavigate } from "react-router";

export function AdminEditContainerForm({ api, method, container }) {
    const [number, setNumber] = useState(container?.number ?? '');
    const [url, setUrl] = useState(container?.url_slug ?? '');
    const [size, setSize] = useState(container?.size ?? '');
    const [status, setStatus] = useState(container?.status_name ?? 'draft');

    const { updateAdminContainers, updatePublicContainers } = useContext(ContainersContext);
    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();

        fetch(api, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                number,
                url,
                size,
                status,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    updatePublicContainers();
                    updateAdminContainers();
                    navigate('/admin/containers');
                }
            })
            .catch(console.error);
    }

    return (
        <form onSubmit={handleFormSubmit} className="col-12 col-md-9 col-lg-6 mt-5">
            <div className="mb-3">
                <label htmlFor="number" className="form-label">ID number</label>
                <input onChange={e => setNumber(e.target.value)} value={number} type="number"
                    className="form-control" id="number" disabled />
            </div>
            <div className="mb-3">
                <label htmlFor="url" className="form-label">Url</label>
                <input onChange={e => setUrl(e.target.value)} value={url} type="text"
                    className="form-control" id="url" disabled />
            </div>
            <div className="mb-3">
                <label htmlFor="size" className="form-label">Size</label>
                <input onChange={e => setSize(e.target.value)} value={size} type="text"
                    className="form-control" id="size" disabled></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <div className="form-check">
                    <input onChange={() => setStatus('published')}
                        checked={status === 'published' ? 'checked' : ''}
                        type="radio" name="radios" className="form-check-input" id="status_published" required />
                    <label className="form-check-label" htmlFor="status_published">Published</label>
                </div>
                <div className="form-check">
                    <input onChange={() => setStatus('draft')}
                        checked={status === 'draft' ? 'checked' : ''}
                        type="radio" name="radios" className="form-check-input" id="status_draft" required />
                    <label className="form-check-label" htmlFor="status_draft">Draft</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">{'Update'}</button>
        </form>
    );
}