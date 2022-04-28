/*TokenImages*/

import gesamterRoboter_img from "./assets/Roboter/Gesamter Roboter.png";
import Beine_img from "./assets/Roboter/Einzelteil_Beine.png";
import Arm_L_img from "./assets/Roboter/Einzelteil_LinkerArm.png";
import Arm_R_img from "./assets/Roboter/Einzelteil_RechterArm.png";
import Torso_img from "./assets/Roboter/Einzelteil_Torso.png";
import Kopf_img from "./assets/Roboter/Einzelteil_Kopf.png";

function TokenData() {
  var ContractAdressArray = [
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
  ];
  return ContractAdressArray;
}

export default TokenData();
