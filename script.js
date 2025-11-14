<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ruleta Perfecta</title>
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #111;
      color: #fff;
      font-family: Arial, sans-serif;
    }

    #coins {
      font-size: 26px;
      margin-bottom: 20px;
      font-weight: bold;
    }

    #pointer {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 30px solid red;
      margin-bottom: 10px;
    }

    #wheel {
      width: 320px;
      height: 320px;
      border-radius: 50%;
      border: 8px solid white;
      position: relative;
      overflow: hidden;
      transition: transform 4s cubic-bezier(0.33, 1, 0.68, 1);
    }

    .slice {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform-origin: 0% 0%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
      color: white;
    }

    button {
      margin-top: 30px;
      padding: 16px 32px;
      font-size: 22px;
      background: #e60000;
      border: none;
      color: #fff;
      cursor: pointer;
      border-radius: 10px;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <div id="coins">Monedas: 100</div>
  <div id="pointer"></div>
  <div id="wheel"></div>
  <button onclick="spinWheel()">Girar</button>

  <script>
    let coins = 100;
    const coinDisplay = document.getElementById("coins");
    const wheel = document.getElementById("wheel");

    const results = [
      { text: "x4", color: "green", weight: 10 },
      { text: "x3", color: "green", weight: 15 },
      { text: "x2", color: "green", weight: 20 },
      { text: "÷4", color: "red", weight: 55 }
    ];

    const slices = results.length;

    for (let i = 0; i < slices; i++) {
      const slice = document.createElement("div");
      slice.className = "slice";
      slice.style.background = results[i].color;
      slice.style.transform = `rotate(${(360 / slices) * i}deg) translate(0, -100%) skewY(${90 - 360 / slices}deg)`;
      slice.innerHTML = results[i].text;
      wheel.appendChild(slice);
    }

    function chooseWeighted() {
      let total = results.reduce((acc, r) => acc + r.weight, 0);
      let rand = Math.random() * total;
      for (let r of results) {
        if (rand < r.weight) return r;
        rand -= r.weight;
      }
    }

    function spinWheel() {
      const selected = chooseWeighted();
      const index = results.indexOf(selected);
      const degrees = (360 / slices) * index + 360 * 5;
      wheel.style.transform = `rotate(${degrees}deg)`;

      setTimeout(() => {
        if (selected.text.startsWith("x")) {
          const mult = parseInt(selected.text.replace("x", ""));
          coins *= mult;
        } else {
          coins = Math.floor(coins / 4);
        }
        coinDisplay.textContent = "Monedas: " + coins;
      }, 4000);
    }
  </script>

</body>
</html>
