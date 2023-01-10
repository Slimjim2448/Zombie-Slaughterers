class bullet extends Phaser.Physics.Arcade.Sprite{

  constructor(scene,x,y){
    //var x = scene.player.x;
    //var y = scene.player.y;

    super(scene, x, y, 'bullet');
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
    //this.body.onWorldBounds = false;
    //scene.physics.world.enableBody(this);
    //scene.bullets.add(this);
    this.setSize(5,5,true)

  }
  update(){
    
  }
}