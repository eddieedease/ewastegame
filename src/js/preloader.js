(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function() {
      // preload preloader
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);


      // json config file..
      this.load.json('needy', 'assets/json/this.json');
      // load audio files first..
      this.load.audio('menu', ['assets/audio/menu.ogg']);
      this.load.audio('platformer', ['assets/audio/platformer.ogg']);
      this.load.audio('breakout', ['assets/audio/breakout.ogg']);
      this.load.audio('racer', ['assets/audio/catmouse.ogg']);
      this.load.audio('catmouse', ['assets/audio/racer.ogg']);
      this.load.audio('birdhit', ['assets/audio/birdhit.ogg']);
      this.load.audio('cargas', ['assets/audio/cargas.ogg']);
      this.load.audio('carstart', ['assets/audio/carstart.ogg']);
      this.load.audio('coin', ['assets/audio/coin.ogg']);
      this.load.audio('hitby', ['assets/audio/hitby.ogg']);
      this.load.audio('scoresound', ['assets/audio/scoresound.ogg']);
      this.load.audio('alarm', ['assets/audio/alarm.ogg']);
      this.load.bitmapFont('scorefont', 'assets/font/font.png', 'assets/font/font.fnt');
      this.load.image('levelup', 'assets/levelup.png');
      this.load.image('tel2', 'assets/tel2.png');
      this.load.image('tel3', 'assets/tel3.png');
      this.load.image('star2', 'assets/star2.png');
      this.load.image('oil', 'assets/oil.png');
      this.load.image('boost', 'assets/boost.png');
      this.load.image('currentletter', 'assets/currentletter.png');
      this.load.image('valid', 'assets/valid.png');
      this.load.image('timmy', 'assets/timmy.png');
      this.load.image('diamond', 'assets/diamond.png');
      //preload menu
      this.load.image('cr', 'assets/cr2.png');
      this.load.image('cr2', 'assets/cr.png');
      this.load.image('gameselect', 'assets/gameselect.png');
      this.load.image('geencredits', 'assets/geencredits.png');
      this.load.spritesheet('processing', 'assets/processing.png', 200, 135);
      this.load.spritesheet('crp1', 'assets/capred.png', 147, 147);
      this.load.spritesheet('crp2', 'assets/capblue.png', 147, 147);
      this.load.spritesheet('kiesspel', 'assets/kiesspel.png', 430, 140);
      this.load.image('hit1', 'assets/hit1.png');
      this.load.image('hit2', 'assets/hit2.png');
      this.load.image('hit3', 'assets/hit3.png');
      this.load.image('hit4', 'assets/hit4.png');
      this.load.image('hit5', 'assets/hit5.png');
      this.load.image('hit6', 'assets/hit6.png');
      this.load.image('filmhit', 'assets/filmhit.png');
      this.load.image('gear1', 'assets/gear1.png');
      this.load.image('gear2', 'assets/gear2.png');
      this.load.image('phoneaddbg', 'assets/phoneaddbg.png');
      this.load.image('catmousep2', 'assets/catmousep2.png');
      this.load.image('raakzebg', 'assets/raakzebg.png');
      this.load.image('backbutton', 'assets/backbutton.png');
      this.load.image('standing', 'assets/standing.png');
      //Films
      this.game.load.video('film1', 'assets/films/test.mp4');
      this.game.load.video('film2', 'assets/films/test2.mp4');
      this.game.load.video('film3', 'assets/films/test3.mp4');
      this.game.load.video('introfilm', 'assets/films/intro.mp4');
      this.load.image('film1', 'assets/film1.png');
      this.load.image('film2', 'assets/film2.png');
      this.load.image('film3', 'assets/film3.png');
      this.load.image('filmarrows', 'assets/filmarrows.png');

      this.load.image('thumbs1', 'assets/thumbs1.png');
      this.load.image('thumbs2', 'assets/thumbs2.png');
      this.load.image('thumbs3', 'assets/thumbs3.png');
      this.load.image('thumbs4', 'assets/thumbs4.png');
      this.load.image('thumbs5', 'assets/thumbs5.png');
      this.load.image('thumbs6', 'assets/thumbs6.png');
      this.load.image('thumbsfilms', 'assets/thumbsfilms.png');
      this.load.image('knoppenfilm', 'assets/knoppenfilm.png');
      this.load.image('knoppenscore', 'assets/knoppenscore.png');
      this.load.image('knoppenfilmwhite', 'assets/knoppenfilmwhite.png');
      this.load.image('knoppenscorewhite', 'assets/knoppenscorewhite.png');
      //preload menu
      this.load.image('mode1pmini', 'assets/mode1pmini.png');
      this.load.image('mode2pteammini', 'assets/mode2pteammini.png');
      this.load.image('mode2pversusmini', 'assets/mode2pversusmini.png');
      this.load.image('mode1p', 'assets/mode1p.png');
      this.load.image('mode2pteam', 'assets/mode2pteam.png');
      this.load.image('mode2pversus', 'assets/mode2pversus.png');
      this.load.image('theater', 'assets/theater.png');
      this.load.image('theaterseats', 'assets/theaterseats.png');
      this.load.image('fill', 'assets/fill.png');
      this.load.image('uitleg1', 'assets/uitleg1.png');
      this.load.image('uitleg2', 'assets/uitleg2.png');
      this.load.image('uitleg3', 'assets/uitleg3.png');
      this.load.image('uitleg4', 'assets/uitleg4.png');
      this.load.image('uitleg5', 'assets/uitleg5.png');
      this.load.image('uitleg6', 'assets/uitleg6.png');
      this.load.image('selectie', 'assets/selectie.png');
      // preload breakout
      this.load.atlas('breakout', 'assets/breakout.png', 'assets/breakout.json');
      this.load.image('starfield', 'assets/starfield.jpg');
      this.load.image('bobg', 'assets/bobg.png');
      this.load.image('menubg', 'assets/menubg.png');
      this.load.image('scorebg', 'assets/scorebg.png');
      this.load.image('scoredudes', 'assets/scoredudes.png');
      this.load.image('ball', 'assets/ball.png');
      this.load.spritesheet('paddle1', 'assets/paddle1sheet.png', 147, 112);
      this.load.spritesheet('paddle2', 'assets/paddle2sheet.png', 147, 112);
      // preload catmouse
      this.load.image('shield', 'assets/shield.png');
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('bulletblue', 'assets/bulletblue.png')
      this.load.image('bullet2', 'assets/bullet2.png');
      this.load.image('ground', 'assets/ground.png');
      this.load.image('gameover', 'assets/gameover.png');
      this.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
      this.load.spritesheet('bird', 'assets/bird.png', 184, 184);
      this.load.spritesheet('enemy', 'assets/enemy.png', 50, 96);
      this.load.image('catmousebg', 'assets/catmousebg.png');
      this.load.image('roos', 'assets/roos.png');
      this.load.spritesheet('coin', 'assets/coin.png', 50, 50);
      this.load.image('powerbar', 'assets/power.png');
      this.load.image('powerbarslider', 'assets/sliderpower.png');
      this.load.image('p1p2', 'assets/p1p2.png');
      // Racer
      this.load.image('racetrack', 'assets/racetrack3.png');
      this.load.image('racedeco', 'assets/racedeco2.png');
      this.load.image('car1', 'assets/car1sh.png');
      this.load.image('flag', 'assets/flag.png');
      this.load.image('klokk', 'assets/klokk.png');
      this.load.image('checkp12', 'assets/checkp12.png');
      this.load.image('checkp3', 'assets/checkp3.png');
      //this.load.image('car2', 'assets/car2.png');
      this.load.spritesheet('car2', 'assets/car2sh.png', 167, 66);
      //platformer
      this.load.image('sky', 'assets/sky.png');
      this.load.image('platform', 'assets/platform.png');
      this.load.image('platformground', 'assets/platformground.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('p1life', 'assets/p1life.png');
      this.load.image('p2life', 'assets/p2life.png');
      this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
      this.load.image('pbbg2', 'assets/pbbg.png');
      this.load.image('pbbg3', 'assets/pbbg2.png');
      //scoring
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();
      this.load.image('lifeup', 'assets/lifeup.png');
    },

    loadResources: function() {
      // load your assets here
    },

    create: function() {

    },

    update: function() {
      // if (!!this.ready) {
      //this.game.state.start('screensaver');
      // }
    },

    onLoadComplete: function() {
      // this.ready = true;
      this.game.state.start('screensaver');
    }
  };

  window['ewaste'] = window['ewaste'] || {};
  window['ewaste'].Preloader = Preloader;
}());
