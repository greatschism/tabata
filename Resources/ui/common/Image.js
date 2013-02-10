function Image(args) {
	var instance = Titanium.UI.createImageView({
		image: args.image,
		width: args.width,
		height: args.height,
		top: args.top,
		left: args.left,
		borderRadius: args.borderRadius,
		transform: args.transform,
		opacity: args.opacity
	});
	
	return instance;
};

module.exports = Image;
