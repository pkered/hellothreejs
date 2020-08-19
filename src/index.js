import { drawLines } from './js/drawLines';
import { gltfImport } from './js/gltfImport';
const navElement = document.getElementById("top-nav");
const mainElement = document.getElementById("app-body");

const tests = [
  {
    name: "draw lines",
    function: ()=>drawLines(mainElement)
  },
  {
    name: "gltf import",
    function: ()=>gltfImport(mainElement)
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
