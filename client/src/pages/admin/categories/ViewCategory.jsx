import { useParams } from 'react-router';
import { AdminPageTitle } from "../../../components/AdminPageTitle";
import { Alert } from "../../../components/Alert";
import { useContext } from 'react';
import { CategoriesContext } from '../../../context/categories/CategoriesContext';

export function AdminViewCategoryPage() {
    const { getAdminCategoryByUrlSlug } = useContext(CategoriesContext);
    const { category } = useParams();

    const categoryData = getAdminCategoryByUrlSlug(category);

    if (!categoryData) {
        return (
            <main>
                <AdminPageTitle title={`View category: "${category}"`} />

                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-9 mt-5">
                            <Alert text='Norima kategorija nerasta, todel jos perziureti yra neimanomas.' />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <AdminPageTitle title={`View category: "${category}"`} />

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-9 mt-5">
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
                    </div>
                </div>
            </div>
        </main>
    );
}