import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";

export function AdminViewMoviePage() {
    const category = {
        title: 'Action',
        url: 'action',
        description: 'Very action, much movie',
        status: 'published',
    };

    return (
        <main>
            <AdminPageTitle title="View movie" />

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9 mt-5">
                        <Alert text='Norimas filmas nerastas, todel jo perziureti yra neimanoma.' />
                    </div>
                    <div className="col-12 col-md-9 mt-5">
                        <table className="table table-bordered border-primary">
                            <tbody>
                                <tr className="mb-3">
                                    <td>Thumbnail</td>
                                    <td>
                                        <img style={{ maxHeight: '5rem' }} src="/img/movies/default.png" alt="Movie thumbnail" />
                                        <p>/img/movies/default.png</p>
                                    </td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Title</td>
                                    <td>qwe</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Url slug</td>
                                    <td>qwe</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Description</td>
                                    <td>qwe</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Duration</td>
                                    <td></td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Category</td>
                                    <td>null</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Release date</td>
                                    <td></td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Rating</td>
                                    <td>0.0 ⭐</td>
                                </tr>
                                <tr className="mb-3">
                                    <td>Status</td>
                                    <td>
                                        <span className="badge text-bg-success">Published</span>
                                        <span className="badge text-bg-warning">Draft</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}