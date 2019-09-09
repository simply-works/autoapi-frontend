import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify, { Auth } from 'aws-amplify';
import amplify from './aws-exports';

const oauth = {
  // Domain name
  domain: environment.awsmobile.domain,

  // Authorized scopes
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],

  // Callback URL
  redirectSignIn: environment.awsmobile.redirectUrl,

  // Sign out URL
  redirectSignOut: environment.awsmobile.logoutRedirectUrl,

  // 'code' for Authorization code grant,
  // 'token' for Implicit grant
  responseType: 'code',

  // optional, for Cognito hosted ui specified options
  options: {
    // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
    AdvancedSecurityDataCollectionFlag: true
  },
  region: environment.awsmobile.aws_project_region,
  userPoolId: environment.awsmobile.aws_user_pools_id,
  userPoolWebClientId: environment.awsmobile.aws_user_pools_web_client_id,
  mandatorySignIn: true
};

// Amplify.configure({
//   ...amplify,
//   Auth: {
//     oauth
//   }
// });


// You can get the current config object
// const currentConfig = Auth.configure();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
