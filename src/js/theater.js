(function() {
  'use strict';

  function Theater() {

  }

  // here the main vars
  var key;


  var video;
  var sprite;

  var filmstill;
  var filmstill2;
  var filmstill3;

  var p1exit;
  var p1play;
  var left;
  var right;

  var turncounter = 0;

  var filmisplaying = false;

  var filmarrows;

  var seats;

  var backbutton;

  var knoppenfilm;


  Theater.prototype = {
    create: function() {

      var bg = this.game.add.image(0, 0, 'theater');

      video = null;

      seats = this.game.add.image(100, 400, 'theaterseats');
      //backbutton = this.game.add.image(0, 450, 'backbutton');

      left = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      left.onDown.add(this.goLeft, this);

      right = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      right.onDown.add(this.goRight, this);

      p1exit = this.input.keyboard.addKey(Phaser.Keyboard.X);
      p1exit.onDown.add(this.toExit, this);


      p1play = this.input.keyboard.addKey(Phaser.Keyboard.Z);
      p1play.onDown.add(this.playNow, this);


      filmstill = this.game.add.image(this.game.width / 2 + 95, this.game.height / 2 - 50, 'film1');
      filmstill.anchor.setTo(0.5, 0.5);

      filmstill2 = this.game.add.image(this.game.width / 2 + 95, this.game.height / 2 - 50, 'film2');
      filmstill2.anchor.setTo(0.5, 0.5);
      filmstill2.visible = false;

      filmstill3 = this.game.add.image(this.game.width / 2 + 95, this.game.height / 2 - 50, 'film3');
      filmstill3.anchor.setTo(0.5, 0.5);
      filmstill3.visible = false;

      filmarrows = this.game.add.image(this.game.width / 2 + 95, this.game.height / 2 - 70, 'filmarrows');
      filmarrows.anchor.setTo(0.5, 0.5);

      knoppenfilm = this.game.add.image(20, this.game.height- 200, 'knoppenfilmwhite');


    },

    update: function() {
      if (filmisplaying) {
        if (video.currentTime === video.duration) {
          sprite.visible = false;
        }
      }


    },

    playNow: function() {
      console.log("checkcheck" + sprite);

      console.log("videodeo" + video);
      if (sprite !== undefined) {
        sprite.visible = true;
        seats.visible = true;
      }

      switch (turncounter) {
        case 0:

          if (video === null) {
            video = this.game.add.video('film2');
          } else {
            video.changeSource('assets/films/test2.mp4');
          }
          break;
        case 1:
          if (video === null) {
            video = this.game.add.video('film3');
          } else {
            video.changeSource('assets/films/test3.mp4');
          }
          break;
        case 2:
          if (video === null) {
            video = this.game.add.video('film1');
          } else {
            video.changeSource('assets/films/test.mp4');
          }
          break;
      }


      if (filmisplaying === false) {
        sprite = video.addToWorld(370, 115, 0.2, 0.2);
        filmisplaying = true;
        seats.visible = false;
        video.play();
      }
    },

    toExit: function() {
      turncounter = 0;
      if (filmisplaying === true) {
        video.stop();

      }
      filmisplaying = false;
      seats.visible = true;
      this.game.state.start('menu');
    },
    goLeft: function() {
      console.log("Going left!");
      //filmstill.destroy();
      if (turncounter === 2) {
        turncounter = 0;
      } else {
        turncounter++;
      }

      this.changeStill();
    },
    goRight: function() {
      console.log("Going right!");
      //filmstill.destroy();
      if (turncounter === 0) {
        turncounter = 2;
      } else {
        turncounter--;
      }
      this.changeStill();
    },
    changeStill: function() {
      console.log("komt hier?")
      console.log(turncounter);
      switch (turncounter) {
        case 0:
          filmstill.visible = true;
          filmstill2.visible = false;
          filmstill3.visible = false;
          break;
        case 1:
          filmstill.visible = false;
          filmstill2.visible = true;
          filmstill3.visible = false;
          break;
        case 2:
          filmstill.visible = false;
          filmstill2.visible = false;
          filmstill3.visible = true;
          break;


      }
    }



  };

  window['ewaste'] = window['ewaste'] || {};
  window['ewaste'].Theater = Theater;
}());
