import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import defaultImg from '../../assets/default.png';
import { ContainersContext } from '../../context/containers/ContainersContext';
import { SERVER_ADDRESS } from '../../env.js';
import { BoxesContext } from '../../context/boxes/BoxesContext.js';

export function AdminBoxForm({ api, method, box }) {
    const { adminContainers } = useContext(ContainersContext);
    const { updatePublicBoxes, updateAdminBoxes } = useContext(BoxesContext);
    const navigate = useNavigate();

    const [generalErr, setGeneralErr] = useState('');

    const [title, setTitle] = useState(box?.title ?? '');
    const [titleErr, setTitleErr] = useState('');

    const [url, setUrl] = useState(box?.url_slug ?? '');
    const [urlErr, setUrlErr] = useState('');

    const [neto, setNeto] = useState(box?.neto ?? '');
    const [netoErr, setNetoErr] = useState('');

    const [perishable, setPerishable] = useState(box?.perishable ?? '');
    const [perishableErr, setPerishableErr] = useState('');

    const [containerId, setContainerId] = useState(box?.container_id ?? 0);

    const [status, setStatus] = useState(box?.status_name ?? 'draft');

   
    function handleMainFormSubmit(e) {
        e.preventDefault();

        setTitleErr('');
        setUrlErr('');
        setNetoErr('');
        setPerishableErr('');

        const data = {
            title,
            url,
            neto,
            perishable,
            container: +containerId,
            status,
        };

        fetch(api, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'error') {
                    if (typeof data.msg === 'string') {
                        setGeneralErr(data.msg);
                    } else {
                        if (data.msg.title) {
                            setTitleErr(data.msg.title);
                        }
                        if (data.msg.neto) {
                            setNetoErr(data.msg.neto);
                        }
                        if (data.msg.url) {
                            setUrlErr(data.msg.url);
                        }
                        if (data.msg.img) {
                            setPerishableErr(data.msg.perishable);
                        }
                    }
                } else {
                    updatePublicBoxes();
                    updateAdminBoxes();
                    navigate('/admin/boxes');
                }
            })
            .catch(console.error);
    }

    return (
        <>
            <form onSubmit={handleMainFormSubmit} className="col-12 col-md-9 col-lg-6 mt-5">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input onChange={e => setTitle(e.target.value)} value={title}
                        type="text" className={"form-control" + (titleErr ? ' is-invalid' : '')} id="title" required />
                    <div className="invalid-feedback">{titleErr}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">Url slug</label>
                    <input onChange={e => setUrl(e.target.value)} value={url}
                        type="text" className={"form-control" + (urlErr ? ' is-invalid' : '')} id="url" required />
                    <div className="invalid-feedback">{urlErr}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="neto" className="form-label">Neto</label>
                    <textarea onChange={e => setNeto(e.target.value)} value={neto}
                        className={"form-control" + (netoErr ? ' is-invalid' : '')} id="neto"></textarea>
                    <div className="invalid-feedback">{netoErr}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="perishable" className="form-label">Perishable</label>
                    <textarea onChange={e => setPerishable(e.target.value)} value={perishable}
                        className={"form-control" + (perishableErr ? ' is-invalid' : '')} id="neto"></textarea>
                    <div className="invalid-feedback">{perishableErr}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="container" className="form-label">Container</label>
                    <select onChange={e => setContainerId(e.target.value)} value={containerId} className="form-select" id="container">
                        <option value={0}>-- choose</option>
                        {adminContainers.map(con => <option key={con.id} value={con.id}>{con.title}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <div className="form-check">
                        <input onChange={() => setStatus('published')} checked={status === 'published' ? 'checked' : ''}
                            type="radio" name="radios" className="form-check-input" id="status_published" />
                        <label className="form-check-label" htmlFor="status_published">Published</label>
                    </div>
                    <div className="form-check">
                        <input onChange={() => setStatus('draft')} checked={status === 'draft' ? 'checked' : ''}
                            type="radio" name="radios" className="form-check-input" id="status_draft" />
                        <label className="form-check-label" htmlFor="status_draft">Draft</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{method === 'POST' ? 'Create' : 'Update'}</button>
            </form>
        </>
    );
}