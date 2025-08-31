import { useContext, useEffect, useState } from "react";
import { ContainersContext } from "./ContainersContext";
import { initialContainersContext } from "./initialContainersContext";
import { UserContext } from "../user/UserContext";
import { SERVER_ADDRESS } from "../../env";

export function ContainersContextWrapper(props) {
    const [publicContainers, setPublicContainers] = useState(initialContainersContext.publicContainers);
    const [adminContainers, setAdminContainers] = useState(initialContainersContext.adminContainers);

    const { isLoggedIn } = useContext(UserContext);

    function updatePublicContainers() {
        fetch(SERVER_ADDRESS + '/api/containers', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setPublicContainers(() => data.containers);
                }
            })
            .catch(console.error);
    }

    function updateAdminContainers() {
        fetch(SERVER_ADDRESS + '/api/admin/containers', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setAdminContainers(() => data.containers);
                }
            })
            .catch(console.error);
    }

    function deletePublicContainer(urlSlug) {
        setPublicContainers(currentList => currentList.filter(container => container.url_slug !== urlSlug));
    }

    function deleteAdminContainer(urlSlug) {
        setAdminContainers(currentList => currentList.filter(container => container.url_slug !== urlSlug));
    }

    function getPublicContainerByUrlSlug(urlSlug) {
        return publicContainers.find(container => container.url_slug === urlSlug);
    }

    function getAdminContainerByUrlSlug(urlSlug) {
        return adminContainers.find(container => container.url_slug === urlSlug);
    }

    function getAdminContainerById(id) {
        return adminContainers.find(container => container.id === id);
    }

    useEffect(updatePublicContainers, []);

    useEffect(() => {
        if (isLoggedIn) {
            updateAdminContainers();
        } else {
            setAdminContainers(() => initialContainersContext.adminContainers);
        }
    }, [isLoggedIn]);

    const values = {
        publicContainers,
        adminContainers,
        getPublicContainerByUrlSlug,
        getAdminContainerByUrlSlug,
        getAdminContainerById,
        updatePublicContainers,
        updateAdminContainers,
        deletePublicContainer,
        deleteAdminContainer,
    };

    return (
        <ContainersContext.Provider value={values}>
            {props.children}
        </ContainersContext.Provider>
    )
}