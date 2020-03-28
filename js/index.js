import Phaser from "phaser";
import PlatformerScene from "./platformer-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 700,
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
