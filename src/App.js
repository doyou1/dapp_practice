import Web3 from "web3";
import React, {useState, useEffect, } from "react";

let web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545/");
const abi = require("./MusicCloud.json");
const contractAddress = "0x09159090C2213973EE491EcAAE08F9615c539860";

const contract = new web3.eth.Contract(abi, contractAddress);

contract.defaultAccount = "0xDA6C4962518C3b381103ca6FfF16C35bb7E633E3";

const App = () => {  
  const [balance, setBalance] = useState("");

  //사용자가 사용중이라고 브라우저가 인식화는 계정
  let userAccount;

  let checkAccountChange = setInterval(async () => {
    // 계정이 바뀌었는지 확인
    let currentAccount = await web3.eth.getAccounts().then((array)=>{
      return array[0];
    });
    // 현재 유저가 들고 있는 계정이 브라우저가 인식하는 계정과 다르다면
    if(currentAccount !== userAccount){
      // 계정을 업데이트 해줌
      userAccount = currentAccount;
      console.log("Your Account : ", userAccount);
    }
  
  }, 1000); // 1초마다 계정 확인
  const [resultValue, setResultValue] = useState(null);  
  
  const ele_result = document.getElementById("result");

  async function mint(){
    let mint_value = Number(document.getElementById("mint_value").value);
    
    if(mint_value === 0){
      console.log("적절한값입력");
      return false;
    }

    await contract
    .methods
    .mint(
        userAccount
      , mint_value)
    .send({
      from: userAccount
    })
    .then((result) => {
      console.log(result);
    });
    //balance 자동갱신
    balanceOf();
  }

  async function balanceOf(){
    const record = 
    await contract
    .methods
    .balanceOf(
      userAccount
    )
    .call();
    setBalance(record);
    return record;
  }

  function totalSupply(){ 
    const record = contract
    .methods
    .totalSupply()
    .call();
    console.log(record);
  }

  const onClick = (event) => {
    event.preventDefault();
    const whatDo = event.target.value;
    if(whatDo == 'mint'){
      mint();
    }else if(whatDo == 'balanceOf'){
      balanceOf();
    }else if(whatDo == "totalSupply"){
      totalSupply();
    }

    /*
    contract
    .methods
    .setNumber(123)
    .send({from:"0x0F5E389Fb28cDeAe3D2cBEFc880B5E4cAF47B4A5"})
    .then((result) => {
      console.log(result)
    });
    */
    /*
    contract
    .methods
    .getNumber()
    .call({from:"0xDA6C4962518C3b381103ca6FfF16C35bb7E633E3"})
    .then((result) => {
      console.log(result);
    });
    */
//    console.log(contract.options.address);
  };


  return (
    <div className="App">
      <table>
        <tr>
          <td>
            <input type="text" id="mint_value" />
          </td>
          <td>
            <input type="button" value="mint" onClick={onClick} />
          </td>
        </tr>
        <tr>
          <td>
            <span>{balance}</span>
          </td>
          <td>
            <input type="button" value="balanceOf" onClick={onClick} />
          </td>
        </tr>
        <tr>
          <td>

          </td>
          <td>
            <input type="button" value="transfer" onClick={onClick} />
          </td>
        </tr>
        <tr>
          <td>

          </td>
          <td>
           <input type="button" value="totalSupply" onClick={onClick} />
          </td>
        </tr>
        <tr>
          <td>

          </td>
          <td>
          <input type="button" value="burn" onClick={onClick} />
          </td>
        </tr>
      </table>
      <div id="result">
        {resultValue}
      </div>
    </div>
  );
}

export default App;
