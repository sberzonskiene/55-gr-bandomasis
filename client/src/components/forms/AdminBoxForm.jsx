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

    const [img, setImg] = useState(box?.img ?? '');
    const [imgErr, setImgErr] = useState('');

    const [title, setTitle] = useState(box?.title ?? '');
    const [titleErr, setTitleErr] = useState('');

    const [url, setUrl] = useState(box?.url_slug ?? '');
    const [urlErr, setUrlErr] = useState('');

    const [neto, setNeto] = useState(box?.neto ?? '');

    const [typeF, setTypeF] = useState(box?.type_f_name ?? 'no');
    const [typeP, setTypeP] = useState(box?.type_p_name ?? 'no');

    const [containerId, setContainerId] = useState(box?.container_id ?? 0);

    const [status, setStatus] = useState(box?.status_name ?? 'draft');

   function handleImageFormSubmit(e) {
        e.preventDefault();

        setImgErr('');

        const imageDOM = document.getElementById('img');
        const formData = new FormData();
        formData.append('img', imageDOM.files[0]);

        fetch(SERVER_ADDRESS + '/api/admin/upload-image', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setImg(data.msg);
                } else {
                    setImgErr(data.msg);
                }
            })
            .catch(console.error);
    }

    function handleMainFormSubmit(e) {
        e.preventDefault();

        setImgErr('');
        setTitleErr('');
        setUrlErr('');

        const data = {
            title,
            url,
            neto,
            img,
            typeF,
            typeP,
            container: +containerId,
            status,
        };

        if (img) {
            data.img = img;
        }

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
                        if (data.msg.url) {
                            setUrlErr(data.msg.url);
                        }
                        if (data.msg.img) {
                            setImgErr(data.msg.img);
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
            <form onChange={handleImageFormSubmit} className="col-12 col-md-9 col-lg-6 mt-5">
                <img id="img_preview" className="d-block w-100 object-fit-contain"
                    style={{ height: '20rem', backgroundColor: '#eee' }}
                    src={img ? (SERVER_ADDRESS + img) : defaultImg} alt="Box thumbnail" />
                <p id="img_path">{img}</p>
                <input type="file" className={"form-control" + (imgErr ? ' is-invalid' : '')} id="img" name="img" />
                <div className="invalid-feedback">{imgErr}</div>
            </form>

            <form onSubmit={handleMainFormSubmit} className="col-12 col-md-9 col-lg-6 mt-5">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input onChange={e => setTitle(e.target.value)} value={title}
                        type="text" className={"form-control" + (titleErr ? ' is-invalid' : '')} id="title" required />
                    <div className="invalid-feedback">{titleErr}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">Url</label>
                    <input onChange={e => setUrl(e.target.value)} value={url}
                        type="text" className={"form-control" + (urlErr ? ' is-invalid' : '')} id="url" required />
                    <div className="invalid-feedback">{urlErr}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="neto" className="form-label">Neto</label>
                    <input onChange={e => setNeto(e.target.value * 1000)} value={neto / 1000} type="number"
                        min="1" max="500" step="0.1" className="form-control" id="neto" />
                </div>
                <div className="mb-3">
                    <label htmlFor="container" className="form-label">Container</label>
                    <select onChange={e => setContainerId(e.target.value)} value={containerId} className="form-select" id="container">
                        <option value={0}>-- choose</option>
                        {adminContainers.map(con => <option key={con.id} value={con.id}>{con.size}</option>)}
                    </select>
                </div>
                <label className="form-label">Flammable</label>
                    <div className="form-check">
                        <input onChange={() => setTypeF('yes')} checked={typeF === 'yes' ? 'checked' : ''}
                            type="checkbox" name="" className="form-check-input" id="type_f_yes" />
                        <label className="form-check-label" htmlFor="type_f_yes">Yes</label>
                    </div>
                <div className="form-check">
                        <input onChange={() => setTypeF('no')} checked={typeF === 'no' ? 'checked' : ''}
                            type="checkbox" name="checkbox" className="form-check-input" id="type_f_no" />
                        <label className="form-check-label" htmlFor="type_f_no">No</label>
                    </div>
                <label className="form-label">Perishable</label>
                    <div className="form-check">
                        <input onChange={() => setTypeP('yes')} checked={typeP === 'yes' ? 'checked' : ''}
                            type="checkbox" name="checkbox" className="form-check-input" id="type_p_yes" />
                        <label className="form-check-label" htmlFor="type_p_yes">Yes</label>
                    </div>
                <div className="form-check">
                        <input onChange={() => setTypeP('no')} checked={typeP === 'no' ? 'checked' : ''}
                            type="checkbox" name="checkbox" className="form-check-input" id="type_p_no" />
                        <label className="form-check-label" htmlFor="type_p_no">No</label>
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