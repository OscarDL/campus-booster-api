import fetch from './azure.fetch';
import auth from './azure.auth';
import { AuthenticationResult } from '@azure/msal-node';
import Az from '../@types';
/**
 *  # Azure Ad service
 *  ## Process env required:
 *  @requires `AZURE_TENANT_ID="tenantID"`
 *  @requires `AZURE_CLIENT_ID="clientID"`
 *  @requires `AZURE_CLIENT_SECRET="clientSecret"`
 *  @requires `AAD_ENDPOINT="loginURL"`
 *  @requires `GRAPH_ENDPOINT="graphQLURL"`
 */
export default class AzureService {
  protected _TOKEN!: string | undefined;
  protected _SESSION_EXPIRE!: Date;
  /**
 * ### Auth to Azure AD
 * @returns {Promise<AuthenticationResult>} a promise of object for oauth response.
 */
  public async OAuth(): Promise<AuthenticationResult> {
    const authResponse = await auth.getToken(auth.tokenRequest);
    this._TOKEN = authResponse?.accessToken;
    this._SESSION_EXPIRE = new Date(authResponse?.extExpiresOn!);
    return authResponse ?? Promise.reject('Auth failed.');
  }
  private async refreshToken(): Promise<void> {
    if (
      !this._SESSION_EXPIRE ||
      new Date().getTime() > this._SESSION_EXPIRE.getTime()
    ) await this.OAuth();
  }
  /**
   * ### Get Azure AD groups
   * @returns {Promise<Az.GetGroupResponse>} a promise of the list of groups from Azure AD.
   */
  public async getGroups(): Promise<Az.GetGroupResponse> {
    await this.refreshToken();
    if(!this._TOKEN) throw new Error('You should call OAuth method.');
    return await fetch.callApi('GET', `${auth.apiConfig.uri}/v1.0/groups`, this._TOKEN);
  }
  /**
   * ### Get Azure AD group members
   * @param groupID The ID of your group
   * @returns {Promise<Az.GetGroupMemberResponse>} a promise of the list of groupMembers from Azure AD.
   */
  public async getGroupMembers(groupID: string): Promise<Az.GetGroupMemberResponse> {
    await this.refreshToken();
    if(!this._TOKEN) throw new Error('You should call OAuth method.');
    return await fetch.callApi('GET', `${auth.apiConfig.uri}/v1.0/groups/${groupID}/members`, this._TOKEN);
  }

  /**
   * ### Get Azure AD users
   * @returns {Promise<Az.GetUsersResponse>} a promise of the list of users from Azure AD.
   */
  public async getUsers(): Promise<Az.GetUsersResponse> {
    await this.refreshToken();
    if(!this._TOKEN) throw new Error('You should call OAuth method.');
    return await fetch.callApi('GET', `${auth.apiConfig.uri}/v1.0/users`, this._TOKEN);
  }

  /**
   * ### Get Azure AD user by email
   * @param email The email of user
   * @returns {Promise<Az.GetUserResponse>} a promise of the user from Azure AD.
   */
  public async getUser(email: string): Promise<Az.GetUserResponse> {
    try {
      await this.refreshToken();
      if(!this._TOKEN) throw new Error('You should call OAuth method.');
      return await fetch.callApi('GET', `${auth.apiConfig.uri}/v1.0/users/${email}`, this._TOKEN);
    } catch (err: any) {
      if(err instanceof Error) {
        console.log(err.message.red);
      }
      return null;
    }
  }
}