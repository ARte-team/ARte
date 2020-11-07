"use strict";

$(document).ready(function() {
  // Default max-length
  // The badge will show up by default when the remaining chars are 10 or less
  $('input[maxlength]').maxlength();

  // Threshold value
  /*$('input.thresold-i').maxlength({
    threshold: 20
  });

  //Color class
  $('input.color-class').maxlength({
      alwaysShow: true,
      threshold: 10,
      warningClass: "label label-success",
      limitReachedClass: "label label-danger"
  });

  //Position class
  $('input.position-class').maxlength({
      alwaysShow: true,
      placement: 'top-left'
  });

  // Textareas max-length
  $('textarea.max-textarea').maxlength({
      alwaysShow: true
  });*/

  // Textareas max-length
  $('textarea.max-textarea').maxlength();
});
