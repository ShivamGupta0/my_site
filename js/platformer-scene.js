import Phaser from "phaser";
import Player from "./player.js";
export default class PlatformerScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet(
      "player",
      "../assets/spritesheets/0x72-industrial-player-32px-extruded.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
    this.load.image(
      "tiles",
      "../assets/tilesets/0x72-industrial-tileset-32px-extruded.png"
    );
    this.load.tilemapTiledJSON(
      "map",
      "../assets/tilemaps/platformer-simple.json"
    );
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tiles = map.addTilesetImage(
      "0x72-industrial-tileset-32px-extruded",
      "tiles"
    );

    map.createDynamicLayer("Background", tiles);
    this.groundLayer = map.createDynamicLayer("Ground", tiles);
    map.createDynamicLayer("Foreground", tiles);

    // Instantiate a player instance at the location of the "Spawn Point" object in the Tiled map.
    // Note: instead of storing the player in a global variable, it's stored as a property of the
    // scene.
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);
    const contactButton = this.add.text(2500, 120, "CONTACT US", {
      fill: "#fff",
      font: "23px monospace",
      padding: { x: 20, y: 10 },
      backgroundColor: "#22eef5"
    });
    contactButton.setInteractive();

    contactButton.on("pointerdown", () => {
      window.location.href = "./contact.html";
    });
    const teamButton = this.add.text(1760, 120, "OUR TEAM", {
      fill: "#fff",
      font: "23px monospace",
      padding: { x: 20, y: 10 },
      backgroundColor: "#22eef5"
    });
    teamButton.setInteractive();

    teamButton.on("pointerdown", () => {
      window.location.href = "./team.html";
    });
    const aboutButton = this.add.text(1220, 80, "ABOUT US", {
      fill: "#fff",
      font: "23px monospace",
      padding: { x: 20, y: 10 },
      backgroundColor: "#22eef5"
    });
    aboutButton.setInteractive();

    aboutButton.on("pointerdown", () => {
      window.location.href = "./about.html";
    });
    const prodButton = this.add.text(590, 300, "OUR PRODUCTS", {
      fill: "#fff",
      font: "23px monospace",
      padding: { x: 20, y: 10 },
      backgroundColor: "#22eef5"
    });
    prodButton.setInteractive();

    prodButton.on("pointerdown", () => {
      window.location.href = "./prod.html";
    });

    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen

    this.add
      .text(16, 16, "Click on text to navigate,Arrow keys to move & jump", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    this.player.update();

    if (this.player.sprite.y > this.groundLayer.height) {
      this.player.destroy();
      this.scene.restart();
    }
  }
}
