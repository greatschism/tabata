/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// Parse userData and set the Global Object that is accessible from anywhere in the application
var settings = JSON.parse(Ti.App.Properties.getString('userData'));

function createAndPlaySound(url) {
    var soundInstance = Titanium.Media.createSound({
        url: 'sounds/' + url,
        preload: true,
        volume: 1
    });
    soundInstance.play();
};

if(settings){
	// Check the app version, if not current, delete userData
	if(settings.appVersion !== '1.3.0'){
		settings = '';
		Ti.App.Properties.setString('userData', '');
	}
}


// Make a settings object if there isn't one, and store as userData
if(!settings){
    // Create user settings and store in an app property
    settings = {
        appVersion: '1.3.0',
        background: '/images/background-wood-shadow.png',
        preferences: {
            goSound: 'workout-started.mp3',
            restSound: 'rest.mp3',
            finishSound: 'workout-complete.mp3',
            goTime: 20,
            restTime: 10
        }
    };
    // Settings Global Object that is accessible from anywhere in the application
    Ti.App.Properties.setString('userData', JSON.stringify(settings));
}    

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth,
		isTablet, Window;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	Window = require('ui/handheld/ApplicationWindow');
	
	/* 
    var Window;
    if (isTablet) {
        //Window = require('ui/tablet/ApplicationWindow');
    }
    else {
        // Android uses platform-specific properties to create windows.
        // All other platforms follow a similar UI pattern.
        if (osname === 'android') {
            Window = require('ui/handheld/android/ApplicationWindow');
        }
        else {
            Window = require('ui/handheld/ApplicationWindow');
        }
    }
    */

   
    
	new Window().open();
}());