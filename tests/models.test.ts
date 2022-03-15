// import { expect } from 'chai';
// import '../config/models.config';
// import * as UserService from '../src/users/service/user.service';
// import { UserAttributes, UserModel } from '../src/users/model/user.interface';
// import * as PasswordService from '../src/passwords/service/password.service';
// import { PasswordAttributes, PasswordModel } from '../src/passwords/model/password.interface';
// import * as GroupService from '../src/groups/service/group.service';
// import { GroupAttributes, GroupModel } from '../src/groups/model/group.interface';
// import * as GroupMemberService from '../src/group-members/service/group-member.service';
// import { GroupMemberAttributes, GroupMemberModel } from '../src/group-members/model/group-member.interface';

// describe('Models:' , () => {
//     /////// USER MODEL /////////
//     describe('User model:', () => {
//         let user: UserAttributes = {
//             firstname: 'Unit',
//             lastname: 'Test',
//             email: 'unit@test.com',
//             password: 'testtest',
//             birthday: '1970-01-01',
//             is_validate: false
//         };
//         let userRes: UserModel;
//         /// GET ALL
//         it('get users', async() => {
//             expect(
//                 await UserService.findAll()
//             ).to.be.an('array');
//         });
//         // CREATE
//         it('create user', async() => {
//             userRes = await UserService.create(user);
//             expect(userRes).to.not.be.null;
//         });
//         // UPDATE
//         it('update user', async() => {
//             expect(
//                 await UserService.update(userRes?.id, user)
//             ).to.not.be.null;
//         });
//         // DELETE
//         it('remove user', async() => {
//             expect(
//                 await UserService.remove(
//                     {
//                         where: {
//                             id: userRes?.id
//                         }
//                     }
//                 )
//             ).to.be.a('number');
//         });
//     });

//     /////// PASSWORD MODEL /////////
//     describe('Password model:', async() => {
//         let password: PasswordAttributes = {
//             title: 'Unit test password',
//             username: 'unit@test.com',
//             password: 'franpute',
//             user_id: (await UserService.findOne())?.id
//         }
//         let passwordRes: PasswordModel;
//         /// GET ALL
//         it('get passwords', async() => {
//             expect(
//                 await PasswordService.findAll()
//             ).to.be.an('array');
//         });
//         // CREATE
//         it('create password', async() => {
//             passwordRes = await PasswordService.create(password);
//             expect(passwordRes).to.not.be.null;
//         });
//         // UPDATE
//         it('update password', async() => {
//             expect(
//                 await PasswordService.update(passwordRes?.id, password)
//             ).to.not.be.null;
//         });
//         // DELETE
//         it('remove password', async() => {
//             expect(
//                 await PasswordService.remove(
//                     {
//                         where: {
//                             id: passwordRes?.id
//                         }
//                     }
//                 )
//             ).to.be.a('number');
//         });
//     });

//     /////// GROUP MODEL /////////
//     describe('Group model:', () => {
//         let group: GroupAttributes = {
//             name: 'Unit Test Group'
//         };
//         let groupeRes: GroupModel;
//         /// GET ALL
//         it('get groups', async() => {
//             expect(
//                 await GroupService.findAll()
//             ).to.be.an('array');
//         });
//         // CREATE
//         it('create group', async() => {
//             groupeRes = await GroupService.create(group);
//             expect(groupeRes).to.not.be.null;
//         });
//         // UPDATE
//         it('update group', async() => {
//             expect(
//                 await GroupService.update(groupeRes?.id, group)
//             ).to.not.be.null;
//         });
//         // DELETE
//         it('remove group', async() => {
//             expect(
//                 await GroupService.remove(
//                     {
//                         where: {
//                             id: groupeRes?.id
//                         }
//                     }
//                 )
//             ).to.be.a('number');
//         });
//     });

//     /////// GROUP MEMBER MODEL /////////
//     describe('Group member model:', async() => {
//         let member: GroupMemberAttributes = {
//             user_id: (await UserService.findOne())?.id,
//             group_id: (await GroupService.findOne())?.id
//         };
//         let memberRes: GroupMemberModel;
//         /// GET ALL
//         it('get group members', async() => {
//             expect(
//                 await GroupMemberService.findAll()
//             ).to.be.an('array');
//         });
//         // CREATE
//         it('create group member', async() => {
//             memberRes = await GroupMemberService.create(member);
//             expect(memberRes).to.not.be.null;
//         });
//         // UPDATE
//         it('update group member', async() => {
//             expect(
//                 await GroupMemberService.update(memberRes?.id, member)
//             ).to.not.be.null;
//         });
//         // DELETE
//         it('remove group member', async() => {
//             expect(
//                 await GroupMemberService.remove(
//                     {
//                         where: {
//                             id: memberRes?.id
//                         }
//                     }
//                 )
//             ).to.be.a('number');
//         });
//     });
// });