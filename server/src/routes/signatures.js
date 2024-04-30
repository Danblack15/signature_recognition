import { Router } from 'express';

import { isRegistered } from '../utils/isRegistered';
import { addSignature } from '../utils/addSignature';
import { compareSignatures } from '../utils/compareSignatures';


const signaturesRouter = Router();

signaturesRouter.post('/login', async (req, res) => {
    try {
        const { userName } = req.body;

        const userIsRegistered = await isRegistered(userName);

        res.send({
            status: !!userIsRegistered ? 'check' : 'new',
            userName: userName
        });
    } catch (error) {
        console.log(error);
    }
});

signaturesRouter.post('/addNewSignatures', async (req, res) => {
    try {
        const { signatures, userName } = req.body;

        await addSignature(signatures, userName);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
    }
});

signaturesRouter.post('/compareSignatures', async (req, res) => {
    try {
        const { signature, userName } = req.body;

        const isCompare = await compareSignatures(signature, userName);

        res.status(isCompare ? 200 : 403).send({
            message: isCompare ? 'Доступ разрешён..' : 'Доступ запрещён'
        });
    } catch (error) {
        console.log(error);
    }
});

export { signaturesRouter };