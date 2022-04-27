import "./App.css";
import { useState, useEffect } from "react";
import Token_Card from "./components/Token_Card";
import TokenData from "./TokenData";

/*Images*/
import MetaMask from "./assets/MetaMask.png";
import Flint from "./assets/Flint.png";

/*TokenImages*/

import gesamterRoboter_img from "./assets/Roboter/Gesamter Roboter.png";
import Beine_img from "./assets/Roboter/Einzelteil_Beine.png";
import Arm_L_img from "./assets/Roboter/Einzelteil_LinkerArm.png";
import Arm_R_img from "./assets/Roboter/Einzelteil_RechterArm.png";
import Torso_img from "./assets/Roboter/Einzelteil_Torso.png";
import Kopf_img from "./assets/Roboter/Einzelteil_Kopf.png";

import response from "./Token_Owner";
import Token_Owner from "./Token_Owner";

function App() {
  /*Token Holdings */
  const [userHolding, setuserHolding] = useState([]);
  const axios = require("axios");

  const responseF = async () => {
    const publicAdressString = publicAdress.toString();
    const response = await axios.get(
      "https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=" +
        publicAdressString +
        "&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken"
    );

    const txs = response.data.result;
    console.log("Über API erhalten" + txs.length);
    let adress = publicAdressString;

    let buys = txs.filter((tx) => {
      return tx.to == adress;
    });
    console.log("Alle Käufe:" + buys.length + buys);

    let sells = txs.filter((tx) => tx.from == adress);
    console.log("Alle Verkäufe:" + sells.length + sells);

    const ownedUser = buys.filter((buy) => {
      return !sells.some((sell) => {
        return (
          buy.tokenID == sell.tokenID &&
          buy.contractAddress == sell.contractAddress
        );
      });
    });
    console.log("Im Besitz:" + ownedUser.length + ownedUser);
    setuserHolding(ownedUser);
    console.log(ownedUser);
  };

  const [ContractAdressArray, setContractAdressArray] = useState([
    [
      "Gesamter Roboter",
      "0x759a89882c4194fff77dc52d6124081387ad69a9",
      gesamterRoboter_img,
      "1",
    ],
    ["Beine", "0x573eea7bd5fb95296e22513341cb3be1eaeece0b", Beine_img, "1"],
    ["Arm_L", "0xd35c0efca55dcb1b9f858d3ac259c5960210502b", Arm_L_img, "1"],
    ["Arm_R", "0x471886887f7269b831cd23fe2966b8cddc7ed8fc", Arm_R_img, "1"],
    ["Torso", "0x57a3cbf186fbef36298705fde09f44c8aacd02b1", Torso_img, "1"],
    ["Kopf", "0x7a6b98e5afd2ef6fa51048ba5a7299ffc18cabf0", Kopf_img, "1"],
  ]);
  const [gesRobotcheck, setgesRobotcheck] = useState(false);

  function userHoldingsf() {
    return userHolding.map((NFT) => {
      //check if gesater Roboter in Besitz
      if (
        NFT.contractAddress === ContractAdressArray[0][1] &&
        NFT.tokenID === ContractAdressArray[0][3]
      ) {
        return (
          <Token_Card
            Title={NFT.tokenName}
            Anzahl={"1"}
            img={gesamterRoboter_img}
          />
        );
      }

      //check if Beine in Besitz
      if (
        NFT.contractAddress === ContractAdressArray[1][1] &&
        NFT.tokenID === ContractAdressArray[1][3]
      ) {
        return (
          <Token_Card Title={NFT.tokenName} Anzahl={"1"} img={Beine_img} />
        );
      }

      //check if Linker Arm in Besitz
      if (
        NFT.contractAddress === ContractAdressArray[2][1] &&
        NFT.tokenID === ContractAdressArray[2][3]
      ) {
        return (
          <Token_Card Title={NFT.tokenName} Anzahl={"1"} img={Arm_L_img} />
        );
      }

      //check if Rechter Arm in Besitz
      if (
        NFT.contractAddress === ContractAdressArray[3][1] &&
        NFT.tokenID === ContractAdressArray[3][3]
      ) {
        return (
          <Token_Card Title={NFT.tokenName} Anzahl={"1"} img={Arm_R_img} />
        );
      }
      //check if Torso in Besitz
      if (
        NFT.contractAddress === ContractAdressArray[4][1] &&
        NFT.tokenID === ContractAdressArray[4][3]
      ) {
        return (
          <Token_Card Title={NFT.tokenName} Anzahl={"1"} img={Torso_img} />
        );
      }

      //check if Kopf in Besitz
      if (
        NFT.contractAddress === ContractAdressArray[5][1] &&
        NFT.tokenID === ContractAdressArray[5][3]
      ) {
        return <Token_Card Title={NFT.tokenName} Anzahl={"1"} img={Kopf_img} />;
      }
    });
  }

  /* Ethereum Data */

  const [currentNetwork, setcurrentNetwork] = useState("Please Connect");
  const [currentgasPrice, setcurrentgasPrice] = useState("Please Connect");
  const [currentBlock, setcurrentBlock] = useState("Please Connect");

  /* User Data */
  const [MMStatus, setMMStatus] = useState("Please install MetaMask");
  const [publicAdress, setpublicAdress] = useState("Please Connect");
  const [currentBalance, setcurrentBalance] = useState("Please Connect");

  useEffect(() => {
    getEthereumData();
    document.title = "Prototyp: 1.0";
  }, []);
  /*   Getter Ethereum Data   */
  function getEthereumData() {
    /* Connect Account */
    function connectToMM() {
      const promise = window.ethereum.request({
        method: "eth_requestAccounts",
      });
      promise.then(function (result) {});
    }
    /*   GET currentChain  */
    function setcurrentchain() {
      const promise = window.ethereum.request({ method: "eth_chainId" });
      promise.then(function (result) {
        setcurrentNetwork(result);
      });
    }
    /*   GET Ropsten?  */

    /*   GET gasPrice  */
    function showGasPrice() {
      const promise = window.ethereum.request({ method: "eth_gasPrice" });
      promise.then(function (result) {
        setcurrentgasPrice(parseInt(result, 16));
      });
    }
    setcurrentchain();
    showGasPrice();
  }
  /*   Getter User Data      */
  function getUserData() {
    /*   Is MetaMask installed ?  */
    function testMMinstall() {
      if (typeof window.ethereum !== "undefined") {
        setMMStatus("MetaMask ist installiert");
      }
    }
    function getUserMMacsess() {
      window.ethereum.request({ method: "eth_requestAccounts" });
    }

    /*   Get public Adress   */
    function setPubAdress() {
      const promise = window.ethereum.request({ method: "eth_accounts" });
      promise.then(function (result) {
        setpublicAdress(result);
        showBalance(result);
      });
    }

    /*   Get Balances   */
    function showBalance(publicAdress) {
      const promise = window.ethereum.request({
        method: "eth_getBalance",
        params: [publicAdress.toString(), "latest"],
      });
      promise.then(function (result) {
        const IntBalance = parseInt(result, 16);
        const ETHBalance = IntBalance * 1e-18;

        setcurrentBalance(ETHBalance);
      });
    }
    getUserMMacsess();
    testMMinstall();
    setPubAdress();
  }

  function setallUserBalance(publicAdress) {
    const promise = window.ethereum.request({
      method: "eth_getBalance",
      params: [publicAdress.toString(), "latest"],
    });
    promise.then(function (result) {
      const IntBalance = parseInt(result, 16);
      const ETHBalance = IntBalance * 1e-18;
      return { ETHBalance };
    });
  }
  return (
    <div className="App">
      <div id="Prototyp_Wrapper">
        <div id="Header">
          <img src={Flint} id="Flint" />
          <h2 id="Header_h2">Welcome to Flint Prototyp</h2>

          <div id="Header_LogIn_Bereich">
            <div id="MetaMaskLogIn">
              <img src={MetaMask} id="MetaMask" onClick={() => getUserData()} />
            </div>
          </div>
        </div>
        <h1 id="Green_Heading">Verfügbare Token </h1>
        <div id="Token_Show_Room">
          <div id="Token_Row">
            {TokenData.map((TokenCard) => (
              <Token_Card
                img={TokenCard[2]}
                Title={TokenCard[0]}
                Anzahl={TokenCard[3]}
              />
            ))}
          </div>
        </div>
        <h1 id="Green_Heading">Infos aus LogIn </h1>
        <div id="Log_In_Info_Wrapper">
          <div id="Log_In_Info_User">
            <div id="Info_Row">
              <div id="Row_1">MetaMask:</div> {MMStatus}
            </div>
            <div id="Info_Row">
              <div id="Row_1">Current Adress: </div> {publicAdress}
            </div>
            <div id="Info_Row">
              <div id="Row_1">Current Balance:</div> {currentBalance}
            </div>
          </div>
          <div id="Log_In_Info_Netzwerk">
            <div id="Info_Row">
              <div id="Row_1">Current Netzwerk: </div> {currentNetwork}
            </div>
            <div id="Info_Row">
              <div id="Row_1">Current GasPrice:</div> {currentgasPrice}
            </div>
            <div id="Info_Row">
              <div id="Row_1">Current Block:</div> {currentBlock}
            </div>
          </div>
        </div>

        <h1 id="Green_Heading">User Holdings </h1>
        <div id="User_Show_Room">
          <div
            id="CheckUserBalance"
            onClick={() => {
              responseF();
            }}
          >
            Check
          </div>

          <div id="User_Token_Card_Room">{userHoldingsf()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
