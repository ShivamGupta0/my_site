import Phaser from "phaser";
import PlatformerScene from "./platformer-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: false,
  backgroundColor: "#ecff99",
  scene: PlatformerScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 }
    }
  }
};

const game = new Phaser.Game(config);
