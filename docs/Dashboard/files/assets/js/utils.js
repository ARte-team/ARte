"use strict";

// Return a Universal Unique ID
function createUUID(){
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

// Return current datetime in the following format: DD-MM-YYYY HH:MM:SS
function getDatetime() {
  let now     = new Date();
  let year    = now.getFullYear();
  let month   = now.getMonth()+1;
  let day     = now.getDate();
  let hour    = now.getHours();
  let minute  = now.getMinutes();
  let second  = now.getSeconds();

  month  = getTwoDigits(month);
  day    = getTwoDigits(day);
  hour   = getTwoDigits(hour);
  minute = getTwoDigits(minute);
  second = getTwoDigits(second);

  return day+'-'+month+'-'+year+' '+hour+':'+minute+':'+second;
}

// Return a two digits string (assuming I pass only positive values of at most two digits)
function getTwoDigits(number) {
  if(number < 10 && number.toString().length == 1)
    return '0' + number;
  else
    return number;
}


function showErrorModal(title) {
  swal(title, {
    icon: "error",
    buttons: {
      confirm: {
        text: "Ok",
        value: true,
        visible: true,
        className: "btn btn-danger",
        closeModal: true
      }
    }
  });

  $(".btn-danger").on('mouseenter', function() { $(this).css('background', '#ef5f51') });
  $(".btn-danger").on('mouseleave', function() { $(this).css('background', '#eb3422') });
}

function showSuccessModal(title) {
  swal(title, {
    icon: "success",
    buttons: {
      confirm: {
        text: "Ok",
        value: true,
        visible: true,
        className: "btn btn-success",
        closeModal: true
      }
    }
  });

  $(".btn-success").on('mouseenter', function() { $(this).css('background', '#0df3a3') });
  $(".btn-success").on('mouseleave', function() { $(this).css('background', '#0ac282') });
}
