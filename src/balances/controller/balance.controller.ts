import { Req, Res, Next, Resp } from '../../../types/express';
import * as BalanceService from '../service/balance.service';
import boom from '@hapi/boom';
import { BalanceModel } from '../model/balance.interface';
import { UserModel } from '../../users/model/user.interface';

function filterUsersFromCampus(balance: BalanceModel, user: UserModel) {
  if (!user.campusId) return true;
  return balance.User?.campusId === user.campusId;
}

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const balance = await BalanceService.findById(req.params.balance_id);

        if (req.user?.campusId && req.user?.campusId === balance?.User?.campusId) {
            return res.status(200).json(balance);
        }
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getAll(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            (await BalanceService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset
                }
            )).filter(balance => filterUsersFromCampus(balance, req.user!))
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            (await BalanceService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        userId: req.params.user_id
                    }
                }
            )).filter(balance => filterUsersFromCampus(balance, req.user!))
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const balance = await BalanceService.create(
            Object.assign(
                req.body
            ) as any
        );
        return res.status(201).json(
            await BalanceService.findById(balance?.id)   
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const balance = await BalanceService.update(
            req.params.balance_id, 
            req.body
        );
        return res.status(203).json(
            await BalanceService.findById(balance?.id)   
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await BalanceService.remove(
                {
                    where: {
                        id: req.params.balance_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}