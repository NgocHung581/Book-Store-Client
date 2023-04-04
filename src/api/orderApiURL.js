const orderApiURL = {
    create() {
        const url = `/orders`;
        return url;
    },
    getAll() {
        const url = `/orders`;
        return url;
    },
    get(orderId) {
        const url = `/orders/${orderId}`;
        return url;
    },
};

export default orderApiURL;
