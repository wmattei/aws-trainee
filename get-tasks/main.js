exports.lambdaHandler = async (event, context) => {
    try {
        // TODO DB
        
        const tasks = [
            {
                id: 1,
                title: 'Whatch 6th season of B99',
                done: false
            },
            {
                id: 2,
                title: 'Whatch 2nd season of The OA',
                done: false
            },
            {
                id: 3,
                title: 'Find a cure for COVID-19',
                done: true
            }
        ]
                
        response = {
            statusCode: 200,
            body: JSON.stringify({
                data: tasks
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};