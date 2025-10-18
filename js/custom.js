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

function showForm(formId) {
  const forms = document.querySelectorAll(".form-content");
  forms.forEach((form) => form.classList.remove("active"));
  document.getElementById(formId).classList.add("active");
}
function showForm(id) {
  document.querySelectorAll(".form-content").forEach((form) => {
    form.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  const buttons = ["btn1", "btn2", "btn3", "btn4"];
  const activeMap = {
    wft: "btn1",
    dft: "btn2",
    consumption: "btn3",
    mixing: "btn4",
  };

  buttons.forEach((btn) => {
    const element = document.getElementById(btn);
    element.classList.toggle("mystyle", btn === activeMap[id]);
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
  const thinner =
    parseFloat(
      document.querySelectorAll("#wft input[type='number']")[2].value
    ) || 0;

  if (!dft) {
    const inputs = document.querySelectorAll("#wft input[type='number']");

    inputs.forEach((input, index) => {
      if (index <= 1) {
        input.style.border = "2px solid red";
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

  document.getElementById("wftOutput").value = wft ? wft?.toFixed(2) : "";
}

function reset() {
  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.value = "";
  });
  document.getElementById("wftOutput").value = "";
}
