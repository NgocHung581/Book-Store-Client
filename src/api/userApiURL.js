import queryString from "query-string";

const userApiURL = {
    getAll(params) {
        const query = queryString.stringify(params);
        const url = `/users${`?${query}`}`;
        return url;
    },
    getUser(email) {
        const url = `/users/${email}`;
        return url;
    },
    login() {
        const url = `/users/login`;
        return url;
    },
    logout() {
        const url = `/users/logout`;
        return url;
    },
    refreshToken() {
        const url = `/users/refresh`;
        return url;
    },
    update() {
        const url = `/users/update`;
        return url;
    },
    updateByAdmin(email) {
        const url = `/users/update/${email}`;
        return url;
    },
    delete(id) {
        const url = `/users/${id}`;
        return url;
    },
    register() {
        const url = `/users`;
        return url;
    },
    generateOTP(params) {
        const query = queryString.stringify(params);

        const url = `/users/generateOTP?${query}`;
        return url;
    },
    verifyOTP(params) {
        const query = queryString.stringify(params);

        const url = `/users/verifyOTP?${query}`;
        return url;
    },
    resetPassword() {
        const url = `/users/resetPassword`;
        return url;
    },
    registerMail() {
        const url = `/users/registerMail`;
        return url;
    },
    getOrAddFavorite() {
        const url = `/users/favorite`;
        return url;
    },
    deleteFavorite(id) {
        const url = `/users/favorite/${id}`;
        return url;
    },
};

export default userApiURL;
