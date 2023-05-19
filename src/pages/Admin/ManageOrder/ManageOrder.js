import classNames from "classnames/bind";
import Select from "react-select";
import { Table } from "reactstrap";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { NUMBER_PER_PAGE, STATUS_ORDER } from "constants";
import styles from "./ManageOrder.module.scss";
import orderApiURL from "api/orderApiURL";
import { useAxiosAuth } from "hooks";
import OrderItem from "./OrderItem/OrderItem";
import Pagination from "components/Pagination";

const cx = classNames.bind(styles);

function ManageOrder() {
    const axiosAuth = useAxiosAuth();
    const { user } = useSelector((state) => state.user);

    const [orders, setOrders] = useState({});

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        limit: 12,
        status: 1,
    });
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const status = parseInt(searchParams.get("status")) || 1;

    const handleLimitChange = (e) => {
        const selectedLimit = e.value;

        setSearchParams({
            page,
            limit: selectedLimit,
            status,
        });
    };

    const handleStatusChange = (e) => {
        const selectedStatus = e.value;

        setSearchParams({
            page,
            limit,
            status: selectedStatus,
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;

        setSearchParams({
            page: selectedPage,
            limit,
            status,
        });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const params = { page, limit, status };
            const url = orderApiURL.getAllByAdmin(params);
            const res = await axiosAuth.get(url, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                },
            });
            setOrders(res.data);
        };

        fetchUsers();
    }, [page, limit, status, user?.accessToken, axiosAuth]);

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("title")}>Tất cả đơn hàng</h1>

            <div className={cx("filter")}>
                <div className={cx("filter-group")}>
                    <span>Hiển thị mỗi trang: </span>
                    <div style={{ width: "200px" }}>
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
                </div>
                <div className={cx("filter-group")}>
                    <span>Trạng thái: </span>
                    <div style={{ width: "200px" }}>
                        <Select
                            options={STATUS_ORDER}
                            isSearchable={false}
                            onChange={handleStatusChange}
                            value={
                                status
                                    ? STATUS_ORDER.find(
                                          (x) => x.value === status
                                      )
                                    : STATUS_ORDER[0]
                            }
                        />
                    </div>
                </div>
                <span className={cx("total-products")}>
                    {orders?.total_results} đơn hàng
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
                            <th>ID</th>
                            <th>Chi tiết</th>
                            <th>Tổng tiền</th>
                            <th>Phương thức thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.results?.map((order, index) => (
                            <OrderItem
                                key={index}
                                order={order}
                                index={index}
                            />
                        ))}
                    </tbody>
                </Table>
                <div className="text-center">
                    {orders?.total_pages > 1 && (
                        <Pagination
                            pageCount={orders?.total_pages}
                            forcePage={page ? page - 1 : 0}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageOrder;
