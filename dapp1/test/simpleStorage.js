const SimpleStorage = artifacts.require("SimpleStorage");
let simpleStorage;
before(async () => {
  simpleStorage = await SimpleStorage.deployed();
});

contract("test simple storage",()=>{
  it('set data in storage',async ()=>{
    await simpleStorage.setData('Hello world')
    assert('Hello world' === await simpleStorage.data())
  })
  it('get data in storage', async ()=>{
    const result = await simpleStorage.getData()
    assert(result === 'Hello world')
  })
})
