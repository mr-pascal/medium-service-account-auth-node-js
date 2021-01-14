import * as denv from 'dotenv';
denv.config();
import fastify, {FastifyInstance} from 'fastify';
import {Server, IncomingMessage, ServerResponse} from 'http';
import {JWT} from 'google-auth-library';

export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({logger: true});
const port = process.env.PORT || 8080;
const clientEmail: string = process.env.CLIENT_EMAIL || '';
const privateKey: string = process.env.PRIVATE_KEY || '';

const cloudFunctionEndpoint: string = `https://us-central1-my-medium-demo-project-299218.cloudfunctions.net/helloHttp`;


/**
 * 1. Define a GET endpoint with the url "/ping"
 */
app.get('/ping', async (request, reply) => {
    // Just rename global variable for ease of use
    const url: string = cloudFunctionEndpoint;

    // 2. Check if clientEmail and privateKey exists, otherwise auth is not possible
    if (!clientEmail || ! privateKey) {
        reply
            .status(500)
            .send(`Make sure that the 'CLIENT_EMAIL' and 'PRIVATE_KEY' environment variables exists!!!`);
        return;
    }

    // 3. Create JWT using the email and the private key from the Environment variables
    const clientjwt = new JWT({
        email: clientEmail,
        key: privateKey,
    });

    // 4. Fetch Bearer token for further authorization
    const token = await clientjwt.fetchIdToken(url);

    // 5. Set Bearer token to the header map
    // A simple JSON doesn't seem to work with the library, even though underlying typings tell so
    const headers = new Map([
        ['Authorization', `Bearer ${token}`],
    ]);

    // 6. Do the Actual request to the Cloud Function
    const result = await clientjwt
        .request({url, headers});

    // 7. Return the status and payload of the Cloud Function
    reply.send({
        status: result.status,
        body: result.data,
    });
});

// Start server
const start = async (): Promise<void> => {
    try {
        await app.listen(port, '0.0.0.0');
        console.log(`Listening on port ${port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();

