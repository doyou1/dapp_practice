
import Web3 from "web3";

const web3 = new Web3("http://127.0.0.1:8545/");
const abi = require("./Storage.json");
const contract = new web3.eth.Contract(abi, '0x9E18BBAd5e44c67422608133B37234abDC3a5F7C');

const App = () => {
  
  const onClick= (event) => {
    contract.methods.setNumber().send(123).then(console.log);
    contract.methods.getNumber().call().then(console.log);
  };

  return (
    <div className="App">
    
      <input type="button" value="버튼" onClick={onClick} />
  
    </div>
  );
}

export default App;
