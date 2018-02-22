var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, "", {
   preload: preload,
   //create: create,
   update: update ,
    enableDebug: false
});

function loadFonts(){
    WebFontConfig = {
        active: function() { game.time.events.add(Phaser.Timer.SECOND, main_menu, this); },
        google: {
            families: ['Ubuntu:500']
        }
    };
}

function preload() {
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
    game.load.image("beer-1","assets/images/radler-1.png");
    game.load.image("beer-2","assets/images/radler-2.png");
    game.load.image("beer-3","assets/images/rectangle-3.png");

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    loadFonts();
}

var pool,mask,progress_bar_active;
var total_score = 0;

function main_menu(){
    var bg = game.add.sprite(0,0,"bg_main_menu");
    bg.width = game.world.width;
    bg.height = game.world.height;

    var logo = game.add.sprite(0,0,"main-screen-head");
    var btn = game.add.sprite(0,0,"main-screen-btn");
    var foot = game.add.sprite(0,0,"main-screen-lemons");
    var txt = game.add.sprite(0,0,"main-screen-text");
    var logo2 = game.add.sprite(0,0,"logo");
    txt.scale.setTo(.6);
    logo.scale.setTo(.6);
    btn.scale.setTo(.6);
    foot.scale.setTo(.6);
    logo2.scale.setTo(.65);
    logo.position.setTo((game.world.width - logo.width)/2, 60);
    btn.position.setTo((game.world.width - btn.width)/2, logo.y + logo.height + 80);
    txt.position.setTo((game.world.width - txt.width)/2, logo.y + logo.height + 30);
    foot.position.setTo(0, game.world.height - foot.height);
    logo2.position.setTo((game.world.width - logo2.width)/2+5, game.world.height - foot.height/3-5);

    btn.inputEnabled = true;

    btn.events.onInputDown.add(function (sprite, pointer) {
        bg.kill();
        logo.kill();
        foot.kill();
        btn.kill();
        create();
    }, game);
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 10;
    var time_left = 30;

    var bg = game.add.sprite(0,0,"bg");
    var beerbgg = game.add.group(game, null, "beer");
    var menu = game.add.sprite(0,0,"menu");
    var time = game.add.text(0,0,"00", {
        font: "500 32px Ubuntu",
        fill: "#fff"
    });

    var time2 = game.add.text(0,0,":", {
        font: "500 32px Ubuntu",
        fill: "#fff"
    });

    var time3 = game.add.text(0,0,time_left, {
        font: "500 32px Ubuntu",
        fill: "#fff"
    });

    var scoreboard = game.add.sprite(0,0,"scoreboard");
    var score = game.add.text(0,0,"0", {
        font: "500 28px Ubuntu",
        fill: "#037f39"
    });
    var btn = game.add.button(0,0,"pause", function () {
        game.paused = !game.paused;
        if(game.paused) btn.loadTexture("play");
        else btn.loadTexture("pause");
    }, this, 2, 1, 0);

    var progress_bar = game.add.sprite(0,0,"pb");
    progress_bar_active = game.add.sprite(0,0,"pb2");
    var logo = game.add.sprite(0,0,"logo");
    var beer_bg_1 = game.add.sprite(0,0,"beer-1");

    beerbgg.add(beer_bg_1);

    var g = game.add.sprite(0,0,"beer-3");
    var g2 = game.add.sprite(0,0,"beer-2");
    var l1 = game.add.sprite(0,0, "lemon-half");
    beerbgg.add(g);

    beerbgg.add(g2);
    beerbgg.add(l1);

    var dObj = {f:30};
    var timerTml = new TimelineMax();
    timerTml.to(dObj, 30, {f:0, onUpdate: function(){
        time3.setText(dObj.f < 10? "0"+Math.floor(dObj.f) : Math.floor(dObj.f));
    }, onComplete: function () {
      console.log('game finished');
    }
    ,ease: Power0.easeNone});
    btn.scale.setTo(.6);
    scoreboard.scale.setTo(.6);
    bg.width = game.width;
    bg.height = game.height;
    menu.width = game.width;
    menu.height = game.width * 196 / 640;
    time.position.setTo(15,20);
    time2.position.setTo(time.x + time.width + 2,18);
    time3.position.setTo(time2.x + time2.width + 2,20);
    scoreboard.position.set((WIDTH - scoreboard.width)/2,5);
    score.anchor.setTo(.5);
    score.position.setTo(scoreboard.x + scoreboard.width/2 + 30, scoreboard.y+scoreboard.height / 2+5);
    btn.position.setTo(WIDTH - btn.width - 20,20);
    progress_bar.position.setTo(20, menu.height + 20);
    progress_bar.height = game.height - menu.height - 40;
    progress_bar.width = 15;

    progress_bar_active.position.setTo(progress_bar.x, progress_bar.y);
    progress_bar_active.width = progress_bar.width;
    progress_bar_active.height = progress_bar.height;

    //
    // mask = game.add.graphics(progress_bar_active.x, progress_bar_active.y);
    // mask.beginFill(0x000000);
    // mask.drawRect(0,0,progress_bar_active.width,progress_bar_active.height/2);
    // mask.endFill();
    // progress_bar_active.mask = mask;
    //
    // mask.kill();
    // console.log(mask);


    var mObj = {a:0};
    var pbtml = new TimelineMax();
    pbtml.to(mObj, 30, {a:progress_bar.height, onUpdate:  function(){
            if(mask !== undefined) mask.kill();
            mask = game.add.graphics(progress_bar_active.x, progress_bar_active.y + progress_bar_active.height);
            mask.beginFill(0x000000);
            mask.drawRect(0,0-mObj.a,progress_bar_active.width,mObj.a);
            mask.endFill();
            progress_bar_active.mask = mask;
    }, ease: Power0.easeNone});


    // progress_bar_active.mask = mask;

    logo.scale.setTo(.65);
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

    tml.to(g, 30, {height:game.height - beer_bg_1.height, ease: Power0.easeNone, onUpdate: function () {
            //console.log(g);
        }});
    tml.to(beerbgg.position, 30, {y: -(game.height), ease:Power0.easeNone}, "-=30");
    bgtml2.to(g2.position, 2, {x: -20});

    bgtml.from(l1.position, 1, { y:l1.position.y+l1.height, ease: Elastic.easeOut.config(1, 0.3), delay: 1});
    bgtml.to(l1.position, 3, {x: 300, ease: Power0.easeNone},"-=.5");
    bgtml.to(l1.position, 3, {y: l1.position.y + l1.height, ease: Power0.easeNone}, "-=.3");

    var leaf_emitter = game.add.emitter(game.world.centerX,0,3);
    leaf_emitter.width = game.width;
    leaf_emitter.makeParticles("leaf-1");
    leaf_emitter.minParticleSpeed.set(-100, 300);
    leaf_emitter.maxParticleSpeed.set(100, 300);
    leaf_emitter.setAlpha(0.9, 0.8);
    leaf_emitter.setRotation(90, 120);
    leaf_emitter.gravity = 1;

    leaf_emitter.flow(5000, 1000, 1, -1);

    var leaf_emitter2 = game.add.emitter(game.world.centerX,0,3);
    leaf_emitter2.width = game.width;
    leaf_emitter2.makeParticles("leaf-2");
    leaf_emitter2.minParticleSpeed.set(-200, 200);
    leaf_emitter2.maxParticleSpeed.set(100, 200);
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
            var pos = new Phaser.Point(game.rnd.between(game.world.width *.2, game.world.width*.8), -100);
            var v = get_vel();
            var obj = game.add.sprite(pos.x, pos.y, type);
            obj.anchor.setTo(.5);
            obj.scale.setTo(.7);
            game.physics.arcade.enable(obj);
            obj.angle = v.y;
            obj.body.setSize(100,100);
            obj.body.velocity.x = 0;
            obj.body.velocity.y = v.y;
            obj.checkWorldBounds = true;
            obj.outOfBoundsKill = true;
            pool.add(obj);

            schedule_spawn();
        }

        function get_vel(){
            return new Phaser.Point(game.rnd.between(-100, 100), game.rnd.between(350, 400));
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
    menugroup.add(progress_bar);
    menugroup.add(progress_bar_active);
    menugroup.add(logo);

    var emotes = game.add.group(game, null, "emotes");

    game.input.onDown.add(function(pointer){
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
                            cuts.add(splash)
                            splash.anchor.setTo(.5);
                            TweenMax.to(splash, 1, {alpha: 0, onComplete: function(){
                                    splash.kill();
                            }});
                            emitter.makeParticles("lemon-half");
                            star_emitter.makeParticles("star");

                            bub_emitter.makeParticles("bbl");
                            total_score += 3;
                        } else {
                            emitter.makeParticles("leaf-3");
                            total_score += 1;
                        }
                        emitter.minParticleSpeed.setTo(-200,-200);
                        emitter.maxParticleSpeed.setTo(200,200);
                        emitter.gravity = 0;
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
                            bbls.scale.setTo(.6);
                            emotes.add(bbls);
                            bbltml.to(bbls, 1, {y: game.world.height - bbls.height/3, ease: Elastic.easeOut.config(1, 0.3)});
                            bbltml.to(bbls, 1, {y: game.world.height + bbls.height});
                        } else if( total_score > 20 && emotes.children.length === 1){
                            var bbltml2 = new TimelineMax({yoyo: true});
                            var bbls2 = game.add.sprite(100, game.world.height,"bbl2");
                            bbls2.anchor.setTo(.5);
                            bbls2.scale.setTo(.6);
                            emotes.add(bbls2);
                            bbltml2.to(bbls2, 1, {y: game.world.height - bbls2.height/3, ease: Elastic.easeOut.config(1, 0.3)});
                            bbltml2.to(bbls2, 1, {y: game.world.height + bbls2.height});
                        } else if( total_score > 30 && emotes.children.length === 2){
                            var bbltml3 = new TimelineMax({yoyo: true});
                            var bbls3 = game.add.sprite(100, game.world.height,"bbl3");
                            bbls3.anchor.setTo(.5);
                            bbls3.scale.setTo(.6);
                            emotes.add(bbls3);
                            bbltml3.to(bbls3, 1, {y: game.world.height - bbls3.height/3, ease: Elastic.easeOut.config(1, 0.3)});
                            bbltml3.to(bbls3, 1, {y: game.world.height + bbls3.height});
                        }
                    }
                });
                game.input.moveCallbacks = [];
            }, this);
        }
    },game)
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

function update() {
    // if(pool && pool.children){
    //     pool.children.forEach(function (value) {
    //         value.angle += Math.random();
    //     })
    // }
}
