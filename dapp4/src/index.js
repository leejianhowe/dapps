import Web3 from "web3";
import AdvancedStorage from "../build/contracts/AdvancedStorage.json";
// for async/await syntax to work work in browser es5
import regeneratorRuntime from "regenerator-runtime";

let web3;
let advancedStorage;
const initWeb3 = () => {
  return new Promise((res, rej) => {

    // legacy  no longer used
    // if(window.web3 !== undefined){
    //   return res(new Web3(window.web3.currentProvider))
    // }

    // new metamask
    if (window.ethereum !== undefined) {
      window.ethereum
        .enable()
        .then(() => {
          res(new Web3(window.ethereum));
        })
        .catch((e) => {
          rej(e);
        });
      return;
    }
    // connect to default account on truffle blockchain
    res(new Web3("http://localhost:9545/"));
  });
};
const initContract = async () => {
  const contractAbi = AdvancedStorage.abi;
  const networkId = await web3.eth.net.getId()
  const contractAddress = AdvancedStorage.networks[networkId].address;
  return new web3.eth.Contract(contractAbi, contractAddress);
};

const getData = async () => {
  const $data = document.getElementById("values");
  console.log($data);
  const values = await advancedStorage.methods.getAll().call();
  $data.innerHTML = values.join(',');
};

const initApp = async () => {
  const $addData = document.getElementById("submit");
  console.log($addData);
  $addData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = e.target["data"].value;
    console.log(value);
    console.log(web3);
    try {
      const accounts = await web3.eth.getAccounts();
      await advancedStorage.methods.add(value).send({ from: accounts[0] });
      getData()
      document.getElementById("data").value = null
    } catch (error) {
      console.error(error.message)
    }

  });
  getData()
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    web3 = await initWeb3();
    advancedStorage = await initContract();
    // console.log(await web3.eth.getChainId())
    web3.eth.getNew
    initApp();
  } catch (error) {
    console.error(error.message);
  }
});
