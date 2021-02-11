const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545');

const truffleAssert = require('truffle-assertions');
const { expect } = require('chai');

const TestTransferer = artifacts.require('TestTransferer');
const MockToken = artifacts.require('MockToken');
const ZERO = artifacts.require('ZERO');

const addr = [];
before(async() => {
    [
        addr.sender,
        addr.futureMinter,
    ] = await web3.eth.getAccounts();
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

it(`works with real token`, async () => {
    const token = await ZERO.new(addr.sender);
    const transferer = await TestTransferer.new(token.address, addr.futureMinter);
    await token.changeMinter(transferer.address);

    await truffleAssert.reverts(token.changeMinter(addr.sender))

    await truffleAssert.reverts(transferer.changeMinter());

    await sleep(4000);
    // we waited some time, but not enough
    await truffleAssert.reverts(transferer.changeMinter());

    await sleep(1000);

    // now it must work
    await transferer.changeMinter();

    truffleAssert.eventEmitted(
        await token.mint(addr.sender, 1000, { from: addr.futureMinter }),
        'Transfer'
    );
});

// it('works', async () => {
//     const token = await MockToken.new(addr.sender);
//     const transferer = await TestTransferer.new(token.address, addr.futureMinter);
//     await token.changeMinter(transferer.address);

//     await truffleAssert.reverts(token.changeMinter(addr.sender))

//     await truffleAssert.reverts(transferer.changeMinter());

//     await sleep(4000);
//     // we waited some time, but not enough
//     await truffleAssert.reverts(transferer.changeMinter());

//     await sleep(1000);

//     // now it must work
//     await transferer.changeMinter();

//     truffleAssert.eventEmitted(
//         await token.mint(addr.sender, 1000, { from: addr.futureMinter }),
//         'Minted'
//     );
// });
