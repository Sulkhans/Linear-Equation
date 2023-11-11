const Create = () => {
  let n = document.getElementById("size").value;
  let container = document.getElementById("container");
  container.innerHTML = "";
  container.appendChild(document.createElement("h1")).textContent = "Matrix A";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let input = document.createElement("input");
      input.id = `a${[i]}${[j]}`;
      input.type = "number";
      container.appendChild(input);
    }
    container.appendChild(document.createElement("br"));
  }
  container.appendChild(document.createElement("h1")).textContent = "Vector b";
  for (let i = 0; i < n; i++) {
    let input = document.createElement("input");
    input.id = `b${[i]}`;
    input.type = "number";
    container.appendChild(input);
  }

  container.appendChild(document.createElement("h1")).textContent =
    "Iterations";
  let iterations = document.createElement("input");
  iterations.id = "iterations";
  iterations.type = "number";
  container.appendChild(iterations);

  container.appendChild(document.createElement("h1")).textContent = "Tolerance";
  let tolerance = document.createElement("input");
  tolerance.id = "tolerance";
  tolerance.type = "number";
  container.appendChild(tolerance);

  container.appendChild(document.createElement("br"));
  let button = document.createElement("button");
  button.textContent = "calculate";
  button.addEventListener("click", () => Calculate(n));
  container.appendChild(button);
};

const Calculate = (n) => {
  let A = [];
  let b = [];
  const x = [];
  const lastX = [];
  for (let i = 0; i < n; i++) {
    A[i] = [];
    for (let j = 0; j < n; j++) {
      A[i][j] = parseFloat(document.getElementById(`a${[i]}${[j]}`).value);
    }
    b[i] = parseFloat(document.getElementById(`b${[i]}`).value);
    x[i] = 0;
    lastX[i] = 0;
  }
  const tolerance = document.getElementById("tolerance").value;
  const iterations = document.getElementById("iterations").value;
  Jacobi(A, b, x, lastX, iterations, tolerance);
  Seidel(A, b, x, lastX, iterations, tolerance);
};

const A = [
  [6.72, -2.22, 1.48],
  [-0.12, 5.71, -1.31],
  [0.12, 1.23, -5.51],
];
const b = [2.05, 1.11, 1.01];
const x = [0, 0, 0];
const lastX = [0, 0, 0];
const iterations = 100;
const tolerance = 1e-10;

const Jacobi = (A, b, x, lastX, iterations, tolerance) => {
  const n = A.length;
  let k = 1;

  while (k <= iterations) {
    for (let i = 0; i < n; i++) {
      let sum = 0;

      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum += -A[i][j] * lastX[j];
        }
      }

      x[i] = (sum + b[i]) / A[i][i];
    }

    let norm = 0;
    for (let i = 0; i < n; i++) {
      norm += Math.pow(x[i] - lastX[i], 2);
    }
    norm = Math.sqrt(norm);
    if (norm < tolerance) {
      console.log(`${k} iterations done.`);
      break;
    }

    lastX = [...x];
    k++;
  }
  x.map((val, i) => console.log(`x${i + 1} = ${val}`));
};

const Seidel = (A, b, x, lastX, iterations, tolerance) => {
  const n = A.length;
  let k = 1;

  while (k <= iterations) {
    for (let i = 0; i < n; i++) {
      let sum1 = 0;
      let sum2 = 0;

      for (let j = 0; j < i; j++) {
        sum1 += A[i][j] * x[j];
      }
      for (let j = i + 1; j < n; j++) {
        sum2 += A[i][j] * lastX[j];
      }

      x[i] = (-sum1 - sum2 + b[i]) / A[i][i];
    }

    let norm = 0;
    for (let i = 0; i < n; i++) {
      norm += Math.pow(x[i] - lastX[i], 2);
    }
    norm = Math.sqrt(norm);
    if (norm < tolerance) {
      console.log(`${k} iterations done.`);
      break;
    }

    lastX = [...x];
    k++;
  }
  x.map((val, i) => console.log(`x${i + 1} = ${val}`));
};
