(function() {
    'use strict';

    function Racer() {

    }



    var platforms;
    var platformAr = [];

    var speed1 = 0;

    var audiohit;
    var audiocoin;

    var car1;
    var flag;

    var keygassp1;
    //var keygassp2;
    var keybreakp1;
    //var keybreakp2;
    var keyleftp2;
    //var keyrightp2;

    var music;

    var lastten;

    var timerdisplay;
    var counter = 40;

    // TODO don't set it here
    var scorep1 = 0;
    var scorep2;

    var audiosgas;
    var audiostart;

    var itemspots = [
        [4563, 3125],
        [4025, 3088],
        [3760, 3000],
        [3092, 2275],
        [4671, 1806],
        [4961, 1301],
        [3605, 882],
        [1529, 314],
        [724, 860],
        [1465, 980],
        [2127, 1514],
        [1337, 1908],
        [1387, 3577],
        [584, 2804],
        [1387, 3577],
        [2360, 2659]
    ];

    var itemspots2 = [
        [4583, 3115],
        [4035, 3068],
        [3740, 3070],
        [3072, 2255],
        [4691, 1836],
        [4981, 1301],
        [3585, 900],
        [1550, 330],
        [740, 870],
        [1445, 980],
        [2147, 1524],
        [1357, 1918],
        [1377, 3567],
        [588, 2790],
        [1367, 3587],
        [2340, 2629]
    ];


    var itemspots3 = [
        [4573, 3155],
        [4025, 3088],
        [3760, 3000],
        [3092, 2275],
        [4671, 1806],
        [4961, 1301],
        [3605, 882],
        [1529, 314],
        [724, 860],
        [1465, 980],
        [2127, 1514],
        [1337, 1908],
        [1387, 3577],
        [584, 2804],
        [1387, 3577],
        [2360, 2659]
    ];

    var oilGroup;
    var boostGroup;
    var klokkGroup;

    var levelup;
    var leveluptween;

    var checkp1;
    var checkp2;
    var checkp3;



    var check1bool;
    var check2bool;
    var check3bool;
    var currentcheck;


    var mintext;

    var scoringtext;

    var valid;
    var creditadd;

    var credit;





    Racer.prototype = {

        create: function() {
            credit = localStorage.getItem('credits');
            this.game.currentgame = "racer";
            this.prepCollisions();
            music = this.game.add.audio('racer');
            music.play();
            music.loopFull(1.0);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.track = this.add.sprite(0, 0, 'racetrack');
            this.track.scale.setTo(2.8, 2.8);

            lastten = false;

            //this.juicy= this.game.plugins.add(new Phaser.Plugin.Juicy(this));this.screenFlash=this.juicy.createScreenFlash();this.add.existing(this.screenFlash);

            // THE ITEmS SET UP
            oilGroup = this.add.group();
            for (var i = 0; i < 4; i++) {

                var rand1 = itemspots[Math.floor(Math.random() * itemspots.length)];




                // Create each bullet and add it to the group.
                var oil = this.add.sprite(rand1[0], rand1[1], 'oil');

                // Set its pivot point to the center of the bullet
                oil.anchor.setTo(0.5, 0.5);
                oil.scale.setTo(0.5, 0.5);
                oilGroup.add(oil);
                //coin.scale.setTo(0.5, 0.5);
                // Enable physics on the bullet
                this.physics.enable(oil, Phaser.Physics.ARCADE);
                oil.body.allowGravity = false;
                // Set its initial state to "dead".
                //coin.kill();
            };

            boostGroup = this.add.group();
            for (var u = 0; u < 5; u++) {


                var rand2 = itemspots[Math.floor(Math.random() * itemspots2.length)];

                // Create each bullet and add it to the group.
                var boost = this.add.sprite(rand2[0], rand2[1], 'boost');

                // Set its pivot point to the center of the bullet
                boost.anchor.setTo(0.5, 0.5);
                boost.scale.setTo(0.5, 0.5);
                boostGroup.add(boost);
                //coin.scale.setTo(0.5, 0.5);
                // Enable physics on the bullet
                this.physics.enable(boost, Phaser.Physics.ARCADE);
                boost.body.allowGravity = false;
                // Set its initial state to "dead".
                //coin.kill();
            }

            audiohit = this.game.add.audio('birdhit');
            audiocoin = this.game.add.audio('coin');

            klokkGroup = this.add.group();
            for (var y = 0; y < 6; y++) {


                var rand2 = itemspots[Math.floor(Math.random() * itemspots3.length)];

                // Create each bullet and add it to the group.
                var klokk = this.add.sprite(rand2[0] - 20, rand2[1] + 10, 'klokk');

                // Set its pivot point to the center of the bullet
                klokk.anchor.setTo(0.5, 0.5);
                klokk.scale.setTo(0.5, 0.5);
                klokkGroup.add(klokk);
                //coin.scale.setTo(0.5, 0.5);
                // Enable physics on the bullet
                this.physics.enable(klokk, Phaser.Physics.ARCADE);
                klokk.body.allowGravity = false;
                // Set its initial state to "dead".
                //coin.kill();
            }





            audiostart = this.game.add.audio('carstart');
            audiostart.play();

            audiosgas = this.game.add.audio('cargas');
            audiosgas.loopFull(0.9);

            car1 = this.add.sprite(3427, 3508, 'car2');
            car1.anchor.setTo(0.5, 0.5);
            car1.scale.setTo(0.5, 0.5);

            flag = this.add.sprite(this.game.width / 3 * 2, 3500, 'flag');
            flag.scale.setTo(0.5, 0.5);
            flag.anchor.setTo(0.5, 0.5);

            //player = this.game.add.sprite(100, 350, 'crp1');
            //player.animations.add('left', [6, 7, 8], 10, true);
            //player.animations.add('right', [9, 10, 11], 10, true);

            this.game.physics.enable(car1, Phaser.Physics.ARCADE);

            this.track2 = this.add.sprite(0, 0, 'racedeco');
            this.track2.scale.setTo(2.8, 2.8);
            //this.track.cacheAsBitmap = true;

            this.game.world.setBounds(0, 0, 5500, 4160);

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = this.game.add.group();

            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;
            // set the size of the rectangle

            //console.log(platformAr.length);
            // [x,y,b,h]
            for (var y = 0; y < platformAr.length; y++) {
                var platform = platforms.create(platformAr[y][0], platformAr[y][1], null);
                platform.body.setSize(platformAr[y][2], platformAr[y][3], 0, 0);
                //  This stops it from falling away when you jump on it
                platform.body.immovable = true;
            }

            checkp1 = this.add.sprite(4930, 1444, 'checkp12');
            checkp2 = this.add.sprite(557, 695, 'checkp12');
            checkp3 = this.add.sprite(3745, 3592, 'checkp3');
            checkp1.anchor.setTo(0.5, 0.5);
            checkp2.anchor.setTo(0.5, 0.5);
            checkp3.anchor.setTo(0.5, 0.5);

            checkp2.kill();
            checkp3.kill();
            currentcheck = 3;



            this.physics.enable(checkp1, Phaser.Physics.ARCADE);
            this.physics.enable(checkp2, Phaser.Physics.ARCADE);
            this.physics.enable(checkp3, Phaser.Physics.ARCADE);








            this.game.physics.enable(car1, Phaser.Physics.ARCADE);
            car1.body.bounce.x = 0.5;
            car1.body.bounce.y = 0.5;

            //car1.body.collideWorldBounds = true;

            this.cursors = this.game.input.keyboard.createCursorKeys();

            keygassp1 = this.input.keyboard.addKey(Phaser.Keyboard.Z);
            //keygassp1.onDown.add(this.onDown, this);
            keybreakp1 = this.input.keyboard.addKey(Phaser.Keyboard.X);
            //keybreakp1.onDown.add(this.onDown, this);

            this.game.camera.follow(car1, Phaser.Camera.FOLLOW_LOCKON);

            timerdisplay = this.game.add.bitmapText(this.game.world.centerX + 6, 40, 'scorefont', 'READY', 30);
            timerdisplay.anchor.setTo(0.5, 0.5);
            //timerdisplay.fixedToCamera = true;
            //timerdisplay.anchor.setTo(0.5, 0.5);
            this.game.time.events.loop(Phaser.Timer.SECOND, this.timerLoop, this);




            scoringtext = this.game.add.bitmapText(this.game.world.centerX, this.game.world.height - 30, 'scorefont', 'score: ' + scorep1, 20);



            var style = {
                font: "20px Arial",
                fill: "#ffffff",
                align: "center"
            };

            scoringtext = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "score: " + scorep1, style);
            scoringtext.anchor.setTo(0.5, 0.5);
            scoringtext.align = "center";

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


        timerLoop: function() {
            //slidertweento.start();
            if (counter != 0) {
                counter--;
                timerdisplay.setText(counter);

                if (counter === 9) {
                    lastten = true;
                    flag.scale.setTo(0.9, 0.9);
                    timerdisplay.kill();
                    timerdisplay = this.game.add.bitmapText(this.game.world.centerX + 6, 40, 'scorefont', '9', 50);
                    this.track.tint = 0xff0000;
                } else if (counter === 8) {
                    this.track.tint = 0xFFFFFF;
                } else if (counter === 7) {
                    this.track.tint = 0xff0000;
                } else if (counter === 6) {
                    this.track.tint = 0xFFFFFF;
                } else if (counter === 5) {
                    this.track.tint = 0xff0000;
                } else if (counter === 4) {
                    this.track.tint = 0xFFFFFF;
                } else if (counter === 3) {
                    this.track.tint = 0xff0000;
                } else if (counter === 2) {
                    this.track.tint = 0xFFFFFF;
                } else if (counter === 1) {
                    this.track.tint = 0xff0000;
                }
            } else {
                // TODO back to score
                //this.game.scorep1 = score;
                this.game.scorep1 = scorep1;
                this.game.scorep2 = null;
                counter = 30;
                music.stop();
                audiosgas.stop();
                this.game.state.clearCurrentState('racer');
                this.game.state.start('score');
            }

            //timerdisplay.fixedToCamera = true;
        },

        update: function() {
            if (lastten === false) {
                flag.x = this.game.camera.x + 500;
                flag.y = this.game.camera.y + 50;
                timerdisplay.x = this.game.camera.x + 505;
                timerdisplay.y = this.game.camera.y + 44;
            } else {
                flag.x = this.game.camera.x + 500;
                flag.y = this.game.camera.y + 65;
                timerdisplay.x = this.game.camera.x + 490;
                timerdisplay.y = this.game.camera.y + 36;
            }






            scoringtext.x = this.game.camera.x + 505;
            scoringtext.y = this.game.camera.y + 500;

            //this.game.debug.body(platform);
            //car1.body.velocity.x = 0;
            //car1.body.velocity.y = 0;
            car1.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(car1.angle, 0));

            car1.body.angularVelocity = 0;

            //console.log(speed1);

            if (keybreakp1.isDown && speed1 >= 0) {
                speed1 = speed1 - 30;
                car1.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(car1.angle, speed1));
                //NOTE below is tracking coords of car
                //console.log("carX = " + car1.x + "   carY = " + car1.y);
            } else if (keygassp1.isDown && speed1 <= 700) {
                speed1 = speed1 + 5;
                //console.log(speed1);
                car1.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(car1.angle, speed1));
            } else if (speed1 >= 0) {
                speed1 = speed1 - 10;
                //console.log(speed1);
                car1.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(car1.angle, speed1));
            }

            if (this.cursors.left.isDown && speed1 >= 100) {
                car1.body.angularVelocity = -170;
                car1.frame = 2;
            } else if (this.cursors.right.isDown && speed1 >= 100) {
                car1.body.angularVelocity = 170;
                car1.frame = 1;
            } else {
                car1.frame = 0;
            }

            //console.log("x= " + car1.x + "   y= " + car1.y);

            this.game.physics.arcade.collide(car1, platforms, this.carcrash, null, this);




            this.physics.arcade.overlap(car1, checkp1, function(bullet, roos1) {

                if (currentcheck === 3) {
                    currentcheck = 1;
                    checkp1.kill();
                    checkp2.revive();
                    counter = counter + 5;
                    this.checkAdd();
                }


            }, null, this);

            this.physics.arcade.overlap(car1, checkp2, function(bullet, roos1) {

                if (currentcheck === 1) {
                    checkp2.kill();
                    checkp3.revive();
                    currentcheck = 2;
                    counter = counter + 5;
                    this.checkAdd();
                }

            }, null, this);

            this.physics.arcade.overlap(car1, checkp3, function(bullet, roos1) {

                if (currentcheck === 2) {
                    checkp3.kill();
                    checkp1.revive();
                    currentcheck = 3;
                    counter = counter + 5;
                    this.checkAdd();
                    //this.levelup();

                    klokkGroup.forEachDead(function(klokk) {
                        klokk.revive();
                    })

                }

            }, null, this);

            this.physics.arcade.overlap(car1, oilGroup, function(bullet, roos1) {
                audiohit.play();
                speed1 = 100;

            }, null, this);

            this.physics.arcade.overlap(car1, boostGroup, function(bullet, roos1) {

                speed1 = 1000;
                scorep1 = scorep1 + 10;
                scoringtext.setText("score: " + scorep1);

            }, null, this);


            this.physics.arcade.overlap(car1, klokkGroup, function(bullet, roos1) {
                audiocoin.play();
                counter = counter + 2;
                scorep1 = scorep1 + 20;
                scoringtext.setText("score: " + scorep1);
                roos1.kill();
                if (mintext !== undefined) {
                    mintext.kill();
                }

                mintext = this.add.text(car1.x, car1.y + 20, '+2', {
                    font: '30px Arzial',
                    fill: '#FFF',
                    align: 'center'
                });
                this.game.time.events.add(Phaser.Timer.SECOND * 1, this.minaway, this);

            }, null, this);

        },
        carcrash: function() {
            speed1 = 100;
            car1.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(car1.angle, 0));
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
        },
        checkAdd: function() {
            timerdisplay.setText(counter);
            audiocoin.play();
            scorep1 = scorep1 + 75;
            scoringtext.setText("score: " + scorep1);
            if (mintext !== undefined) {
                mintext.kill();
            }

            mintext = this.add.text(car1.x, car1.y + 20, '+5', {
                font: '30px Arial',
                fill: '#FFF',
                align: 'center'
            });
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.minaway, this);
        },
        minaway: function() {
            mintext.destroy();
            //
        },
        removelevelup: function() {
            levelup.destroy();
            leveluptween = null;
        },
        prepCollisions: function() {
            //Ohwyeaa Collison walls
            platformAr.push([384, 3812, 5080, 2]);
            platformAr.push([950, 3335, 3841, 2]);
            platformAr.push([5411, 2838, 2, 1032]);
            platformAr.push([3997, 2838, 1433, 2]);
            platformAr.push([3627, 2858, 2, 504]);
            platformAr.push([4100, 3019, 235, 2]);
            platformAr.push([2900, 2858, 700, 2]);
            platformAr.push([3361, 2484, 874, 2]);
            platformAr.push([4197, 2484, 2, 393]);
            platformAr.push([2904, 1671, 2, 1186]);
            platformAr.push([3361, 2081, 2, 442]);
            platformAr.push([3361, 2083, 187, 2]);
            platformAr.push([2908, 1668, 1776, 2]);
            platformAr.push([3361, 2083, 1846, 2]);
            platformAr.push([2908, 1668, 1776, 2]);
            platformAr.push([5169, 750, 2, 1373]);
            platformAr.push([4645, 1216, 2, 472]);
            platformAr.push([3453, 729, 1755, 2]);
            platformAr.push([2854, 673, 2, 582]);
            platformAr.push([3453, 143, 2, 626]);
            platformAr.push([237, 143, 3250, 2]);
            platformAr.push([845, 673, 2048, 2]);
            platformAr.push([237, 162, 2, 1121]);
            platformAr.push([2421, 700, 2, 1579]);
            platformAr.push([1666, 1244, 2, 579]);
            platformAr.push([387, 1792, 2, 2032]);
            platformAr.push([949, 2230, 2, 1145]);
            platformAr.push([232, 1244, 1454, 2]);
            platformAr.push([415, 1804, 1291, 2]);
            platformAr.push([969, 2236, 1492, 2]);
        }
    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Racer = Racer;
}());
