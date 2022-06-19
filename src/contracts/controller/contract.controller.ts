import { Req, Res, Next, Resp } from '../../../types/express';
import * as ContractService from '../service/contract.service';
import * as TeacherService from '../../teachers/service/teacher.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';
import * as UserService from '../../users/service/user.service';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ContractService.findById(
                req.params.contract_id
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getByUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ContractService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        userId: req.params.user_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getBySupervisor(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(await ContractService.findAll(
            {
                where: {
                    supervisorId: req.params.user_id
                }
            }
        ));
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getAll(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ContractService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        if(req.files && req.files.length > 0) {
            req.body.fileKeys = Object.entries(req.files).map(([_, value]) => (value as any).key);
        }
        if(req.body.supervisorId) {
            const user = await UserService.findById(req.body.supervisorId);
            const teacher = await TeacherService.findOne({
                where: {
                    userId: req.body.supervisorId
                }
            });
            if(!teacher) {
                return next(boom.badRequest("supervisor_not_found", `${user?.firstName} ${user?.lastName}`));
            } 
            req.body.supervisorId = teacher?.id;
        }
        const contract = await ContractService.create(req.body as any);
        return res.status(201).json(
            await ContractService.findById(contract.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        let contract = await ContractService.findById(req.params.contract_id);
        req.body.fileKeys = JSON.parse(req.body.fileKeys ?? '[]');
        const rmFileKeys = contract?.fileKeys?.filter(f => !req.body.fileKeys?.includes(f)) ?? [];
        for (let i = 0; i < rmFileKeys.length; i++) {
            const fileKey = rmFileKeys[i];
            await s3.remove(fileKey);
        }
        if(req.files?.length) {
            req.body.fileKeys = req.body.fileKeys.concat(...Object.entries(req.files).map(([_, value]) => (value as any).key));
        }
        if(req.body.supervisorId) {
            const user = await UserService.findById(req.body.supervisorId);
            const teacher = await TeacherService.findOne({
                where: {
                    userId: req.body.supervisorId
                }
            });
            if(!teacher) {
                return next(boom.badRequest("supervisor_not_found", `${user?.firstName} ${user?.lastName}`));
            } 
            req.body.supervisorId = teacher?.id;
        }
        contract = await ContractService.update(req.params.contract_id, req.body);
        return res.status(203).json(
            await ContractService.findById(contract.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const contract = await ContractService.findById(req.params.contract_id); 
        for (let i = 0; i < contract?.fileKeys?.length!; i++) {
            if(contract?.fileKeys) {
                const fileKeys = contract?.fileKeys[i];
                await s3.remove(fileKeys);
            }
        }
        return res.status(204).json(
            await ContractService.remove(
                {
                    where: {
                        id: contract?.id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}