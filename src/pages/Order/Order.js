import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

import orderApiURL from "api/orderApiURL";
import Pagination from "components/Pagination/Pagination";
import Separator from "components/Separator/Separator";
import { NUMBER_PER_PAGE, STATUS_ORDER, TIME_OPTIONS } from "constants";
import { useAxiosAuth } from "hooks";
import styles from "./Order.module.scss";
import OrderItem from "./OrderItem/OrderItem";

const cx = classNames.bind(styles);

function Order() {
    const axiosAuth = useAxiosAuth();

    const { user } = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams({
        status: 1,
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        type: "desc",
    });

    const status = parseInt(searchParams.get("status"));
    const page = parseInt(searchParams.get("page"));
    const limit = parseInt(searchParams.get("limit"));
    const sortBy = searchParams.get("sortBy");
    const type = searchParams.get("type");

    const handleStatusChange = (e) => {
        const selectedStatus = e.value;
        setSearchParams({
            status: selectedStatus,
            page,
            limit,
            sortBy,
            type,
        });
    };

    const handleSortChange = (e) => {
        const selectedSort = e.value;
        setSearchParams({
            status,
            page,
            limit,
            sortBy,
            type: selectedSort,
        });
    };

    const handleLimitChange = (e) => {
        const selectedLimit = e.value;
        setSearchParams({
            status,
            page,
            limit: selectedLimit,
            sortBy,
            type,
        });
    };

    const handlePageChange = (e) => {
        const selectedPage = e.selected + 1;
        setSearchParams({
            status,
            page: selectedPage,
            limit,
            sortBy,
            type,
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const params = {
                    status,
                    page,
                    limit,
                    sortBy,
                    type,
                };

                const url = orderApiURL.getAll(params);
                const res = await axiosAuth.get(url, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`,
                    },
                });
                setOrders(res.data);
            } catch (error) {
                toast.error(error);
            }
        };

        fetchOrders();
    }, [status, page, limit, sortBy, type, user?.accessToken, axiosAuth]);

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("title")}>Đơn hàng của bạn</h2>
            <Separator />
            <div className={cx("filter")}>
                <div className={cx("filter-group")}>
                    <span className={cx("filter-group-label")}>Trạng thái</span>
                    <Select
                        className={cx("filter-group-select")}
                        options={STATUS_ORDER}
                        defaultValue={
                            status
                                ? STATUS_ORDER.filter((x) => x.value === status)
                                : STATUS_ORDER[0]
                        }
                        isSearchable={false}
                        onChange={handleStatusChange}
                    />
                </div>
                <div className={cx("filter-group")}>
                    <span className={cx("filter-group-label")}>Thời gian</span>
                    <Select
                        className={cx("filter-group-select")}
                        options={TIME_OPTIONS}
                        defaultValue={
                            type
                                ? TIME_OPTIONS.filter((x) => x.value === type)
                                : TIME_OPTIONS[0]
                        }
                        isSearchable={false}
                        onChange={handleSortChange}
                    />
                </div>
                <div className={cx("filter-group")}>
                    <span className={cx("filter-group-label")}>
                        Hiển thị mỗi trang
                    </span>
                    <Select
                        className={cx("filter-group-select")}
                        options={NUMBER_PER_PAGE}
                        defaultValue={
                            limit
                                ? NUMBER_PER_PAGE.filter(
                                      (x) => x.value === limit
                                  )
                                : NUMBER_PER_PAGE[0]
                        }
                        isSearchable={false}
                        onChange={handleLimitChange}
                    />
                </div>
                <span className={cx("total-order")}>
                    {orders?.total_results} đơn hàng
                </span>
            </div>
            <Separator />
            {orders?.results?.length > 0 ? (
                <>
                    <div className={cx("list")}>
                        {orders?.results?.map((order) => (
                            <OrderItem key={order._id} order={order} />
                        ))}
                    </div>
                    {orders?.total_pages > 1 && (
                        <div className="text-center mt-4">
                            <Pagination
                                pageCount={orders?.total_pages}
                                forcePage={page ? page - 1 : 0}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            ) : (
                <h2 className={cx("message")}>Bạn chưa có đơn hàng nào</h2>
            )}
        </div>
    );
}

export default Order;
