import { Req, Res, Next, Resp } from '../../../types/express';
import * as ClasseService from '../service/classe.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ClasseService.findById(
                req.params.classe_id
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getAll(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ClasseService.findAll(
                {
                    limit: req.query?.limit
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(201).json(
            await ClasseService.create(
                req.body as any
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(203).json(
            await ClasseService.update(
                req.params.classe_id, 
                req.body
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await ClasseService.remove(
                {
                    where: {
                        id: req.params.classe_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}