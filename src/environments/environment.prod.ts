export const environment = {
  production: true,
  baseURL: 'https://2t4mtivkmb.execute-api.eu-west-2.amazonaws.com/staging',
  awsmobile : {
    aws_project_region: 'eu-west-2',
    aws_cognito_region: 'eu-west-2',
    aws_user_pools_id: 'eu-west-2_Vp0hZRuA8',
    aws_user_pools_web_client_id: '43b083auborldt90hvb08pefth',
    domain: 'https://autoapi.auth.eu-west-2.amazoncognito.com',
    redirectUrl: 'https://dpdgmov3wklu2.cloudfront.net/dashboard',
    logoutRedirectUrl: 'https://dpdgmov3wklu2.cloudfront.net/home',
    tokenUrl: 'https://autoapi.auth.eu-west-2.amazoncognito.com/oauth2/token',
    logoutUrl: 'https://autoapi.auth.eu-west-2.amazoncognito.com/logout'
  }
};
