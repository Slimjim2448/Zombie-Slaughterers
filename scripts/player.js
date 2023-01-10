class player extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'player');

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.setSize(8,9,true)

    }

}