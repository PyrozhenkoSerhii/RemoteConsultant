import logger from '../utils/logger'

const DUPLICATE_MONGO_ERROR = 11000

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    if (err.code === DUPLICATE_MONGO_ERROR) {
        let field = err.errmsg.split(".$")[1];
        field = field.split(" dup key")[0];
        field = field.substring(0, field.lastIndexOf("_"));
        return res.status(400).send({ error: `This ${field} already exists` })
    }
    res.status(500).send({ error: `Error occured on the server. If you are owner, check the logs of the server` });
}

export default errorHandler