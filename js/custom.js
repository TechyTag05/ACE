/* jQuery Pre loader
  -----------------------------------------------*/
$(window).load(function () {
  $(".preloader").fadeOut(5000); // set duration in brackets
});

/* Mobile Navigation
    -----------------------------------------------*/
$(window).scroll(function () {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(document).ready(function () {
  /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
  $(".navbar-collapse a").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  /* Parallax section
    -----------------------------------------------*/
  function initParallax() {
    $("#intro").parallax("100%", 0.1);
    $("#overview").parallax("100%", 0.3);
    $("#detail").parallax("100%", 0.2);
    $("#video").parallax("100%", 0.3);
    $("#speakers").parallax("100%", 0.1);
    $("#program").parallax("100%", 0.2);
    $("#register").parallax("100%", 0.1);
    $("#faq").parallax("100%", 0.3);
    $("#venue").parallax("100%", 0.1);
    $("#sponsors").parallax("100%", 0.3);
    $("#contact").parallax("100%", 0.2);
  }
  initParallax();

  /* Owl Carousel
  -----------------------------------------------*/
  $(document).ready(function () {
    $("#owl-speakers").owlCarousel({
      autoPlay: 6000,
      items: 4,
      itemsDesktop: [1199, 2],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      itemsTabletSmall: [985, 2],
      itemsMobile: [479, 1],
    });
  });

  /* Back top
  -----------------------------------------------*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".go-top").fadeIn(200);
    } else {
      $(".go-top").fadeOut(200);
    }
  });
  // Animate the scroll to top
  $(".go-top").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  /* wow
  -------------------------------*/
  new WOW({ mobile: false }).init();
});

// paint cal

// function showForm(formId) {
//   const forms = document.querySelectorAll(".form-content");
//   forms.forEach((form) => form.classList.remove("active"));
//   document.getElementById(formId).classList.add("active");
// }
function showForm(id) {
  if (id === "wft") {
    resetPaint();
    resetConsumption();
    resetPsychrometric();
  } else if (id === "paint") {
    reset();
    resetConsumption();
    resetPsychrometric();
  } else if (id === "consumption") {
    reset();
    resetPaint();
    resetPsychrometric();
  } else if (id === "psychrometric") {
    reset();
    resetPaint();
    resetConsumption();
  }
  document.querySelectorAll(".form-content").forEach((form) => {
    form.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  const buttons = ["btn1", "btn2", "btn3", "btn4"];
  const activeMap = {
    wft: "btn1",
    paint: "btn2",
    consumption: "btn3",
    psychrometric: "btn4",
  };

  buttons.forEach((btn) => {
    const element = document.getElementById(btn);
    element?.classList?.toggle("mystyle", btn === activeMap[id]);
  });
}

function wftCaculator() {
  const dft =
    parseFloat(
      document.querySelectorAll("#wft input[type='number']")[0].value
    ) || 0;
  const solidVolume =
    parseFloat(
      document.querySelectorAll("#wft input[type='number']")[1].value
    ) || 0;
  if (solidVolume >= 100) {
    setTimeout(() => {
      document.getElementById("solidError").innerText = "";
    }, 2000);
    document.getElementById("solidError").style.color = "#dc3545";
    return (document.getElementById("solidError").innerText =
      "Solid Volume cannot exceed 100%");
  }
  const thinner =
    parseFloat(
      document.querySelectorAll("#wft input[type='number']")[2].value
    ) || 0;

  if (!dft || !solidVolume) {
    const inputs = document.querySelectorAll("#wft input[type='number']");

    inputs.forEach((input, index) => {
      if (index <= 1) {
        input.style.border = "2px solid #dc3545";
        input.style.borderRadius = "2px";
      }
    });

    setTimeout(() => {
      inputs.forEach((input, index) => {
        if (index <= 1) {
          input.style.border = "1px solid #000";
          input.style.borderRadius = "2px";
        }
      });
    }, 3000);
    return;
  }

  const wft = (dft * (100 + thinner)) / solidVolume;

  document.getElementById("wftOutput").value = wft ? Math.round(wft) : "";
}

function reset() {
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.value = "";
  });
  document.getElementById("wftOutput").value = "";
}

//paint coverage calculation

function paintCoverageCalculator() {
  const dft =
    parseFloat(
      document.querySelectorAll("#paint input[type='number']")[0].value
    ) || 0;
  const solidVolume =
    parseFloat(
      document.querySelectorAll("#paint input[type='number']")[1].value
    ) || 0;
  if (solidVolume >= 100) {
    setTimeout(() => {
      document.getElementById("paintSolidError").innerText = "";
    }, 2000);
    document.getElementById("paintSolidError").style.color = "#dc3545";
    return (document.getElementById("paintSolidError").innerText =
      "Solid Volume cannot exceed 100%");
  }
  const loss =
    parseFloat(
      document.querySelectorAll("#paint input[type='number']")[2].value
    ) || 0;

  if (!dft || !solidVolume || !loss) {
    const inputs = document.querySelectorAll("#paint input[type='number']");

    inputs.forEach((input, index) => {
      if (index <= 2) {
        input.style.border = "2px solid #dc3545";
        input.style.borderRadius = "2px";
      }
    });

    setTimeout(() => {
      inputs.forEach((input, index) => {
        if (index <= 2) {
          input.style.border = "1px solid #000";
          input.style.borderRadius = "2px";
        }
      });
    }, 3000);
    return;
  }

  const theoritical = (Number(solidVolume || 0) * 10) / dft;
  const practical =
    Number(theoritical || 0) - (Number(theoritical || 0) * loss) / dft;

  document.getElementById("paintOutput").value = theoritical
    ? `${Math.round(theoritical)} sq.m./liter`
    : "";
  document.getElementById("paint2Output").value = practical
    ? `${Math.round(practical)} sq.m./liter`
    : "";
}

function resetPaint() {
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.value = "";
  });
  document.getElementById("paintOutput").value = "";
  document.getElementById("paint2Output").value = "";
}

// paint consumption calculation

function paintConsumptionCalculator() {
  const surfaceArea =
    parseFloat(
      document.querySelectorAll("#consumption input[type='number']")[0].value
    ) || 0;
  const dft =
    parseFloat(
      document.querySelectorAll("#consumption input[type='number']")[1].value
    ) || 0;
  const solidVolume =
    parseFloat(
      document.querySelectorAll("#consumption input[type='number']")[2].value
    ) || 0;
  if (solidVolume >= 100) {
    setTimeout(() => {
      document.getElementById("paint2SolidError").innerText = "";
    }, 2000);
    document.getElementById("paint2SolidError").style.color = "#dc3545";
    return (document.getElementById("paint2SolidError").innerText =
      "Solid Volume cannot exceed 100%");
  }
  const loss =
    parseFloat(
      document.querySelectorAll("#consumption input[type='number']")[3].value
    ) || 0;

  if (!surfaceArea || !dft || !solidVolume || !loss) {
    const inputs = document.querySelectorAll(
      "#consumption input[type='number']"
    );

    inputs.forEach((input, index) => {
      if (index <= 3) {
        input.style.border = "2px solid #dc3545";
        input.style.borderRadius = "2px";
      }
    });

    setTimeout(() => {
      inputs.forEach((input, index) => {
        if (index <= 3) {
          input.style.border = "1px solid #000";
          input.style.borderRadius = "2px";
        }
      });
    }, 3000);
    return;
  }

  const theoritical = (Number(solidVolume || 0) * 10) / dft;
  const practical =
    Number(theoritical || 0) - (Number(theoritical || 0) * loss) / dft;

  const paintConsumption = Number(surfaceArea || 0) / Number(practical || 0);

  document.getElementById("consumptionOutput").value = theoritical
    ? `${Math.round(paintConsumption)} liters`
    : "";
}

function resetConsumption() {
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.value = "";
  });
  document.getElementById("consumptionOutput").value = "";
}

// pyschrometric calculator

// --- Constants ---
const R_da = 287.05; // J/kgK gas constant dry air
const omega = 0.62198; // molecular mass ratio

// --- Pressure from altitude (ISA model) ---
function pressureFromAltitude(alt) {
  const T0 = 288.15,
    P0 = 101325,
    L = 0.0065,
    g = 9.80665,
    R = 287.05;
  return P0 * Math.pow(1 - (L * alt) / T0, g / (R * L));
}

// --- Saturation vapor pressure (Buck equation) ---
function esat(Tc) {
  return 611.21 * Math.exp((18.678 - Tc / 234.5) * (Tc / (257.14 + Tc)));
}

// --- Humidity ratio from vapor pressure ---
function W_from_e(e, P) {
  return (omega * e) / (P - e);
}

// --- Dew point from vapor pressure (Newton iteration) ---
function Tdp_from_e(e) {
  let T = 20; // better initial guess
  for (let i = 0; i < 30; i++) {
    const f = esat(T) - e;
    const df = (esat(T + 0.01) - esat(T)) / 0.01;
    T -= f / df;
    if (Math.abs(f) < 1e-3) break;
  }
  return T;
}

// --- Main compute function ---
function compute({ Tdb, Twb, RH, Tdp, alt }) {
  const P = pressureFromAltitude(alt);
  let e;

  if (!isNaN(Tdp)) {
    e = esat(Tdp);
  } else if (!isNaN(RH)) {
    e = (RH / 100) * esat(Tdb);
  } else if (!isNaN(Twb)) {
    const es_wb = esat(Twb);
    const gamma = 0.00066 * (1 + 0.00115 * Twb);
    e = es_wb - gamma * P * (Tdb - Twb);
  } else {
    throw new Error("Provide RH, Twb, or Tdp");
  }

  const es_db = esat(Tdb);
  const W = W_from_e(e, P);
  const RH_calc = (e / es_db) * 100;
  const Tdp_calc = Tdp || Tdp_from_e(e);

  // Enthalpy (kJ/kg dry air) — ASHRAE approximation
  const h = 1.005 * Tdb + W * (2500 + 1.88 * Tdb);

  // Specific volume (m³/kg dry air)
  const v = (R_da * (Tdb + 273.15) * (1 + 1.6078 * W)) / P;
  const rho = 1 / v;

  return {
    Tdb,
    Twb,
    RH: RH_calc,
    Tdp: Tdp_calc,
    P,
    e,
    es: es_db,
    W,
    h,
    v,
    rho,
  };
}

// --- Hook into your form ---
function psychrometricCalculator() {
  const Tdb = parseFloat(document.getElementById("Tdb").value);
  const Twb = parseFloat(document.getElementById("Twb").value);
  const RH = parseFloat(document.getElementById("RH").value);
  const Tdp = parseFloat(document.getElementById("Tdp").value);
  const alt = parseFloat(document.getElementById("alt").value) || 0;

  if (isNaN(Tdb)) {
    document.getElementById("out").textContent = "Enter Dry bulb temperature.";
    return;
  }

  try {
    const r = compute({ Tdb, Twb, RH, Tdp, alt });
    //     document.getElementById("out").textContent = `Dry bulb: ${r.Tdb.toFixed(
    //       1
    //     )} °C
    // Wet bulb: ${isNaN(Twb) ? "calculated" : Twb.toFixed(1)} °C
    // RH: ${r.RH.toFixed(1)} %
    // Dew point: ${r.Tdp.toFixed(1)} °C

    // Pressure: ${r.P.toFixed(0)} Pa
    // Vapor pressure: ${r.e.toFixed(1)} Pa
    // Humidity ratio W: ${r.W.toFixed(5)} kg/kg dry air
    // Enthalpy h: ${r.h.toFixed(2)} kJ/kg dry air
    // Specific volume: ${r.v.toFixed(4)} m³/kg dry air
    // Density: ${r.rho.toFixed(4)} kg/m³`;
    document.getElementById("out").innerHTML = `
  <table class="results-table">
    <tr><th>Property</th><th>Value</th></tr>
    <tr><td>Dry bulb</td><td>${r.Tdb.toFixed(1)} °C</td></tr>
    <tr><td>Wet bulb</td><td>${
      isNaN(Twb) ? "calculated" : Twb.toFixed(1)
    } °C</td></tr>
    <tr><td>Relative Humidity</td><td>${r.RH.toFixed(1)} %</td></tr>
    <tr><td>Dew point</td><td>${r.Tdp.toFixed(1)} °C</td></tr>
    <tr><td>Pressure</td><td>${r.P.toFixed(0)} Pa</td></tr>
    <tr><td>Vapor pressure</td><td>${r.e.toFixed(1)} Pa</td></tr>
    <tr><td>Humidity ratio W</td><td>${r.W.toFixed(5)} kg/kg dry air</td></tr>
    <tr><td>Enthalpy h</td><td>${r.h.toFixed(2)} kJ/kg dry air</td></tr>
    <tr><td>Specific volume</td><td>${r.v.toFixed(4)} m³/kg dry air</td></tr>
    <tr><td>Density</td><td>${r.rho.toFixed(4)} kg/m³</td></tr>
  </table>
`;
  } catch (err) {
    document.getElementById("out").textContent = err.message;
  }
}

// --- Reset button ---
function resetPsychrometric() {
  ["Tdb", "Twb", "RH", "Tdp", "alt"].forEach(
    (id) => (document.getElementById(id).value = "")
  );
  document.getElementById("out").textContent = "";
}
// document.getElementById("psy_reset").onclick = () => {
//   ["Tdb", "Twb", "RH", "Tdp", "alt"].forEach(
//     (id) => (document.getElementById(id).value = "")
//   );
//   document.getElementById("out").textContent = "";
// };
