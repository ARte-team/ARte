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

        if (getCookie("name") !== "")
          return;

        for (let attr of attributes) {
          if (attr["Name"] === "name")
            setCookie("name", attr.Value, 1)
          else if (attr["Name"] === "family_name")
            setCookie("family_name", attr.Value, 1)
          else if (attr["Name"] === "gender")
            setCookie("gender", attr.Value, 1)
          else if (attr["Name"] === "email")
            setCookie("email", attr.Value, 1)
        }

        //console.log("cookies in validation: " + getCookie("name") + " " + getCookie("family_name"));
			}
		});

	});
}

else
  error404();


async function authUser(username, password) {
  if(!username || !password)
    return false;

  const authenticationData = {
    Username: username,
    Password: password
  };
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  const poolData = {
    UserPoolId: 'us-east-1_nFn2Epxsq',
    ClientId:   '770tifd14ogfb9vmo6onje5r5r'
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = {
    Username: username,
    Pool:     userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  return new Promise( function(resolve) {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        //const accessToken = result.getAccessToken().getJwtToken();

        // Use the idToken for Logins Map when Federating User Pools with identity pools or
        // when passing through an Authorization Header to an API Gateway Authorizer
        //const idToken = result.idToken.jwtToken;

        //console.log("result");
        //console.log(result);

        resolve(true);
      },
      onFailure: function(err) {
        resolve(false);
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        resolve(false);
      }
    });
  });
}
