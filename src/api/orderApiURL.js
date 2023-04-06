import queryString from "query-string";

const orderApiURL = {
    create() {
        const url = `/orders`;
        return url;
    },
    getAll(params) {
        const query = queryString.stringify(params);
        const url = `/orders${`?${query}`}`;
        return url;
    },
    get(orderId) {
        const url = `/orders/${orderId}`;
        return url;
    },
    updateStatus(orderId) {
        const url = `/orders/${orderId}`;
        return url;
    },
    getOrderStatus() {
        const url = `/orders/status`;
        return url;
    },
};

export default orderApiURL;
