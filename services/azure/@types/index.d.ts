interface RequestResponse<T> {
  value: T;
}
interface Group {
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
  accountEnabled: boolean;
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
  surname: string;
  givenName: string;
  displayName: string;
  mailNickname: string;
  userPrincipalName: string;
  passwordProfile: PasswordProfile;
}
interface FormUserUpdate {
  accountEnabled?: boolean;
  surname?: string;
  givenName?: string;
  displayName?: string;
  mailNickname?: string;
  userPrincipalName?: string;
  passwordProfile?: PasswordProfile;
}
interface UserCreationResponse {
  '@odata.context': string;
  id: string;
  accountEnabled: boolean;
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
interface UserPhotoMetadata {
  '@odata.context': string;
  '@odata.mediaContentType': string;
  '@odata.mediaEtag': string;
  id: string;
  height: number;
  width: number;
}
interface AddPermission {
  '@odata.context': string;
  id: string;
  deletedDateTime?: any;
  appRoleId: string;
  createdDateTime: Date;
  principalDisplayName: string;
  principalId: string;
  principalType: string;
  resourceDisplayName: string;
  resourceId: string;
}
interface Application {
  accountEnabled: boolean;
  addIns: any[];
  alternativeNames: string[];
  appDisplayName: string;
  appId: string;
  appOwnerOrganizationId: string;
  appRoleAssignmentRequired: boolean;
  appRoles: any[];
  disabledByMicrosoftStatus: string;
  displayName: string;
  homepage: string;
  id: string;
  info: any;
  keyCredentials: any[];
  logoutUrl: string;
  notes: string;
  oauth2PermissionScopes: any[];
  passwordCredentials: any[];
  replyUrls: string[];
  resourceSpecificApplicationPermissions: any[];
  servicePrincipalNames: string[];
  servicePrincipalType: string;
  tags: string[];
  tokenEncryptionKeyId: string;
  verifiedPublisher: any;
}
namespace Az {
  export type GetGroupResponse = RequestResponse<Group[]>;
  export type GetGroupMemberResponse = RequestResponse<GroupMember[]>;
  export type GetUsersResponse = RequestResponse<User[]>;
  export type GetUserResponse = User | null;
  export type GetUserPhotoMetadataResponse = UserPhotoMetadata |null;
  export type PostUserCreationForm = FormUserCreation;
  export type PatchUserUpdateForm = FormUserUpdate;
  export type PostUserResponse = UserCreationResponse | null;
  export type AddPermissionResult = AddPermission | null;
  export type GetApplicationResult = RequestResponse<Application[]> | null;
}
export default Az;