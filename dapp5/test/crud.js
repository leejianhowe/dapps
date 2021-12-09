const { assert } = require("console");

const Crud = artifacts.require("Crud");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
let crudContract
before(async ()=>{
  crudContract = await Crud.deployed();
})
contract("Crud", function (/* accounts */) {
  it('add user', async () => {
    await crudContract.create('john')
    
    const result = await crudContract.nextId()
    const newUser = await crudContract.users(0)
    // check if nextid has increased
    assert(result.toNumber() === 2)
    // check if id is 1 and name is john
    assert(newUser.id.toNumber() === 1)
    assert(newUser.name === 'john')
  })

  it('read user', async ()=> {
    const result = await crudContract.read(1)
    // check if id is one and name is john
    assert(result[0].toNumber() === 1)
    assert(result[1] === 'john')
  })

  it('update user', async ()=>{
    await crudContract.update(1, 'mary');
    // console.log(await crudContract.users(0))
    // check if updated is mary
    const result = await crudContract.read(1)
    // console.log(result)
    assert(result[1] === 'mary')
  })
  it('remove user',async () => {
    await crudContract.create('tom');
    await crudContract.create('jane');
    await crudContract.remove(2);
    try {
      // read 2nd id
      await crudContract.read(2);
    } catch (error) {
      assert(error.message = 'User not found')
    }
    try {
      // read 0th id out of range
      await crudContract.read(0);
    } catch (error) {
      assert(error.message = 'User not found')
    }
  })
});
