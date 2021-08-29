
import Role, { RolesPayload, CreateRoleReturn } from '../schemas/role';
import RoleModel from '../database/models/Role';
import { Args, Arg, Mutation, Authorized, Query, Ctx, Resolver, UseMiddleware } from 'type-graphql';
import {
    ErrorResponse,
} from '../helpers/common.helper';
import { RoleArgs, GetRolesArgs, UpdateRoleArgs } from '../schemas/role/args';

import { VerifyRole, CreateRoleMiddl, UpdateRoleMiddl } from '../middlewares/role/verify.middleware'


@Resolver()
export default class RoleResolver {


    @Authorized()
    @Query((returns) => RolesPayload, { nullable: true })

    async GetRoles(@Args() { skip, take }: GetRolesArgs) {
        try {
            const roles = await RoleModel.find({

            }).skip(skip).limit(take);


            const count = await RoleModel.countDocuments({

            });

            return {
                roles,
                count,
            };
        } catch (error) {

            return ErrorResponse({
                errors: { error: 'An error occurred while fetching roles.' },
            });
        }
    }
    @Authorized()
    @Query((returns) => Role, { nullable: true })

    async GetOneRole(@Arg("_id") _id: string) {
        try {

            const role = await RoleModel.findById({
                _id
            });
            if (!role) {
                return ErrorResponse({ errors: "role not found ." });

            }
            return role

        } catch (error) {

            return ErrorResponse({
                errors: { error: 'An error occurred while fetching roles .' },
            });
        }
    }
    @Authorized()
    @Mutation((returns) => CreateRoleReturn, { nullable: true })
    @UseMiddleware(VerifyRole, CreateRoleMiddl)
    async createRole(@Args() args: RoleArgs) {
        try {

            const role = await new RoleModel(args
            ).save();
            return { message: "role Created Successfully", role };
        } catch (error) {

            return ErrorResponse({ errors: "Something went wrong" });
        }

    }




    @Authorized()
    @Mutation((returns) => CreateRoleReturn, { nullable: true })
    @UseMiddleware(VerifyRole, UpdateRoleMiddl)
    async updateDriver(@Args() args: UpdateRoleArgs, @Ctx() ctx: any) {
        try {

            const { id, updates } = args
            const update = { ...updates, updatedAt: new Date() }

            const updatedRole = await RoleModel.findOneAndUpdate({ _id: id },
                update,
                { new: true })
            if (!updatedRole) {
                return ErrorResponse({ errors: "no Role found" });
            }
            return { role: updatedRole, message: "Role updated successfully" };
        } catch (error) {

            return ErrorResponse({ errors: { error: error.message } });
        }

    }

    @Authorized("admin")
    @Mutation((returns) => String, { nullable: true })

    async DeleteRole(@Arg("_id") _id: string) {
        try {

            const deleted = await RoleModel.findOneAndDelete({
                _id
            });
            if (!deleted) {
                return ErrorResponse({ errors: "no Role found" });
            }
            return "deleted sucessfully"

        } catch (error) {

            return ErrorResponse({
                errors: { error: 'An error accured while deleting A role .' },
            });
        }
    }



}