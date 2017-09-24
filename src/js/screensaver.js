(function() {
    'use strict';

    function Screensaver() {

    }

    var keyq;
    var keyw;
    var keye;
    var keya;
    var keys;
    var keyd;
    var keyz;
    var keyx;
    var keyi;
    var keyo;
    var keyp;

    var keyleft;
    var keyright;
    var keyup;
    var keydown;

    var video;
    var sprite;

    var cursors;
    var keycursors;

    var valid;
    var creditadd;

    var credit;
    /*
        var distance = 700;
        var speed = 2;
        var max = 8;

        var canvas;

        var xx = [];
        var yy = [];
        var zz = [];

        var xx2 = [];
        var yy2 = [];
        var zz2 = [];

        var xx3 = [];
        var yy3 = [];
        var zz3 = [];*/

    var text;

    Screensaver.prototype = {
        create: function() {
            credit = localStorage.getItem('credits');
            video = null;


            var phaserJSON = this.game.cache.getJSON('needy');
            console.log(phaserJSON);
            /*canvas = this.game.add.bitmapData(1000, 563);
            canvas.addToWorld();

            for (var i = 0; i < max; i++) {
              xx[i] = Math.floor(Math.random() * 1000) - 400;
              yy[i] = Math.floor(Math.random() * 563) - 300;
              zz[i] = Math.floor(Math.random() * 1700) - 100;
            }

            for (var n = 0; n < max; n++) {
              xx2[n] = Math.floor(Math.random() * 1000) - 400;
              yy2[n] = Math.floor(Math.random() * 563) - 300;
              zz2[n] = Math.floor(Math.random() * 1700) - 100;
            }

            for (var b = 0; b < max; b++) {
              xx3[b] = Math.floor(Math.random() * 1000) - 400;
              yy3[b] = Math.floor(Math.random() * 563) - 300;
              zz3[b] = Math.floor(Math.random() * 1700) - 100;
            }*/

            text = this.game.add.bitmapText(this.game.width / 2, this.game.height / 5, 'scorefont', 'Recycle je telefoon\n en speel games', 50);
            text.align = "center";


            video = this.game.add.video('introfilm');
            this.game.time.events.add(Phaser.Timer.SECOND * 60, this.restartVid, this);


            sprite = video.addToWorld(0, 0, 0, 0);
            sprite.x = 115;
            sprite.y = 180;
            video.play();
            text.anchor.set(0.5);
            cursors = this.game.input.keyboard.createCursorKeys();


            keyq = this.input.keyboard.addKey(Phaser.Keyboard.Q);
            keyw = this.input.keyboard.addKey(Phaser.Keyboard.W);
            keye = this.input.keyboard.addKey(Phaser.Keyboard.E);
            keya = this.input.keyboard.addKey(Phaser.Keyboard.A);
            keys = this.input.keyboard.addKey(Phaser.Keyboard.S);
            keyd = this.input.keyboard.addKey(Phaser.Keyboard.D);
            keyz = this.input.keyboard.addKey(Phaser.Keyboard.Z);
            keyx = this.input.keyboard.addKey(Phaser.Keyboard.X);
            keyi = this.input.keyboard.addKey(Phaser.Keyboard.I);
            keyo = this.input.keyboard.addKey(Phaser.Keyboard.O);
            keyp = this.input.keyboard.addKey(Phaser.Keyboard.P);





            keyq.onDown.add(this.onDown, this);
            keyw.onDown.add(this.onDown, this);
            keye.onDown.add(this.onDown, this);
            keya.onDown.add(this.onDown, this);
            keys.onDown.add(this.onDown, this);
            keyd.onDown.add(this.onDown, this);
            keyz.onDown.add(this.onDown, this);
            keyx.onDown.add(this.onDown, this);
            keyi.onDown.add(this.onDown, this);
            keyo.onDown.add(this.onDown, this);
            keyp.onDown.add(this.onDown, this);
            //cursors.onDown.add(this.onDown, this);



            valid = this.game.add.image(this.game.width - 100, 100, 'valid')
            valid.anchor.set(0.5, 0.5);
            valid.visible = false;


            creditadd = this.input.keyboard.addKey(Phaser.Keyboard.O);
            creditadd.onDown.add(this.creditadd, this);




        },
        restartVid: function() {
          video.play();
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
            this.game.state.start('menu', true, false);
        },

        update: function() {

            if (cursors.left.isDown) {
                //  Move to the left
                this.game.state.start('menu', true, false);
            }
            if (cursors.right.isDown) {
                //  Move to the left
                this.game.state.start('menu', true, false);
            }
            if (cursors.up.isDown) {
                //  Move to the left
                this.game.state.start('menu', true, false);
            }
            if (cursors.down.isDown) {
                //  Move to the left
                this.game.state.start('menu', true, false);
            }
            /*canvas.clear();

      for (var i = 0; i < max; i++) {
        var perspective = distance / (distance + zz[i]);
        var x = this.game.world.centerX + xx[i] * perspective;
        z
        var y = this.game.world.centerY + yy[i] * perspective + 400;

        zz[i] += speed;

        if (zz[i] > 300) {
          zz[i] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('bullet2', x, y);
      }

      for (var q = 0; q < max; q++) {
        var perspectiveq = distance / (distance + zz2[q]);
        var x = this.game.world.centerX + xx2[q] * perspectiveq;
        var y = this.game.world.centerY + yy2[q] * perspectiveq + 300;

        zz2[q] += speed;

        if (zz2[q] > 300) {
          zz2[q] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('tel2', x, y);
      }

      for (var z = 0; z < max; z++) {
        var perspectivez = distance / (distance + zz3[z]);
        var x = this.game.world.centerX + xx3[z] * perspectivez;
        var y = this.game.world.centerY + yy3[z] * perspectivez + 300;

        zz3[z] += speed;

        if (zz3[z] > 300) {
          zz3[z] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('tel3', x, y);
      }
*/

        },
        onDown: function(key) {
            console.log(key.keyCode);
            if (key.keyCode === 79) {
                return;
            }
            if (key.keyCode === 73) {
                keyq.enabled = false;
                keyw.enabled = false;
                keye.enabled = false;
                keya.enabled = false;
                keys.enabled = false;
                keyd.enabled = false;
                keyz.enabled = false;
                keyx.enabled = false;
                keyi.enabled = false;
                //keyup.enabled = false;
                return;
            } else if (key.keyCode === 80) {
                keyq.enabled = true;
                keyw.enabled = true;
                keye.enabled = true;
                keya.enabled = true;
                keys.enabled = true;
                keyd.enabled = true;
                keyz.enabled = true;
                keyx.enabled = true;
                keyi.enabled = true;
                //keyup.enabled = true;
                return;
            }

            this.game.state.start('menu', true, false);
        }


    };

    window['ewaste'] = window['ewaste'] || {};
    window['ewaste'].Screensaver = Screensaver;
}());
