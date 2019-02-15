import logger from '../utils/logger'


const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send({error: `Error occured on the server. If you are owner, check the logs of the server`});
}

export default errorHandler