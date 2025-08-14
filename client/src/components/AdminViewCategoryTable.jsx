export function AdminViewCategoryTable() {
    return (
        <table className="table table-bordered border-primary">
                            <tbody>
                                <tr className="mb-3">
                                    <td>Title</td>
                                    <td>{categoryData.title}</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Url slug</td>
                                    <td>{categoryData.url}</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Description</td>
                                    <td>{categoryData.description}</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Status</td>
                                    <td>
                                        {
                                            categoryData.status === 'published'
                                                ? <span className="badge text-bg-success">Published</span>
                                                : <span className="badge text-bg-warning">Draft</span>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
    )


}