function Label(args) {
	var instance = Titanium.UI.createLabel({
	    width: args.width,
	    height: args.height,
	    top: args.top,
	    left: args.left,
	    font: args.font,
	    text: args.text,
	    zIndex: args.zIndex,
	    color: args.color,
	    textAlign: args.textAlign,
	    opacity: args.opacity,
	    shadowColor:'#404040',
	    shadowOffset: {x:1,y:1},
	    bottom: args.bottom
	});
	
	return instance;
};

module.exports = Label;
