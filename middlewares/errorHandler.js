const errorHandler = (error, request, response, next) => {
    return response.status(400).send(error.errors ? (error.errors[0].message || error.errors[0]) : error.message || error || 'Unknown error')
    next(error)
}

module.exports = errorHandler