export function AdminViewContainerTable({ data }) {
    return (
        <table className="table table-bordered border-primary">
            <tbody>
                <tr className="mb-3">
                    <td>#</td>
                    <td>{data.id}</td>
                </tr>
                <tr className="mb-3">
                    <td>ID number</td>
                    <td>{data.number}</td>
                </tr>
                <tr className="mb-3">
                    <td>Url</td>
                    <td>{data.url_slug}</td>
                </tr>
                <tr className="mb-3">
                    <td>Size</td>
                    <td>{data.size}</td>
                </tr>
                <tr className="mb-3">
                    <td>Status</td>
                    <td>
                        {
                            data.status_name === 'published'
                                ? <span className="badge text-bg-success">Published</span>
                                : <span className="badge text-bg-warning">Draft</span>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    );
}