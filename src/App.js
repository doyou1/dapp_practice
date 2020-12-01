import Web3 from "web3";
import React, {useState, } from "react";


const web3 = new Web3("http://127.0.0.1:8545/");
//const abi = require("./Storage.json");
const abi = require("./MusicCloud.json");
//const bytecode = require("./Storage_bytecode.json").object;
const bytecode = require("./MusicCloud_bytecode.json").object;
const contract = new web3.eth.Contract(abi, '0x9E18BBAd5e44c67422608133B37234abDC3a5F7C');

contract.options.gasPrice = '1000000000';
contract.options.gas = 100000;

contract.deploy({
  data: bytecode,
  arguments: [100000]
});

const App = () => {

  const [test, setTest] = useState([]);

  web3.eth.getAccounts().then((data) => {
    setTest(JSON.stringify(data));
  });

  function mint(){
    contract
    .methods
    .mint(
      "0x0F5E389Fb28cDeAe3D2cBEFc880B5E4cAF47B4A5"
      , 10000)
    .send({
        from:      "0x0F5E389Fb28cDeAe3D2cBEFc880B5E4cAF47B4A5"
      })
    .then((result) => {
      console.log(result);
    });
  }

  function balanceOf(){
    contract
    .methods
    .balanceOf(
      "0xDA6C4962518C3b381103ca6FfF16C35bb7E633E3"
    )
    .send({
        from:      "0xDA6C4962518C3b381103ca6FfF16C35bb7E633E3"
        , gas: 470000
    })
    .then((result) => {
       console.log(result);
      // 그래서 트랜잭션 해쉬값으로 뭘...
      console.log(web3.utils.hexToAscii(web3.utils.toHex(result.transactionHash)));
      console.log(typeof(result.transactionHash));
//      console.log(web3.utils.hexToString(result.transactionHash));      
    });
  }

  function toHex(s) {
    let h = ''
    for (let i = s.length - 1; i >= 0; i--)
        h = '%'+ s.charCodeAt(i).toString(16) + h
    return h
  }
  function totalSupply(){ 

    contract
    .methods
    .totalSupply()
    .send({
        from:      "0xDA6C4962518C3b381103ca6FfF16C35bb7E633E3"
        , gas: 470000
    })
    .then((result) => {
      console.log(result);
      console.log(web3.utils.hexToString(result.transactionHash));
    });

  }
  const onClick= (event) => {
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
      <div id="abc">

      </div>
    </div>
  );
}

export default App;
