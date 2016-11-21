(function() {
    'use strict';

    function Platformer() {}

    var platforms;
    var platform;
    var cursors;

    var music;

    var stars;
    var score = 0;
    var scoreText;
    var facingp1 = 'left';
    var facingp2 = 'right';

    var platplayer1;
    var platplayer2;

    var p1jump;

    var lifeactive = false;


    var p2left;
    var p2right;
    var p2up;
    var p2down;

    var scorep1 = 0;
    var scorep2 = 0;

    var scoretogether = 0;
    var scoreTextp1;
    var scoreTextp2;

    var enemy1;
    var enemy1anim
    var enemy2;
    var enemy2anim;

    var mintext;
    var fulltext;

    var audiohit;
    var audiocoin;

    var scoringtext;

    var leveluptween;
    var levelup;

    var timerdisplay;
    var counter = 30;

    var p1nextlevel = false;
    var p2nextlevel = false;

    var levelscores = [50, 100, 150, 200, 250];
    var currentlevel = 0;

    var lifep11;
    var lifep12;
    var lifep13;

    var lifep21;
    var lifep22;
    var lifep23;

    var enemyspeed1 = 100;
    var enemyspeed2 = -100;

    var starsalive = 15;
    var levens1 = 3;
    var levens2 = 3;


    var ledge1;
    var ledge2;
    var ledge3;
    var ledge4;

    var lifeup;

    var round = 1;

    var p1over = false;
    var p2over = false;

    var valid;

    var creditadd;

    var credit;

    var bg1;
    var bg2;
    var bg3;



    Platformer.prototype = {
        create: function() {

            credit = localStorage.getItem('credits');

            this.game.currentgame = "platformer";
            enemyspeed1 = 100;
            enemyspeed2 = -100;

            //  We're going to be using physics, so enable the Arcade Physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            music = this.game.add.audio('platformer');

            music.play();
            music.loopFull(1.0);

            audiohit = this.game.add.audio('hitby');
            audiocoin = this.game.add.audio('coin');

            //  A simple background for our game
            bg1 = this.game.add.sprite(0, -60, 'sky');
            bg2 = this.game.add.sprite(0, -60, 'pbbg2');
            bg2.visible = false;
            bg3 = this.game.add.sprite(0, -60, 'pbbg3');
            bg3.visible = false;

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = this.game.add.group();

            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;

            // Here we create the ground.
            platform = platforms.create(0, this.game.world.height - 70, 'platformground');

            platform.alpha = 0.1;

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            platform.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            platform.body.immovable = true;

            //  Now let's create legdes
            var randomlegde = this.game.rnd.integerInRange(0, 2);

            currentlevel = 0;
            lifeactive = false;

            switch (randomlegde) {
                case 0:
                    ledge1 = platforms.create(400, 400, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(500, 125, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(100, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(600, 300, 'platform');
                    ledge4.body.immovable = true;
                    break;
                case 1:
                    ledge1 = platforms.create(100, 100, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(400, 400, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(300, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(700, 300, 'platform');
                    ledge4.body.immovable = true;
                    break;
                case 2:
                    ledge1 = platforms.create(100, 270, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(350, 170, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(600, 270, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(350, 370, 'platform');
                    ledge4.body.immovable = true;
                    break;
            }




            if (this.game.multiplay === true) {
                // NOTE Player2
                p2left = this.input.keyboard.addKey(Phaser.Keyboard.A);
                p2right = this.input.keyboard.addKey(Phaser.Keyboard.D);
                p2up = this.input.keyboard.addKey(Phaser.Keyboard.Q);
                p2down = this.input.keyboard.addKey(Phaser.Keyboard.S);
                platplayer2 = this.game.add.sprite(600, this.game.world.height - 250, 'crp2');
                platplayer2.anchor.setTo(0.5, 0.5);
                platplayer2.scale.setTo(0.6, 0.6);
                this.game.physics.arcade.enable(platplayer2);
                platplayer2.body.setSize(100, 100, 0, 0);
                platplayer2.body.bounce.y = 0.1;
                platplayer2.body.gravity.y = 500;
                platplayer2.body.collideWorldBounds = true;
                //  Our two animations, walking left and right.
                platplayer2.animations.add('left', [6, 7, 8], 10, true);
                platplayer2.animations.add('right', [9, 10, 11], 10, true);
                platplayer2.animations.add('jumpleft', [12, 13, 14], 10, true);
                platplayer2.animations.add('jumpright', [17, 16, 15], 10, true);
                scoreTextp2 = this.game.add.bitmapText(this.game.width - 100, 40, 'scorefont', 'Score P2\n0', 40);
                scoreTextp2.anchor.setTo(0.5, 0.5);
                lifep21 = this.game.add.image(760, 30, 'p2life');
                lifep22 = this.game.add.image(720, 30, 'p2life');
                lifep23 = this.game.add.image(680, 30, 'p2life');
            }






            p1jump = this.input.keyboard.addKey(Phaser.Keyboard.Z);

            // p1
            // The platplayer1 and its settings
            platplayer1 = this.game.add.sprite(400, this.game.world.height - 250, 'crp1');
            platplayer1.anchor.setTo(0.5, 0.5);
            platplayer1.scale.setTo(0.6, 0.6);



            this.game.physics.arcade.enable(platplayer1);
            platplayer1.body.setSize(100, 100, 0, 0);

            //  platplayer1 physics properties. Give the little guy a slight bounce.
            platplayer1.body.bounce.y = 0.1;

            platplayer1.body.gravity.y = 500;
            platplayer1.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
            platplayer1.animations.add('left', [6, 7, 8], 10, true);
            platplayer1.animations.add('right', [9, 10, 11], 10, true);
            platplayer1.animations.add('jumpleft', [12, 13, 14], 10, true);
            platplayer1.animations.add('jumpright', [17, 16, 15], 10, true);

            this.createStars();


            //scoringtext = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height - 30, 'scorefont', 'score voor volgende ronde: ' + levelscores[currentlevel], 30);
            //scoringtext.anchor.setTo(0.5, 0.5);
            //scoringtext.align = "center";

            scoreTextp1 = this.game.add.bitmapText(100, 40, 'scorefont', 'Score P1\n0', 40);

            scoreTextp1.anchor.setTo(0.5, 0.5);


            //  Our controls.
            cursors = this.game.input.keyboard.createCursorKeys();

            this.createenemy1();
            this.createenemy2();

            //timerdisplay = this.game.add.bitmapText(this.game.world.centerX, 50, 'scorefont', 'Go!', 40);
            //timerdisplay.anchor.setTo(0.5, 0.5);
            //this.game.time.events.loop(Phaser.Timer.SECOND, this.timerLoop, this);

            //LIFE UP
            lifeup = this.game.add.sprite(this.game.width / 2, 30, 'lifeup');
            lifeup.scale.setTo(0.7, 0.7);
            this.game.physics.arcade.enable(lifeup);
            lifeup.body.gravity.y = 100;
            lifeup.kill();



            lifep11 = this.game.add.image(240, 30, 'p1life');
            lifep12 = this.game.add.image(280, 30, 'p1life');
            lifep13 = this.game.add.image(320, 30, 'p1life');

            if (this.game.multiplay === true) {
                var arraylives = [lifep11, lifep12, lifep13, lifep21, lifep22, lifep23];
            } else {
                var arraylives = [lifep11, lifep12, lifep13];
            }


            for (var n = 0; n < arraylives.length; n++) {
                arraylives[n].scale.setTo(0.6, 0.6);
                arraylives[n].anchor.setTo(0.5, 0.5);
            }

            valid = this.game.add.image(this.game.width - 100, 100, 'valid')
            valid.anchor.set(0.5, 0.5);
            valid.visible = false;


            creditadd = this.input.keyboard.addKey(Phaser.Keyboard.O);
            creditadd.onDown.add(this.creditadd, this);




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

        update: function() {



            enemy1.animations.play('munch');
            enemy1.body.velocity.x = enemyspeed1;
            enemy1.outOfBoundsKill = true;

            enemy2.animations.play('munch');
            enemy2.body.velocity.x = enemyspeed2;
            enemy2.outOfBoundsKill = true;


            //  Collide the platplayer1 and the stars with the platforms
            this.game.physics.arcade.collide(platplayer1, platforms);

            //this.game.physics.arcade.collide(platplayer2, enemy1);
            //this.game.physics.arcade.collide(platplayer1, enemy1);
            this.game.physics.arcade.collide(enemy1, platforms);
            this.game.physics.arcade.collide(enemy2, platforms);

            this.game.physics.arcade.collide(stars, platforms);
            //  Checks to see if the platplayer1 overlaps with any of the stars, if he does call the collectStar function
            this.game.physics.arcade.overlap(platplayer1, stars, this.collectStar1, null, this);

            this.game.physics.arcade.overlap(platplayer1, enemy1, this.hitenemy, null, this);
            this.game.physics.arcade.overlap(platplayer1, enemy2, this.hitenemy, null, this);

            if (lifeactive === true) {
                this.game.physics.arcade.collide(lifeup, platforms);
                this.game.physics.arcade.overlap(platplayer1, lifeup, this.collectlife, null, this);
                if (this.game.multiplay === true) {
                    this.game.physics.arcade.overlap(platplayer2, lifeup, this.collectlife2, null, this);
                }

            }


            if (this.game.multiplay === true) {


                // TODO Player 2
                this.game.physics.arcade.collide(platplayer2, platforms);
                this.game.physics.arcade.collide(platplayer2, platplayer1);
                this.game.physics.arcade.overlap(platplayer2, stars, this.collectStar2, null, this);
                this.game.physics.arcade.overlap(platplayer2, enemy1, this.hitenemy, null, this);
                this.game.physics.arcade.overlap(platplayer2, enemy2, this.hitenemy, null, this);
                platplayer2.body.velocity.x = 0;
                if (p2left.isDown) {
                    //  Move to the left
                    platplayer2.body.velocity.x = -240;
                    facingp2 = 'left';
                    platplayer2.animations.play('left');
                } else if (p2right.isDown) {
                    //  Move to the right
                    platplayer2.body.velocity.x = 240;
                    facingp2 = 'right';
                    platplayer2.animations.play('right');
                } else {
                    //  Stand still
                    platplayer2.animations.stop();

                    switch (facingp2) {
                        case 'left':
                            platplayer2.frame = 2;
                            break;
                        case 'right':
                            platplayer2.frame = 3;
                            break;


                    }
                }
                //  Allow the platplayer1 to jump if they are touching the ground.
                if (p2up.isDown && platplayer2.body.touching.down) {
                    platplayer2.body.velocity.y = -450;
                }

                if (platplayer2.body.touching.down === false && p2up.isDown) {
                    switch (facingp2) {
                        case 'left':
                            platplayer2.animations.play('jumpleft');
                            break;
                        case 'right':
                            platplayer2.animations.play('jumpright');
                            break;
                    }
                }
            }








            //  Reset the platplayer1s velocity (movement)
            platplayer1.body.velocity.x = 0;

            if (cursors.left.isDown) {
                //  Move to the left
                platplayer1.body.velocity.x = -240;
                facingp1 = 'left';
                platplayer1.animations.play('left');
            } else if (cursors.right.isDown) {
                //  Move to the right
                platplayer1.body.velocity.x = 240;
                facingp1 = 'right';
                platplayer1.animations.play('right');
            } else {
                //  Stand still
                platplayer1.animations.stop();


                switch (facingp1) {
                    case 'left':
                        platplayer1.frame = 2;
                        break;
                    case 'right':
                        platplayer1.frame = 3;
                        break;


                }
            }
            //  Allow the platplayer1 to jump if they are touching the ground.
            if (p1jump.isDown && platplayer1.body.touching.down) {
                platplayer1.body.velocity.y = -450;
            }

            if (platplayer1.body.touching.down === false && p1jump.isDown) {
                switch (facingp1) {
                    case 'left':
                        platplayer1.animations.play('jumpleft');
                        break;
                    case 'right':
                        platplayer1.animations.play('jumpright');
                        break;
                }
            }






        },
        // NOTE OUR ENDING
        timerLoop: function() {
            //slidertweento.start();
            counter--;
            timerdisplay.setText(counter);
            if (counter === 0) {
                this.game.scorep1 = scorep1;
                this.game.scorep2 = scorep2;
                scorep1 = 0;
                scorep2 = 0;

                music.stop();
                this.game.state.start('score');
                counter = 50;


            }
        },
        levelup: function() {
            this.changeledges();
            if (round < 9) {
                round = round + 1;
            }
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

            switch (round) {
                case 2:
                    enemyspeed1 = 130;
                    enemyspeed2 = -130;
                    break;
                case 3:
                    enemyspeed1 = 200;
                    enemyspeed2 = -200;
                    var randomx = this.game.rnd.integerInRange(20, 980);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
                case 4:
                    //this.changeledges();
                    bg1.visible = false;
                    bg2.visible = true;
                    bg3.visible = false;
                    enemyspeed1 = 230;
                    enemyspeed2 = -230;
                    break;
                case 5:
                    enemyspeed1 = 300;
                    enemyspeed2 = -300;
                    var randomx = this.game.rnd.integerInRange(0, 1000);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
                case 6:
                    enemyspeed1 = 360;
                    enemyspeed2 = -360;
                    break;
                case 7:
                    bg1.visible = false;
                    bg2.visible = false;
                    bg3.visible = true;
                    enemyspeed1 = 400;
                    enemyspeed2 = -400;
                    var randomx = this.game.rnd.integerInRange(0, 1000);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
                case 8:
                    enemyspeed1 = 440;
                    enemyspeed2 = -440;
                    var randomx = this.game.rnd.integerInRange(0, 1000);
                    lifeup.x = randomx;
                    lifeup.y = 0;
                    lifeactive = true;
                    lifeup.kill();
                    lifeup.revive();
                    break;
            }

        },
        removelevelup: function() {
            levelup.destroy();
            leveluptween = null;
        },
        changeledges: function() {
            // NOTE add the code for changing ledges
            var randomlegde = this.game.rnd.integerInRange(0, 2);

            switch (randomlegde) {
                case 0:
                    ledge1.x = 400;
                    ledge1.y = 400;
                    ledge2.x = 500;
                    ledge2.y = 125;
                    ledge3.x = 100;
                    ledge3.y = 230;
                    ledge4.x = 600;
                    ledge4.y = 300;
                    /*ledge1 = platforms.create(400, 400, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(500, 125, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(100, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(600, 300, 'platform');
                    ledge4.body.immovable = true;*/
                    break;
                case 1:
                    ledge1.x = 100;
                    ledge1.y = 100;
                    ledge2.x = 400;
                    ledge2.y = 400;
                    ledge3.x = 300;
                    ledge3.y = 230;
                    ledge4.x = 700;
                    ledge4.y = 300;
                    /*ledge1 = platforms.create(100, 100, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platfozrms.create(400, 400, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(300, 230, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(700, 300, 'platform');
                    ledge4.body.immovable = true;*/
                    break;
                case 2:
                    ledge1.x = 100;
                    ledge1.y = 270;
                    ledge2.x = 350;
                    ledge2.y = 170;
                    ledge3.x = 600;
                    ledge3.y = 270;
                    ledge4.x = 350;
                    ledge4.y = 370;
                    /*ledge1 = platforms.create(100, 270, 'platform');
                    ledge1.body.immovable = true;
                    ledge2 = platforms.create(350, 170, 'platform');
                    ledge2.body.immovable = true;
                    ledge3 = platforms.create(600, 270, 'platform');
                    ledge3.body.immovable = true;
                    ledge4 = platforms.create(350, 370, 'platform');
                    ledge4.body.immovable = true;*/
                    break;
            }
        },
        collectlife: function(platplayer1, life) {
            {

                if (levens1 < 3) {
                    lifeup.kill();

                    switch (levens1) {
                        case 1:
                            lifep11.visible = true;
                            lifep12.visible = true;
                            lifep13.visible = false;
                            break;
                        case 2:
                            lifep11.visible = true;
                            lifep12.visible = true;
                            lifep13.visible = true;
                            break;

                    }
                    levens1++;
                } else {
                    if (fulltext) {
                        fulltext.destroy();
                    }

                    fulltext = this.add.text(platplayer1.x, platplayer1.y - 40, 'Al maximum levens', {
                        font: '15px Arial',
                        fill: '#000',
                        align: 'center'
                    });
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fullaway, this);
                }
                //audiocoin.play();
                // Removes the star from the screen




                //if (score === 240) {
                //  this.game.state.start('score');
                //}
            }


        },
        collectlife2: function(platplayer2, life) {
            {
                //audiocoin.play();
                // Removes the star from the screen

                if (levens2 < 3) {
                    lifeup.kill();

                    switch (levens2) {
                        case 1:
                            lifep21.visible = true;
                            lifep22.visible = true;
                            lifep23.visible = false;
                            break;
                        case 2:
                            lifep21.visible = true;
                            lifep22.visible = true;
                            lifep23.visible = true;
                            break;

                    }
                    levens2++;
                } else {
                    if (fulltext) {
                        fulltext.destroy();
                    }

                    fulltext = this.add.text(platplayer2.x, platplayer2.y - 40, 'Al maximum levens', {
                        font: '15px Arial',
                        fill: '#000',
                        align: 'center'
                    });
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fullaway, this);
                }



                //if (score === 240) {
                //  this.game.state.start('score');
                //}
            }


        },




        collectStar1: function(platplayer1, star) {
            {
                audiocoin.play();
                // Removes the star from the screen
                star.kill();

                //  Add and update the score
                scorep1 += 10;
                scoreTextp1.text = 'Score P1:\n' + scorep1;
                scoretogether = scorep1 + scorep2;
                starsalive--;
                this.checkscore();

                //if (score === 240) {
                //  this.game.state.start('score');
                //}
            }


        },

        collectStar2: function(platplayer1, star) {
            {
                audiocoin.play();
                // Removes the star from the screen
                star.kill();
                //  Add and update the score
                scorep2 += 10;
                scoreTextp2.text = 'Score P2:\n' + scorep2;
                scoretogether = scorep1 + scorep2;
                starsalive--;
                this.checkscore();
                //if (score === 240) {
                //this.game.state.start('score');
                //}
            }


        },


        checkscore: function() {
            if (starsalive === 0) {
                starsalive = 14;
                this.createStars();
                this.levelup();
            }

        },
        hitenemy: function(enemy, player) {
            audiohit.play();

            if (mintext) {
                mintext.destroy();
            }

            mintext = this.add.text(player.x, player.y - 40, '- leven', {
                font: '20px Arial',
                fill: '#000',
                align: 'center'
            });

            switch (enemy.key) {


                case "crp1":
                    levens1 = levens1 - 1;
                    this.checklives("crp1");
                    if (scorep1 > 0) {
                        scorep1 = scorep1 - 10;
                        scoreTextp1.text = 'Score P1\n' + scorep1;

                    }
                    break;

                case "crp2":
                    levens2 = levens2 - 1;
                    this.checklives("crp2");
                    if (scorep2 > 0) {
                        scorep2 = scorep2 - 10;
                        scoreTextp2.text = 'Score P2\n' + scorep2;

                    }
                    break;
            }

            player.kill();
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.minaway, this);

            //scoreTextp1.anchor.setTo(0.5, 0.5);
        },
        minaway: function() {
            mintext.destroy();
            //
        },
        fullaway: function() {
            fulltext.destroy();
            //
        },

        checklives: function(playerthis) {
            switch (playerthis) {
                case "crp1":
                    if (levens1 === 2) {
                        lifep11.visible = true;
                        lifep12.visible = true;
                        lifep13.visible = false;
                    } else if (levens1 === 1) {
                        lifep11.visible = true;
                        lifep12.visible = false;
                        lifep13.visible = false;
                    } else if (levens1 === 0) {
                        lifep11.visible = false;
                        lifep12.visible = false;
                        lifep13.visible = false;
                        platplayer1.kill();
                        p1over = true;

                        if (this.game.multiplay === true) {
                            if (p2over === true) {
                                this.game.scorep1 = scorep1;
                                this.game.scorep2 = scorep2;
                                scorep1 = 0;
                                scorep2 = 0;
                                scoretogether = 0;
                                music.stop();
                                levens1 = 3;
                                levens2 = 3;
                                p2over = false;
                                p1over = false;
                                this.game.state.start('score');
                            }
                        } else if (this.game.multiplay === false || this.game.multiplay === undefined) {
                            scorep2 = null;
                            this.game.scorep1 = scorep1;
                            this.game.scorep2 = scorep2;
                            scorep1 = 0;
                            scorep2 = null;
                            scoretogether = 0;
                            music.stop();
                            levens1 = 3;
                            levens2 = 3;
                            p2over = false;
                            p1over = false;
                            this.game.state.start('score');

                        }
                    }
                    break;
                case "crp2":
                    if (levens2 === 2) {
                        lifep21.visible = true;
                        lifep22.visible = true;
                        lifep23.visible = false;
                    } else if (levens2 === 1) {
                        lifep21.visible = true;
                        lifep22.visible = false;
                        lifep23.visible = false;
                    } else if (levens2 === 0) {
                        lifep21.visible = false;
                        lifep22.visible = false;
                        lifep23.visible = false;
                        platplayer2.kill();
                        p2over = true;
                        if (p1over === true) {
                            this.game.scorep1 = scorep1;
                            this.game.scorep2 = scorep2;
                            scorep1 = 0;
                            scorep2 = 0;
                            scoretogether = 0;
                            music.stop();
                            levens1 = 3;
                            levens2 = 3;
                            p2over = false;
                            p1over = false;
                            this.game.state.start('score');
                        }
                    }
                    break;

            }
        },




        createStars: function() {
            starsalive = 14;
            var randomy = this.game.rnd.integerInRange(-100, 400);
            //  Finally some stars to collect
            stars = this.game.add.group();
            //  We will enable physics for any star that is created in this group
            stars.enableBody = true;
            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 14; i++) {
                //  Create a star inside of the 'stars' group
                var star = stars.create(i * 70 + 30, randomy, 'star');
                //  Let gravity do its thing
                star.body.gravity.y = 200;
                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
        },

        createenemy1: function() {

            var randomy = this.game.rnd.integerInRange(-450, 450);
            var randomTimer = this.game.rnd.integerInRange(3000, 7000);

            if (enemy1 === undefined) {
                enemy1 = this.game.add.sprite(10, randomy, 'enemy');
                enemy1anim = enemy1.animations.add('munch', [0, 1], 10, true);
                enemy1.kill();
                enemy1.revive();
            } else {
                enemy1.kill();
                enemy1 = this.game.add.sprite(10, randomy, 'enemy');
                enemy1anim = enemy1.animations.add('munch', [0, 1], 10, true);
                enemy1.kill();
                enemy1.revive();
            }



            this.physics.enable(enemy1, Phaser.Physics.ARCADE);
            // Set its initial state to "dead".
            enemy1.scale.setTo(0.5, 0.5);
            enemy1.body.bounce.y = 0.6;
            enemy1.body.gravity.y = 500;


            this.game.time.events.add(randomTimer, this.createenemy1, this);
        },

        createenemy2: function() {


            var randomy = this.game.rnd.integerInRange(-450, 450);

            var randomTimer = this.game.rnd.integerInRange(5000, 10000);

            if (enemy2 === undefined) {
                enemy2 = this.game.add.sprite(this.game.width + 10, randomy, 'enemy');
                enemy2anim = enemy2.animations.add('munch', [0, 1], 10, true);
                enemy2.kill();
                enemy2.revive();
            } else {
                enemy2.kill();
                enemy2 = this.game.add.sprite(this.game.width + 10, randomy, 'enemy');
                enemy1anim = enemy2.animations.add('munch', [0, 1], 10, true);
                enemy2.kill();
                enemy2.revive();
            }



            this.physics.enable(enemy2, Phaser.Physics.ARCADE);
            // Set its initial state to "dead".
            enemy2.scale.setTo(-0.5, 0.5);
            enemy2.body.bounce.y = 0.6;
            enemy2.body.gravity.y = 500;


            this.game.time.events.add(randomTimer, this.createenemy2, this);
        },



        render: function() {

            //this.game.debug.body(platplayer1);

        }
    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Platformer = Platformer;
}());
