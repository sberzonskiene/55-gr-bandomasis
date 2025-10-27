import { useContext, useEffect, useState } from "react";
import { BoxesContext } from "./BoxesContext";
import { initialBoxesContext } from "./initialBoxesContext";
import { UserContext } from "../user/UserContext";
import { SERVER_ADDRESS } from "../../env";

export function BoxesContextWrapper(props) {
    const [publicBoxes, setPublicBoxes] = useState(initialBoxesContext.publicBoxes);
    const [adminBoxes, setAdminBoxes] = useState(initialBoxesContext.adminBoxes);

    const { isLoggedIn } = useContext(UserContext);

    function updatePublicBoxes() {
        fetch(SERVER_ADDRESS + '/api/boxes', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setPublicBoxes(() => data.boxes);
                }
            })
            .catch(console.error);
    }

    function updateAdminBoxes() {
        fetch(SERVER_ADDRESS + '/api/admin/boxes', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setAdminBoxes(() => data.boxes);
                }
            })
            .catch(console.error);
    }

    function deletePublicBox(urlSlug) {
        setPublicBoxes(currentList => currentList.filter(box => box.url_slug !== urlSlug));
    }

    function deleteAdminBox(urlSlug) {
        setAdminBoxes(currentList => currentList.filter(box => box.url_slug !== urlSlug));
    }

    function getPublicBoxByUrlSlug(urlSlug) {
        return publicBoxes.find(box => box.url_slug === urlSlug);
    }

    function getAdminBoxByUrlSlug(urlSlug) {
        return adminBoxes.find(box => box.url_slug === urlSlug);
    }

    useEffect(updatePublicBoxes, []);

    useEffect(() => {
        if (isLoggedIn) {
            updateAdminBoxes();
        } else {
            setAdminBoxes(() => initialBoxesContext.adminBoxes);
        }
    }, [isLoggedIn]);

    const values = {
        publicBoxes,
        adminBoxes,
        getPublicBoxByUrlSlug,
        getAdminBoxByUrlSlug,
        updatePublicBoxes,
        updateAdminBoxes,
        deletePublicBox,
        deleteAdminBox,
    };

    return (
        <BoxesContext.Provider value={values}>
            {props.children}
        </BoxesContext.Provider>
    )
}