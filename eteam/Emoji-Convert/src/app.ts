var nsg = require("node-sprite-generator");

nsg(
  {
    src: ["in/01_Amazed/*.png"],
    spritePath: "out/sprite.png",
    stylesheetPath: "out/sprite.styl"
  },
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);
