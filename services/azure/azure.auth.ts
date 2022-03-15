import * as msal from '@azure/msal-node';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
const msalConfig: msal.Configuration = {
    auth: {
        clientId: process.env.AZURE_CLIENT_ID ?? '',
        authority: process.env.AAD_ENDPOINT + '/' + process.env.AZURE_TENANT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET
    }
};

/**
 * With client credentials flows permissions need to be granted in the portal by a tenant administrator.
 * The scope is always in the format '<resource>/.default'. For more, visit:
 * https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow
 */
const tokenRequest: msal.ClientCredentialRequest = {
    scopes: [process.env.GRAPH_ENDPOINT + '/.default'],
};

const apiConfig = {
    uri: process.env.GRAPH_ENDPOINT,
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */
const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
async function getToken(tokenRequest: msal.ClientCredentialRequest) {
    return await cca.acquireTokenByClientCredential(tokenRequest);
}

export = {
    apiConfig: apiConfig,
    tokenRequest: tokenRequest,
    getToken: getToken
};