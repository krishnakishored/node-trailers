import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";


const login = (aadClientId, aadSecret, aadTenantId, armAadAudience, armEndpoint, aadEndpoint) => {

   return msRestNodeAuth.loginWithServicePrincipalSecret(aadClientId, aadSecret, aadTenantId,
        {
          environment: {
            activeDirectoryResourceId: armAadAudience,
            resourceManagerEndpointUrl: armEndpoint,
            activeDirectoryEndpointUrl: aadEndpoint
          }
        })

}

module.exports = {
    login : login
}    