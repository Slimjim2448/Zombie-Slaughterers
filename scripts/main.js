class Controller extends Phaser.Scene {
  constructor ()
  {
      super('Controller');

      
  }

  preload ()
  {
      this.load.image('menu', 'assets/menu.png');
      this.load.image('player', 'assets/zman2.png');
      this.load.image('horizontalroad', 'assets/horizontalroad.png');
      this.load.image('bg', 'assets/bg.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('z', 'assets/zombiepng.png');
      this.load.image('button', 'assets/button.png');
      this.load.image('chainsaw', 'assets/chainsaw.png')
      this.load.image('cursor', 'assets/cursor.png')
      this.load.image('fence', 'assets/fence.png')
  }

  create ()
  {
      this.scene.start('title');
  }

  update (time, delta)
  {
  
  }
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

class title extends Phaser.Scene {
  constructor ()
  {
    super('title');

    this.bg;
    this.button1;
    this.button2;
    this.button3;
    this.titletext;
    this.button1text;
    this.button2text;
    this.button3text;
  
  }

  create () {
    
    this.cameras.main.setBounds(0, 0, 1280, 720);
    //this.cameras.main.setViewport(0, 136, 1024, 465);
    this.bg = this.add.image(640, 360, 'bg').setDepth(1);
    this.titletext = this.add.text(400,100, "Zombie Slaughterers!", {font:'40px Courier', fill: '#000000'}).setDepth(3);
    this.button1text = this.add.text(580,180, "Play", {font:'40px Courier', fill: '#000000'}).setDepth(3);
    this.button2text = this.add.text(580,280, "????", {font:'40px Courier', fill: '#000000'}).setDepth(3);
    this.button3text = this.add.text(580,380, "Quit", {font:'40px Courier', fill: '#000000'}).setDepth(3);
    this.button1 = this.add.image(640, 200, 'button').setDepth(2);
    this.button2 = this.add.image(640, 300, 'button').setDepth(2);
    this.button3 = this.add.image(640, 400, 'button').setDepth(2);

    this.button1.setInteractive();
    this.button2.setInteractive();
    this.button3.setInteractive();

    this.button1.on("pointerdown", ()=> {
      
      //this.scene.add('mainScene',config);
      this.scene.start('mainScene')
      //this.scene.stop('title');
      this.scene.resume('mainScene')
    })
    
    this.button2.on("pointerdown", ()=> {
     
      this.scene.start('SceneB');
      //this.scene.stop('title');
    })

    this.button3.on("pointerdown", ()=> {
     
      close();
      //this.scene.stop('title');
    })
    
  }

  

}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////// 
  var bob;
  var waveNumber = 0;
  var zombiesKilled = 0;
  var circle;
  var graphics;
  var playerHealth = 100;
  var touching = false;
  var isGameover = false;
  var PLAYER_MOVE_SPEED = 70;
  var ZOMBIE_MOVE_SPEED = 55;
  var playerSpeed = 70;
  var zombieSpeed = 55;
  var BULLET_MOVE_SPEED = 200;
  var waveCounter;
  var spawnTimer;
  var zombies;
  var bullets;
  var b;
  var shootBulletEvent;
  var min;
  var max;
  var createZombies;
  var updateCounter;
  var points;
  var z;
  var p;
  var touching;
  //var zombies;
  var cameras;
  var chainsaws;
  var spaceKey;
  var text;
  var random;
  var damagePlayerEvent;
  var healPlayerEvent;
  var shootSpeed = 2500;
  var zombieCount = 0;
  //var Chainsaw;
  var healTimer;
  var cursor;
  var container;
  var angle;
  var target;
  var spawnNum = 8;
  var playerLevel = 0;
  var isLeft = false;
  var isRight = false;
  var isUp = false;
  var isDown = false;
  var xp = 0;

class mainScene extends Phaser.Scene {

constructor(config)
{
  super('mainScene');
  // this.player;
}

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
create() {

spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
//BACKGROUND
this.background = this.add.image(640,360,'horizontalroad');
this.cameras.main.setBounds(0, 0, 1280, 720);
//CURSORS  
this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
this.cursors = this.input.keyboard.createCursorKeys();

//PLAYER
//player = new player(this,640,360,'player')
player = this.add.existing(new player(this,640,360,'player'));
player.setData({health: playerHealth, wave:waveNumber, zombiesKilled:zombiesKilled, zombieCount: zombieCount, playerLevel:playerLevel})

//SPAWN TIMER
waveCounter = this.time.addEvent({ delay: 7500, callback: updateCounter,  callbackScope: this, loop: true });
spawnTimer = this.time.addEvent({ delay: 7500, callback: createZombies, callbackScope: this, loop: true });


//SPAWN RADIUS
graphics = this.add.graphics();
circle = new Phaser.Geom.Ellipse(player.x, player.y,600, 350);
//directions = new Phaser.Geom.Circle(player.x, player.y,600, 600);

//ZOMBIES
zombies = this.physics.add.group({
  defaultKey:"zombies",
  collideWorldBounds:false,
  runChildUpdate: true,
  onCollide: true,
  isParent: true,
  //onOverlap: true,
  maxSize:48
});

function createZombies(){
  moveCircle();
  getSpawnPoints();
  //if(zombieCount <=32){
    for (var i = 0; i < points.length; i++)
    {
      moveCircle();
      var p = points[i];
      
      let z = this.add.existing(new zombie(this,p.x,p.y,'z'));
      //z.setSize(50.50,true)
    zombies.add(z);
    }
 // }
}

// function getXP(playerLevel,zombiesKilled)
// {
//   xp = (zombiesKilled * playerLevel) + 1;
//   xp = Math.ceil(xp)
//   return(xp)
// }

//Touching logic
this.physics.add.overlap(zombies.getChildren(), player,  function(zombie,player){
  //console.log("worked");
  if(isGameover == false)
  {
    touching = true;
  }
  
  return touching;
})

//Bullets
bullets = this.physics.add.group({
  defaultKey:"bullet",
  classType: 'bullet',
  collideWorldBounds:false,
  runChildUpdate: true,
  onCollide: false,
  onOverlap: false,
  
  setScale: 1,
});

chainsaws = this.physics.add.group({
  defaultKey:"chainsaw",
  classType: 'chainsaw',
  //frameQuantity: true,
  runChildUpdate: true,
  onOverlap: true,
  maxSize:1
})
chainsaw = this.add.existing(new chainsaw(this,player.x,player.y,'chainsaw'))
chainsaws.add(chainsaw)

// this.input.on('pointermove', function (pointer) {        
//   angle = Phaser.Math.Angle.BetweenPoints(chainsaw, pointer);         
//   chainsaw.rotation = angle;     
//   }, this); 

//Shoot Bullet Random Direction
function shootBullet(isLeft,isRight,isUp,isDown){
  let b = this.add.existing(new bullet(this,player.x,player.y,'bullet'));
  bullets.add(b);
  max=4;
  min=1;
  

  random = Math.floor(Math.random() * (max - min + 1) + min)
  
  if ((this.cursors.left.isDown || this.a.isDown) || (this.cursors.right.isDown || this.d.isDown)) b.setVelocityX(this.cursors.left.isDown || this.a.isDown ? -BULLET_MOVE_SPEED : BULLET_MOVE_SPEED);
else
{ 
  switch(random)
  {
  case 1:
    b.setVelocity(0,-BULLET_MOVE_SPEED)
    break;
  case 2:
    b.setVelocity(0,BULLET_MOVE_SPEED)
    break;
  case 3:
    b.setVelocity(BULLET_MOVE_SPEED,0)
    break;
  case 4:
    b.setVelocity(-BULLET_MOVE_SPEED,0)
    break; 
  }
};
  
if ((this.cursors.up.isDown || this.w.isDown) || (this.cursors.down.isDown || this.s.isDown)) b.setVelocityY(this.cursors.up.isDown || this.w.isDown ? -BULLET_MOVE_SPEED : BULLET_MOVE_SPEED);
else
{ 
  switch(random)
  {
  case 1:
    b.setVelocity(0,-BULLET_MOVE_SPEED)
    break;
  case 2:
    b.setVelocity(0,BULLET_MOVE_SPEED)
    break;
  case 3:
    b.setVelocity(BULLET_MOVE_SPEED,0)
    break;
  case 4:
    b.setVelocity(-BULLET_MOVE_SPEED,0)
    break; 
  }
};
  
  console.log('bullet shot');
}


// function explosion(){
//   for(let i; i<points.lengths;i++){
//     let b = this.add.existing(new bullet(this,player.x,player.y,'bullet'));
//     bullets.add(b);
//     this.physics.moveToObject(bullet, points[i])
//   }
//   // bullets.getchildren().foreach(){
//   //   this.physics.moveToObject(bullet, points)
//   // }
// } 


// Bullet Shoot Event
shootBulletEvent = this.time.addEvent({ delay: shootSpeed,   callback: shootBullet, callbackScope: this, loop: true});

this.physics.add.collider(bullets,zombies, function(bullet,zombie) 
{
  zombiesKilled++;
  player.data.values.zombiesKilled++;
  player.data.values.zombieCount = player.data.values.zombieCount - 1;
  bullet.destroy();
  zombie.destroy();
  
});

//Zombies Collide Together
this.physics.add.collider(zombies,zombies, function(zombie) 
{
  
});

this.physics.add.collider(circle,zombies, function(circle,zombie) 
{
  zombie.destroy();
});

//Chainsaws kill zombies
this.physics.add.overlap(chainsaws, zombies,  function(chainsaw, zombie){       
    zombie.destroy();
    //getXP(playerLevel, xp);
    zombiesKilled++;
    player.data.values.zombiesKilled++;
    player.data.values.zombieCount--;
});
//Score Text
text = this.add.text(435, 245, '', { font: '16px Courier', fill: '#ffffff' });

text.setText([
    'Health:' + player.getData('health'),
    'Wave Number:' + player.getData('wave'),
    'Zombies Killed:' + player.getData('zombiesKilled'),
    'Zombie Count:' + player.getData('zombieCount'),
    'Level:' + player.getData('playerLevel')
  ])

player.on('changedata',function(gameObject,key,value){
  text.setText([
    'Health:' + player.getData('health'),
    'Wave Number:' + player.getData('wave'),
    'Zombies Killed:' + player.getData('zombiesKilled'),
    'Zombie Count:' + player.getData('zombieCount'),
    'Level:' + player.getData('playerLevel')
]);
})

//Gets points on spawn radius
function getSpawnPoints(){
points = circle.getPoints(spawnNum);
//NESW = directions.getPoints(4);
}

//Update per wave
function updateCounter(){
waveNumber++;
player.data.values.waveNumber++;
shootSpeed = shootSpeed + (250 * zombiesKilled)
// z = zombies.getChildren()
player.data.values.zombieCount = player.data.values.zombieCount + spawnNum
zombieCount = zombieCount + spawnNum;
//player.data.values.zombieCount + spawnNum;
zombieSpeed = zombieSpeed + waveNumber*1.0025;
//player.data.values.playerLevel = Math.ceil(zombiesKilled / 5);
console.log("wave:" + waveNumber);
console.log("health:" + playerHealth);
console.log("zombies:" + player.data.values.zombieCount)
console.log("level:" + player.data.values.playerLevel)
//console.log("test:" + bullets.lifespan);
}

//Creates and moves circle spawn radius
function moveCircle(){
graphics.clear();
circle.setPosition(player.x, player.y);
//directions.setPosition(player.x,player.y);
graphics.strokeCircleShape(circle);
graphics.lineStyle(4,0x00ff00,1);
// graphics.fillCircleShape(circle);
}

//Causes Tick Dmg
function damagePlayer(){
(playerHealth = playerHealth - (1 + waveNumber*0.00125))
player.data.values.health = Math.floor(playerHealth)
}

// function useChainsaw(){
//   let Chainsaw = this.add.existing(new chainsaw(this,player.x,player.y,'chainsaw'))
// }

//Passive Heal to 100
function passiveHeal(){
//healTimer.paused(true)
if(playerHealth < 100){
  playerHealth=playerHealth+1
  player.data.values.health = player.data.values.health+1
}
//console.log('+1hp')
  // if(playerHealth<100){
  //   //healTimer.remove(true)
  //   console.log('full hp')
  // }
}
healTimer = this.time.addEvent({ delay: 500, callback: passiveHeal, callbackScope: this, loop: true, paused: false });


// this.input.setDefaultCursor('cursor');

//this.input.setDefaultCursor('bullet', pointer);


cursor = this.add.sprite(0, 0, 'fence').setInteractive({ cursor: 'cursor' }).setScale(0.25);

this.input.on('pointermove', function (pointer)
{
cursor.setVisible(true).setPosition(pointer.x, pointer.y);
//chainsaw.setPosition(pointer.x,pointer.y)
});

container = this.add.container(600, 300);
//target = Phaser.Math.Angle.BetweenPoints(chainsaw.x, pointer.x);
} ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

update() {
function killLegs(){
  PLAYER_MOVE_SPEED = 0;
}
player.data.values.playerLevel = Math.ceil(zombiesKilled / 5);
Phaser.Actions.RotateAroundDistance(chainsaws.getChildren(), { x: player.x, y: player.y }, 0.035, 20);

// chainsaws.getChildren().rotate = Phaser.Math.Angle.BetweenPoints(chainsaw, zombies.getChildren())

// Phaser.Actions.RotateAroundDistance([container], center, rotateSpeed, 250);
//       const angleDeg = Math.atan2(container.y - center.y, container.x - center.x) * 180 / Math.PI;
//       container.angle = angleDeg+90;

let cursors = this.input.keyboard.createCursorKeys(); 
if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) player.setVelocityX(cursors.left.isDown || this.a.isDown ? -PLAYER_MOVE_SPEED : PLAYER_MOVE_SPEED);
else player.setVelocityX(0);
if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) player.setVelocityY(cursors.up.isDown || this.w.isDown ? -PLAYER_MOVE_SPEED : PLAYER_MOVE_SPEED);
else player.setVelocityY(0);

if (cursors.left.isDown)
{
  isLeft = true;
  //LastDown=true;
}
else
{
  isLeft = false;
}
if (cursors.right.isDown)
{
  isRight = true;
  //LastDown=true;
}
else
{
  isRight = false;
}
if (cursors.up.isDown)
{
  isUp = true;
  //LastDown=true;
}
else
{
  isUp = false;
}
if (cursors.down.isDown)
{
  isDown = true;
  //LastDown=true;
}
else
{
  isDown = false;
}


//Camera
const cam = this.cameras.main.setSize(1280, 720);
this.cameras.main.startFollow(player, true);
this.cameras.main.setZoom(3);

//Zombies Follow Player
zombies.getChildren().forEach(zombie=>{
  if(zombie.active){
this.physics.moveToObject(zombie,player,ZOMBIE_MOVE_SPEED);
  }
});


//Contact Logic
function damagePlayer(){
(playerHealth = playerHealth - (1 + waveNumber*0.000025))
player.data.values.health = Math.floor(playerHealth)
}

if(touching==true)
{
  ZOMBIE_MOVE_SPEED = 10;
  PLAYER_MOVE_SPEED = 25;
  damagePlayerEvent = this.time.addEvent({ delay:250, callback:damagePlayer, callbackScope: this, loop: false});
}
else
{
  ZOMBIE_MOVE_SPEED = zombieSpeed;
  PLAYER_MOVE_SPEED = playerSpeed;
}
//If Health Reaches Zero = Game O
if(playerHealth <= 0)
{
  isGameover = true;
}
//Gameover Text
if(isGameover == true){
  
  // gameover();
  //this.physics.pause();
  // explosion()
  this.time.paused = true;
  //this.scene.sleep('mainScreen')
  //this.scene.launch('deathScreen');
  killLegs()
  //explosion()
  this.scene.launch('deathScreen');
}
else{
  this.scene.sleep('deathScreen')
  this.physics.resume();
  this.time.paused = false;
}

touching = false;
if (player.x < 220){
  text.x=player.body.position.x + 60;
  text.y=player.body.position.y - 110;
}
else if(player.x > 1060){
  text.x=player.body.position.x - 145;
  text.y=player.body.position.y - 110;
}
else{
  text.x=player.body.position.x - 200;
  text.y=player.body.position.y - 110; 
}  

}

}

class deathScreen extends Phaser.Scene {

  constructor ()
  {
      super('deathScreen');

      this.restartButton;
      this.backoutButton;
      //this.slaughterText;
  }

  create ()
  {
    
    // this.physics.pause()
      // this.scene.remove('mainScene')
      this.add.text(310,175,
      // (player.x)-135,
      // (player.y)-50,
      "YOU GOT SLAUGHTERED",
                  {
                    fontSize:60,
                    color:"#ff0000",
                    fontStyle:"bold",
                  }).setDepth(7);
      this.add.text(510,265,
      "Restart",
                  {
                    fontSize:60,
                    color:"#ff0000",
                    fontStyle:"bold",
                  }).setDepth(7);
      this.add.text(570,365,
      "Exit",
                  {
                    fontSize:60,
                    color:"#ff0000",
                    fontStyle:"bold",
                  }).setDepth(7);
    
      this.restartButton = this.add.image(640, 300, 'button').setDepth(6);
      this.backoutButton = this.add.image(640, 400, 'button').setDepth(6);

      this.restartButton.setInteractive();
      this.backoutButton.setInteractive();
    
      this.restartButton.on("pointerdown", ()=> {
     
     // function healPlayer(){
     //      playerHealth = 250
     //      player.data.values.health = 250;
     //  }
     //  healPlayerEvent = this.time.addEvent({ delay:250, callback:healPlayer, callbackScope: this, loop: true});
      // playerHealth = 250;
      // player.data.values.health = 250;
        
      this.scene.stop('deathScreen');
      playerHealth = 100;
      player.data.values.health = 100;
      player.data.values.wave = 0;
      player.data.values.zombiesKilled = 0;
      player.data.values.zombieCount = 0;
      player.data.values.playerLevel = 0;
      zombieCount = 0;
      waveNumber = 0;
      zombieSpeed = 55;
      playerLevel = 0;
      zombiesKilled = 0;
      //explosion()
      //shootSpeed = 9000;
     
      console.log('restart');
     
      isGameover=false;
     
      zombies.getChildren().forEach(zombie=>{
        if (zombie)
        {
          //zombie.destroy()
          zombies.clear()
        }
      })
                
      player.x = 640;
      player.y=360;

      //this.scene.start('mainScreen');
      this.scene.restart('mainScreen')        
    })
    
      this.backoutButton.on("pointerdown", ()=> {
        this.scene.stop('mainScene');
        player.destroy();
        //player.clear();
        this.scene.start('title');
      })
    
    }

  update (time, delta)
  {
    // if(playerHealth<250){
    // function healPlayer(){
    //       playerHealth = 250
    //       player.data.values.health = 250;
    //   }
    //   healPlayerEvent = this.time.addEvent({ delay:250, callback:healPlayer, callbackScope: this, loop: true});
    // }
    // playerHealth=250;
    // player.data.values.health = 250;
    touching = false;
    //this.physics.pause()
  }

}

var target
var randomEnemy
var humans

class SceneB extends Phaser.Scene {

  constructor ()
  {
      super('SceneB');
      
      
  }

  create ()
  {
    this.background = this.add.image(640,360,'bg');
    this.cameras.main.setBounds(0, 0, 1280, 720);
this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
this.cursors = this.input.keyboard.createCursorKeys();
    bob = this.add.existing(new zombie(this,640, 360, 'zombie'));
      
    humans = this.physics.add.group({
      defaultKey:"humans",
      collideWorldBounds:true,
      runChildUpdate: true,
      onCollide: true,
      //onOverlap: true,
      //maxSize:48
    })
    function makePeople(){
      let x=Phaser.Math.RND.integerInRange(0,1280)
      let y=Phaser.Math.RND.integerInRange(0,720)
      let p = this.add.existing(new player(this,x,y,'player'));
      humans.add(p)
    }
    function moveDirection(){
    // let p = this.add.existing(new player(this,640,360,'player'));
    // zombies.add(p)
    let p = humans.getChildren()
    randomEnemy = p[Phaser.Math.RND.integerInRange(0, p.length - 1)]
    //console.log(p[1])
    max=4;
    min=1;
    random = Math.floor(Math.random() * (max - min + 1) + min)
    if(randomEnemy){
      switch(random){
    case 1:
      randomEnemy.setVelocity(0,-PLAYER_MOVE_SPEED)
      break;
    case 2:
      randomEnemy.setVelocity(0,PLAYER_MOVE_SPEED)
      break;
    case 3:
      randomEnemy.setVelocity(PLAYER_MOVE_SPEED,0)
      break;
    case 4:
      randomEnemy.setVelocity(-PLAYER_MOVE_SPEED,0)
      break; 
    }
    }
    console.log('direction change');
  }
    
  // function moveToPlayer(){
  //   let randomEnemy = zombies.getChildren().filter(e => e.active === true)
  //   let target = randomEnemy[Phaser.Math.RND.integerInRange(0, randomEnemy.length - 1)]
    
  //   this.physics.moveToObject(player,target,ZOMBIE_MOVE_SPEED);
  // }

  var moveDirection = this.time.addEvent({ delay: 25,   callback: moveDirection, callbackScope: this, loop: true});  
  var peopleMake = this.time.addEvent({delay: 500, callback: makePeople, callbackScope: this, loop: true});
    // var moving = this.time.addEvent({ delay: 50,   callback: moveToPlayer, callbackScope: this, loop: true});
  //var infect = this.time.addEvent({ delay: 25,   callback: infect, callbackScope: this, loop: true});  
  
  // function infect(bob){
  //   //let x=bob.body.position.x
  //   //let y=bob.body.position.y
  //   let z = this.add.existing(new zombie(this,bob.x,bob.y,'z'));
  //   //let z = this.add.existing(new zombie(this,x,y,'zombie'));
  //   //zombies.add(z)
  // }
    
  this.physics.add.overlap(humans.getChildren(), bob,  function(human,bob){
    
    human.destroy()
    // infect()
    // let z = this.add.existing(new zombie(this,x,y,'zombie'));
    // //zombies.add(z)
    //infect(human)
    
  })
}

  update (time, delta)
  {
     let cursors = this.input.keyboard.createCursorKeys(); 
if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) bob.setVelocityX(cursors.left.isDown || this.a.isDown ? -PLAYER_MOVE_SPEED : PLAYER_MOVE_SPEED);
else bob.setVelocityX(0);
if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) bob.setVelocityY(cursors.up.isDown || this.w.isDown ? -PLAYER_MOVE_SPEED : PLAYER_MOVE_SPEED);
else bob.setVelocityY(0);

//Camera
const cam = this.cameras.main.setSize(1280, 720);
this.cameras.main.startFollow(bob, true);
    

  }

}

var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  pixelArt: true,
  backgroundColor: '#f0f0f0',
  scale: {
  parent: 'phaser-game',
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
      default: 'arcade',
      arcade: {
          gravity: {
              y: 0
          },
          debug: false
      }
  },
  scene: [ Controller, title, mainScene, SceneB, deathScreen]
};

var game = new Phaser.Game(config);
