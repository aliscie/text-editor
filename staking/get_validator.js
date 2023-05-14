const { Connection , clusterApiUrl } = require('@solana/web3.js');
const main = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'processed');
    const {current , delinquent} = await connection.getVoteAccounts();
    console.log('Current Epoch:'+ current.concat(delinquent).length);
    console.log('Delinquent ' +
        'Epoch:'+ current.length);
    // console.log('validator',current[0]);
};

const runMain = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);

    }

}
runMain()