const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "helloWorld",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getData",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
const contractAddress = "0xA50B1A28814EDb1e427a24384a270922FA639E79";
const web3 = new Web3("http://localhost:9545/");
const dapp1Contract = new web3.eth.Contract(contractABI, contractAddress);
let networkId;
document.addEventListener("DOMContentLoaded", async () => {
  await (async function () {
    networkId = await web3.eth.net.getId();

    console.log(networkId);
  })();
  await setData();

  const form = document.getElementById("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e.target["data"].value);
    await updateDataChain(e.target["data"].value);
  });
});
async function updateDataChain(data) {
  try {
    const transaction = await dapp1Contract.methods
      .setData(data)
      .send({ from: "0x2BF8BA032c9Cce601Ad485EF0Ee648f996508Eb0" });
    console.log("success", transaction);
    await updateDataText();
  } catch (error) {
    console.error("error", error.message);
  }
}
async function updateDataText() {
  const initialData = await dapp1Contract.methods.getData().call();
  console.log("updating", initialData);
  document.getElementById("contract-data").innerHTML = initialData;
}

async function setData() {
  const accounts = await web3.eth.getAccounts();
  document.getElementById("address").innerHTML = accounts[0];
  let initialBalance = await web3.eth.getBalance(accounts[0]);
  initialBalance = web3.utils.fromWei(initialBalance);
  console.log("setting data");
  // const initialData = await dapp1Contract.methods.getData().call()
  // const transaction = await dapp1Contract.methods.setData("hello").send({from: "0x2BF8BA032c9Cce601Ad485EF0Ee648f996508Eb0" })
  // const finalData = await dapp1Contract.methods.getData().call()
  // console.log("initialData",initialData)
  // console.log("transaction",transaction)
  // console.log("finalData",finalData)
  await updateDataText();
  let finalBalance = await web3.eth.getBalance(accounts[0]);
  finalBalance = web3.utils.fromWei(finalBalance);
  document.getElementById("balance").innerHTML = finalBalance + " ETH";
  console.log(finalBalance, initialBalance);
}

handleClick = () => {
  dapp1Contract.methods
    .helloWorld()
    .call()
    .then((res) => {
      console.log(res);
      document.getElementById("text").innerHTML = res;
    });
};
