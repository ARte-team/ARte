"use strict"

$("document").ready(main)

function main() {
  const username = document.getElementById("username");
  username.innerHTML = getCookie("name") + " " + getCookie("family_name");

  //console.log("cookies: " + getCookie("name") + " " + getCookie("family_name"));

  const logout = document.getElementById("logout");
  logout.onclick = function () {
    cognitoUser.signOut();
    location.replace("./index.htm");
  }
}
