namespace Az {
  export type GetGroupResponse = RequestResponse<Group[]>;
  export type GetGroupMemberResponse = RequestResponse<GroupMember[]>;
  export type GetUsersResponse = RequestResponse<User[]>;
  export type GetUserResponse = User | null;
  export type GetUserPhotoMetadataResponse = UserPhotoMetadata |null;
  export type PostUserCreationForm = FormUserCreation;
  export type PostUserResponse = UserCreationResponse | null;
}
interface RequestResponse<T> {
  value: T;
}
export interface Group {
  id: string;
  deletedDateTime?: string;
  classification?: string;
  createdDateTime: string;
  creationOptions: string[];
  description?: string;
  displayName: string;
  expirationDateTime?: string;
  groupTypes: string[];
  isAssignableToRole?: boolean;
  mail: string;
  mailEnabled: boolean;
  mailNickname: string;
  membershipRule?: string;
  membershipRuleProcessingState?: string;
  onPremisesDomainName?: string;
  onPremisesLastSyncDateTime?: string;
  onPremisesNetBiosName?: string;
  onPremisesSamAccountName?: string;
  onPremisesSecurityIdentifier?: string;
  onPremisesSyncEnabled?: boolean;
  preferredDataLocation?: string;
  preferredLanguage?: string;
  proxyAddresses: string[];
  renewedDateTime: string;
  resourceBehaviorOptions: string[];
  resourceProvisioningOptions: string[];
  securityEnabled: boolean;
  securityIdentifier: string;
  theme?: string;
  visibility?: string;
  onPremisesProvisioningErrors: string[];
}
interface GroupMember {
  '@odata.type': string;
  id: string;
  businessPhones: string[];
  displayName?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  surname?: string;
  userPrincipalName?: string;
}
interface User {
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}
interface PasswordProfile {
  forceChangePasswordNextSignIn: boolean;
  password: string;
}
interface FormUserCreation {
  accountEnabled: boolean;
  displayName: string;
  mailNickname: string;
  userPrincipalName: string;
  passwordProfile: PasswordProfile;
}
interface UserCreationResponse {
  '@odata.context': string;
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
}
export interface UserPhotoMetadata {
  '@odata.context': string;
  '@odata.mediaContentType': string;
  '@odata.mediaEtag': string;
  id: string;
  height: number;
  width: number;
}
export default Az;