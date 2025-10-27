import { AdminContainersTableRow } from "./AdminContainersTableRow";

export function AdminContainersTable({ list }) {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID number</th>
                                    <th scope="col">Url</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Boxes count</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(item => <AdminContainersTableRow key={item.id} container={item} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}