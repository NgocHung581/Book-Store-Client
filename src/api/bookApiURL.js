import queryString from "query-string";

const bookApiURL = {
    getAll(params) {
        const query = queryString.stringify(params);
        const url = `/books${`?${query}`}`;
        return url;
    },
    getFeature(params) {
        const query = queryString.stringify(params);
        const url = `/books/feature?${query}`;
        return url;
    },
    get(slug) {
        const url = `/books/${slug}`;
        return url;
    },
    getReviews(slug) {
        const url = `/books/${slug}/reviews`;
        return url;
    },
    getSpecificCategory(slug, params) {
        const query = queryString.stringify(params);
        const url = `/books/category/${slug}${query ? `?${query}` : ""}`;
        return url;
    },
    search(params) {
        const query = queryString.stringify(params);
        const url = `/books/search?${query}`;
        return url;
    },
    create() {
        const url = `/books`;
        return url;
    },
};

export default bookApiURL;
