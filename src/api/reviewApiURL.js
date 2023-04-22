import queryString from "query-string";

const reviewApiURL = {
    create() {
        const url = `/reviews`;
        return url;
    },
    edit(reviewId) {
        const url = `/reviews/${reviewId}`;
        return url;
    },
    delete(reviewId, params) {
        const query = queryString.stringify(params);

        const url = `/reviews/${reviewId}${`?${query}`}`;
        return url;
    },
};

export default reviewApiURL;
