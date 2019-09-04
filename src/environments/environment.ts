// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'http://ec2-3-9-97-225.eu-west-2.compute.amazonaws.com',
  awsmobile : {
    aws_project_region: 'eu-west-2',
    aws_cognito_region: 'eu-west-2',
    aws_user_pools_id: 'eu-west-2_Vp0hZRuA8',
    aws_user_pools_web_client_id: '43b083auborldt90hvb08pefth',
    domain: 'autoapi.auth.eu-west-2.amazoncognito.com',
    redirectUrl: 'http://localhost:4200/dashboard',
    logoutUrl: 'http://localhost:4200/home'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
