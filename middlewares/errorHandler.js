const errorHandler = (error, request, response, next) => {
    return response.status(400).send(error)
    next(error)
}

module.exports = errorHandler