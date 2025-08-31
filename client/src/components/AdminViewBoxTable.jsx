import { useContext } from "react";
import { ContainersContext } from "../context/containers/ContainersContext";
import { SERVER_ADDRESS } from "../env";

export function AdminViewBoxTable({ boxData }) {
    const { getAdminContainerById } = useContext(ContainersContext);

    const containerData = getAdminContainerById(boxData.container_id);
    
    return (
        <table className="table table-bordered border-primary">
            <tbody>
                <tr className="mb-3">
                    <td>Title</td>
                    <td>{boxData.title}</td>
                </tr>
                <tr className="mb-3">
                    <td>Url slug</td>
                    <td>{boxData.url_slug}</td>
                </tr>
                <tr className="mb-3">
                    <td>Neto</td>
                    <td>{boxData.neto}</td>
                </tr>
                <tr className="mb-3">
                    <td>Perishable</td>
                    <td>{
                        boxData.perishable
                            ?<span className="badge text-bg-danger">Perichable</span>
                            : <span class="badge text-bg-warning">Not perishable</span>
                    }</td>
                </tr>
                <tr className="mb-3">
                    <td>container</td>
                    <td>{
                        containerData
                            ? containerData.title
                            : <span className="badge text-bg-warning">Not selected</span>
                    }</td>
                </tr>
                <tr className="mb-3">
                    <td>Status</td>
                    <td>
                        {
                            boxData.status_name === 'published'
                                ? <span className="badge text-bg-success">Published</span>
                                : <span className="badge text-bg-warning">Draft</span>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    );
}