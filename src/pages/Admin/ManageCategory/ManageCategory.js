import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import { Link, useSearchParams } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import { Table } from "reactstrap";

import styles from "./ManageCategory.module.scss";
import routes from "routes";
import { NUMBER_PER_PAGE } from "constants";
import { useAxiosClient } from "hooks";
import { useEffect, useState } from "react";
import categoryApiURL from "api/categoryApiURL";
import CategoryItem from "./CategoryItem";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryReset } from "redux/slices/categorySlice";

const cx = classNames.bind(styles);

function ManageCategory() {
    const axiosClient = useAxiosClient();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);

    const { success } = useSelector((state) => state.category);

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 12,
    });
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;

    const handleLimitChange = (e) => {
        const selectedLimit = e.value;

        setSearchParams({
            page,
            limit: selectedLimit,
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;

        setSearchParams({
            page: selectedPage,
            limit,
        });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const params = { page, limit };

            const url = categoryApiURL.getAll(params);
            const res = await axiosClient.get(url);
            setCategories(res.data);
        };

        if (success) {
            dispatch(deleteCategoryReset());
        }

        fetchCategories();
    }, [success, page, limit, dispatch, axiosClient]);

    return (
        <div className={cx("wrapper")}>
            <div className="d-flex align-items-center mb-3">
                <h1 className={cx("title")}>Tất cả danh mục</h1>
                <Tippy content="Thêm mới">
                    <Link to={routes.createCategory} className={cx("add-btn")}>
                        <AiOutlinePlus size={20} />
                    </Link>
                </Tippy>
            </div>
            <div className={cx("filter")}>
                <div className={cx("filter-group")}>
                    <span>Hiển thị mỗi trang: </span>
                    <Select
                        options={NUMBER_PER_PAGE}
                        isSearchable={false}
                        onChange={handleLimitChange}
                        value={
                            limit
                                ? NUMBER_PER_PAGE.find((x) => x.value === limit)
                                : NUMBER_PER_PAGE[0]
                        }
                    />
                </div>
                <span className={cx("total-products")}>
                    {categories?.total_results} danh mục
                </span>
            </div>
            <div className={cx("list")}>
                <Table
                    responsive
                    striped
                    hover
                    bordered
                    className="align-middle text-center"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã danh mục</th>
                            <th>Tên danh mục</th>
                            <th>Slug</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.results?.map((category, index) => (
                            <CategoryItem
                                key={index}
                                category={category}
                                index={index}
                            />
                        ))}
                    </tbody>
                </Table>
                <div className="text-center">
                    {categories?.total_pages > 1 && (
                        <Pagination
                            pageCount={categories?.total_pages}
                            forcePage={page ? page - 1 : 0}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageCategory;
