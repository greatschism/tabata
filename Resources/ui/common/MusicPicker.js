function music_picker() {
    var instance = Titanium.UI.createView({
       
        height: 'auto',
        width: 'auto',
        backgroundColor: 'green',
    });
    
    var player = null;
    
    var info = Ti.UI.createLabel({
        text:null,
        height:'auto',
        width:'auto',
        top:200
    });
    instance.add(info);
    
    var title = Ti.UI.createLabel({
        text:null,
        height:'auto',
        width:'auto',
        top:220
    });
    
    instance.add(title);
    
    var timeBar = Ti.UI.createProgressBar({
        min:0,
        value:0,
        width:200,
        height:40,
        top:240,
        color:'#888',
        style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
    });
    
    instance.add(timeBar);
    
    var playback = null;
    
    var barUpdate = function () {
        timeBar.value = player.currentPlaybackTime;
    };
    
    try {
        player = Titanium.Media.systemMusicPlayer;
    
        if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
            info.text = player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
            title.text = player.nowPlaying.title;
            timeBar.show();
            timeBar.max = player.nowPlaying.playbackDuration;
            timeBar.value = player.currentPlaybackTime;
            if (playback == null) {
                playback = setInterval(barUpdate, 500);
            }
        }
    
        var event1 = 'stateChange';
        var event2 = 'playingChange';
        var event3 = 'volumeChange';
        if (Ti.version >= '3.0.0') {
            event1 = 'statechange';
            event2 = 'playingchange';
            event3 = 'volumechange';
        }
        player.addEventListener(event1, function() {
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_STOPPED) {
                title.text = '';
                info.text = '';
                timeBar.hide();
                timeBar.max = 0;
                timeBar.value = 0;
                clearInterval(playback);
                playback = null;
            }
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
                info.text = player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
                title.text = player.nowPlaying.title;
                timeBar.show();
                timeBar.max = player.nowPlaying.playbackDuration;
                timeBar.value = player.currentPlaybackTime;
                if (playback == null) {
                    playback = setInterval(barUpdate, 500);
                }
            }
        });
        player.addEventListener(event2, function() {
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
                info.text = player.nowPlaying.artist + ' : ' + player.nowPlaying.albumTitle;
                title.text = player.nowPlaying.title;
                timeBar.show();
                timeBar.max = player.nowPlaying.playbackDuration;
                timeBar.value = 0;
                if (playback == null) {
                    playback = setInterval(barUpdate, 500);
                }
            }
        });
        player.addEventListener(event3, function() {
            Ti.API.log('Volume change: '+player.volume);
        });
    }
    catch (e) {
        // create alert
        
    }
    
    var b1 = Ti.UI.createButton({
        title:'Play',
        width:80,
        height:40,
        left:20,
        top:20
    });
    b1.addEventListener('click', function() {
        player.play();
    });
    instance.add(b1);
    
    var b2 = Ti.UI.createButton({
        title:'Pause',
        width:80,
        height:40,
        top:20
    });
    b2.addEventListener('click', function() {
        player.pause();
    });
    instance.add(b2);
    
    var b3 = Ti.UI.createButton({
        title:'Stop',
        width:80,
        height:40,
        top:20,
        right:20
    });
    b3.addEventListener('click', function() {
        player.stop();
    });
    instance.add(b3);
    
    var b4 = Ti.UI.createButton({
        title:'Seek >>',
        width:80,
        height:40,
        top:80,
        left:20
    });
    b4.addEventListener('click', function() {
        player.seekForward();
    });
    instance.add(b4);
    
    var b5 = Ti.UI.createButton({
        title:'Stop seek',
        width:80,
        height:40,
        top:80
    });
    b5.addEventListener('click', function() {
        player.stopSeeking();
    });
    instance.add(b5);
    
    var b6 = Ti.UI.createButton({
        title:'Seek <<',
        width:80,
        height:40,
        top:80,
        right:20
    });
    b6.addEventListener('click', function() {
        player.seekBackward();
    });
    instance.add(b6);
    
    var b7 = Ti.UI.createButton({
        title:'Skip >>',
        width:80,
        height:40,
        top:140,
        left:20
    });
    b7.addEventListener('click', function() {
        player.skipToNext();
    });
    instance.add(b7);
    
    var b8 = Ti.UI.createButton({
        title:'Skip |>',
        width:80,
        height:40,
        top:140
    });
    b8.addEventListener('click', function() {
        player.skipToBeginning();
    });
    instance.add(b8);
    
    var b9 = Ti.UI.createButton({
        title:'Skip <<',
        width:80,
        height:40,
        top:140,
        right:20
    });
    b9.addEventListener('click', function() {
        player.skipToPrevious();
    });
    instance.add(b9);
    
    return instance;
};

module.exports = music_picker;    