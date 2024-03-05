type CustomErrorParams = {
    statusCode?: number;
    message?: string;
    data?: any;
};

class CustomError extends Error {
    constructor({ message, statusCode }: CustomErrorParams) {
        super(message);
        this.name = "CustomError";
    }
}
