import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Table } from "reactstrap";

import bookApiURL from "api/bookApiURL";
import Button from "components/Button";
import Pagination from "components/Pagination";
import { FILTER_OPTIONS, NUMBER_PER_PAGE } from "constants";
import { useAxiosClient } from "hooks";
import styles from "./ManageProduct.module.scss";
import ProductItem from "./ProductItem/ProductItem";
import routes from "routes";

const cx = classNames.bind(styles);

function ManageProduct() {
    const axiosClient = useAxiosClient();

    const [books, setBooks] = useState({});

    useEffect(() => {
        const fetchBooks = async () => {
            const url = bookApiURL.getAll();
            const res = await axiosClient.get(url);
            setBooks(res.data);
        };

        fetchBooks();
    }, [axiosClient]);

    return (
        <>
            <div className={cx("wrapper")}>
                <h1 className={cx("title")}>Tất cả sản phẩm</h1>
                <div className={cx("filter")}>
                    <div className="d-flex align-items-center justify-content-between w-50">
                        <div className={cx("filter-group")}>
                            <span>Lọc theo: </span>
                            <Select
                                options={FILTER_OPTIONS}
                                className="flex-fill"
                            />
                        </div>
                        <div className={cx("filter-group")}>
                            <span>Hiển thị mỗi trang: </span>
                            <Select
                                options={NUMBER_PER_PAGE}
                                className="flex-fill"
                            />
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className={cx("total-products")}>
                            {books?.total_results} sản phẩm
                        </span>
                        <Button to={routes.createBook} primary>
                            Thêm mới
                        </Button>
                    </div>
                </div>
                <div className={cx("list")}>
                    <Table
                        responsive
                        striped
                        hover
                        className="align-middle text-center"
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
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
                    <div className="text-end">
                        {books?.total_pages > 1 && (
                            <Pagination
                                pageCount={books?.total_pages}
                                forcePage={0}
                                onPageChange={() => {}}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageProduct;
