import fs from 'fs';
const filePath = 'src/data.json';

export const addSignature = async (signatures, userName) => {
    const diff1 = Math.abs(signatures[0].length - signatures[1].length),
        diff2 = Math.abs(signatures[1].length - signatures[2].length),
        diff3 = Math.abs(signatures[0].length - signatures[2].length);

    const averageDiff = (diff1 + diff2 + diff3) / 3;
    
    const newUserData = {
        userName: userName,
        signatures: signatures,
        averageDiff: averageDiff
    }

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let fileData = JSON.parse(data);
        fileData.push(newUserData);

        const jsonStr = JSON.stringify(fileData);

        fs.writeFile(filePath, jsonStr, 'utf8', async (err) => {
            if (!err) {
                return true;
            }
        });
    });
};