function ApplicationWindow() {
	Titanium.App.idleTimerDisabled = false;
		
	// Create the variables
	var instance, countdown_image_background, countdown, image, start_button, reset_button, Button, Label, button_controls, iAds,
	soundReady, soundGo, soundTada,
	begin_count = 0, 
	sets = 0, 
	t, count, doCountDown, cdPause, cdReset, startCountDown, startGetReady, resetSets, flipAnimate,
	imagesArray = ['/images/background-wood-shadow.png','/images/background-metal.png','/images/background-darkmetal.png',
	'/images/background-blue.png','/images/background-pink.png','/images/background-green.png','/images/background-yellow.png'],
	image_pointer = 0, sayReady, saySet, sayGo, doGo,
	tSet, tGo, tDoGo, start_button_listener, startButtonClicked, reset_button_listener, resetButtonClicked,
	coolDownFinished = 0,
	countInProgress = 0;
	
	// Start the window instance
	instance = Ti.UI.createWindow({
		backgroundColor: '#262626',
		backgroundImage: '/images/background-wood-shadow.png',
		width: 320,
		height: 480,
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
			height: 45,
			width: 135
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
		soundReady.play();
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
			height: 45,
			width: 135,
			left: 5
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
		countdown.text = '20';
		tv_screen.image = '/images/tvscreen_grey.png';
		start_button.title = L('start');		
	    start_button.backgroundImage = '/images/grey_button.png';
	    coolDownFinished = 0;
	    countInProgress = 0;
		start_button_listener = start_button.addEventListener('click', startButtonClicked);
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
		argsLoanAmountLabel = {
			text: '20',
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
		width: 280, 
		height: 34,
		top: 36,
		layout:'horizontal'
	}); 
	instance.add(set_icons_view);
	
	// Add images to the set icon view
	set1 = new Image(
		set1_args = {
			image:'/images/1off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set1);
	
	set2 = new Image(
		set2_args = {
			image:'/images/2off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set2);
	
	set3 = new Image(
		set3_args = {
			image:'/images/3off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set3);
	
	set4 = new Image(
		set2_args = {
			image:'/images/4off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set4);
	
	set5 = new Image(
		set5_args = {
			image:'/images/5off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set5);
	
	set6 = new Image(
		set6_args = {
			image:'/images/6off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set6);
	
	set7 = new Image(
		set7_args = {
			image:'/images/7off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set7);
	
	set8 = new Image(
		set8_args = {
			image:'/images/8off.png',
			width: 35,
			height: 30,
			left: 0
		}
	);
	set_icons_view.add(set8);
	
	trophy = new Image(
		trophy_args = {
			image: '/images/trophy.png',
			width: 200,
			height: 192,
			opacity: 0.65
		}	
	);
	
	trophy_view = Titanium.UI.createView({ 
		backgroundColor: 'transparent', 
		width: 220, 
		height: 191,
		top: -325
	}); 
	trophy_view.add(trophy);
	
	// create the sound/media object
	soundPulse = Titanium.Media.createSound({
	    url: 'sounds/pulse.mp3',
	    preload: true,
	    volume: 1
	});
	soundReady = Titanium.Media.createSound({
	    url: 'sounds/ready.mp3',
	    preload: true,
	    volume: 1
	});
	soundGo = Titanium.Media.createSound({
	    url: 'sounds/go.mp3',
	    preload: true,
	    volume: 1
	});
	soundTada = Titanium.Media.createSound({
	    url: 'sounds/tada.mp3',
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
	    cdDisplay();
	    if (count === 0) {
	        // Time is up, check how many sets
	        if(sets < 7){
	        	// Start the Cooldown after each set
	        	if(coolDownFinished === 0){
	        		coolDownFinished = 1;
	        		tv_screen.image = '/images/tvscreen_blue.png';
	        		soundGo.play();
	        		startCountdown(10);    		
	        	} else {
	        		coolDownFinished = 0;
	        		tv_screen.image = '/images/tvscreen_green.png';
	        		soundReady.play();
	        		startCountdown(20);
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
	        	soundTada.play();
	        	Titanium.App.idleTimerDisabled = false;
	        	resetSets();
	        	countdown.text = '';
	        	instance.add(trophy_view);
	        	start_button.title = L('start');
	        	start_button.backgroundImage = '/images/grey_button.png';
	        	start_button.addEventListener('click', startButtonClicked);
	        	countInProgress = 0;
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
		startCountdown(20);
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
	
	/* iAds for iPhone only */ 
    if(Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
        iAds = Ti.UI.iOS.createAdView({
            width: 'auto',
            height: 50,
            borderColor: '#000000',
            backgroundColor: '#000000',
            top: 100
        });
         
        t1 = Titanium.UI.createAnimation({
            top: 8,
            duration:750
        });
     
        iAds.addEventListener('load', function(){
            iAds.visible = true;
            iAds.animate(t1);
        });
     
        instance.add(iAds);
    }
	
	return instance;
};

module.exports = ApplicationWindow;
