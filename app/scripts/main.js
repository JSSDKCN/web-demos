// jshint devel:true
'use strict';

(function($) {


  var imageManager = {
    lastMousePos: {},
    lastPauseDiff: {
      x: 0,
      y: 0
    },
    dom: {
      base: null,
      panel: null,
      image: null
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

  /*

   function initMove(base, panel, image, options) {
   var start = false;
   var isResume = false;
   var lastNodePos = {};
   var lastX = 0;
   var lastY = 0;
   if (options.width) {
   $(base).css('width', options.width);
   }
   if (options.height) {
   $(base).css('height', options.height);
   }
   $(base).on('click', function (e) {
   if (!start) {
   lastNodePos.x = e.screenX;
   lastNodePos.y = e.screenY;
   isResume = true;
   } else {

   }
   start = !start;
   console.log(lastNodePos);
   //origin
   });

   $(base).on('mousemove', function (e) {

   if (start) {
   var position = $(panel).position();
   console.log(position);
   var top = position.top;
   var left = position.left;

   var diffX = (e.screenX - lastNodePos.x);
   var diffY = (e.screenY - lastNodePos.y);

   if (isResume) {
   diffX += lastX;
   diffY += lastY;
   }

   if (diffX > 0) {
   diffX = lastX;
   }
   if (diffY > 0) {
   diffY = lastY;
   }

   if (img.width - $(base).width() + diffX < 0) {
   diffX = $(base).width() - img.width;
   }
   if (img.height - $(base).height() + diffY < 0) {
   diffY = $(base).height() - img.height;
   }
   $(panel).css('left', diffX + 'px');
   $(panel).css('top', diffY + 'px');
   lastX = diffX;
   lastY = diffY;
   }

   });

   var img = new Image();
   img.onload = function () {
   $(panel).css('width', this.width + 'px');
   $(panel).css('height', this.height + 'px');
   };
   img.src = $(image).attr('src');
   }



   initMove('.image-move-scale', '.image-panel', '.image-node', {
   width: '300px',
   height: '700px'
   });
   */

  imageManager.init('.image-move-scale', '.image-panel', '.image-node');
  imageManager.setBase(300, 200);
  imageManager.setImage($('.image-node').attr('src'));

  var ratio = 1;

  $('.plus').click(function() {
    ratio += 0.1;
    imageManager.setScale(ratio);
  });

  $('.minus').click(function() {
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
