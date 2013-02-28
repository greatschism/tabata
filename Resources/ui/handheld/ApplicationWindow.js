function ApplicationWindow() {
	Titanium.App.idleTimerDisabled = false;

	// Create the variables
	var instance, countdown, image, start_button, reset_button, Button, Label, button_controls, iAds,
	soundReady, soundRest, soundTada,
	begin_count = 0, 
	sets = 0, 
	isAppRunning = 0,
	t, count, doCountDown, cdPause, cdReset, startCountDown, startGetReady, resetSets, flipAnimate, trophy_image,
	image_pointer = 0, sayReady, saySet, sayGo, doGo,
	imagesArray = [
            '/images/background-wood-shadow.png',
            '/images/background-metal.png',
            '/images/background-darkmetal.png',
            '/images/background-blue.png',
            '/images/background-pink.png',
            '/images/background-green.png',
            '/images/background-yellow.png',
             '/images/background-rainbow.png',  
             '/images/background-grate.png'
    ],
	tSet, tGo, tDoGo, start_button_listener, startButtonClicked, reset_button_listener, resetButtonClicked,
	coolDownFinished = 0,
	countInProgress = 0,
	iAdsClicked,
	trophy_num = Math.floor(Math.random() * 5) + 1;
	
	Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;
	
	// Hide status bar
	Ti.UI.iPhone.hideStatusBar();
	
	// Start the window instance
	instance = Ti.UI.createWindow({
		backgroundColor: '#262626',
		backgroundImage: settings.background,
		width: 'auto',
		height: 'auto',
		navBarHidden: true,
		layout: 'vertical'
	});
	
	var player = null;
    
    var loaderArrayLength = 5;
    
    var loaderIndex = 1;
    
    var loaderAnimate;
    
    var eq = 0;
	
	// Create the app title icon
	Image = require('ui/common/Image');

	// Start Button
	Button = require('ui/common/Button');
	
	button_controls = Titanium.UI.createView({ 
		borderRadius: 10, 
		backgroundColor: 'transparent', 
		width: 275, 
		height: 45,
		top: 50,
		layout: 'horizontal'
	}); 
	instance.add(button_controls);
	
	start_button = new Button(
		start_button_args = {
			title: L('start'),
			backgroundImage: '/images/grey_button.png',
			height: 40,
			width: 135,
			top: 0
		}
	);
	button_controls.add(start_button);

    
	sayReady = function(){
		// Get Ready!
		countdown.font = {fontSize: 55, fontFamily: 'Helvetica', fontWeight: 'bold'};
		countdown.text = L('ready');
		soundPulse.play();
		
	};
	
	saySet = function() {
		// Set!
		countdown.font = {fontSize: 55, fontFamily: 'Helvetica', fontWeight: 'bold'};
		countdown.text= L('set');
		soundPulse.play();
		
	};

	sayGo = function() {
		// Go!
		countdown.font = {fontSize: 55, fontFamily: 'Helvetica', fontWeight: 'bold'};
		countdown.text = L('go');
		soundPulse.play();
		
	};
	
	doGo = function(){
		// Start the countdown
		startGetReady();
		createAndPlaySound(settings.preferences.goSound);
		
	};

	startButtonClicked = function() {
		if(countInProgress === 0) {
            trophy_num = Math.floor(Math.random() * 5) + 1;
			countInProgress = 1;
			Titanium.App.idleTimerDisabled = true;
			instance.remove(trophy_view);		
            start_button.backgroundImage = '/images/green_button.png';
				
			// Ready?	
			sayReady();
			tSet = setTimeout(saySet, 1000);
			tGo = setTimeout(sayGo, 2000);
			tDoGo = setTimeout(doGo, 3000);
		}
	}
	
	start_button_listener = start_button.addEventListener('click', startButtonClicked);

	// Reset Button
	reset_button = new Button(
		reset_button_args = {
			title: L('reset'),
			backgroundImage: '/images/red_button.png',
			height: 40,
			width: 135,
			left: 5,
			top: 0
		}
	);
	button_controls.add(reset_button);
	
	resetButtonClicked = function() {
		Titanium.App.idleTimerDisabled = false;
		
		clearInterval(tSet);
		clearInterval(tGo);
		clearInterval(tDoGo);
		
		resetSets();
		cdReset();
		instance.remove(trophy_view);
		countdown.text = settings.preferences.goTime;
		tv_screen.image = '/images/tvscreen_grey.png';
		start_button.title = L('start');		
	    start_button.backgroundImage = '/images/grey_button.png';
	    coolDownFinished = 0;
	    countInProgress = 0;
		start_button_listener = start_button.addEventListener('click', startButtonClicked);
		isAppRunning = 0;
	}
	
	reset_button_listener = reset_button.addEventListener('click', resetButtonClicked);
	
	tv_screen = new Image(
		set2_args = {
			image:'/images/tvscreen_grey.png',
			height: 275,
			left: 0,
			top: 4,
			anchorPoint : {
                x : 0.5,
                y : 0.5
            }
		}
	);
	instance.add(tv_screen);
		
	// Create countdown numbers Label
	Label = require('ui/common/Label');
	countdown = new Label(
		argsCountdownLabel = {
			text: settings.preferences.goTime,
			width: 'auto',
			height: 220,
			top: -250,
			textAlign: 'center',
			color: '#FFFFFF',
			font: {fontSize: 220, fontFamily: 'Helvetica', fontWeight: 'normal'},
			opacity: 0.65
		}
	);
	instance.add(countdown);
			
	// Create the set icon view container
	set_icons_view = Titanium.UI.createView({
		backgroundColor: 'transparent', 
		width: 315, 
		height: 37,
		top: 36,
		layout:'horizontal'
	}); 
	instance.add(set_icons_view);
	
	// Add images to the set icon view
	set1 = new Image(
		set1_args = {
			image:'/images/1off.png',
			width: 38,
			height: 37,
			left: 5
		}
	);
	set_icons_view.add(set1);
	
	set2 = new Image(
		set2_args = {
			image:'/images/2off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set2);
	
	set3 = new Image(
		set3_args = {
			image:'/images/3off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set3);
	
	set4 = new Image(
		set2_args = {
			image:'/images/4off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set4);
	
	set5 = new Image(
		set5_args = {
			image:'/images/5off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set5);
	
	set6 = new Image(
		set6_args = {
			image:'/images/6off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set6);
	
	set7 = new Image(
		set7_args = {
			image:'/images/7off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set7);
	
	set8 = new Image(
		set8_args = {
			image:'/images/8off.png',
			width: 38,
			height: 37,
			left: 0
		}
	);
	set_icons_view.add(set8);
	
	
	
		
	if(trophy_num === 1){
	    trophy_image = '/images/trophy.png';
	};
	
	if(trophy_num === 2){
	    trophy_image = '/images/trophy2.png';
	};
	
	if(trophy_num === 3){
	    trophy_image = '/images/trophy3.png'
	};
	
	if(trophy_num === 4){
	    trophy_image = '/images/trophy4.png'
	};
	
	if(trophy_num === 5){
        trophy_image = '/images/trophy5.png'
    };
	
	trophy = new Image(
		trophy_args = {
			image: trophy_image,
			width: 200,
			height: 192,
			opacity: 0.65
		}	
	);
	
    trophy_view = Titanium.UI.createView({ 
        backgroundColor: 'transparent', 
        width: 220, 
        height: 192,
        //top: -325
        top: -250
    }); 
    trophy_view.add(trophy);
	
    // Detect iPhone 5 screen (568)
    var iPhone5 = null;
    
    if (Ti.Platform.displayCaps.platformHeight === 568) {
        iPhone5 = 1;
    }
    
        
    /* iAds */
    iAds = Ti.UI.iOS.createAdView({
        width: 'auto',
        height: 50,
        borderColor: '#FFFFFF',
        backgroundColor: '#000000',
        top:-550,
        zIndex:999
    });
    
    
          
    // If iPhone5, then move iAds to the bottom
    if(iPhone5 === 1) {
        iAds.addEventListener('load', function() {
            iAds.visible = true;
          
            t1 = Titanium.UI.createAnimation({
                top: 60,
                duration: 5
            });

            // If iAds isn't there position trophy properly
            if(typeof iAds === 'object' && iAds.visible === true) {
                // iAds is visible
                trophy_view.top = -425;
            } else {
                // No iAds visible
                trophy_view.top = -315;
            }
            
            iAds.animate(t1);
             
        });
    
    } else {
        // Older iPhone Screen - put iAd on top
        
        iAds.addEventListener('load', function() {
            iAds.visible = true;
        
            t1 = Titanium.UI.createAnimation({
                top: -460,
                duration:1250
            });
            
            if(typeof iAds === 'object' && iAds.visible === true) {
                trophy_view.top = 100;
            } else {
                trophy_view.top = 175;
            }
            
            iAds.animate(t1);
            
        });  
    }   
     
	
	soundPulse = Titanium.Media.createSound({
	    url: 'sounds/pulse.mp3',
	    preload: true,
	    volume: 1
	});


	instance.addEventListener("swipe", function(e){
		img_count = imagesArray.length;
		
		if(e.direction === 'left') {
			image_pointer--;
			if(image_pointer < 0){
				image_pointer = 0;
			}
			instance.backgroundImage = imagesArray[image_pointer];
		}
		if(e.direction === 'right') {
			image_pointer++;
			if(image_pointer === img_count){
				image_pointer = img_count - 1;
			}
			instance.backgroundImage = imagesArray[image_pointer];
		}
		
		// Store the background image
		settings.background = instance.backgroundImage;
		
		// Now save the user object
		Ti.App.Properties.setString('userData', JSON.stringify(settings));
	});
	
	cdDisplay = function() {
	    // Displays time in span
	    countdown.font = {fontSize: 220, fontFamily: 'Helvetica', fontWeight: 'normal'};
	    countdown.width = 'auto';
	    if (count !== 0) {
	    	countdown.text = count;
	    }
	};

	doCountDown = function() {
	    // starts countdown
	    isAppRunning = 1;
	    cdDisplay();
	    if (count === 0) {
	        // Time is up, check how many sets
	        if(sets < 7){
	        	// Start the Cooldown after each set
	        	if(coolDownFinished === 0){
	        		coolDownFinished = 1;
	        		
	        		tv_screen.image = '/images/tvscreen_blue.png';

	        		createAndPlaySound(settings.preferences.restSound);
	        		startCountdown(settings.preferences.restTime);
	        	} else {
	        		coolDownFinished = 0;
	        		tv_screen.image = '/images/tvscreen_green.png';

	        		createAndPlaySound(settings.preferences.goSound);
	        		startCountdown(settings.preferences.goTime);
	        		switch(sets) {
						case 0:
							set2.image = '/images/2on.png';
							break;
						case 1:
							set3.image = '/images/3on.png';
							break;
						case 2:
							set4.image = '/images/4on.png';
							break;
						case 3:
							set5.image = '/images/5on.png';
							break;
						case 4:
							set6.image = '/images/6on.png';
							break;
						case 5:
							set7.image = '/images/7on.png';
							break;  					  
						case 6:
							set8.image = '/images/8on.png';
						break;
						default:
						  // Default code
					}
				// Increment Set
				sets++;	
	        	}
	        } else {
	        	// Time is really up now!  Good Job!
	        	tv_screen.image = '/images/tvscreen_grey.png';
	        	createAndPlaySound(settings.preferences.finishSound);
	        	
	        	Titanium.App.idleTimerDisabled = false;
	        	resetSets();
	        	countdown.text = null;
	        	
	        	instance.add(trophy_view);
	        	
	        	start_button.title = L('start');
	        	start_button.backgroundImage = '/images/grey_button.png';
	        	start_button.addEventListener('click', startButtonClicked);
	        	countInProgress = 0;
	        	isAppRunning = 0;
	        	
	        }
	    } else {
	        count--;
	        t = setTimeout(doCountDown, 1000);
	    }
	};
	
	cdPause = function() {
	    // Pauses countdown
	    clearTimeout(t);
	};
	
	cdReset = function() {
	    // Resets countdown
	    cdPause();
	    count = begin_count;
	    cdDisplay();
	};
		// Start the count down!!
	startCountdown = function(seconds) {
		Titanium.App.idleTimerDisabled = true;
		begin_count = seconds;
		cdReset();
		doCountDown();
	};
	
	startGetReady = function(){
		countInProgress = 1;
		startCountdown(settings.preferences.goTime);
		tv_screen.image = '/images/tvscreen_green.png';
		set1.image = '/images/1on.png';
		start_button.title = L('started');
	};
	
	resetSets = function(){
		// Reset all set icons back to original state
		sets = 0;
		set8.image = '/images/8off.png';
		set7.image = '/images/7off.png';
		set6.image = '/images/6off.png';
		set5.image = '/images/5off.png';
		set4.image = '/images/4off.png';
		set3.image = '/images/3off.png';
		set2.image = '/images/2off.png';
		set1.image = '/images/1off.png';
	};
	
	
	Ti.App.addEventListener( 'resume', function(e) {
    	// do something here when app is resumed/opened
    	if(countInProgress === 1){
		  startCountdown(count);
		}
		
		if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
            songInfo.text = player.nowPlaying.title;
            if (eq === 0) {
                loaderAnimate = setInterval(loadingAnimation, 125);
                eq = 1;
            }
            
            // Remove Play Button, and Add pause button
            music_play_button.visible = false;
            music_pause_button.visible = true;
        }
        
        if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_STOPPED) {
                //songInfo.text = '';
                if (eq === 1){
                    // Stop animation the EQ Bars
                    clearInterval(loaderAnimate);
                    eq = 0;
                }
                
                // Remove Play Button, and Add pause button
                music_play_button.visible = true;
                music_pause_button.visible = false;
            }

	});
	 
	Ti.App.addEventListener( 'pause', function(e) {
	    // do something here when app is paused/closed to background
		if(countInProgress === 1) {
		  cdPause();
		}

        if (eq === 1){
            // Stop animation the EQ Bars
            clearInterval(loaderAnimate);
            eq = 0;
        }
        
        // Remove Play Button, and Add pause button
        music_play_button.visible = false;
        music_pause_button.visible = true;

		
	});

    var musicView = Titanium.UI.createView({
        bottom: 0,
        height: 75,
        width: 'auto',
        left: 0
    });
    
     var buttonSettings = Ti.UI.createButton({
        image: '/images/settings.png',
        width:40,
        height:32,
        right:15,
        top: 8,
        style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
        backgroundColor: 'transparent'
    });
    
    musicView.add(buttonSettings);
    
    var player = null;
    
   eqImage = new Image(
        eq_args = {
            image: '/images/eq0.png',
            width: 320,
            height: 50,
            opacity: 0.75,
            bottom: -5
        }   
    );
    musicView.add(eqImage);
    
    songInfo = new Label(
        argsSongInfoLabel = {
            text: null,
            width: 310,
            height: 'auto',
            bottom: 12,
            textAlign: 'center',
            color: '#FFFFFF',
            font: {fontSize: 10, fontFamily: 'Helvetica', fontWeight: 'bold'}
        }
    );        
   musicView.add(songInfo);
    
    function loadingAnimation(){
        eqImage.image = '/images/eq' + loaderIndex + '.png';
        loaderIndex++;
        
        if(loaderIndex === 5) {
            loaderIndex = 1;
        }
    }
    
    try {
        player = Titanium.Media.systemMusicPlayer;
    
        if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
            songInfo.text = player.nowPlaying.title;
            if (eq === 0) {
                loaderAnimate = setInterval(loadingAnimation, 125);
                eq = 1;
            }
        }
    
        var event1 = 'stateChange';
        var event2 = 'playingChange';
        if (Ti.version >= '3.0.0') {
            event1 = 'statechange';
            event2 = 'playingchange';
        }
        player.addEventListener(event1, function() {
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_STOPPED) {
                //songInfo.text = '';
                
                // Remove Play Button, and Add pause button
                music_play_button.visible = true;
                music_pause_button.visible = false;
                
                
                if (eq === 1){
                    // Stop animation the EQ Bars
                    clearInterval(loaderAnimate);
                    eq = 0;
                }
            }
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
                 //When the play button is pressed
                songInfo.text = player.nowPlaying.title;
                
                // Animate the EQ Bars
                if (eq === 0) {
                    loaderAnimate = setInterval(loadingAnimation, 125);
                    eq = 1;
                }
                
                // Remove Play Button, and Add pause button
                music_play_button.visible = false;
                music_pause_button.visible = true;
                
            }
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PAUSED) {                
                //When the pause button is pressed
 
                if (eq === 1){
                    // Stop animation the EQ Bars
                    clearInterval(loaderAnimate);
                    eq = 0;
                }
                
                // Remove Play Button, and Add pause button
                music_play_button.visible = true;
                music_pause_button.visible = false;
                
            }
               
        });
        player.addEventListener(event2, function() {
            if (player.playbackState == Titanium.Media.MUSIC_PLAYER_STATE_PLAYING) {
                // When a new song is playing (next button pressed)
                songInfo.text = player.nowPlaying.title;
                
                // When the song changes, if eq is off, animate it  
                if (eq === 0){
                    loaderAnimate = setInterval(loadingAnimation, 125);
                    eq = 1;
                }
                
                // Remove Play Button, and Add pause button
                music_play_button.visible = false;
                music_pause_button.visible = true;

            }
        });
    }
    catch (e) {
        // create alert
        Titanium.UI.createAlertDialog({
            title:'Music Player',
            message:'Please run this test on device: Inoperative on simulator'
        }).show();
    }
    var music_play_button = new Button(
        music_play_button_args = {
            image: '/images/music_play.png',
            width: 40,
            height: 32,
            left: 75,
            top: 8,
            style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            backgroundColor: 'transparent',
            opacity: .75  
    });
     
    music_play_button.addEventListener('click', function() {
        player.play();
        songInfo.text = player.nowPlaying.title;
    });
     
    music_play_button.addEventListener('touchstart', function (e) {
        e.source.setBackgroundGradient({
            backfillStart: true,
            colors: [
                '#00ffffff',
                '#ffffffff'
            ],
            startPoint: { x: '50%', y: '50%' },
            endPoint: { x: '50%', y: '50%' },
            startRadius: '100%',
            endRadius: 0,
            type: 'radial'
        });    
    });
    
    music_play_button.addEventListener('touchend', function(e) {
        e.source.setBackgroundGradient({});
    });  

    musicView.add(music_play_button);
    
    var music_pause_button = new Button(
        music_pause_button_args = {
            image: '/images/music_pause.png',
            width:40,
            height:32,
            left: 75,
            top: 8,
            style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            backgroundColor: 'transparent',
            opacity: .75
        }   
    );
    music_pause_button.addEventListener('touchstart', function (e) {
        e.source.setBackgroundGradient({
            backfillStart: true,
            colors: [
                '#00ffffff',
                '#ffffffff'
            ],
            startPoint: { x: '50%', y: '50%' },
            endPoint: { x: '50%', y: '50%' },
            startRadius: '100%',
            endRadius: 0,
            type: 'radial'
        });    
    });
    music_pause_button.addEventListener('click', function() {
        player.pause();
    });
    music_pause_button.addEventListener('touchend', function(e) {
        e.source.setBackgroundGradient({});
    });        
    
    musicView.add(music_pause_button);
    music_pause_button.visible = false;
   
    var music_skip_button = new Button(
       music_skip_button_args = {
            image: '/images/music_forward.png',
            width:40,
            height:32,
            left: 140,
            top: 8,
            style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            backgroundColor: 'transparent',
            opacity: .75
        }   
    ); 
    music_skip_button.addEventListener('click', function() {
        player.skipToNext();
    });
    music_skip_button.addEventListener('touchstart', function (e) {
        e.source.setBackgroundGradient({
            backfillStart: true,
            colors: [
                '#00ffffff',
                '#ffffffff'
            ],
            startPoint: { x: '50%', y: '50%' },
            endPoint: { x: '50%', y: '50%' },
            startRadius: '100%',
            endRadius: 0,
            type: 'radial'
        });    
    });
    music_skip_button.addEventListener('touchend', function (e) {
        e.source.setBackgroundGradient({});
    });
     
    musicView.add(music_skip_button);

    var music_skip_back = new Button(
        music_skip_back_args = {
            image: '/images/music_backward.png',
            width:40,
            height:32,
            left: 10,
            top: 8,
            style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            backgroundColor: 'transparent',
            opacity: .75
    });   
    music_skip_back.addEventListener('click', function() {
        player.skipToPrevious();
    });
    music_skip_back.addEventListener('touchstart', function (e) {
        e.source.setBackgroundGradient({
            backfillStart: true,
            colors: [
                '#00ffffff',
                '#ffffffff'
            ],
            startPoint: { x: '50%', y: '50%' },
            endPoint: { x: '50%', y: '50%' },
            startRadius: '100%',
            endRadius: 0,
            type: 'radial'
        });    
    });
    music_skip_back.addEventListener('touchend', function (e) {
        e.source.setBackgroundGradient({});
    });
    
    musicView.add(music_skip_back);    
    
   var music_settings = new Button(
        music_settings = {
            image: '/images/settings_music.png',
            width:40,
            height:32,
            left: 200,
            top: 8,
            style : Ti.UI.iPhone.SystemButtonStyle.PLAIN,
            backgroundColor: 'transparent',
            opacity: .75
    });
    
   musicView.add(music_settings);    
    
   var settingsMusicPicker = {
        success:function(picked) {
            if (!settingsMusicPicker.autohide) {
                Ti.Media.hideMusicLibrary();
            }
            player.setQueue(picked);
        },
        error:function(error) {
            // create alert
            var a = Titanium.UI.createAlertDialog({title:'Music Picker'});
    
            // set message
            if (error.code == Titanium.Media.NO_MUSIC_PLAYER)
            {
                a.setMessage('Please run this test on device');
            } else {
                a.setMessage('Unexpected error: ' + error.code);
            }
    
            // show alert
            a.show();
        },
        mediaTypes:[Ti.Media.MUSIC_MEDIA_TYPE_MUSIC],
        autohide:true,
        allowMultipleSelections: true
    };
     
    instance.add(musicView);
    
    music_settings.addEventListener('click', function(){
        Ti.Media.openMusicLibrary(settingsMusicPicker);
    });
    
    buttonSettings.addEventListener('click', function() {

        var Win = Titanium.UI.createWindow({
            backgroundImage: instance.backgroundImage,
            layout: 'vertical'
        });
        
        Win.title = 'Settings';
        Win.barColor = 'black';
        
        var b = Titanium.UI.createButton({
            title:'Close',
            style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        
        Win.setLeftNavButton(b);
        b.addEventListener('click',function() {
            // Check if app is running
            if(isAppRunning === 0) {
                // When the close button is clicked, this will display the new Go time in seconds
                // first remove trophy view if it is there
                if(trophy_view){
                    instance.remove(trophy_view);       
                }
                countdown.text = settings.preferences.goTime;
            }
            Win.close();
        });

        // Require table common js
        var TableView = require('ui/common/TableView');
        
        var tableview = new TableView();
        
        Win.add(tableview);        
        
        Win.open({
           modal:true,
           modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
           modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
        
    });
    
    iAdsClicked = iAds.addEventListener('action', function(e){
    	if(e.type === 'action' && typeof e.source === 'object'){
    		// Courtesy for clicking the iAd!
    		iAds.visible = false;
    	}
    });

    //instance.add(iAds);

	return instance;
};

module.exports = ApplicationWindow;