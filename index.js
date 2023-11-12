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
  iterations.value = "100";
  container.appendChild(iterations);

  container.appendChild(document.createElement("h1")).textContent = "Tolerance";
  let tolerance = document.createElement("input");
  tolerance.id = "tolerance";
  tolerance.value = "1e-10";
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
  document.getElementById("output").innerHTML = "";
  Jacobi(A, b, n, x, lastX, iterations, tolerance);
  document.getElementById("output").appendChild(document.createElement("br"));
  Seidel(A, b, n, x, lastX, iterations, tolerance);
};

const Jacobi = (A, b, n, x, lastX, iterations, tolerance) => {
  let output = document.getElementById("output");
  output.appendChild(document.createElement("h1")).textContent =
    "Jacobi iteration";

  let k = 1;
  let norm = 0;
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

    norm = 0;
    for (let i = 0; i < n; i++) {
      norm += Math.pow(x[i] - lastX[i], 2);
    }
    norm = Math.sqrt(norm);
    if (norm < tolerance) {
      let iter = document.createElement("p");
      iter.textContent = `${k} iterations done`;
      output.appendChild(iter);
      console.log(`${k} iterations done.`);
      break;
    }

    lastX = [...x];
    k++;
  }
  x.map((val, i) => console.log(`x${i + 1} = ${val}`));
  x.map((val, i) => {
    const p = document.createElement("p");
    p.textContent = `x${i + 1} = ${val}`;
    output.appendChild(p);
  });
  const e = document.createElement("p");
  e.textContent = `ε = ${norm}`;
  output.appendChild(e);
};

const Seidel = (A, b, n, x, lastX, iterations, tolerance) => {
  document
    .getElementById("output")
    .appendChild(document.createElement("h1")).textContent =
    "Gauss-Seidel iteration";

  let k = 1;
  let norm = 0;
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

    norm = 0;
    for (let i = 0; i < n; i++) {
      norm += Math.pow(x[i] - lastX[i], 2);
    }
    norm = Math.sqrt(norm);
    if (norm < tolerance) {
      let iter = document.createElement("p");
      iter.textContent = `${k} iterations done`;
      output.appendChild(iter);
      console.log(`${k} iterations done.`);
      break;
    }

    lastX = [...x];
    k++;
  }

  x.map((val, i) => console.log(`x${i + 1} = ${val}`));
  x.map((val, i) => {
    const p = document.createElement("p");
    p.textContent = `x${i + 1} = ${val}`;
    output.appendChild(p);
  });
  const e = document.createElement("p");
  e.textContent = `ε = ${norm}`;
  output.appendChild(e);
};
