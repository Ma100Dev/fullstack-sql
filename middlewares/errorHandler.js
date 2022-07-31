const errorHandler = (error, request, response, next) => {
    try {
        return response.status(400).send(error.errors ?
            (error.errors[0].message + (error.errors[0]?.validatorArgs && (` (${error.errors[0]?.validatorArgs || ''})`)).replace('()', '') || error.errors[0])
            : error.message || error || 'Unknown error')
    } catch (err) {
        console.error(err)
        return response.status(500).send('Unknown error')
    }
    next(error)
}

module.exports = errorHandler