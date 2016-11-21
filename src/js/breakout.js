(function() {
    'use strict';

    function Breakout() {}

    var ball;

    var paddle;
    var bricks;
    var ballOnPaddle = true;
    //
    var bothballsdown = true;

    var lives = 5;
    var score = 0;

    var scoreText;
    var livesText;
    var introText;
    var s;
    var p1left;
    var p1right;
    var p1shoot;
    var cursors;
    var music;
    var levelup;
    var leveluptween;

    var paddle2;
    var ball2;
    var ballOnPaddle2 = true;
    var scorep2 = 0;
    var p2right;
    var p2left;
    var p2shoot;

    var valid;
    var creditadd;

    var bg1;
    var bg2;
    var bgbool = false;

    var lifeup;
    var lifeactive = false;

    var credit;





    Breakout.prototype = {

        create: function() {
            //this.input.onDown.add(this.onInputDown, this);
            credit = localStorage.getItem('credits');
            this.game.currentgame = "breakout";
            this.game.p1score = "breakout";

            music = this.game.add.audio('breakout');

            music.play();
            music.loopFull(1.0);

            lives = 5;
            lifeactive = false;
            this.physics.startSystem(Phaser.Physics.ARCADE);

            //  We check bounds collisions against all walls other than the bottom one
            this.physics.arcade.checkCollision.down = false;

            bg1 = this.game.add.image(0, 0, 'bobg');
            bg2 = this.game.add.image(0, 0, 'raakzebg');
            bg2.visible = false;



            bricks = this.add.group();
            bricks.enableBody = true;
            bricks.physicsBodyType = Phaser.Physics.ARCADE;

            var brick;
            cursors = this.game.input.keyboard.createCursorKeys();
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 15; x++) {
                    brick = bricks.create(250 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y + 1) + '_1.png');
                    brick.body.bounce.set(1);
                    brick.body.immovable = true;
                }
            }

            // NOTE p1
            paddle = this.add.sprite(this.world.centerX - 100, 560, 'paddle1');
            paddle.anchor.setTo(0.5, 0.5);
            this.physics.enable(paddle, Phaser.Physics.ARCADE);
            paddle.body.collideWorldBounds = true;
            paddle.body.bounce.set(1);
            paddle.body.immovable = true;
            //Ball 1
            ball = this.add.sprite(this.world.centerX, paddle.y - 56, 'breakout', 'ball_1.png');
            ball.anchor.set(0.5);
            ball.checkWorldBounds = true;
            this.physics.enable(ball, Phaser.Physics.ARCADE);
            ball.body.collideWorldBounds = true;
            ball.body.bounce.set(1);
            ball.animations.add('spin', ['ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png'], 50, true, false);
            ball.events.onOutOfBounds.add(this.ballLost, this);
            p1shoot = this.input.keyboard.addKey(Phaser.Keyboard.Z);
            p1shoot.onDown.add(this.releaseBall, this);

            paddle.alpha = 0.4;



            if (this.game.multiplay === true) {
                // NOTE p2s
                paddle2 = this.add.sprite(this.world.centerX + 100, 560, 'paddle2');
                paddle2.anchor.setTo(0.5, 0.5);
                this.physics.enable(paddle2, Phaser.Physics.ARCADE);
                paddle2.body.collideWorldBounds = true;
                paddle2.body.bounce.set(1);
                paddle2.body.immovable = true;
                //Ball 2
                ball2 = this.add.sprite(this.world.centerX, paddle2.y - 56, 'breakout', 'ball_1.png');
                ball2.anchor.set(0.5);
                ball2.checkWorldBounds = true;
                this.physics.enable(ball2, Phaser.Physics.ARCADE);
                ball2.body.collideWorldBounds = true;
                ball2.body.bounce.set(1);
                ball2.animations.add('spin', ['ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png'], 50, true, false);
                ball2.events.onOutOfBounds.add(this.ballLost2, this);
                p2shoot = this.input.keyboard.addKey(Phaser.Keyboard.Q);
                p2shoot.onDown.add(this.releaseBall2, this);
                p2left = this.input.keyboard.addKey(Phaser.Keyboard.A);
                p2right = this.input.keyboard.addKey(Phaser.Keyboard.D);
                paddle2.alpha = 0.4;
            }

            scoreText = this.game.add.bitmapText(this.game.width / 2, 50, 'scorefont', 'score: 0', 30);
            scoreText.anchor.setTo(0.5, 0.5);
            livesText = this.game.add.bitmapText(100, 50, 'scorefont', '5\nlevens', 30);
            livesText.anchor.setTo(0.5, 0.5);
            introText = this.game.add.bitmapText(this.world.centerX, 400, 'scorefont', 'Druk op om te beginnen!', 30);
            introText.anchor.setTo(0.5, 0.5);




            //lifeadd
            //LIFE UP
            lifeup = this.game.add.sprite(this.game.width / 2, 30, 'lifeup');
            lifeup.scale.setTo(0.7, 0.7);
            this.game.physics.arcade.enable(lifeup);
            lifeup.body.gravity.y = 100;
            lifeup.kill();

            //this.input.onDown.add(this.releaseBall, this);

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
            //paddle.x = this.input.x;

            if (paddle.x < 24) {
                paddle.x = 24;
            } else if (paddle.x > this.width - 24) {
                paddle.x = this.width - 24;
            }


            if (cursors.left.isDown) {
                paddle.x = paddle.x - 7;
                paddle.frame = 0;
            } else if (cursors.right.isDown) {
                paddle.x = paddle.x + 7;
                paddle.frame = 1;
            }

            if (ballOnPaddle) {
                ball.body.x = paddle.x;
            }

            if (this.game.multiplay === true) {
                if (p2left.isDown) {
                    paddle2.x = paddle2.x - 7;
                    paddle2.frame = 0;
                } else if (p2right.isDown) {
                    paddle2.x = paddle2.x + 7;
                    paddle2.frame = 1;
                }
                if (paddle2.x < 24) {
                    paddle2.x = 24;
                } else if (paddle2.x > this.width - 24) {
                    paddle2.x = this.width - 24;
                }
                if (ballOnPaddle2) {
                    ball2.body.x = paddle2.x;
                }
            }



            if (lifeactive === true) {
                this.physics.arcade.collide(lifeup, paddle, this.lifeup, null, this);
                if (this.game.multiplay === true) {
                    this.physics.arcade.collide(lifeup, paddle2, this.lifeup, null, this);
                }
            }





            if (bothballsdown) {
              // TODO do something when both paddles are not ok

            } else {
                this.physics.arcade.collide(ball, paddle, this.ballHitPaddle, null, this);
                this.physics.arcade.collide(ball, bricks, this.ballHitBrick, null, this);

                if (this.game.multiplay === true) {
                    this.physics.arcade.collide(ball2, bricks, this.ballHitBrick, null, this);
                    this.physics.arcade.collide(ball2, paddle2, this.ballHitPaddle, null, this);


                    if (ballOnPaddle === false) {
                        this.physics.arcade.collide(ball2, paddle, this.ballHitPaddle, null, this);
                    }

                    if (ballOnPaddle2 === false) {
                        this.physics.arcade.collide(ball, paddle2, this.ballHitPaddle, null, this);
                    }


                }


            }
        },

        onInputDown: function() {
            //this.this.state.start('menu');
        },

        releaseBall: function() {
          paddle.alpha = 1;
            if (ballOnPaddle) {
                bothballsdown = false;
                ballOnPaddle = false;
                ball.body.velocity.y = -200;
                ball.body.velocity.x = -75;
                ball.animations.play('spin');
                introText.visible = false;
            }

        },

        releaseBall2: function() {
          paddle2.alpha =1;
            if (ballOnPaddle2) {
                bothballsdown = false;
                ballOnPaddle2 = false;
                ball2.body.velocity.y = -200;
                ball2.body.velocity.x = 75;
                ball2.animations.play('spin');
                introText.visible = false;
            }

        },
        levelup: function() {
            if (bgbool === false) {
                bg1.visible = false;
                bg2.visible = true;
                bgbool = true;
            } else if (bgbool === true) {
                bg1.visible = true;
                bg2.visible = false;
                bgbool = false;
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


        },
        lifeup: function(_paddle, _lifeup) {
          lifeup.kill();
          console.log(lives);
          lives = lives + 1;
          livesText.text = 'levens: ' + lives;
          lifeactive = false;
        },

        removelevelup: function() {
            levelup.destroy();
            leveluptween = null;


        },
        ballLost: function() {
            paddle.alpha = 0.4;
            lives--;
            livesText.text = 'levens: ' + lives;

            if (lives === 0) {
                this.thisOver();
            } else {
                ballOnPaddle = true;
                if (ballOnPaddle2 === true) {
                    bothballsdown = true;
                }
                //ballOnPaddle = true;
                ball.reset(paddle.body.x, paddle.y - 56);
                //ball2.reset(paddle2.body.x + 16, paddle2.y - 56);
                ball.animations.stop();
            }

        },

        ballLost2: function() {
          paddle2.alpha = 0.4;
            lives--;
            livesText.text = 'levens: ' + lives;

            if (lives === 0) {
                this.thisOver();
            } else {
                ballOnPaddle2 = true;
                if (ballOnPaddle === true) {
                    bothballsdown = true;
                }

                ball2.reset(paddle2.body.x, paddle2.y - 56);
                ball2.animations.stop();
            }

        },

        thisOver: function() {
            this.game.scorep1 = score;
            this.game.scorep2 = null;
            //this.game.p2score = score2;
            ball.body.velocity.setTo(0, 0);
            introText.text = 'Helaas! Game Over!';
            introText.visible = true;
            ballOnPaddle = true;
            ball.reset(paddle.body.x, paddle.y - 56);
            ball.animations.stop();
            if (this.game.multiplay === true) {
                ball2.body.velocity.setTo(0, 0);
                ballOnPaddle2 = true;
                ball2.animations.stop();
                ball2.reset(paddle2.body.x, paddle2.y - 56);
            }


            //stop the music
            music.stop();
            score = 0;
            lives = 5;
            //this.game.state.clearCurrentState('breakout');
            this.game.state.start('score');

        },

        ballHitBrick: function(_ball, _brick) {

            var randomnum = this.game.rnd.integerInRange(0, 11);
            if (randomnum === 11 && lifeactive === false) {
                lifeup.x = _ball.x;
                lifeup.y = _ball.y;
                lifeactive = true;
                lifeup.revive();
            }


            _brick.kill();

            score += 10;

            scoreText.text = 'score: ' + score;

            //  Are they any bricks left?
            if (bricks.countLiving() === 0) {
                //  New level starts
                score += 200;
                scoreText.text = 'score: ' + score;
                introText.text = '- Volgend level -';

                //  Let's move the ball back to the paddle
                ballOnPaddle = true;
                ball.body.velocity.set(0);
                ball.x = paddle.x + 16;
                ball.y = paddle.y - 56;
                ball.animations.stop();

                if (this.game.multiplay === true) {
                    ballOnPaddle2 = true;
                    ball2.body.velocity.set(0);
                    ball2.x = paddle2.x + 16;
                    ball2.y = paddle2.y - 56;
                    ball2.animations.stop();
                }


                //  And bring the bricks back from the dead :)
                bricks.callAll('revive');
                this.levelup();
            }

        },
        ballHitPaddle: function(_ball, _paddle) {
            var diff = 0;
            if (_ball.x < _paddle.x) {
                //  Ball is on the left-hand side of the paddle
                diff = _paddle.x - _ball.x;
                _ball.body.velocity.x = (-8 * diff);
            } else if (_ball.x > _paddle.x) {
                //  Ball is on the right-hand side of the paddle
                diff = _ball.x - _paddle.x;
                _ball.body.velocity.x = (8 * diff);
            } else {
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                _ball.body.velocity.x = 2 + Math.random() * 6;
            }
        }
    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Breakout = Breakout;
}());
