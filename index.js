const generateBtn = document.querySelector("#generate-btn");
const resetBtn = document.querySelector("#reset-btn");

let res = document.querySelector("#result");

const getRandomIntInclusive = (min, max) => {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  let randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(randomNumber * (max - min + 1)) + min;
};

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  res.innerHTML = "";
  let brackets = document.querySelectorAll(".brackets");
  brackets.forEach((b) => b.classList.add("gray"));
});

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  res.innerHTML = "";
  const resArray = [];
  let num = 0;
  const qtd = Number(document.querySelector("#qtd").value);
  const min = Number(document.querySelector("#min").value);
  const max = Number(document.querySelector("#max").value);
  const repeat = document.querySelector("#repeated").checked;

  max === 0 && (res.innerHTML = "Informe o valor máximo");
  qtd === 0 && (res.innerHTML = "Informe a qtd de valores");
  max < min && (res.innerHTML = "máx deve ser maior que mín");

  if (qtd != 0 && max != 0 && max > min) {
    repeat ? generateDuplicates() : generateUniques();

    function generateDuplicates() {
      while (resArray.length < qtd) {
        num = getRandomIntInclusive(min, max);
        resArray.push(num);
      }
    }

    function generateUniques() {
      while (resArray.length < qtd) {
        num = getRandomIntInclusive(min, max);
        let duplicated = resArray.find((e) => e === num);
        duplicated === undefined && resArray.push(num);
      }
    }
  }

  res.innerHTML = resArray;
  let brackets = document.querySelectorAll(".brackets");
  brackets.forEach((b) => b.classList.remove("gray"));

  console.log(resArray);
});
