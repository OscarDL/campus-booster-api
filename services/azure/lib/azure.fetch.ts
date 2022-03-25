import axios, { Method } from 'axios';

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 */
async function callApi<T extends any>(method: Method, endpoint: string, accessToken: string): Promise<T> {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    try {
        const response = await axios.request(
            {
                method,
                url: endpoint,
                ...options
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export = {
    callApi: callApi
};