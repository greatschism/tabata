function ApplicationWindow() {
	Titanium.App.idleTimerDisabled = false;

	// Create the variables
	var instance, countdown_image_background, countdown, image, start_button, reset_button, Button, Label, button_controls, iAds,
	soundReady, soundRest, soundTada,
	begin_count = 0, 
	sets = 0, 
	isAppRunning = 0,
	t, count, doCountDown, cdPause, cdReset, startCountDown, startGetReady, resetSets, flipAnimate, trophy_num, trophy_image,
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
	iAdsClicked;
	
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
			top: 4
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
	
	
	trophy_num = Math.floor(Math.random() * 4) + 1;
	
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
		top: 105
	}); 
	trophy_view.add(trophy);
	
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
	});
	 
	Ti.App.addEventListener( 'pause', function(e) {
	    // do something here when app is paused/closed to background
		if(countInProgress === 1) {
		  cdPause();
		}
	});

    var b3 = Ti.UI.createButton({
	    image: '/images/settings.png',
	    height:32,
	    width:40,
	    top:10,
	    right:15,
	    style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		backgroundColor: 'transparent'	
	})
    
    b3.addEventListener('click', function() {
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
    
    instance.add(b3);

	/* iAds */ 
    iAds = Ti.UI.iOS.createAdView({
        width: 'auto',
        height: 50,
        borderColor: '#FFFFFF',
        backgroundColor: '#000000',
        top:-550,
        zIndex:999
    });
     
    t1 = Titanium.UI.createAnimation({
        top: -460,
        duration:1250
    });
    
    iAds.addEventListener('load', function(){
        trophy_view.top = 105;   
        iAds.visible = true;    
        iAds.animate(t1);         
    });
    
    iAdsClicked = iAds.addEventListener('action', function(e){
    	if(e.type === 'action' && typeof e.source === 'object'){
    		// Courtesy for clicking the iAd!
    		iAds.visible = false;
    	}
    });

    instance.add(iAds);
 
	return instance;
};

module.exports = ApplicationWindow;
