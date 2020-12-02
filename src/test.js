const Web3 = require("web3");

let web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545/");
web3.eth.sendTransaction({from: "0xDA6C4962518C3b381103ca6FfF16C35bb7E633E3", data: "12345678"})
.once("sending", (payload) => {
    console.log("sending", payload)
})
.once("sent", (payload) => {
    console.log("sent",payload);
})
.once("transactionHash", (hash) => {
    console.log(hash);
})
.once("receipt", (receipt) => {
    console.log(receipt);
})
.on("confirmation", (confNumber, receipt, latestBlockHash) =>{
    console.log("confirmation", confNumber, receipt, latestBlockHash)
})
.on("error", (error) => {
    console.log("error", error);
})
.then((receipt) => {
    console.log("then", receipt);
});