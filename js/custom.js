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
  } else if (id === "paint") {
    reset();
    resetConsumption();
  } else if (id === "consumption") {
    reset();
    resetPaint();
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
    // mixing: "btn4",
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
