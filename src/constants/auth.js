import {Linking} from 'react-native';

export const LOGIN_DEFAULT='Email';
export const PASSWORD_DEFAULT='Password';

/*
Linking.createURL()
Published app URL in standalone: scheme://
Development app URL in Expo Go: exp://127.0.0.1:19000
*/

export const LINKEDIN_AUTH = {
	linkedInUrl: "https://www.linkedin.com/oauth/v2/authorization",
    linkedInQParams:{
    	"response_type": "code",
    	"client_id": process.env.REACT_APP_PUBLIC_LINKED_IN_CLIENT_ID,
    	"redirect_uri": process.env.REACT_APP_PUBLIC_API_SECURE_OAUTH ,
    	"state": "{origin:linkedin, target:'" + Linking.createURL() + "'}",
    	"scope": "r_liteprofile"
    }
};
////console.log(LINKEDIN_AUTH);
export const FACEBOOK_AUTH = {
	facebookUrl: "https://www.facebook.com/v11.0/dialog/oauth",
    facebookQParams:{
    	"response_type": "code",
    	"client_id": process.env.REACT_APP_PUBLIC_FACEBOOK_CLIENT_ID,
    	"redirect_uri": process.env.REACT_APP_PUBLIC_API_SECURE_OAUTH ,
    	"state": "{origin:facebook, target:'" + Linking.createURL() + "'}",
    }
};
////console.log(FACEBOOK_AUTH);
export const COGNITO_AUTH = {
	loginUrl: process.env.REACT_APP_PUBLIC_COGNITO_LOGIN_URL,
    authorizeQParams:{
    	"response_type": "code",
    	"client_id": process.env.REACT_APP_PUBLIC_COGNITO_CLIENT_ID,
    	"redirect_uri": process.env.REACT_APP_PUBLIC_API_SECURE_OAUTH ,
    	"state": "{origin:loanshopper, target:'" + Linking.createURL() + "'}",
    	"scope": "openid aws.cognito.signin.user.admin",
    }
};
console.log(process.env.REACT_APP_PUBLIC_API_SECURE_OAUTH)