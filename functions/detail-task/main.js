/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async event => {
    let response;
    try {
        // TODO DB

        const task = {
            id: 1,
            title: 'Whatch 6th season of B99',
            done: false
        };

        if (+event.pathParameters.id > 3) {
            const Boom = require('boom');
            response = {
                body: JSON.stringify(Boom.notFound('Task not found').output),
                statusCode: 404
            };
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    data: task
                })
            };
        }
    } catch (err) {
        console.error(err);
        return err;
    }

    return response;
};
