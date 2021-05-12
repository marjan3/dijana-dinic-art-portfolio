import "bootstrap";
//  Alternatively, you may import plugins individually as needed:
// import "bootstrap/js/dist/util";
// import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const testModules = require("./test-module");
require("../css/cover.css");

console.log(testModules.hello);
