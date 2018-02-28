var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "");

var preload = function(game){};
var mainmenu = function (game){};
var lemonslash = function (game){};
var gameover = function (game){};

preload.prototype = {
    preload: preload_assets
};

mainmenu.prototype = {
    create: main_menu
};

lemonslash.prototype = {
    create: create,
    update: function () {
        if(!this.pbtml.running) this.pbtml.play();
    }
};

gameover.prototype = {
    create: game_over
};


game.state.add("preload", preload);
game.state.add("mainmenu", mainmenu);
game.state.add("lemonslash", lemonslash);
game.state.add("gameover", gameover);
game.state.start("preload");

function loadFonts(){
    WebFontConfig = {
        active: function() { game.time.events.add(Phaser.Timer.SECOND, game.state.start("mainmenu"), this); },
        google: {
            families: ['Ubuntu:500']
        },
        custom: {
            families: ['KiddyKitty'],
            urls: ['assets/kk.css']
        }
    };
}

function preload_assets() {
    game.load.image("bg", "assets/images/bg.png");
    game.load.image("bg_main_menu", "assets/images/bg_main_menu.png");
    game.load.image("main-screen-head", "assets/images/main-screen-head.png");
    game.load.image("main-screen-btn", "assets/images/main-screen-btn.png");
    game.load.image("main-screen-lemons", "assets/images/main-screen-lemons.png");
    game.load.image("main-screen-text", "assets/images/main-screen-text.png");
    game.load.image("bbl1", "assets/images/bbl-1.png");
    game.load.image("bbl2", "assets/images/bbl-2.png");
    game.load.image("bbl3", "assets/images/bbl-3.png");
    game.load.image("star", "assets/images/star.png");
    game.load.image("bbl", "assets/images/bubl.png");
    game.load.image("menu", "assets/images/green-menu.png");
    game.load.image("line", "assets/images/line.png");
    game.load.image("scoreboard", "assets/images/scoreboard.png");
    game.load.image("logo", "assets/images/logo.png");
    game.load.image("play", "assets/images/play.png");
    game.load.image("pause", "assets/images/stop.png");
    game.load.image("pb", "assets/images/progress.png");
    game.load.image("pb2", "assets/images/progress-copy.png");
    game.load.image("lemon", "assets/images/lemon.png");
    game.load.image("lemon-half", "assets/images/lemon-half.png");
    game.load.image("hop", "assets/images/hop.png");
    game.load.image("leaf-3", "assets/images/leaf-3.png");
    game.load.image("leaf-1", "assets/images/leaf-1.png");
    game.load.image("leaf-2", "assets/images/leaf-2.png");
    game.load.image("time","assets/images/time.png");
    game.load.image("time-2","assets/images/time-2.png");
    game.load.image("splash-1","assets/images/splash-1.png");
    game.load.image("splash-2","assets/images/splash-2.png");
    game.load.image("splash-3","assets/images/splash-3.png");
    game.load.image("splash-green","assets/images/splash-green.png");
    game.load.image("beer-1","assets/images/radler-1.png");
    game.load.image("beer-2","assets/images/radler-2.png");
    game.load.image("beer-3","assets/images/rectangle-3.png");
    game.load.image("screen-fin-header","assets/images/screen-fin-header.png");
    game.load.image("lemon-empty","assets/images/lemon-empty.png");
    game.load.image("lemon-full","assets/images/lemon-full.png");
    game.load.image("finishtext-40","assets/images/finishtext040.png");
    game.load.image("finishtext-60","assets/images/finishtext6080.png");
    game.load.image("finishtext-80","assets/images/finishtext80.png");
    game.load.image("btn-yellow","assets/images/btn-yellow.png");
    game.load.image("btn-yellow-2","assets/images/btn-yellow-2.png");
    game.load.image("btn-blue","assets/images/btn-blue.png");

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    loadFonts();
}

var pool;
var total_score = 0;

function main_menu(){
    var bg = game.add.sprite(0,0,"bg_main_menu");
    bg.width = game.world.width;
    bg.height = game.world.height;

    var logo = game.add.sprite(0,0,"main-screen-head");
    var btn = game.add.sprite(0,0,"main-screen-btn");
    var foot = game.add.sprite(0,0,"main-screen-lemons");
    var txt = game.add.text(0,0,"РУБИ ЛИМОНЫ,", {
        font: "700 28px KiddyKitty",
        fill: "#037f39"
    });
    var txt2 = game.add.text(0,0,"КАК НИНДЗЯ!", {
        font: "700 28px KiddyKitty",
        fill: "#037f39"
    });
    var logo2 = game.add.sprite(0,0,"logo");

    var scale, offset;

    if(game.world.width > 400){
        scale = .65;
        offset = 70;
    } else if(game.world.width > 350) {
        scale = .6;
        offset = 60;
    } else {
        scale = .5;
        offset = 50;
    }

    txt.scale.setTo(scale);
    txt2.scale.setTo(scale);
    logo.scale.setTo(scale);
    btn.scale.setTo(scale);
    foot.scale.setTo(scale);
    logo2.scale.setTo(scale);


    logo.position.setTo((game.world.width - logo.width)/2, offset);
    txt.position.setTo((game.world.width - txt.width)/2, logo.y + logo.height + 15);
    txt2.position.setTo((game.world.width - txt2.width)/2, txt.y + txt.height - 5);
    btn.position.setTo((game.world.width - btn.width)/2, txt2.y + txt2.height+ 5);

    foot.position.setTo(0, game.world.height - foot.height+40);
    logo2.position.setTo((game.world.width - logo2.width)/2+5, game.world.height - foot.height/3-5);

    btn.inputEnabled = true;

    btn.events.onInputDown.add(function (sprite, pointer) {
        bg.kill();
        logo.kill();
        foot.kill();
        btn.kill();
        game.state.start("lemonslash");
    }, game);
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 10;
    var time_left = 30;

    var scale, offset, fsize;

    if(game.world.width > 400){
        scale = .65;
        offset = 20;
        fsize = 32;
    } else if(game.world.width > 350) {
        scale = .6;
        offset = 15;
        fsize = 30;
    } else {
        scale = .5;
        offset = 15;
        fsize = 26;
    }

    var bg = game.add.sprite(0,0,"bg");
    var beerbgg = game.add.group(game, null, "beer");
    var menu = game.add.sprite(0,0,"menu");
    var time = game.add.text(0,0,"00", {
        font: "500 "+fsize+"px Ubuntu",
        fill: "#fff"
    });

    var time2 = game.add.text(0,0,":", {
        font: "500 "+fsize+"px Ubuntu",
        fill: "#fff"
    });

    var time3 = game.add.text(0,0,time_left, {
        font: "500 "+fsize+"px Ubuntu",
        fill: "#fff"
    });

    var scoreboard = game.add.sprite(0,0,"scoreboard");
    var score = game.add.text(0,0,"0", {
        font: "500 28px Ubuntu",
        fill: "#037f39"
    });
    var btn = game.add.button(0,0,"pause", function () {
        game.paused = !game.paused;
        if(game.paused) {
            btn.loadTexture("play");
            timerTml.pause();
            this.pbtml.pause();
            bgtml.pause();
            bgtml2.pause();
        }
        else{
            timerTml.play();
            this.pbtml.play();
            bgtml.play();
            bgtml2.play();
            btn.loadTexture("pause");
        }
    }, this, 2, 1, 0);

    this.progress_bar = game.add.sprite(0,0,"pb");
    this.progress_bar_active = game.add.sprite(0,0,"pb2");
    var logo = game.add.sprite(0,0,"logo");
    var beer_bg_1 = game.add.sprite(0,0,"beer-1");

    beerbgg.add(beer_bg_1);

    var g = game.add.sprite(0,0,"beer-3");
    var g2 = game.add.sprite(0,0,"beer-2");
    var l1 = game.add.sprite(0,0, "lemon-half");
    beerbgg.add(g);

    beerbgg.add(g2);
    beerbgg.add(l1);

    btn.scale.setTo(scale);
    scoreboard.scale.setTo(scale);
    bg.width = game.width;
    bg.height = game.height;
    menu.width = game.width;
    menu.height = game.width * 196 / 640;
    time.position.setTo(offset, offset );
    time2.position.setTo(time.x + time.width + 2,offset - 2);
    time3.position.setTo(time2.x + time2.width + 2,offset);
    scoreboard.position.set((WIDTH - scoreboard.width)/2,5);
    score.anchor.setTo(.5);
    score.position.setTo(scoreboard.x + scoreboard.width/2 + offset*1.5, scoreboard.y+scoreboard.height / 2+4);
    btn.position.setTo(WIDTH - btn.width - offset,17);
    this.progress_bar.position.setTo(20, menu.height + 20);
    this.progress_bar.height = game.height - menu.height - 40;
    this.progress_bar.width = 15;

    this.progress_bar_active.position.setTo(this.progress_bar.x, this.progress_bar.y);
    this.progress_bar_active.width = this.progress_bar.width;
    this.progress_bar_active.height = this.progress_bar.height;

    this.mObj = {a:0};
    this.pbtml = new TimelineMax({paused: true});

    this.pbtml.to(this.mObj, 30, {a:this.progress_bar.height, onUpdate:  function(){
        this.mask = game.add.graphics(this.progress_bar_active.x, this.progress_bar_active.y + this.progress_bar_active.height);
        this.mask.beginFill(0x000000);
        this.mask.drawRect(0,0-this.mObj.a,this.progress_bar_active.width,this.mObj.a);
        this.mask.endFill();
        this.progress_bar_active.mask = this.mask;
    }.bind(this), ease: Power0.easeNone});

    logo.scale.setTo(scale);
    logo.position.setTo((game.width - logo.width)/2, game.height - logo.height - 20);

    beer_bg_1.position.setTo(0,game.height);

    g.position.setTo(0,game.height + beer_bg_1.height);
    g.height = 0;
    g.width = game.width;
    g2.position.setTo(0,beer_bg_1.y - g2.height/2);
    l1.anchor.set(.5);
    l1.angle = 45;
    l1.position.setTo(0, beer_bg_1.y + l1.height/5);
    g.bringToTop();
    g2.sendToBack();
    l1.moveDown();

    var tml = new TimelineMax();
    var bgtml = new TimelineMax({repeat: -1});
    var bgtml2 = new TimelineMax({yoyo: true, repeat:-1});

    bgtml2.to(g2.position, 2, {x: -20});

    bgtml.from(l1.position, 1, { y:l1.position.y+l1.height, ease: Elastic.easeOut.config(1, 0.3), delay: 1});
    bgtml.to(l1.position, 3, {x: 300, ease: Power0.easeNone},"-=.5");
    bgtml.to(l1.position, 3, {y: l1.position.y + l1.height, ease: Power0.easeNone}, "-=.3");

    var leaf_emitter = game.add.emitter(game.world.centerX,0,3);
    leaf_emitter.width = game.width;
    leaf_emitter.makeParticles("leaf-1");
    leaf_emitter.minParticleSpeed.set(-100, 300);
    leaf_emitter.maxParticleSpeed.set(100, 300);
    leaf_emitter.minParticleScale = .4;
    leaf_emitter.maxParticleScale = .5;

    leaf_emitter.setAlpha(0.9, 0.8);
    leaf_emitter.setRotation(90, 120);
    leaf_emitter.gravity = 1;

    leaf_emitter.flow(5000, 1000, 1, -1);

    var leaf_emitter2 = game.add.emitter(game.world.centerX,0,3);
    leaf_emitter2.width = game.width;
    leaf_emitter2.makeParticles("leaf-2");
    leaf_emitter2.minParticleSpeed.set(-200, 200);
    leaf_emitter2.maxParticleSpeed.set(100, 200);
    leaf_emitter2.minParticleScale = .4;
    leaf_emitter2.maxParticleScale = .5;
    leaf_emitter2.setAlpha(0.9, 0.8);
    leaf_emitter2.setRotation(90, 120);
    leaf_emitter2.gravity = 1;
    leaf_emitter2.flow(5000, 2000, 1, -1);

    var leafems = game.add.group(game, null, "lems");

    leafems.add(leaf_emitter);
    leafems.add(leaf_emitter2);

    var make_obj = (function make_obj() {

        pool = game.add.group(game, null, "cuttables", true, true, Phaser.Physics.ARCADE);
        function schedule_spawn(){
            var time = game.rnd.between(1,1);
            var timer = game.time.create();
            timer.add(Phaser.Timer.SECOND * time, spawn, game);
            timer.start();
        }

        function spawn(){
            var type = Math.floor(Math.random()*2) === 1 ? "lemon" : "hop";
            var pos = new Phaser.Point(game.rnd.between(game.world.width *.2, game.world.width*.8), -20);
            var v = get_vel();
            var obj = game.add.sprite(pos.x, pos.y, type);
            obj.anchor.setTo(.5);
            obj.scale.setTo(scale);
            game.physics.arcade.enable(obj);
            obj.angle = getRandomInt(-45,45);
            obj.body.setSize(100,100);
            obj.body.velocity.x = 0;
            obj.body.velocity.y = v.y;
            obj.checkWorldBounds = true;
            obj.outOfBoundsKill = true;
            pool.add(obj);

            schedule_spawn();
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        function get_vel(){
            return new Phaser.Point(game.rnd.between(-100, 100), game.rnd.between(450, 500));
        }

        return {
            spawn: spawn,
            pool: pool
        }

    })();

    make_obj.spawn();
    var cuts = new Phaser.Group(game,null, "cuts", true );
    var menugroup = game.add.group(game, null, "menu");

    menugroup.add(menu);
    menugroup.add(scoreboard);
    menugroup.add(time);
    menugroup.add(time2);
    menugroup.add(time3);
    menugroup.add(score);
    menugroup.add(btn);
    menugroup.add(this.progress_bar);
    menugroup.add(this.progress_bar_active);
    menugroup.add(logo);

    var emotes = game.add.group(game, null, "emotes");

    game.input.onDown.add(handleGameClick,game);
    var dObj = {f:30};
    var timerTml = new TimelineMax();
    timerTml.to(dObj, 30, {f:0, onUpdate: function(){
            time3.setText(dObj.f < 10? "0"+Math.floor(dObj.f) : Math.floor(dObj.f));
        }, onComplete: function () {
            game.world.removeAll();
            TweenMax.set(beerbgg.position, {x:0, y:0});
            game.input.onDown.remove(handleGameClick,game);
            game.state.start("gameover");
        }
        ,ease: Power0.easeNone});



    function handleGameClick(pointer){
        if(!game.paused){
            var start_pos = new Phaser.Point(pointer.x, pointer.y);
            var cut, tml = new TimelineMax();

            cut = drawCut(start_pos, pointer);
            cuts.add(cut);
            cut.anchor.set(0.5, 1);
            cut.scale.set(0);
            tml.to(cut, 1, {alpha:0, onComplete: function(){
                    cut.body = null;
                    cut.destroy();
                }});

            function handleMove(pointer){
                var p = pointer;
                cut.scale.setTo(Math.sqrt(Math.pow((p.x - start_pos.x),2) + Math.pow((p.y - start_pos.y),2)) / 600);

                if(start_pos.x < p.x && start_pos.y > p.y){
                    cut.angle = Math.atan(Math.abs(p.x - start_pos.x) / Math.abs(p.y-start_pos.y))*180/Math.PI;
                } else if(start_pos.x < p.x && start_pos.y < p.y){
                    cut.angle = (180 - (Math.atan(Math.abs(p.x - start_pos.x) / Math.abs(p.y-start_pos.y))*180/Math.PI));
                } else if(start_pos.x > p.x && start_pos.y < p.y) {
                    cut.angle = (180 + (Math.atan(Math.abs(p.x - start_pos.x) / Math.abs(p.y-start_pos.y))*180/Math.PI));
                } else {
                    cut.angle = (360 - (Math.atan(Math.abs(p.x - start_pos.x) / Math.abs(p.y-start_pos.y))*180/Math.PI));
                }
            }

            game.input.addMoveCallback(handleMove, this);
            game.input.onUp.add(function (pointer) {
                var end_pos = new Phaser.Point(pointer.x, pointer.y);
                make_obj.pool.children.map(function (t) {

                    if(check_collision(t,new Phaser.Line(start_pos.x, start_pos.y, end_pos.x, end_pos.y))) {
                        t.kill();
                        make_obj.pool.remove(t);
                        var points = t.key === "lemon" ? "" : "-2";
                        var emitter = game.add.emitter(t.position.x, t.position.y,2);
                        var bub_emitter = game.add.emitter(t.position.x, t.position.y, 3);
                        var star_emitter = game.add.emitter(t.position.x, t.position.y, 3);
                        var emitters = game.add.group(game, null, "emitters");
                        emitters.add(emitter);
                        emitters.add(bub_emitter);
                        emitters.add(star_emitter);

                        var ps = game.add.sprite(t.position.x, t.position.y, "time"+points);
                        emitters.add(ps);
                        TweenMax.to(ps, 1, {alpha: 0, onComplete: function(){
                                ps.kill();
                            }});
                        if(t.key === "lemon"){
                            var splash = game.add.sprite(t.position.x, t.position.y, "splash-"+Math.ceil(Math.random()*3));
                            cuts.add(splash);
                            splash.anchor.setTo(.5);
                            TweenMax.to(splash, 1, {alpha: 0, onComplete: function(){
                                    splash.kill();
                                }});
                            TweenMax.to(g, 1, {height: g.height + 40});
                            TweenMax.to(beerbgg.position, 1, { y: beerbgg.position.y - 40});
                            emitter.makeParticles("lemon-half");
                            star_emitter.makeParticles("star");

                            bub_emitter.makeParticles("bbl");
                            total_score += 3;
                        } else {
                            var splash = game.add.sprite(t.position.x, t.position.y, "splash-green");
                            cuts.add(splash);
                            splash.anchor.setTo(.5);
                            TweenMax.to(splash, 1, {alpha: 0, onComplete: function(){
                                    splash.kill();
                                }});
                            emitter.makeParticles("leaf-3");
                            TweenMax.to(g, 1, {height: g.height + 20});
                            TweenMax.to(beerbgg.position, 1, { y: beerbgg.position.y - 20});
                            total_score += 1;
                        }
                        emitter.minParticleSpeed.setTo(-200,-200);
                        emitter.maxParticleSpeed.setTo(200,200);
                        emitter.gravity = 0;
                        emitter.minParticleScale = 0.7;
                        emitter.maxParticleScale = 0.7;
                        emitter.start(true, 700, null, 1000);

                        bub_emitter.minParticleSpeed.setTo(-200,-200);
                        bub_emitter.maxParticleSpeed.setTo(200,200);
                        bub_emitter.gravity = 0;
                        bub_emitter.minParticleScale = 0.3;
                        bub_emitter.maxParticleScale = 0.7;
                        bub_emitter.start(true, 700, null, 1000);

                        star_emitter.minParticleSpeed.setTo(-200,-200);
                        star_emitter.maxParticleSpeed.setTo(200,200);
                        star_emitter.minParticleScale = 0.3;
                        star_emitter.maxParticleScale = 0.7;
                        star_emitter.gravity = 0;
                        star_emitter.start(true, 700, null, 1000);

                        score.setText(total_score);

                        if(total_score > 10 && emotes.children.length === 0){
                            var bbltml = new TimelineMax({yoyo: true});
                            var bbls = game.add.sprite(100, game.world.height,"bbl1");
                            bbls.anchor.setTo(.5);
                            bbls.scale.setTo(scale);
                            emotes.add(bbls);
                            bbltml.to(bbls, 1, {y: game.world.height - bbls.height/3, ease: Elastic.easeOut.config(1, 0.3)});
                            bbltml.to(bbls, 1, {y: game.world.height + bbls.height,delay:2});
                        } else if( total_score > 20 && emotes.children.length === 1){
                            var bbltml2 = new TimelineMax({yoyo: true});
                            var bbls2 = game.add.sprite(100, game.world.height,"bbl2");
                            bbls2.anchor.setTo(.5);
                            bbls2.scale.setTo(scale);
                            emotes.add(bbls2);
                            bbltml2.to(bbls2, 1, {y: game.world.height - bbls2.height/3, ease: Elastic.easeOut.config(1, 0.3)});
                            bbltml2.to(bbls2, 1, {y: game.world.height + bbls2.height,delay:2});
                        } else if( total_score > 30 && emotes.children.length === 2){
                            var bbltml3 = new TimelineMax({yoyo: true});
                            var bbls3 = game.add.sprite(100, game.world.height,"bbl3");
                            bbls3.anchor.setTo(.5);
                            bbls3.scale.setTo(scale);
                            emotes.add(bbls3);
                            bbltml3.to(bbls3, 1, {y: game.world.height - bbls3.height/3, ease: Elastic.easeOut.config(1, 0.3)});
                            bbltml3.to(bbls3, 1, {y: game.world.height + bbls3.height,delay:2});
                        }
                    }
                });
                game.input.moveCallbacks = [];
            }, this);
        }
    }
}

function check_collision(object, cut){
    var object_rectangle, line1, line2, line3, line4, intersection;
    object_rectangle = new Phaser.Rectangle(object.body.x, object.body.y, object.body.width, object.body.height);
    line1 = new Phaser.Line(object_rectangle.left, object_rectangle.bottom, object_rectangle.left, object_rectangle.top);
    line2 = new Phaser.Line(object_rectangle.left, object_rectangle.top, object_rectangle.right, object_rectangle.top);
    line3 = new Phaser.Line(object_rectangle.right, object_rectangle.top, object_rectangle.right, object_rectangle.bottom);
    line4 = new Phaser.Line(object_rectangle.right, object_rectangle.bottom, object_rectangle.left, object_rectangle.bottom);
    intersection = cut.intersects(line1) || cut.intersects(line2) || cut.intersects(line3) || cut.intersects(line4);
    return intersection;
}

function drawCut(pos) {
    var c = game.add.sprite(0,0,"line");
    c.position.set(pos.x, pos.y);
    return c;
}

function game_over(){
    // if(game.state.current !== "gameover") game.state.start("gameover");
    var gameoverg = game.add.group(game, null, "gameover");
    var bg = game.add.sprite(0,0,"bg_main_menu");
    bg.width = game.world.width;
    bg.height = game.world.height;

    var scale, offset;

    if(game.world.width > 400){
        scale = .65;
        offset = 70;
    } else if(game.world.width > 350) {
        scale = .6;
        offset = 60;
    } else {
        scale = .5;
        offset = 50;
    }


    var finhead = game.add.sprite(0,0,"screen-fin-header");

    var l1 = game.add.sprite(0,0,"lemon-empty");
    var l2 = game.add.sprite(0,0,"lemon-empty");
    var l3 = game.add.sprite(0,0,"lemon-empty");
    var l1f, l2f, l3f;

    l1f = game.add.sprite(0,0,"lemon-full");
    l2f = game.add.sprite(0,0,"lemon-full");
    l3f = game.add.sprite(0,0,"lemon-full");

    l1f.alpha = 0;
    l2f.alpha = 0;
    l3f.alpha = 0;
    var scobj = {s:0};

    var scores = game.add.text(0,0,scobj.s, {
        font: "bold 80px Ubuntu",
        fill: "#037f39"
    });
    var fintext;


    var scoretml = new TimelineMax({paused: true});

    if(total_score === 0){
        fintext = game.add.sprite(0,0,"finishtext-40");
    }
    else if(total_score < 40){
        fintext = game.add.sprite(0,0,"finishtext-40");
        scoretml.to(l1f, .5, {alpha: 1});
    } else if( total_score > 40 && total_score < 60) {
        fintext = game.add.sprite(0,0,"finishtext-60");
        scoretml.to(l1f, .5, {alpha: 1});
        scoretml.to(l2f, .5, {alpha: 1});
    } else {
        fintext = game.add.sprite(0,0,"finishtext-80");

        scoretml.to(l1f, .5, {alpha: 1});
        scoretml.to(l2f, .5, {alpha: 1});
        scoretml.to(l3f, .5, {alpha: 1});

    }
    var foot = game.add.sprite(0,0,"main-screen-lemons");
    var logo2 = game.add.sprite(0,0,"logo");
    var getbtn = game.add.button(0,0,"btn-yellow-2", function () {
        location.href = "shazam://openzap?zid=Ct4k1c&campaign=goesser";
    });
    var restartbtn = game.add.button(0,0,"btn-blue", function () {
        gameoverg.remove(bg);
        gameoverg.remove(finhead);
        gameoverg.remove(l1);
        gameoverg.remove(l2);
        gameoverg.remove(l3);
        gameoverg.remove(l1f);
        gameoverg.remove(l2f);
        gameoverg.remove(l3f);
        gameoverg.remove(scores);
        gameoverg.remove(fintext);
        gameoverg.remove(foot);
        gameoverg.remove(logo2);
        gameoverg.remove(getbtn);
        gameoverg.remove(restartbtn);
        total_score = 0;
        game.state.start("lemonslash");
    });
    scoretml.to(scobj, 3, {s: total_score, ease: Power0.easeNone, onUpdate: function(){
        scores.setText(Math.round(scobj.s));
        },ease: Power0.easeNone});

    finhead.scale.setTo(scale);
    l1.scale.setTo(scale);
    l2.scale.setTo(scale);
    l3.scale.setTo(scale);
    l1f.scale.setTo(scale);
    l2f.scale.setTo(scale);
    l3f.scale.setTo(scale);
    fintext.scale.setTo(scale);
    getbtn.scale.setTo(scale);
    restartbtn.scale.setTo(scale);
    foot.scale.setTo(scale);
    logo2.scale.setTo(scale);
    foot.position.setTo(0, game.world.height - foot.height + 50);
    logo2.position.setTo((game.world.width - logo2.width)/2+5, game.world.height - logo2.height -10);
    finhead.position.setTo((game.world.width - finhead.width)/2, offset);
    l2.position.setTo((game.world.width - l1.width)/2, finhead.y + finhead.height -5);
    l1.position.setTo(l2.x - l2.width + 12, l2.y + l2.height/4);

    l3.position.setTo(l2.x + l2.width - 20, l2.y + l2.height/4);

    l1f.position.setTo(l1.position.x, l1.position.y);
    l2f.position.setTo(l2.position.x, l2.position.y);
    l3f.position.setTo(l3.position.x, l3.position.y);

    scores.position.setTo((game.world.width - scores.width)/2 + scores.width/2, l1.y + l1.height + 20);
    scores.anchor.setTo(.5);

    fintext.position.setTo((game.world.width - fintext.width)/2, scores.y + scores.height/2);
    getbtn.position.setTo((game.world.width - getbtn.width)/2, fintext.y + fintext.height + 5);
    restartbtn.position.setTo((game.world.width - restartbtn.width)/2, getbtn.y + getbtn.height -10);

    gameoverg.add(bg);
    gameoverg.add(finhead);
    gameoverg.add(l1);
    gameoverg.add(l2);
    gameoverg.add(l3);
    gameoverg.add(l1f);
    gameoverg.add(l2f);
    gameoverg.add(l3f);
    gameoverg.add(scores);
    gameoverg.add(fintext);
    gameoverg.add(foot);
    gameoverg.add(logo2);
    gameoverg.add(getbtn);
    gameoverg.add(restartbtn);

    scoretml.play();
}
