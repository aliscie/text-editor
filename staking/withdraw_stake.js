const {
    Connection,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    StakeProgram,
    Authorized,
    Lockup, sendAndConfirmTransaction
} = require('@solana/web3.js');
const main = async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'processed');
    const wallet = Keypair.generate();
    const airDropSignature = await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL); // LAMPORTS_PER_SOL IS 1000000000
    await connection.confirmTransaction(airDropSignature);

    const stakeAccount = Keypair.generate();


    const balance = await connection.getBalance(stakeAccount.publicKey);
    console.log("balance: " + balance);
    console.log("space: " + StakeProgram.space);
    const minimumRent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space); // User can't stake less than this amount
    const amountUserWantsToStake = 0.5 * LAMPORTS_PER_SOL;
    const amountToStake = amountUserWantsToStake + minimumRent;
    const createStakeAccount = StakeProgram.createAccount({
        authorized: new Authorized(stakeAccount.publicKey, stakeAccount.publicKey), // new Authorized(who is allowed to stake, who is allowed to withdraw)
        fromPubkey: stakeAccount.publicKey, // who is creating the stake account, (who is paying for the transaction) ( or where the stake come from)
        lamports: amountToStake, // How much to stake
        lockup: new Lockup(0, 0, stakeAccount.publicKey), // new Lockup( unix timestamp, epoch, pubkey) , this is where we put the rules like when U can withdraw or the condition where u can't withdraw
        stakePubkey: stakeAccount.publicKey,
    });
    // console.log("stake account created: " + createStakeAccount);
    //
    const createStakeAccountTxId = await sendAndConfirmTransaction(connection,createStakeAccount, [wallet, stakeAccount]);
    console.log("stake account created (Tx, Id): " + createStakeAccountTxId);
    // let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
    // console.log("stake account balance: " + stakeBalance / LAMPORTS_PER_SOL);
    const stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log("stake account status: " + stakeStatus); //inactive
    const validator = await connection.getVoteAccounts();
    const selectedValidator = validator.current[0];
    const selectedValidatorPubkey = new PublicKey(selectedValidator.votePubkey);
    const delegateTx = StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey, // the stake account that we want to delegate
        authorizedPubkey: wallet.publicKey,  // the wallet that is allowed to delegate (me)
        votePubkey: selectedValidatorPubkey, // the validator that we want to delegate to
    });
    const delegateTxId = await sendAndConfirmTransaction(connection, delegateTx, [wallet, stakeAccount]);

    const stakeStatus_2 = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log("stake account status: " + stakeStatus_2); // activating

    /// -------------- deactivation is here. --------------
    const deactivateTx = StakeProgram.deactivate({
        stakePubkey: stakeAccount.publicKey, // the stake account that we want to deactivate
        authorizedPubkey: wallet.publicKey,  // the wallet that is allowed to deactivate (me)
    });
    console.log("deactivateTx: " + deactivateTx);

    const stakeStatus_3 = await connection.getStakeActivation(stakeAccount.publicKey);
    console.log("stake account status: " + stakeStatus_3); // deactivating

    let stakeBalance = await connection.getBalance(stakeAccount.publicKey);

    const widthdrawTx = StakeProgram.withdraw({
        authorizedPubkey: wallet.publicKey, // the wallet that is allowed to withdraw (me)
        stakePubkey: stakeAccount.publicKey, // the stake account that we want to withdraw from
        lamports: stakeBalance, // how much to withdraw
        toPubkey: wallet.publicKey, // where to send the withdrawn lamports
    });
    const withdrawTxId = await sendAndConfirmTransaction(connection, widthdrawTx, [wallet]);
    console.log("withdrawTxId: " + withdrawTxId);

};

const runMain = async () => {
    try {
        await main();
    } catch (e) {
        console.error(e);

    }
}
runMain()
