import { Req, Res, Next, Resp } from '../../../types/express';
import * as ToolService from '../service/tool.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ToolService.findById(
                req.params.tool_id
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getAll(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ToolService.findAll(
                {
                    limit: req.query?.limit
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
        if(req.file) {
            req.body.img = (req.file as any).key;
        }
        return res.status(201).json(
            await ToolService.create(
                req.body as any
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const tool = await ToolService.findById(req.params.tool_id);
        if(req.file) {
            req.body.img = (req.file as any).key;
            if(tool?.img) await s3.remove(tool.img);
        } else {
            if(tool?.img && !req.body.img) {
                await s3.remove(tool.img);
                req.body.img = null;
            }
        }
        return res.status(203).json(
            await ToolService.update(
                tool?.id, 
                req.body
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const tool = await ToolService.findById(req.params.tool_id);
        if(tool?.img) {
            await s3.remove(tool.img);
        }
        return res.status(204).json(
            await ToolService.remove(
                {
                    where: {
                        id: tool?.id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}