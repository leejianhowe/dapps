const AdvancedStorage = artifacts.require("AdvancedStorage");

let advancedStorage
before(async () => {
  advancedStorage = await AdvancedStorage.deployed();
});

contract("AdvancedStorage", () => {
  it("should add element to storage", async () => {
    await advancedStorage.add(1);
    const result = await advancedStorage.ids(0);
    assert(result.toNumber() === 1);
  });
  it("should get element from storage", async () => {
    await advancedStorage.add(2);
    const result = await advancedStorage.get(0);
    expect(result.toNumber() === 2);
  });
  it("should get all elements from storage", async () => {
    const rawIds = await advancedStorage.getAll();
    const ids = rawIds.map((ele) => ele.toNumber());
    assert.deepEqual(ids, [1, 2]);
  });
  it("should get length of ids array", async () => {
    const len = await advancedStorage.getLength();
    assert(len.toNumber() == 2);
  });
});
