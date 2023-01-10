class zombie extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'z');

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.setSize(8,10,true);
        var zHP = 3;
    }

}