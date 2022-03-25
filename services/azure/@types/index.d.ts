namespace Az {
  export type GetGroupResponse = RequestResponse<Group[]>;
  export type GetGroupMemberResponse = RequestResponse<GroupMember[]>;
  export type GetUsersResponse = RequestResponse<User[]>;
  export type GetUserResponse = User | null;
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
export default Az;