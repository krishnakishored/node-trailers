# api_translator

## Supported EndPoints
1. {{TRANSLATE_URL}}
    - http://localhost:4444
    - Reroutes the ILP api_v1.0 requests to ILP v_1.2 api after passing through request_transformer middileware

1. {{ECHO_URL}} 
    - http://localhost:4444/echo
    - sends back the request body & request headers as response


## Configuration
1. config.js handles the configuration required
1. Configuration parameters are set through .env file
    ~~~sh 
    # NODE_ENV=development
    PORT=4444 

    # upstream URLS 
    UPSTREAM_STATUS_URL=https://apis.location.studio/ilp/positioning/v1.2/status
    
    UPSTREAM_CALCULATE_URL=https://apis.location.studio/ilp/positioning/v1.2/calculate
    ~~~
