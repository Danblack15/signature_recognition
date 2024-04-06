import { Router } from 'express';


const signaturesRouter = Router();

signaturesRouter.post('/addNewSignature', async (req, res) => {
    try {
        res.send('Add new signature');
    } catch (error) {
        console.log(error);
    }
});

signaturesRouter.post('/compareSignatures', async (req, res) => {
    try {
        res.send('Compare Two signatures');
    } catch (error) {
        console.log(error);
    }
});

export { signaturesRouter };