import { AdminBoxesTableRow } from './AdminBoxesTableRow';

export function AdminBoxesTable({ boxes }) {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Neto</th>
                                    <th scope="col">Perishable</th>
                                    <th scope="col">Container</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boxes.map(box => <AdminBoxesTableRow key={box.id} box={box} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}