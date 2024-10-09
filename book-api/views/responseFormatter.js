const responseFormatter = {
    formatResponse: (data) => {
        return JSON.stringify(data, null, 2);
    }
};

module.exports = responseFormatter;