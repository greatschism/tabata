function TableView(_args) {
	var win = Ti.UI.createWindow({
		top:35,
	});
	if (Ti.Platform.name == 'android') {
		win.backgroundColor = '#4e5c4d';
	} else	{
		win.backgroundColor = 'transparent';
	}
	
	// Get the sounds as an array
    var resourcesDir = Titanium.Filesystem.getResourcesDirectory() + '/sounds';
    var dir = Titanium.Filesystem.getFile(resourcesDir);
    var soundsListing = dir.getDirectoryListing();

    var data = [];
    var pData = []; 
    var goSound = settings.preferences.goSound.substr(0, settings.preferences.goSound.lastIndexOf('.'));
    var restSound = settings.preferences.restSound.substr(0, settings.preferences.restSound.lastIndexOf('.'));
    var finishSound = settings.preferences.finishSound.substr(0, settings.preferences.finishSound.lastIndexOf('.'));
    var selectedPicker = '';
    var sliderIncrement = 5;
    
       
    function round5(x) {
        return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
    }
        
    // create first row
    var row = Ti.UI.createTableViewRow({title:'Go', hasChild:true});
    row.backgroundColor = '#FFFFFF';
    row.selectedBackgroundColor = '#385292';
    row.height = 40;
    var goLabel = Titanium.UI.createLabel({
        text:goSound,
        color:'#385292',
        textAlign:'right',
        font:{fontSize:14},
        width:250,
        height:'auto'
    });
    row.className = 'header';
    row.add(goLabel);
    data.push(row);
    
    var row = Ti.UI.createTableViewRow({title:'Rest', hasChild:true});
    row.backgroundColor = '#FFFFFF';
    row.selectedBackgroundColor = '#385292';
    row.height = 40;
    var restLabel = Titanium.UI.createLabel({
        text:restSound,
        color:'#385292',
        textAlign:'right',
        font:{fontSize:14},
        width:250,
        height:'auto'
    });
    row.className = 'header';
    row.add(restLabel);
    data.push(row);
    
    var row = Ti.UI.createTableViewRow({title:'Finish', hasChild:true});
    row.backgroundColor = '#FFFFFF';
    row.selectedBackgroundColor = '#385292';
    row.height = 40;
    var finishLabel = Titanium.UI.createLabel({
        text:finishSound,
        color:'#385292',
        textAlign:'right',
        font:{fontSize:14},
        width:250,
        height:'auto'
    });
    row.className = 'header';
    row.add(finishLabel);
    data.push(row);

	var headerView = Ti.UI.createView({
		height: 25,
		width: 'auto'
	});
	
	var label = Ti.UI.createLabel({ 
		color: '#FFFFFF',
		shadowColor: '#222222',
		shadowOffset: {x:1,y:1},
		text: 'Sound Effects',
		textAlign: 'left', 
		font: {fontFamily: 'Verdana', fontSize:14}, 
		width: 290,
		top:10
	});
	
	headerView.add(label);


    /* Picker and Table */

    //
    // create table view (
    //
    var tableView = Titanium.UI.createTableView({
        data:data,
        headerView:headerView,
        filterAttribute:'filter',
        backgroundColor:'transparent',
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        scrollable: false
    });

       
    var picker_view = require('/ui/common/PickerView');
	
	var slide_in = Titanium.UI.createAnimation({bottom:0,duration:150});
	var slide_out =  Titanium.UI.createAnimation({bottom:-285,duration:250});

    // Clear pData
    pData = [];
    
    // Go through the Sounds array and create the picker rows        
    for(var i = 0; i < soundsListing.length; i++){
    	var sListing = soundsListing[i].substr(0, soundsListing[i].lastIndexOf('.'));
    	pData.push(Titanium.UI.createPickerRow({title: sListing, value: sListing }));	    	
    }
	    
    // Find where the selection is and pass it to the picker
    function findSelection(picker_name){
    	var prefSound = '';
    	switch(picker_name){
    		case 'go_picker':
    			prefSound = settings.preferences.goSound;
    		break;
    		
    		case 'rest_picker':
    			prefSound = settings.preferences.restSound;
    		break;
    		
    		case 'finish_picker':
    			prefSound = settings.preferences.finishSound;
    		break;
    		
    		default:
    			prefSound = settings.preferences.goSound;
    	}
    	
    	
    	for(var j = 0; j < soundsListing.length; j++){
    		// If sound matches get the key
    		if(soundsListing[j] === prefSound){
	    		return j;
    		}
    	}
    	
    	return 0;
    } 
     
    var go_picker = new picker_view(
    	args = {
			data: pData,
			pSelection: findSelection('go_picker')
		}, 'Go');
	
	var rest_picker = new picker_view(
		args = {
			data: pData,
			pSelection: findSelection('rest_picker')
		}, 'Rest');
	
	var finish_picker = new picker_view(
		args = {
			data: pData,
			pSelection: findSelection('finish_picker')
		}, 'Finish');

    tableView.addEventListener('click', function(e) {
        // use rowNum property on object to get row number
        var rowNum = e.index;

        if(rowNum === 0){
        	// Store this selected picker in a variable
        	selectedPicker = 'go_picker';
        	
        	// Hide other pickers first
        	typeof rest_picker === 'object' ? rest_picker.animate(slide_out) : null;
        	typeof finish_picker === 'object' ? finish_picker.animate(slide_out) : null;
        	
        	// Add the go picker        	
        	win.add(go_picker);        	     	      
        	go_picker.visible = true;    
			go_picker.animate(slide_in);  	
        }
        
        if(rowNum === 1){
        	// Store this selected picker in a variable
        	selectedPicker = 'rest_picker';
        	
        	// Hide other pickers first
        	typeof finish_picker === 'object' ? finish_picker.animate(slide_out) : null;
        	typeof go_picker === 'object' ? go_picker.animate(slide_out) : null;
        	
        	// Add the rest picker
        	win.add(rest_picker);
        	rest_picker.visible = true;
        	rest_picker.animate(slide_in);

        }
        
        if(rowNum === 2){
        	// Store this selected picker in a variable
        	selectedPicker = 'finish_picker';
        	
        	// Hide other pickers first
        	typeof rest_picker === 'object' ? rest_picker.animate(slide_out) : null;
        	typeof go_picker === 'object' ? go_picker.animate(slide_out) : null;

        	// Add the Finish picker
        	win.add(finish_picker);        	
        	finish_picker.visible = true;
        	finish_picker.animate(slide_in);
        }
    });

    // Add the tableViow of Sound Effedts to the window
   	win.add(tableView);
    /* End Picker and Table */


/* Start the table view for Rest */
    var data = [];
    
    // create Rest Slider Row
    var row = Ti.UI.createTableViewRow();
    row.backgroundColor = '#FFFFFF';
    row.height = 40;
    
    var slider_go = Titanium.UI.createSlider({
        top: 2,
        min: 5,
        max: 90,
        width: '100%',
        value: settings.preferences.goTime,
        thumbImage: '/images/slider_off.png',
        highlightedThumbImage: '/images/slider_on.png'
    });
    
    var slider_go_label = Ti.UI.createLabel({
        text: slider_go.value,
        width: '100%',
        height: 'auto',
        font: {fontFamily: 'Helvetica', fontSize: 14},
        top: 0,
        left: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
    
    slider_go.addEventListener('change', function(e) {
        slider_go_label.text = String.format("%d", round5(e.value));
        settings.preferences.goTime = slider_go_label.text;
    });
    
    row.className = 'rest_header';
    row.add(slider_go);
    row.add(slider_go_label);
    data.push(row);
    
    var headerViewGo = Ti.UI.createView({
        height: 25,
        width: 'auto'
    });
    
    var go_label = Ti.UI.createLabel({ 
        color: '#FFFFFF',
        shadowColor: '#222222',
        shadowOffset: {x:1,y:1},
        text: 'Workout in Seconds (default 20)',
        textAlign: 'left', 
        font: {fontFamily: 'Verdana', fontSize:14}, 
        width: 290,
        top:10
    });
    
    headerViewGo.add(go_label);
    

    //
    // create Go Table View
    //
    var tableViewGo = Titanium.UI.createTableView({
        top:155,
        data:data,
        headerView:headerViewGo,
        backgroundColor:'transparent',
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        scrollable: false,
        selectionStyle:'none'
    });

    win.add(tableViewGo);

        
	/* Start the table view for Rest */
    var data = [];
    
	// create Rest Slider Row
    var row = Ti.UI.createTableViewRow();
    row.backgroundColor = '#FFFFFF';
    row.height = 40;
    
    var slider_rest = Titanium.UI.createSlider({
        top: 2,
        min: 5,
        max: 90,
        width: '100%',
        value: settings.preferences.restTime,
        thumbImage: '/images/slider_off.png',
        highlightedThumbImage: '/images/slider_on.png'
    });
    
    var slider_rest_label = Ti.UI.createLabel({
        text: slider_rest.value,
        width: '100%',
        height: 'auto',
        font: {fontFamily: 'Helvetica', fontSize: 14},
        top: 0,
        left: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });

    
    slider_rest.addEventListener('change', function(e) {
        slider_rest_label.text = String.format("%d", round5(e.value));
        settings.preferences.restTime = slider_rest_label.text;
    });
    
    row.className = 'rest_header';
    row.add(slider_rest);
    row.add(slider_rest_label);
    data.push(row);
    
    var headerViewRest = Ti.UI.createView({
        height: 25,
        width: 'auto'
    });
    
    var rest_label = Ti.UI.createLabel({ 
        color: '#FFFFFF',
        shadowColor: '#222222',
        shadowOffset: {x:1,y:1},
        text: 'Rest in Seconds (default 10)',
        textAlign: 'left', 
        font: {fontFamily: 'Verdana', fontSize:14}, 
        width: 290,
        top:10
    });
    
    headerViewRest.add(rest_label);
	

    //
    // create Rest Table View
    //
    var tableViewRest = Titanium.UI.createTableView({
    	top:235,
        data:data,
        headerView:headerViewRest,
        backgroundColor:'transparent',
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        scrollable: false,
        selectionStyle:'none'
    });

    win.add(tableViewRest);
    
    
    // Updates the sound selection
    var updateSoundSelection = Ti.App.addEventListener('changeSoundEffectLabel', function(data){    	

    	switch(selectedPicker){
    		case 'go_picker':
    			goLabel.text = data.text;
    			settings.preferences.goSound = data.text+'.mp3';
    		break;
    		
    		case 'rest_picker':
    			restLabel.text = data.text;
    			settings.preferences.restSound = data.text+'.mp3';
    		break;
    		
    		case 'finish_picker':
    			finishLabel.text = data.text;
    			settings.preferences.finishSound = data.text+'.mp3';
    		break;
    		
    		default:
    			// Do something or nothing
    	}
    	
    	// Clear the Selected Picker
    	selectedPicker = '';
    	
    	// Save the sound preferences so the app can use it.
		Ti.App.Properties.setString('userData', JSON.stringify(settings));
	});		

	return win;
};

module.exports = TableView;