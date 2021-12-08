const dapp1test = artifacts.require("dapp1");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("dapp1", function (/* accounts */) {
  it("should assert true", async function () {
    await dapp1test.deployed();
    return assert.isTrue(true);
  });
  it("functio helloWorld should return 'Hello world'", async function () {
    const contract = await dapp1test.deployed();
    assert(await contract.helloWorld() === 'Hello world')
  });
});
