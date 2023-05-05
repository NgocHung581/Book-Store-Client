import queryString from "query-string";

const categoryApiURL = {
    getAll(params) {
        const query = queryString.stringify(params);
        const url = `/categories${`?${query}`}`;
        return url;
    },
    get(slug) {
        const url = `/categories/${slug}`;
        return url;
    },
    create() {
        const url = `/categories`;
        return url;
    },
    updateAndDelete(id) {
        const url = `/categories/${id}`;
        return url;
    },
};

export default categoryApiURL;
