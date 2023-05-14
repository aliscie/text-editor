// to deligate stake is to allow a trusted person (validator) to confirm a transaction
// if a validator write accurate transactions then he and me will get a reward

const {
    Connection,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    StakeProgram,
    Authorized,
    Lockup, sendAndConfirmTransaction, PublicKey
} = require('@solana/web3.js');
const main = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'processed');
    const stakeProgramId = "Stake11111111111111111111111111111111111111"; // https://docs.solana.com/developing/runtime-facilities/programs#stake-program
    const STAKE0_PROGRAM_ID = new PublicKey(stakeProgramId);
    const selectedValidatorPubkey = "4RozokYDJBtX2DwCw8kXknVRMSL17jno1VECGDZqe32R"; // you can get that new PublicKey(selectedValidator.votePubkey); after calling await connection.getVoteAccounts().votePubkey
    // selectedValidatorPubkey is   VOTE_PUB_KEY

    const accounts = await connection.getProgramAccounts(STAKE0_PROGRAM_ID,{
        filters: [
            {dataSize:200},
            {memcmp: {offset: 124, bytes: selectedValidatorPubkey}}
        ]
    });
    console.log(accounts.length);
    if (accounts.length > 0) {
        console.log(accounts[0]);
    }

};

const runMain = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);

    }

}
runMain()
