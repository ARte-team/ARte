"use strict";

function error404() {
  // Relative path with respect to the page where this js is loaded
  location.replace("../default/error-404.htm");
}

const poolData = {
    UserPoolId : 'us-east-1_nFn2Epxsq',
    ClientId :   '770tifd14ogfb9vmo6onje5r5r'
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
	cognitoUser.getSession(function(err, session) {
		if (err) {
			//alert(err.message || JSON.stringify(err));
      error404();
			return;
		}

    const isValid = session.isValid();
		//console.log('session validity: ' + isValid);

    if (!isValid) {
      error404();
			return;
    }

		// NOTE: getSession must be called to authenticate user before calling getUserAttributes
		cognitoUser.getUserAttributes(function(err, attributes) {
			if (err) {
  			//alert(err.message || JSON.stringify(err));
        error404();
			}
      else {
				//console.log("attributes");
        //console.log(attributes);

        for (let attr of attributes) {
          if (attr["Name"] === "name")
            setCookie("name", attr.Value, 1)
          else if (attr["Name"] === "family_name")
            setCookie("family_name", attr.Value, 1)
          else if (attr["Name"] === "gender")
            setCookie("gender", attr.Value, 1)
        }

        //console.log("cookies in validation: " + getCookie("name") + " " + getCookie("family_name"));
			}
		});

	});
}

else
  error404();
