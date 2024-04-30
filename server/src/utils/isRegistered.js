import fs from 'fs';
const filePath = 'src/data.json';

export const isRegistered = async (userName) => {
    const allData = fs.readFileSync(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data;
    });

    return JSON.parse(allData).filter(user => user.userName === userName)[0];
};