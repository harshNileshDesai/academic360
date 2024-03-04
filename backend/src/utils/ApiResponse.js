class ApiResponse {
    constructor(statusCode, payload, message = "Started!") {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
        this.success = statusCode < 500;
    }
}

export { ApiResponse }