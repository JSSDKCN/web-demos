'use strict';

(function ($) {


  var imageManager = {
    lastMousePos: {},
    lastPauseDiff: {
      x: 0,
      y: 0
    },
    dom: {
      base: null,
      panel: null,
      image: null,
      camera: null,
      frame: null
    },
    image: {
      width: 0,
      height: 0
    },
    origin: {
      width: 0,
      height: 0
    },
    init: function (base, panel, image) {
      this.dom.base = base;
      this.dom.panel = panel;
      this.dom.image = image;
      this.initMove();

    },
    initIphone5: function(camera, frame) {
      this.dom.camera = camera;
      this.dom.frame = frame;
      this.hide();
    },
    show: function() {
      $(this.dom.base).css('overflow', '');
      $(this.dom.frame).show();
      $(this.dom.camera).hide();
    },
    hide: function() {
      $(this.dom.base).css('overflow', 'hidden');
      $(this.dom.camera).show();
      $(this.dom.frame).hide();

    },
    initMove: function () {
      var im = this;
      var base = this.dom.base;
      var panel = this.dom.panel;
      var start = false;
      var isResume = false;
      $(base).on('click', function (e) {
        if (!start) {
          im.lastMousePos.x = e.screenX;
          im.lastMousePos.y = e.screenY;
          isResume = true;
          im.show();
        } else {
          im.hide();
        }

        start = !start;
      });

      $(base).on('mousemove', function (e) {

        if (start) {

          var diffX = (im.lastMousePos.x - e.screenX);
          var diffY = (im.lastMousePos.y - e.screenY);

          console.log(isResume);
          diffX += im.lastPauseDiff.x;
          diffY += im.lastPauseDiff.x;

          if (diffX > 0) {
            diffX = im.lastPauseDiff.x;
          }
          if (diffY > 0) {
            diffY = im.lastPauseDiff.x;
          }

          if (im.image.width - $(base).width() + diffX < 0) {
            diffX = $(base).width() - im.image.width;
          }
          if (im.image.height - $(base).height() + diffY < 0) {
            diffY = $(base).height() - im.image.height;
          }
          $(panel).css('left', diffX + 'px');
          $(panel).css('top', diffY + 'px');
          im.lastPauseDiff.x = diffX;
          im.lastPauseDiff.y = diffY;
        }
      });
    },
    setBase: function (width, height) {
      this.setRect(this.dom.base, width, height);
    },
    setRect: function (selector, width, height) {
      $(selector).css('width', width + 'px');
      $(selector).css('height', height + 'px');
    },
    setImage: function (src) {
      var im = this;
      var img = new Image();
      img.onload = function () {
        im.origin.width = this.width;
        im.origin.height = this.height;
        im.image.width = this.width;
        im.image.height = this.height;
        im.setRect(im.dom.panel, this.width, this.height);
      };
      img.src = src;
    },
    setScale: function (ratio) {
      var minWidth = $(this.dombase).width();
      var minHeight = $(this.dom.base).height();
      console.log(this.origin);
      console.log(ratio);
      var newWidth = this.origin.width * ratio;
      var newHeight = this.origin.height * ratio;
      if (newWidth < minWidth) {
        return;
      }
      if (newHeight < minHeight) {
        return;
      }
      this.image.width = newWidth;
      this.image.height = newHeight;
      console.log((this.image));
      this.setRect(this.dom.panel, newWidth, newHeight);
    }
  };

  imageManager.init('.image-move-scale', '.image-panel', '.image-node');
  imageManager.initIphone5('.image-camera', '.iphone5-frame');
  imageManager.setBase(300, 600);
  imageManager.setImage($('.image-node').attr('src'));

  var ratio = 1;

  $('.plus').click(function () {
    ratio += 0.1;
    imageManager.setScale(ratio);
  });

  $('.minus').click(function () {
    if (ratio > 0.1) {
      ratio -= 0.1;
    }
    imageManager.setScale(ratio);
  });


  /*
   setTimeout(function() {
   imageManager.setScale(String(Math.random() * 5));
   });
   */

})($);
