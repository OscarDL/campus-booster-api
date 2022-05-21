import fetch from './azure.fetch';
import auth from './azure.auth';
import { AuthenticationResult } from '@azure/msal-node';
import Az from '../@types';
import moment, { Moment } from 'moment-timezone';
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
  protected _SESSION_EXPIRE!: Moment;
  protected _REQUIRED_ENV = [ 
    "AZURE_TENANT_ID", 
    "AZURE_CLIENT_ID", 
    "AZURE_CLIENT_SECRET", 
    "AAD_ENDPOINT", 
    "GRAPH_ENDPOINT"
  ];
  constructor() {
    this._REQUIRED_ENV.forEach(ENV_KEY => {
      if(!Object.keys(process.env).includes(ENV_KEY)) throw new Error(`Env Missing: 'process.env' missing prop ${ENV_KEY}.`);
    });
  }
  /**
 * ### Auth to Azure AD
 * @returns {Promise<AuthenticationResult>} a promise of object for oauth response.
 */
  public async OAuth(): Promise<AuthenticationResult> {
    const authResponse = await auth.getToken(auth.tokenRequest);
    this._TOKEN = authResponse?.accessToken;
    this._SESSION_EXPIRE = moment(authResponse?.expiresOn!).tz("Europe/Paris");
    return authResponse ?? Promise.reject('Auth failed.');
  }
  private async refreshToken(): Promise<void> {
    if (
      !this._SESSION_EXPIRE ||
      Math.sign(moment().diff(this._SESSION_EXPIRE, "minutes")) !== -1
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
  /**
   * ### Get Azure AD user avatar by email
   * @param userId The id of user
   * @returns {Promise<string>} a promise of the user avatar as string binary.
   */
  public async getUserAvatar(userId: string): Promise<string | null> {
    try {      
      await this.refreshToken();
      if(!this._TOKEN) throw new Error('You should call OAuth method.');
      //const metadata = await fetch.callApi<Az.GetUserPhotoMetadataResponse>('GET', `${auth.apiConfig.uri}/v1.0/users/${userId}/photo`, this._TOKEN);
      const binary = await fetch.callApi<any>('GET', `${auth.apiConfig.uri}/v1.0/users/${userId}/photo/$value`, this._TOKEN);
      //return `data:${metadata?.['@odata.mediaContentType'] ?? 'images/png'};base64, ${Buffer.from(binary, "binary").toString('base64')}`;
      return binary;
    } catch (err: any) {
      return null;
    }
  }
  /**
   * ### Create a user to the AD
   * @param user your user azure data
   * @returns {Promise<Az.PostUserResponse>} a promise of the user creation response from Azure AD.
   */
   public async createUser(user: Az.PostUserCreationForm): Promise<Az.PostUserResponse> {
    try {      
      await this.refreshToken();
      if(!this._TOKEN) throw new Error('You should call OAuth method.');
      return await fetch.callApi('POST', `${auth.apiConfig.uri}/v1.0/users`, this._TOKEN, user);
    } catch (err: any) {
      if(err instanceof Error) {
        console.log(err.message.red);
        console.log((err as any)?.response?.data?.error);
      }
      return null;
    }
  }
  /**
   * ### Update a user to the AD
   * @param user your user azure data
   * @returns {Promise<any>} an empty promise.
   */
   public async updateUser(email: string, user: Az.PatchUserUpdateForm): Promise<any> {
    try {      
      await this.refreshToken();
      if(!this._TOKEN) throw new Error('You should call OAuth method.');
      const test = await fetch.callApi('PATCH', `${auth.apiConfig.uri}/v1.0/users/${email}`, this._TOKEN, user);
      console.log(test)
      return test
    } catch (err: any) {
      if(err instanceof Error) {
        console.log(err.message.red);
        console.log((err as any)?.response?.data?.error);
      }
      return null;
    }
  }
  /**
   * ### Delete a user from the AD
   * @param email your user azure email
   * @returns {Promise<any>} an empty promise.
   */
   public async deleteUser(email: string): Promise<any> {
    try {      
      await this.refreshToken();
      if(!this._TOKEN) throw new Error('You should call OAuth method.');
      const test = await fetch.callApi('DELETE', `${auth.apiConfig.uri}/v1.0/users/${email}`, this._TOKEN);
      console.log(test)
      return test
    } catch (err: any) {
      if(err instanceof Error) {
        console.log(err.message.red);
        console.log((err as any)?.response?.data?.error);
      }
      return null;
    }
  }
}
