import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import categoryApiURL from "api/categoryApiURL";
import { useAxiosClient } from "hooks";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
    const axiosClient = useAxiosClient();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const url = categoryApiURL.getAll();
            const res = await axiosClient.get(url);
            setCategories(res.data.results);
        };

        fetchCategories();
    }, [axiosClient]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("title")}>
                <BiCategory size={28} />
                <h3>Danh mục</h3>
            </div>
            <div className={cx("category")}>
                {categories.map((category, index) => (
                    <div key={index} className={cx("category-item")}>
                        <NavLink
                            to={`/category/${category.slug}`}
                            className={({ isActive }) =>
                                cx("category-item-link", { active: isActive })
                            }
                        >
                            {category.name}
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
