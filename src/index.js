import { drawLines } from './js/drawLines';
import { gltfImport } from './js/gltfImport';
import { tryOpenCV } from './js/tryOpenCV';
import cv from '../services/cv';
import './index.css';

const navElement = document.getElementById("top-nav");
const mainElement = document.getElementById("app-body");
const openCVappbody = document.getElementById("opencv-appbody");
const openCVBtn = document.getElementById("opencv-button");
openCVBtn.onclick = async () => await cv.load().then(()=>openCVBtn.disabled = true);

const handleClick = ( btnFunction ) => {
  if (mainElement.lastChild) {
    mainElement.removeChild(mainElement.lastChild)
  }
  openCVappbody.classList.add("hidden")
  btnFunction(mainElement);
}

const tests = [
  {
    name: "draw lines",
    function: ()=> handleClick(drawLines)
  },
  {
    name: "gltf import",
    function: () => handleClick(gltfImport)
  },
  {
    name: "opencv try",
    function: () => handleClick(tryOpenCV)
  }
]

tests.forEach(
  test => {
    const newBtn = document.createElement("button");
    newBtn.innerHTML = test.name;
    newBtn.onclick = test.function;
    navElement.appendChild(newBtn);
  }
);
