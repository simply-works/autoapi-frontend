export const environment = {
  production: true,
  baseURL: 'http://ec2-3-9-97-225.eu-west-2.compute.amazonaws.com',
  awsmobile : {
    aws_project_region: 'eu-west-2',
    aws_cognito_region: 'eu-west-2',
    aws_user_pools_id: 'eu-west-2_Vp0hZRuA8',
    aws_user_pools_web_client_id: '43b083auborldt90hvb08pefth',
    domain: 'autoapi.auth.eu-west-2.amazoncognito.com',
    redirectUrl: 'http://localhost:4200/dashboard',
    logoutRedirectUrl: 'http://localhost:4200/home',
    tokenUrl: 'https://autoapi.auth.eu-west-2.amazoncognito.com/oauth2/token',
    logoutUrl: 'https://autoapi.auth.eu-west-2.amazoncognito.com/logout'
  }
};
