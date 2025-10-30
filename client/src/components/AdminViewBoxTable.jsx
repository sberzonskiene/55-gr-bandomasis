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
                    <td>{boxData.neto} g</td>
                </tr>
                <tr className="mb-3">
                    <td>Flammable</td>
                    <td>{
                        boxData.type_f_id === 1
                            ?<span className="badge text-bg-danger">Yes</span>
                            : <span className="badge text-bg-warning">No</span>
                    }</td>
                </tr>
                <tr className="mb-3">
                    <td>Perishable</td>
                    <td>{
                        boxData.type_p_id === 1
                            ?<span className="badge text-bg-danger">Yes</span>
                            : <span className="badge text-bg-warning">No</span>
                    }</td>
                </tr>
                <tr className="mb-3">
                    <td>Container</td>
                    <td>{
                        containerData
                            ? containerData.size + containerData.number
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