enchant();

//オブジェクト
var game;
var scoreLabel;
var timeLabel;
var mogura = new Array(9);

//乱数の取得
function rand(num) {
    return Math.floor(Math.random() * num);
}

//もぐらクラス
Mogura = Class.create(Sprite, {
    //初期化
    initialize: function(x, y) {
        Sprite.call(this, 75, 80);
        this.image = game.assets["mogura2.png"];
        this.x = x;
        this.y = y;
        this.status = -rand(200);
    },

    //画面更新のたびに実行する処理
    onenterframe: function() {
        //フレームの変更
        this.status++;
        if (this.status < 0) {
            this.frame = 0;
        } else if (this.status == 0) {
            this.frame = 1;
        } else if (this.status == 30) {
            this.status = -rand(200);
        }
    },

    //タッチした時の処理
    ontouchend: function() {
        if (this.frame == 1) {
            this.frame = 2;
            this.status = 0;
            scoreLabel.score += 100;
        }
    }
});

//メインプログラム
window.onload = function() {
    //Gameオブジェクトの生成
    game = new Game(320, 320);
    game.rootScene.backgroundColor = "white";

    //画像の読み込み
    game.preload("mogura2.png");

    //ゲームの前処理完了時に呼ばれる
    game.onload = function() {
        //もぐらの生成
        for (var i = 0; i < 9; i++) {
            mogura[i] = new Mogura(20 + i % 3 * 100, 50 + Math.floor(i / 3) * 80);
            game.rootScene.addChild(mogura[i]);
        }

        //スコアラベルの生成
        scoreLabel = new ScoreLabel(5, 5);
        scoreLabel.score = 0;
        game.rootScene.addChild(scoreLabel);
        
        //タイムラベルの生成
        timeLabel = new TimeLabel(5, 25, "countdown");
        timeLabel.time = 10;
        timeLabel.onenterframe = function() {
            if (timeLabel.time < 0) {

                game.end();
            }
        }  
        game.rootScene.addChild(timeLabel);
    }

    //ゲームの開始
    game.start();
}