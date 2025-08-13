import { useEffect, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { initialCategoriesContext } from "./initialCategoriesContext";

export function CategoriesContextWrapper(props) {
    const [publicCategories, setPublicCategories] = useState(initialCategoriesContext.publicCategories);
    const [adminCategories, setAdminCategories] = useState(initialCategoriesContext.adminCategories);

    useEffect(() => {
        fetch('http://localhost:5519/api/categories', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setPublicCategories(() => data.categories);
                }
            })
            .catch(console.error);
    }, []);

    // useEffect(() => {
    //     fetch('http://localhost:5519/api/admin/categories', {
    //         method: 'GET',
    //         credentials: 'include',
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.status === 'success') {
    //                 setAdminCategories(() => data.categories);
    //             }
    //         })
    //         .catch(console.error);
    // }, []);

    const values = {
        publicCategories,
        adminCategories,
    };

    return (
        <CategoriesContext.Provider value={values}>
            {props.children}
        </CategoriesContext.Provider>
    )
}