import EinzelteilBeine from "./assets/Roboter/Einzelteil_Beine.png";
import EinzelteilKopf from "./assets/Roboter/Einzelteil_Kopf.png";
import EinzelteilTorso from "./assets/Roboter/Einzelteil_Torso.png";
import EinzelteilLinkerArm from "./assets/Roboter/Einzelteil_LinkerArm.png";
import EinzelteilRechterArm from "./assets/Roboter/Einzelteil_RechterArm.png";
import GesamterRoboter from "./assets/Roboter/Gesamter Roboter.png";

function TokenData() {
  var TokenData = [
    ["Einzelteil: Beine", "Contract Adress", EinzelteilBeine, "100"],
    ["Einzelteil: Kopf", "Contract Adress", EinzelteilKopf, "10"],
    ["Einzelteil: Torso", "Contract Adress", EinzelteilTorso, "25"],
    ["Einzelteil: LinkerArm", "Contract Adress", EinzelteilLinkerArm, "50"],
    ["Einzelteil: RechterArm", "Contract Adress", EinzelteilRechterArm, "50"],
    ["Gesamter Roboter", "Contract Adress", GesamterRoboter, "5"],
  ];
  return TokenData;
}

export default TokenData();
