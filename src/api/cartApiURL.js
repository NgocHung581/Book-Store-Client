import queryString from "query-string";

const cartApiURL = {
    getAllOrAddOrUpdate() {
        const url = `/carts`;
        return url;
    },
    delete(params) {
        const query = queryString.stringify(params);
        const url = `/carts${`?${query}`}`;
        return url;
    },
};

export default cartApiURL;
