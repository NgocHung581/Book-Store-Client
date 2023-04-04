function equalTo(ref, msg) {
    return this.test({
        name: "equalTo",
        exclusive: false,
        message: msg || "Mật khẩu không trùng khớp",
        params: {
            reference: ref.path,
        },
        test: function (value) {
            return value === this.resolve(ref);
        },
    });
}

export default equalTo;
