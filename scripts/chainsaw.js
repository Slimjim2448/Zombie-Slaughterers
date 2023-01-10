class chainsaw extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
      // var x = scene.player.x;
      // var y = scene.player.y;
        super(scene, x, y, 'chainsaw');

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        //this.body.onWorldBounds = true;
        this.setSize(8,10,true)
        
    }
update(){
    
  }
}