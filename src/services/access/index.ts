import { Router } from "express";
import AccessFileService from "./accessFile.service";


const accessRouter = Router();

accessRouter.get('/:fileName', async (req, res: any) => {
    AccessFileService.process(req.params.fileName, req.query, res)
})

export default accessRouter