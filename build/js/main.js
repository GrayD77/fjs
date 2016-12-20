
// возвращает значение переменной, приведенного к диапазону.
// те если value < min вернет min, если > max - max иначе само значение
var trimm = function(value,min,max) {
	return value < min ? min : value > max ? max : value;
};

var Screen = {

	inPlay: false,

	container: null,

	count: 0,
	lastIndex: 0,
	currentIndex: 0,

	set index(value){
		if (this.inPlay) return false;
		value = trimm(value, 0, this.count-1);

		if (value !== this.currentIndex) {
			this.lastIndex = this.currentIndex;
			this.currentIndex = value;
			this.updateView();
		};
	},

	get index() {
		return this.currentIndex;
	},

	updateView: function(){
		var self = this;
		self.inPlay = true;
		self.container.css({
			'transform': 'translateY(-' + self.currentIndex*100 + '%)',
		});

		if (self.lastIndex === 0 && self.currentIndex === 1) {
			self.phoneContainer.addClass('onScreen');
		};

		if (self.lastIndex === 1 && self.currentIndex === 0) {
			self.phoneContainer.removeClass('onScreen');
		};

		if (self.lastIndex === 2 && self.currentIndex === 3) {
			self.phoneContainer.addClass('bgShow');
		};

		if (self.lastIndex === 3 && self.currentIndex === 2) {
			self.phoneContainer.removeClass('bgShow');
		};


		self.container.on('transitionend', function(evt){
			self.container.off('transitionend');
			if (evt.originalEvent.propertyName !== 'transform') return false;
			self.inPlay = false;
		});
	},

	init: function(containerSelector, slideSelector, phoneSelector){

		this.phoneContainer = $(phoneSelector);
		this.container = $(containerSelector);
		this.count = $(slideSelector).length;

	},

};



var Controller = {

	goBack: function(){
		Screen.index -= 1;
		console.log(Screen.currentIndex);
	},

	goForw: function(){
		Screen.index += 1;
	},

};

Screen.init('#container', '#container .screen', '#phone');

$(window).on('wheel', function(evt){
	var delta = evt.originalEvent.wheelDelta;

	if (delta > 0) {
		$(document).trigger('goBack');
		return;
	};
	if (delta < 0) {
		$(document).trigger('goForw');
		return;
	};
});

$(document).on('goBack', Controller.goBack);
$(document).on('goForw', Controller.goForw);
