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

// Return current datetime in the following format: DD-MM-YYYY HH:mm:SS
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

  return day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
}

// Return a two digits string (assuming I pass only positive values of at most two digits)
function getTwoDigits(number) {
  if(number < 10 && number.toString().length == 1)
    return '0' + number;
  else
    return number;
}

// Return the difference in milliseconds between date1 and date2
function difference(date1, date2) {
  if (!date1 || ! date2)  return null;

  date1 = convert(date1);
  date2 = convert(date2);

  //console.log("date1: " + date1);
  //console.log("date2: " + date2);

  return new Date(date1) - new Date(date2);
}

// Convert the string date in the format DD/MM/YYYY HH:mm:SS in the following MM/DD/YYYY HH:mm:SS
// Needed before computing the difference between dates
function convert(date) {
  if (!date || date.length != 19)  return null;

  const day   = date.substring(0,2);
  const month = date.substring(3,5);

  return month + "/" + day + date.substring(5);
}

// Return elapsed time either in seconds or minutes or hours or ...
function elapsedTime(elapsedMs) {
  if (elapsedMs < 0)   return undefined;

  let elapsedSeconds = elapsedMs / 1000;
  if (elapsedSeconds < 60) {
    elapsedSeconds = Math.floor(elapsedSeconds);
    return elapsedSeconds == 1 ? elapsedSeconds + " second" : elapsedSeconds + " seconds";
  }

  let elapsedMinutes = elapsedSeconds / 60;
  if (elapsedMinutes < 60) {
    elapsedMinutes = Math.floor(elapsedMinutes);
    return elapsedMinutes == 1 ? elapsedMinutes + " minute" : elapsedMinutes + " minutes";
  }

  let elapsedHours = elapsedMinutes / 60;
  if (elapsedHours < 24) {
    elapsedHours = Math.floor(elapsedHours);
    return elapsedHours == 1 ? elapsedHours + " hour" : elapsedHours + " hours";
  }

  let elapsedDays = elapsedHours / 24;
  if (elapsedDays < 7) {
    elapsedDays = Math.floor(elapsedDays);
    return elapsedDays == 1 ? elapsedDays + " day" : elapsedDays + " days";
  }

  let elapsedWeeks = elapsedDays / 7;
  if (elapsedDays < 30) {
    elapsedWeeks = Math.floor(elapsedWeeks);
    return elapsedWeeks == 1 ? elapsedWeeks + " week" : elapsedWeeks + " weeks";
  }

  let elapsedMonths = elapsedDays / 30;
  if (elapsedMonths < 12) {
    elapsedMonths = Math.floor(elapsedMonths);
    return elapsedMonths == 1 ? elapsedMonths + " month" : elapsedMonths + " months";
  }

  let elapsedYears = Math.floor(elapsedMonths / 12);
  return elapsedYears == 1 ? elapsedYears + " year" : elapsedYears + " years";
}

// If compareDatetimes(x, y) returns less than 0, x is lower than y.
// If compareDatetimes(x, y) returns 0, x and y are equal.
// If compareDatetimes(x, y) returns greater than 0, x is greater than y.
// Datetimes are in the format DD/MM/YYYY HH:MM:SS
function compareDatetimes(x, y) {
  if (!x || !y)   return false;

  // Get arrays of dates and times
  x = x.split(" ");
  y = y.split(" ");

  const dateCmp = compareDates(x[0], y[0]);
  if (dateCmp != 0)
    return dateCmp;

  return compareTimes(x[1], y[1]);
}

// If compareDates(x, y) returns less than 0, x is lower than y.
// If compareDates(x, y) returns 0, x and y are equal.
// If compareDates(x, y) returns greater than 0, x is greater than y.
// Dates are in the format DD/MM/YYYY
function compareDates(x, y) {
  if (!x || !y)   return false;

  // Get arrays of day, month, year
  x = x.split("/");
  y = y.split("/");

  // Compare years, if equals compare months, if equals compare days
  return x[2] - y[2] || x[1] - y[1] || x[0] - y[0];
}

// If compareTimes(x, y) returns less than 0, x is lower than y.
// If compareTimes(x, y) returns 0, x and y are equal.
// If compareTimes(x, y) returns greater than 0, x is greater than y.
// Times are in the format HH:MM:SS
function compareTimes(x, y) {
  if (!x || !y)   return false;

  // Get arrays of hours, minutes, seconds
  x = x.split(":");
  y = y.split(":");

  // Compare hours, if equals compare minutes, if equals compare seconds
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
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

// Animate value of a HTML element as a counter
function animateValue(elem, start, end, duration, step=10) {
  if (!elem || start == end)  return;

  const range = end - start;
  const increment = start < end ? step : -step;
  let current = start;
  const stepTime = Math.abs(Math.floor(duration / range));

  const timer = setInterval(function() {
    current += increment;
    if (current >= end) {
      clearInterval(timer);
      elem.innerHTML = end;
    }
    else
      elem.innerHTML = current;
  }, stepTime);
}

// TODO
async function resizeImage(document, file) {
  var img = document.createElement("img");
  var canvas = document.createElement("canvas");
  var reader = new FileReader();
  reader.onload = function(e) {
    img.src = e.target.result
  }
  reader.readAsDataURL(file);

  //var ctx = canvas.getContext("2d");
  //ctx.drawImage(img, 0, 0);

  var MAX_WIDTH  = 720;
  var MAX_HEIGHT = 720;
  var width  = img.width;
  var height = img.height;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }

  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  //return canvas.toDataURL();

  // Get the binary (aka blob)
  const blob = await new Promise(rs => canvas.toBlob(rs, 1))
  return new File([blob], file.name, file)

  //Post dataurl to the server with AJAX
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  const user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}
