import fs from 'fs';
const filePath = 'src/data.json';

export const compareSignatures = async (signature, userName) => {
    const userDataStr = fs.readFileSync(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });

    const userData = JSON.parse(userDataStr).filter(userItem => userItem.userName === userName)[0];

    if (!userData) return false;


    const userSignatures = userData?.signatures;
    let countDecision = 0;

    for (let i = 0; i < userSignatures.length; i++) {
        const userSignature = userSignatures[i];

        let checkData = {
            summ: 0,
            length: 0
        }

        for(let i = 0; i < signature.length; i++) {
            const origItem = userSignature[i];
            const copyItem = signature[i];
            if (!origItem || !copyItem) break;

            const diffEvklid = Math.sqrt(Math.pow((origItem.xB-copyItem.xA), 2) + Math.pow((origItem.yB-copyItem.yA), 2)); 

            checkData.summ += diffEvklid;
            checkData.length++;
        }

        const deffLength = Math.abs(userSignature.length - signature.length);
		console.log('Разница размеростей: ', deffLength);

        const avrDest = checkData.summ / checkData.length
		console.log('Среднее расстояние = ', avrDest);

        if (avrDest <= 50 && deffLength <= 50)
			countDecision++        
    }

    return countDecision >= 2
};