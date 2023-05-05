import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Table } from "reactstrap";
import "tippy.js/dist/tippy.css";

import bookApiURL from "api/bookApiURL";
import Pagination from "components/Pagination";
import { FILTER_OPTIONS, NUMBER_PER_PAGE } from "constants";
import { useAxiosClient } from "hooks";
import { deleteProductReset } from "redux/slices/productSlice";
import routes from "routes";
import styles from "./ManageProduct.module.scss";
import ProductItem from "./ProductItem";

const cx = classNames.bind(styles);

function ManageProduct() {
    const axiosClient = useAxiosClient();

    const dispatch = useDispatch();

    const { success } = useSelector((state) => state.product);

    const [books, setBooks] = useState({});

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        type: "desc",
    });
    const type = searchParams.get("type") || "desc";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;

    const handleSortChange = (e) => {
        let selectedType = e.value;

        let fieldSort = "price";
        if (!selectedType) {
            fieldSort = "createdAt";
        }

        setSearchParams({
            page,
            limit,
            sortBy: fieldSort,
            type: selectedType,
        });
    };

    const handleLimitChange = (e) => {
        const selectedLimit = e.value;

        setSearchParams({
            page,
            limit: selectedLimit,
            sortBy,
            type,
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;

        setSearchParams({
            page: selectedPage,
            limit,
            sortBy,
            type,
        });
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const params = {
                page: page ? page : 1,
                limit: limit ? limit : 12,
                sortBy: sortBy ? sortBy : "createdAt",
                type: type ? type : "desc",
            };

            const url = bookApiURL.getAll(params);
            const res = await axiosClient.get(url);
            setBooks(res.data);
        };

        if (success) {
            dispatch(deleteProductReset());
        }

        fetchBooks();
    }, [success, page, limit, sortBy, type, dispatch, axiosClient]);

    return (
        <>
            <div className={cx("wrapper")}>
                <div className="d-flex align-items-center mb-3">
                    <h1 className={cx("title")}>Tất cả sản phẩm</h1>
                    <Tippy content="Thêm mới">
                        <Link to={routes.createBook} className={cx("add-btn")}>
                            <AiOutlinePlus size={20} />
                        </Link>
                    </Tippy>
                </div>
                <div className={cx("filter")}>
                    <div className={cx("filter-group")}>
                        <span>Lọc theo: </span>
                        <Select
                            options={FILTER_OPTIONS}
                            isSearchable={false}
                            onChange={handleSortChange}
                            value={
                                type && sortBy === "price"
                                    ? FILTER_OPTIONS.find(
                                          (x) => x.value === type
                                      )
                                    : FILTER_OPTIONS[0]
                            }
                        />
                    </div>
                    <div className={cx("filter-group")}>
                        <span>Hiển thị mỗi trang: </span>
                        <Select
                            options={NUMBER_PER_PAGE}
                            isSearchable={false}
                            onChange={handleLimitChange}
                            value={
                                limit
                                    ? NUMBER_PER_PAGE.find(
                                          (x) => x.value === limit
                                      )
                                    : NUMBER_PER_PAGE[0]
                            }
                        />
                    </div>
                    <span className={cx("total-products")}>
                        {books?.total_results} sản phẩm
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
                                <th>Mã sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Danh mục</th>
                                <th>Đơn giá</th>
                                <th>Số lượng kho</th>
                                <th>Đã bán</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books?.results?.map((book, index) => (
                                <ProductItem
                                    key={index}
                                    book={book}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </Table>
                    <div className="text-center">
                        {books?.total_pages > 1 && (
                            <Pagination
                                pageCount={books?.total_pages}
                                forcePage={page ? page - 1 : 0}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageProduct;
