const chatApiURL = {
    getAllOrCreateChat() {
        const url = `/chats`;
        return url;
    },
    sendMessage(id) {
        const url = `/chats/${id}`;
        return url;
    },
    getChatOfUser(id) {
        const url = `/chats/${id}`;
        return url;
    },
};

export default chatApiURL;
