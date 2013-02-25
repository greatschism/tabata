function Button(args) {
	var instance = Titanium.UI.createButton({
		title: args.title,
		backgroundImage: args.backgroundImage,
		height: args.height,
		width: args.width,
		top: args.top,
		left: args.left,
        style: args.style,
        image: args.image,
        opacity: args.opacity
	});
	
	return instance;
};

module.exports = Button;