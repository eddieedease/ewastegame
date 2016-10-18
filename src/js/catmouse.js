(function() {
    'use strict';

    function Catmouse() {

    }

    var SHOT_DELAY = 100; // milliseconds (10 bullets/3 seconds)
    var BULLET_SPEED = 800; // pixels/second
    var NUMBER_OF_BULLETS = 2;
    var NUMBER_OF_COINS = 4;
    var GRAVITY = 560; // pixels/second/second

    var gun;



    var gun2;
    var bulletPool2;
    var p2cr;



    var bulletPool;

    var explosionGroup;


    var p1cr;


    var roos1;
    var roos2;

    var music;

    var powerbar;
    var powerbarslider;

    var slidertweento;
    var slidertweenfrom;

    var p1shoot;
    var cursors;

    var p2up;
    var p2down;
    var p2fire;

    var roos1tweento;
    var roos1tweenfrom;
    var roos2tweento;
    var roos2tweenfrom;

    var timerdisplay;
    var counter = 30;

    var rondetext;
    var rondenummer;


    var scorep1 = 0;
    var scorep2 = 0;
    var scoreTextp1;
    var scoreTextp2;

    var tween1;
    var tween2;

    var roos1open = true;
    var roos2open = true;

    var anim1fly;
    var anim1hit;

    var anim2fly;
    var anim2hit;

    var coinGroup;

    var mintext;

    var coinsalive;

    // audio
    var audiobird;
    var audiohit;

    var levelup;
    var leveluptween;

    var energyp1 = 100;
    var energyp2 = 100;

    var curlevel = 2;

    var p1blocked = false;
    var p2blocked = false;

    var shield1;
    var shield2;

    var coinstot = 0;

    var p1gameover = false;
    var p2gameover = false;

    var valid;
    var creditadd;

    var catmousepp2;


    var birdsactive = false;

    var gameover1;
    var gameover2;

    var credit;


    Catmouse.prototype = {
        create: function() {

            credit = localStorage.getItem('credits');

            this.game.currentgame = "catmouse";

            energyp1 = 100;
            var energyp2 = 100;

            //this.stage.backgroundColor = 0x4488cc;
            this.game.add.image(0, 0, 'catmousebg');

            if (this.game.multiplay === true) {
                catmousepp2 = this.game.add.image(835, 355, 'catmousep2');
            } else {
                catmousepp2 = this.game.add.image(900, 500, 'catmousep2');
                catmousepp2.visible = false;
            }

            birdsactive = false;

            music = this.game.add.audio('catmouse');
            music.play();
            music.loopFull(1.0);

            p1blocked = false;
            p2blocked = false;


            // NOTE P2

            if (this.game.multiplay === true) {
                p2blocked = false;
                shield2 = this.game.add.image(900, 400, 'shield');
                shield2.anchor.setTo(0.5, 0.5);
                shield2.visible = false;


                roos1 = this.game.add.sprite(40, 200, 'bird');
                this.physics.enable(roos1, Phaser.Physics.ARCADE);
                roos1.body.setSize(2, 55, 20, 30);
                roos1.anchor.setTo(0.5, 0.5);
                roos1.scale.x = 1;
                roos1.scale.y = 1;
                roos1.body.allowGravity = false;
                roos1.body.immovable = true;
                anim1fly = roos1.animations.add('fly', [0, 1, 2], 10, true);
                anim1hit = roos1.animations.add('hit', [4, 5], 10, false);
                anim1hit.onComplete.add(this.animationStopped, this);
                roos1.kill();
                p2up = this.input.keyboard.addKey(Phaser.Keyboard.W);
                p2down = this.input.keyboard.addKey(Phaser.Keyboard.S);
                p2fire = this.input.keyboard.addKey(Phaser.Keyboard.Q);

                var randomValue = this.game.rnd.integerInRange(0, 400);
                var randomTime = this.game.rnd.integerInRange(500, 1000);

                tween1 = this.game.add.tween(roos1).to({
                    y: randomValue
                }, randomTime, "Linear", true);
                tween1.onComplete.add(this.tween1do, this);


                this.gun2 = this.add.sprite(this.game.width - 58, this.game.height - 175, 'bullet');
                this.gun2.anchor.setTo(0.5, 0.5);

                this.gun2.scale.setTo(-0.7, 0.7);
                bulletPool2 = this.add.group();

                for (var b = 0; b < NUMBER_OF_BULLETS; b++) {
                    // Create each bullet and add it to the group.
                    var bullet = this.add.sprite(0, 0, 'bullet');
                    bulletPool2.add(bullet);
                    // Set its pivot point to the center of the bullet
                    bullet.anchor.setTo(0.5, 0.5);
                    bullet.scale.setTo(0.5, 0.5);
                    // Enable physics on the bullet
                    this.physics.enable(bullet, Phaser.Physics.ARCADE);
                    // Set its initial state to "dead".
                    bullet.kill();
                }

                scoreTextp2 = this.game.add.bitmapText(this.game.width - 100, 40, 'scorefont', 'Score P2\n0', 30);
                scoreTextp2.anchor.setTo(0.5, 0.5);
                var barConfig2 = {
                    x: 800,
                    y: 500
                };
                this.myHealthBar2 = new HealthBar(this.game, barConfig2);
            }






            // P1
            shield1 = this.game.add.image(117, 361, 'shield');
            shield1.scale.setTo(-1, 1);
            shield1.anchor.setTo(0.5, 0.5);
            shield1.visible = false;
            audiobird = this.game.add.audio('birdhit');
            audiohit = this.game.add.audio('coin');









            /*powerbar = this.game.add.sprite(this.game.width / 2, 450, 'powerbar');
            powerbarslider = this.game.add.sprite(this.game.width / 2 - 180, 450, 'powerbarslider');
            powerbar.anchor.setTo(0.5, 0.5);
            powerbarslider.anchor.setTo(0.5, 0.5);*/




            roos2 = this.game.add.sprite(960, 350, 'bird');
            this.physics.enable(roos2, Phaser.Physics.ARCADE)
            roos2.body.setSize(2, 55, -20, 30);
            roos2.anchor.setTo(0.5, 0.5);
            roos2.scale.x = -1;
            roos2.scale.y = 1;
            roos2.body.allowGravity = false;
            roos2.body.immovable = true;
            anim2fly = roos2.animations.add('fly', [0, 1, 2], 10, true);
            anim2hit = roos2.animations.add('hit', [4, 5], 10, false);
            anim2hit.onComplete.add(this.animationStopped, this);
            roos2.kill();



            //controls
            p1shoot = this.input.keyboard.addKey(Phaser.Keyboard.Z);



            roos2.enableBody = true;


            coinGroup = this.add.group();
            for (var i = 0; i < NUMBER_OF_COINS; i++) {

                var rx = this.game.rnd.integerInRange(this.game.width / 2 - 200, this.game.width / 2 + 200);
                var ry = this.game.rnd.integerInRange(50, 300);
                // Create each bullet and add it to the group.
                var coin = this.add.sprite(rx, ry, 'coin');
                var coinspin = coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
                coin.animations.play('spin');
                coinGroup.add(coin);
                // Set its pivot point to the center of the bullet
                coin.anchor.setTo(0.5, 0.5);
                //coin.scale.setTo(0.5, 0.5);
                // Enable physics on the bullet
                this.physics.enable(coin, Phaser.Physics.ARCADE);
                coin.body.allowGravity = false;
                // Set its initial state to "dead".
                //coin.kill();
            }

            coinsalive = 4;


            /*// tweens cursor powerbar
            slidertweento = this.game.add.tween(powerbarslider).to({
              x: this.game.width / 2 + 180
            }, 500, "Linear");
            slidertweenfrom = this.game.add.tween(powerbarslider).to({
              x: this.game.width / 2 - 180
            }, 500, "Linear");*/





            var randomValue = this.game.rnd.integerInRange(0, 400);
            var randomTime = this.game.rnd.integerInRange(500, 1000);

            tween2 = this.game.add.tween(roos2).to({
                y: randomValue
            }, randomTime, "Linear", true);
            tween2.onComplete.add(this.tween2do, this);



            // Create an object representing our gun
            this.gun = this.add.sprite(50, this.game.height - 215, 'bulletblue');

            // Set the pivot point to the center of the gun
            this.gun.anchor.setTo(0.5, 0.5);

            this.gun.scale.setTo(0.7, 0.7);



            // Create an object pool of bullets
            bulletPool = this.add.group();
            for (var i = 0; i < NUMBER_OF_BULLETS; i++) {
                // Create each bullet and add it to the group.
                var bullet = this.add.sprite(0, 0, 'bulletblue');
                bulletPool.add(bullet);
                // Set its pivot point to the center of the bullet
                bullet.anchor.setTo(0.5, 0.5);
                bullet.scale.setTo(0.5, 0.5);
                // Enable physics on the bullet
                this.physics.enable(bullet, Phaser.Physics.ARCADE);
                // Set its initial state to "dead".
                bullet.kill();
            }



            // Turn on gravity
            this.physics.arcade.gravity.y = GRAVITY;


            // create the inputs
            cursors = this.game.input.keyboard.createCursorKeys();




            // Create a group for explosions
            explosionGroup = this.add.group();

            // Simulate a pointer click/tap input at the center of the stage
            // when the example begins running.
            //this.input.activePointer.x = this.width / 2;
            //this.input.activePointer.y = this.height / 2 - 100;

            scoreTextp1 = this.game.add.bitmapText(100, 40, 'scorefont', 'Scorez P1\n0', 30);
            scoreTextp1.anchor.setTo(0.5, 0.5);




            var barConfig1 = {
                x: 200,
                y: 500
            };






            this.myHealthBar1 = new HealthBar(this.game, barConfig1);

            this.game.time.events.loop(Phaser.Timer.SECOND, this.ttimerLoop, this);

            valid = this.game.add.image(this.game.width - 100, 100, 'valid')
            valid.anchor.set(0.5, 0.5);
            valid.visible = false;


            creditadd = this.input.keyboard.addKey(Phaser.Keyboard.O);
            creditadd.onDown.add(this.creditadd, this);


            gameover1 = this.game.add.image(100, 300, 'gameover');
            gameover2 = this.game.add.image(730, 360, 'gameover');
            gameover1.visible = false;
            gameover2.visible = false;

        },
        creditadd: function() {

          credit = parseInt(credit) + 3;

          localStorage.setItem('credits', credit);

          this.game.aantalphones = this.game.aantalphones + 1;
          localStorage.setItem('aantalphones', this.game.aantalphones);
            valid.visible = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.creditgone, this);
        },
        creditgone: function() {
            this.game.time.events.remove(Phaser.Timer.SECOND * 3, this.creditgone, this);
            valid.visible = false;
        },


        block1: function() {
            p1blocked = true;
            shield1.visible = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, this.enable1, this);
        },
        block2: function() {
            p2blocked = true;
            shield2.visible = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, this.enable2, this);
        },
        enable1: function() {
            shield1.visible = false;
            p1blocked = false;
        },
        enable2: function() {
            shield2.visible = false;
            p2blocked = false;
        },


        ttimerLoop: function() {
            //slidertweento.start();
            energyp1 = energyp1 - curlevel;
            this.myHealthBar1.setPercent(energyp1);
            if (this.game.multiplay === true) {
                energyp2 = energyp2 - curlevel;
                this.myHealthBar2.setPercent(energyp2);
                if (energyp2 <= 0) {
                    p2gameover = true;
                    shield2.visible = false;
                    gameover2.visible = true;
                    //energyp2 = 100;
                }
            }

            if (energyp1 <= 0) {
                p1gameover = true;
                shield1.visible = false;
                gameover1.visible = true;

                if (this.game.multiplay === false) {
                    this.game.scorep1 = scorep1;
                    scorep1 = 0;
                    shield1.visible = false;
                    coinstot = 0;
                    p1gameover = false;
                    music.stop();
                    //energyp1 = 100;
                    this.game.state.start('score');
                }
            }


            if (energyp1 <= 3 && energyp2 <= 3 && this.game.multiplay === true) {
                this.game.scorep1 = scorep1;
                this.game.scorep2 = scorep2;
                scorep1 = 0;
                scorep2 = 0;
                shield1.visible = false;
                shield2.visible = false;
                coinstot = 0;
                p1gameover = false;
                p2gameover = false;
                energyp1 = 100;
                energyp2 = 100;
                music.stop();
                this.game.state.start('score');
            }


            //timerdisplay.fixedToCamera = true;
        },
        tween1do: function() {
            var randomValue = this.game.rnd.integerInRange(0, 400);
            var randomTime = this.game.rnd.integerInRange(500, 1000);

            tween1 = this.game.add.tween(roos1).to({
                y: randomValue
            }, randomTime, "Linear", true);
            tween1.onComplete.add(this.tween1do, this);
        },
        tween2do: function() {
            var randomValue = this.game.rnd.integerInRange(0, 400);
            var randomTime = this.game.rnd.integerInRange(500, 1000);

            tween2 = this.game.add.tween(roos2).to({
                y: randomValue
            }, randomTime, "Linear", true);
            tween2.onComplete.add(this.tween2do, this);
        },

        update: function() {

            if (this.game.multiplay === true) {
                if (roos1open) {
                    roos1.animations.play('fly');
                } else {
                    roos1.animations.play('hit');
                }


                this.physics.arcade.collide(bulletPool2, roos1, function(bullet, _roos1) {
                    audiobird.play();
                    this.block2();
                    // Create an explosion
                    this.getExplosion(_roos1.x, _roos1.y);
                    if (scorep2 > 25) {
                        scorep2 = scorep2 - 25;

                        if (mintext !== undefined) {
                            mintext.kill();
                        }

                        mintext = this.add.text(_roos1.x, _roos1.y - 40, 'P2\n- 25', {
                            font: '20px Arial',
                            fill: '#FF0000',
                            align: 'center'
                        });
                        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.minaway, this);
                    } else {
                        scorep2 = 0;
                    }

                    scoreTextp2.text = "Score P2\n" + scorep2;
                    // Kill the bullet
                    _roos1.kill();
                    roos1open = false;
                }, null, this);

                //NOTE Collision with coins, don't mind names
                this.physics.arcade.collide(bulletPool2, coinGroup, function(bullet, _roos1) {
                    audiohit.play();



                    coinstot = coinstot + 1;

                    if (mintext !== undefined) {
                        mintext.kill();
                    }

                    if (energyp2 < 95) {
                        energyp2 = energyp2 + 5;
                    }



                    mintext = this.add.text(_roos1.x, _roos1.y - 40, 'P2\n+ 15', {
                        font: '20px Arial',
                        fill: '#FF0000',
                        align: 'center'
                    });
                    scorep2 = scorep2 + 15;
                    scoreTextp2.text = "Score P2\n" + scorep2;
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.minaway, this);

                    // Create an explosion
                    this.getExplosion(_roos1.x, _roos1.y);
                    _roos1.kill();
                    coinsalive--;
                    this.checkCoins();

                }, null, this);


                // hitting each others projectile
                this.physics.arcade.collide(bulletPool, bulletPool2, function(bullet, bulletPool2) {
                    // Create an explosion
                    this.getExplosion(bullet.x, bullet.y);
                    // Kill the bullet
                    bullet.kill();
                }, null, this);


                bulletPool2.forEachAlive(function(bullet) {
                    bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
                }, this);


                //p2 controll
                if (p2up.isDown && this.gun2.rotation <= 1.7 && p2gameover === false) {
                    this.gun2.rotation = this.gun2.rotation + 0.02;

                } else if (p2down.isDown && p2gameover === false) {
                    //console.log(player.x);
                    this.gun2.rotation = this.gun2.rotation - 0.02;
                }

                if (p2fire.isDown && p2gameover === false) {
                    this.shootBullet2();
                }
            }






            //bird
            if (roos2open) {
                roos2.animations.play('fly');
            } else {
                roos2.animations.play('hit');
            }





            // TODO some strange bullet/roos mixin's. But works
            this.physics.arcade.collide(bulletPool, roos2, function(bullet, _roos2) {
                // Create an explosion
                audiobird.play();
                this.block1();
                this.getExplosion(_roos2.x, _roos2.y);
                if (scorep1 > 25) {
                    scorep1 = scorep1 - 25;

                    if (mintext !== undefined) {
                        mintext.kill();
                    }

                    mintext = this.add.text(_roos2.x, _roos2.y - 40, 'P1\n- 25', {
                        font: '20px Arial',
                        fill: '#0000FF',
                        align: 'center'
                    });
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.minaway, this);
                } else {
                    scorep1 = 0;
                }
                scoreTextp1.text = "Score P1\n" + scorep1;
                // Kill the bullet
                roos2open = false;
                _roos2.kill();

                //bullet.animations.play('hit');
            }, null, this);








            this.physics.arcade.collide(bulletPool, coinGroup, function(bullet, roos1) {
                audiohit.play();
                coinstot = coinstot + 1;
                if (mintext !== undefined) {
                    mintext.kill();
                }

                if (energyp1 < 95) {
                    energyp1 = energyp1 + 5;
                }
                mintext = this.add.text(roos1.x, roos1.y - 40, 'P1\n+ 15', {
                    font: '20px Arial',
                    fill: '#0000FF',
                    align: 'center'
                });
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.minaway, this);
                scorep1 = scorep1 + 15;
                scoreTextp1.text = "Score P1\n" + scorep1;

                // Create an explosion
                this.getExplosion(roos1.x, roos1.y);
                roos1.kill();
                coinsalive--;
                this.checkCoins();

            }, null, this);






            // Rotate all living bullets to match their trajectory
            bulletPool.forEachAlive(function(bullet) {
                bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
            }, this);



            // Aim the gun at the pointer.
            // All this function does is calculate the angle using
            // Math.atan2(yPointer-yGun, xPointer-xGun)
            //this.gun.rotation = this.physics.arcade.angleToPointer(this.gun);
            //console.log("gun rotation = " + this.gun.rotation);

            //p1 control
            if (cursors.up.isDown && this.gun.rotation <= 1.7 && p1gameover === false) {
                this.gun.rotation = this.gun.rotation - 0.02;

            } else if (cursors.down.isDown && this.gun.rotation < 0.6 && p1gameover === false) {
                //console.log(player.x);
                this.gun.rotation = this.gun.rotation + 0.02;
            }

            if (p1shoot.isDown && p1gameover === false) {
                this.shootBullet1();
            }

            // the shooting
            // Shoot a bullet
            //if (this.input.activePointer.isDown) {
            //  this.shootBullet()
            //}
        },
        levelup: function() {

            if (levelup !== null || levelup !== undefined) {
                levelup = null;
                leveluptween = null;
            }

            levelup = this.game.add.sprite(this.game.width / 2, 600, 'levelup');
            levelup.anchor.setTo(0.5, 0.5);

            leveluptween = this.game.add.tween(levelup).to({
                y: 150
            }, 2000, Phaser.Easing.Bounce.Out, true);
            leveluptween.onComplete.add(this.removelevelup, this);


            //
        },
        removelevelup: function() {
            levelup.destroy();
            leveluptween = null;
        },
        minaway: function() {
            mintext.destroy();
            //
        },


        checkCoins: function() {
            if (coinstot === 20) {
                curlevel = 2;
                this.levelup();
            } else if (coinstot === 50) {
                curlevel = 3;
                this.levelup();
                roos2.revive();
                if (this.game.multiplay === true) {
                    roos1.revive();
                }
            } else if (coinstot === 80) {
                curlevel = 4;
                this.levelup();
            } else if (coinstot === 120) {
                curlevel = 5;
                this.levelup();
            } else if (coinstot === 150) {
                curlevel = 6;
                this.levelup();
            } else if (coinstot === 180) {
                curlevel = 7;
                this.levelup();
            } else if (coinstot === 210) {
                curlevel = 8;
                this.levelup();
            } else if (coinstot === 240) {
                curlevel = 9;
                this.levelup();
            } else if (coinstot === 270) {
                curlevel = 10;
                this.levelup();
            };



            if (coinsalive === 0) {
                coinGroup.forEach(function(item) {
                    coinsalive = 4;
                    var rx = this.game.rnd.integerInRange(this.game.width / 2 - 200, this.game.width / 2 + 200);
                    var ry = this.game.rnd.integerInRange(50, 300);
                    item.reset(rx, ry);
                }, this);
                // TODO TODO TODO Haal hier weg

            }
            //
        },

        shootBullet1: function() {

            if (p1blocked === false && p1gameover === false) {
                if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
                if (this.time.now - this.lastBulletShotAt < SHOT_DELAY) return;
                this.lastBulletShotAt = this.time.now;

                // Get a dead bullet from the pool
                var bullet = bulletPool.getFirstDead();

                // If there aren't any bullets available then don't shoot
                if (bullet === null || bullet === undefined) return;

                // Revive the bullet
                // This makes the bullet "alive"
                bullet.revive();

                // Bullets should kill themselves when they leave the world.
                // Phaser takes care of this for me by setting this flag
                // but you can do it yourself by killing the bullet if
                // its x,y coordinates are outside of the world.
                bullet.checkWorldBounds = true;
                bullet.outOfBoundsKill = true;

                // Set the bullet position to the gun position.
                bullet.reset(this.gun.x, this.gun.y);
                bullet.rotation = this.gun.rotation;

                // Shoot it in the right direction
                bullet.body.velocity.x = Math.cos(bullet.rotation) * BULLET_SPEED;
                bullet.body.velocity.y = Math.sin(bullet.rotation) * BULLET_SPEED;
                energyp1 = energyp1 - 4;
            }


        },
        shootBullet2: function() {

            if (p2blocked === false && p2gameover === false) {
                if (this.lastBulletShotAt2 === undefined) this.lastBulletShotAt2 = 0;
                if (this.time.now - this.lastBulletShotAt2 < SHOT_DELAY) return;
                this.lastBulletShotAt2 = this.time.now;

                // Get a dead bullet from the pool
                var bullet = bulletPool2.getFirstDead();

                // If there aren't any bullets available then don't shoot
                if (bullet === null || bullet === undefined) return;

                // Revive the bullet
                // This makes the bullet "alive"
                bullet.revive();

                // Bullets should kill themselves when they leave the world.
                // Phaser takes care of this for me by setting this flag
                // but you can do it yourself by killing the bullet if
                // its x,y coordinates are outside of the world.
                bullet.checkWorldBounds = true;
                bullet.outOfBoundsKill = true;

                // Set the bullet position to the gun position.
                bullet.reset(this.gun2.x, this.gun2.y);
                bullet.rotation = this.gun2.rotation;

                // Shoot it in the right direction
                bullet.body.velocity.x = -Math.cos(bullet.rotation) * BULLET_SPEED;
                bullet.body.velocity.y = -Math.sin(bullet.rotation) * BULLET_SPEED;
                energyp2 = energyp2 - 4;
            }


        },

        getExplosion: function(x, y) {
            var explosion = explosionGroup.getFirstDead();

            // If there aren't any available, create a new one
            if (explosion === null) {
                explosion = this.add.sprite(0, 0, 'explosion');
                explosion.anchor.setTo(0.5, 0.5);

                // Add an animation for the explosion that kills the sprite when the
                // animation is complete
                var animation = explosion.animations.add('boom', [0, 1, 2, 3], 60, false);
                animation.killOnComplete = true;

                // Add the explosion sprite to the group
                explosionGroup.add(explosion);
            }

            // Revive the explosion (set it's alive property to true)
            // You can also define a onRevived event handler in your explosion objects
            // to do stuff when they are revived.
            explosion.revive();

            // Move the explosion to the given coordinates
            explosion.x = x;
            explosion.y = y;

            // Set rotation of the explosion at random for a little variety
            explosion.angle = this.rnd.integerInRange(0, 360);

            // Play the animation
            explosion.animations.play('boom');

            // Return the explosion itself in case we want to do anything else with it
            //return explosion;

        },
        animationStopped: function(check) {

            //this.game.debug.body(roos1);
            //this.game.debug.body(roos2);
            roos2open = true;
            roos1open = true;

        },

        render: function() {

            //this.game.debug.body(roos1);
            //this.game.debug.body(roos2);
        }

    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Catmouse = Catmouse;
}());
