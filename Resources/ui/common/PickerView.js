function PickerView(args, title) {
	var instance = Titanium.UI.createView({
		height: 260,
		bottom: -285,
		width: 'auto',
		backgroundColor: '#000000',
		visible: false
	});

	var picker_title = title;
	
	var slide_in = Titanium.UI.createAnimation({bottom:0,duration:500});
	var slide_out =  Titanium.UI.createAnimation({bottom:-285,duration:500});
	
	function playSound(sound_name){
    	soundPlay = Titanium.Media.createSound({
            url: 'sounds/'+sound_name,
            preload: true,
            volume: 1
        });    
        
        soundPlay.play();
	}
	
	var play =  Titanium.UI.createButton({
		title:'Play',
		backgroundColor: 'white',
        style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	var close =  Titanium.UI.createButton({
		title:'Cancel',
		backgroundColor: 'white',
        style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE,
		width:'auto'
	});
	
	var sE =  Titanium.UI.createLabel({
		text: picker_title,
		textAlign: 'left',
		color: '#FFFFFF',
		backgroundColor: 'transparent',
		width: 70
	});
	
	var save =  Titanium.UI.createButton({
		title:'Save',
		backgroundColor: 'white',
        style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	var picker = Titanium.UI.createPicker({
		width: 'auto',
		bottom: 0,
		height: 'auto',
		fontSize: 10
	});
	
	var pickerData = args.data;

	save.addEventListener('click', function(e) {
		instance.animate(slide_out);
		var sound = soundSelected.substr(0, soundSelected.lastIndexOf('.'));
		Ti.App.fireEvent('changeSoundEffectLabel', { text: sound});
	});
	
	close.addEventListener('click', function(e){
		instance.animate(slide_out);
	});
	
	
	var soundSelected = ''; 
	
	play.addEventListener('click', function(e){
	    playSound(soundSelected);
	});

	if(Ti.Platform.osname === 'iphone') {
		toolbar =  Titanium.UI.iOS.createToolbar({
			height : 40,
		    width : '100%',
		    left : 0,
		    top : 0,
		    barColor: '#333546',
		    opacity: 1,
			items:[close, spacer, sE, spacer, play, save]
		});		
		instance.add(toolbar);
	}	

	picker.selectionIndicator = true;
	
	    
	instance.addEventListener('change', function(e) {
		soundSelected = e.selectedValue+'.mp3';
	});
	
	picker.add(pickerData);
	instance.add(picker);

	// Highlight a selection
	picker.setSelectedRow(0, args.pSelection, true);

	return instance
};

module.exports = PickerView;