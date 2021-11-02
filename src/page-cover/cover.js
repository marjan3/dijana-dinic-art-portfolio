// import "bootstrap";
//  Alternatively, you may import plugins individually as needed:
// import "bootstrap/js/dist/util";
// import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import * as $ from "jquery";
import "../shared/fonts.css";
import "./cover.css";

$(function () {
  const body = $(".cover-background")[0];
  body.addEventListener("click", () => {
    window.location.href = "./overview.html";
  });
});
