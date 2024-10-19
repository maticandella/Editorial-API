const successResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const errorResponse = (res, errors = [], statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        errors
    });
};

export { successResponse, errorResponse };