const reviewApiURL = {
    create() {
        const url = `/reviews`;
        return url;
    },
    getAll(bookId) {
        const url = `/reviews/${bookId}`;
        return url;
    },
};

export default reviewApiURL;
