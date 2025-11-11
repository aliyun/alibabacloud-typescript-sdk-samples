// This file is auto-generated, don't edit it
import * as $dara from '@darabonba/typescript';
import Credential from '@alicloud/credentials';
import ESA20240910, * as $ESA20240910 from '@alicloud/esa20240910';
import Util from '@alicloud/tea-util';
import * as $OpenApi from '@alicloud/openapi-client';



export default class Client {

  constructor() {
  }


  /**
   * @remarks
   * Init Client
   */
  static createESA20240910Client(): ESA20240910 {
    let config = new $OpenApi.Config({ });
    config.credential = new Credential(null);
    // Endpoint please refer to https://api.aliyun.com/product/ESA
    config.endpoint = "esa.cn-hangzhou.aliyuncs.com";
    return new ESA20240910(config);
  }

  static async ratePlanInstCltCert(client: ESA20240910): Promise<$ESA20240910.PurchaseRatePlanResponseBody> {
    console.info("Begin Call PurchaseRatePlan to create resource");
    let purchaseRatePlanRequest = new $ESA20240910.PurchaseRatePlanRequest({
      type: "NS",
      chargeType: "PREPAY",
      autoRenew: false,
      period: 1,
      coverage: "overseas",
      autoPay: true,
      planName: "high",
    });
    let purchaseRatePlanResponse = await client.purchaseRatePlan(purchaseRatePlanRequest);
    let describeRatePlanInstanceStatusRequest = new $ESA20240910.DescribeRatePlanInstanceStatusRequest({
      instanceId: purchaseRatePlanResponse.body.instanceId,
    });
    let currentRetry = 0;
    let delayedTime = 10000;
    let interval = 10000;

    while (currentRetry < 10) {
      try {
        let sleepTime = 0;
        if (currentRetry == 0) {
          sleepTime = delayedTime;
        } else {
          sleepTime = interval;
        }

        console.info("Polling for asynchronous results...");
        await $dara.sleep(sleepTime);
      } catch (__err) {
        if (__err instanceof $dara.BaseError) {
          const error = __err;
          throw $dara.newError({
            message: error.message,
          });
        }
      }      
      let describeRatePlanInstanceStatusResponse = await client.describeRatePlanInstanceStatus(describeRatePlanInstanceStatusRequest);
      let instanceStatus = describeRatePlanInstanceStatusResponse.body.instanceStatus;
      if (instanceStatus == "running") {
        console.info("Call PurchaseRatePlan success, response: ");
        console.info(Util.toJSONString(purchaseRatePlanResponse));
        return purchaseRatePlanResponse.body;
      }

      currentRetry++;
    }
    throw $dara.newError({
      message: "Asynchronous check failed",
    });
  }

  static async siteCltCert(ratePlanInstCltCertResponseBody: $ESA20240910.PurchaseRatePlanResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateSiteResponseBody> {
    console.info("Begin Call CreateSite to create resource");
    let createSiteRequest = new $ESA20240910.CreateSiteRequest({
      siteName: "gositecdn.cn",
      instanceId: ratePlanInstCltCertResponseBody.instanceId,
      coverage: "overseas",
      accessType: "NS",
    });
    let createSiteResponse = await client.createSite(createSiteRequest);
    let getSiteRequest = new $ESA20240910.GetSiteRequest({
      siteId: createSiteResponse.body.siteId,
    });
    let currentRetry = 0;
    let delayedTime = 60000;
    let interval = 10000;

    while (currentRetry < 5) {
      try {
        let sleepTime = 0;
        if (currentRetry == 0) {
          sleepTime = delayedTime;
        } else {
          sleepTime = interval;
        }

        console.info("Polling for asynchronous results...");
        await $dara.sleep(sleepTime);
      } catch (__err) {
        if (__err instanceof $dara.BaseError) {
          const error = __err;
          throw $dara.newError({
            message: error.message,
          });
        }
      }      
      let getSiteResponse = await client.getSite(getSiteRequest);
      let status = getSiteResponse.body.siteModel.status;
      if (status == "pending") {
        console.info("Call CreateSite success, response: ");
        console.info(Util.toJSONString(createSiteResponse));
        return createSiteResponse.body;
      }

      currentRetry++;
    }
    throw $dara.newError({
      message: "Asynchronous check failed",
    });
  }

  static async cltCert(siteCltCertResponseBody: $ESA20240910.CreateSiteResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateClientCertificateResponseBody> {
    console.info("Begin Call CreateClientCertificate to create resource");
    let createClientCertificateRequest = new $ESA20240910.CreateClientCertificateRequest({
      siteId: siteCltCertResponseBody.siteId,
      pkeyType: "RSA",
      validityDays: 365,
    });
    let createClientCertificateResponse = await client.createClientCertificate(createClientCertificateRequest);
    console.info("Call CreateClientCertificate success, response: ");
    console.info(Util.toJSONString(createClientCertificateResponse));
    return createClientCertificateResponse.body;
  }

  static async updateCltCert(siteCltCertResponseBody: $ESA20240910.CreateSiteResponseBody, createClientCertificateResponseBody: $ESA20240910.CreateClientCertificateResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call RevokeClientCertificate to update resource");
    let revokeClientCertificateRequest = new $ESA20240910.RevokeClientCertificateRequest({
      siteId: siteCltCertResponseBody.siteId,
      id: createClientCertificateResponseBody.id,
    });
    let revokeClientCertificateResponse = await client.revokeClientCertificate(revokeClientCertificateRequest);
    console.info("Call RevokeClientCertificate success, response: ");
    console.info(Util.toJSONString(revokeClientCertificateResponse));
  }

  static async updateCltCert1(siteCltCertResponseBody: $ESA20240910.CreateSiteResponseBody, createClientCertificateResponseBody: $ESA20240910.CreateClientCertificateResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call ActivateClientCertificate to update resource");
    let activateClientCertificateRequest = new $ESA20240910.ActivateClientCertificateRequest({
      siteId: siteCltCertResponseBody.siteId,
      id: createClientCertificateResponseBody.id,
    });
    let activateClientCertificateResponse = await client.activateClientCertificate(activateClientCertificateRequest);
    console.info("Call ActivateClientCertificate success, response: ");
    console.info(Util.toJSONString(activateClientCertificateResponse));
  }

  static async updateCltCert2(siteCltCertResponseBody: $ESA20240910.CreateSiteResponseBody, createClientCertificateResponseBody: $ESA20240910.CreateClientCertificateResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call RevokeClientCertificate to update resource");
    let revokeClientCertificateRequest = new $ESA20240910.RevokeClientCertificateRequest({
      siteId: siteCltCertResponseBody.siteId,
      id: createClientCertificateResponseBody.id,
    });
    let revokeClientCertificateResponse = await client.revokeClientCertificate(revokeClientCertificateRequest);
    console.info("Call RevokeClientCertificate success, response: ");
    console.info(Util.toJSONString(revokeClientCertificateResponse));
  }

  static async destroyCltCert(siteCltCertResponseBody: $ESA20240910.CreateSiteResponseBody, createClientCertificateResponseBody: $ESA20240910.CreateClientCertificateResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call DeleteClientCertificate to destroy resource");
    let deleteClientCertificateRequest = new $ESA20240910.DeleteClientCertificateRequest({
      siteId: siteCltCertResponseBody.siteId,
      id: createClientCertificateResponseBody.id,
    });
    let deleteClientCertificateResponse = await client.deleteClientCertificate(deleteClientCertificateRequest);
    console.info("Call DeleteClientCertificate success, response: ");
    console.info(Util.toJSONString(deleteClientCertificateResponse));
  }

  /**
   * @remarks
   * Running code may affect the online resources of the current account, please proceed with caution!
   */
  static async main(args: string[]): Promise<void> {
    // The code may contain api calls involving fees. Please ensure that you fully understand the charging methods and prices before running.
    // Set the environment variable COST_ACK to true or delete the following judgment to run the sample code.
    let costAcknowledged = process.env["COST_ACK"];
    if ($dara.isNull(costAcknowledged) || !(costAcknowledged == "true")) {
      console.warn("Running code may affect the online resources of the current account, please proceed with caution!");
      return ;
    }

    // Init client
    let esa20240910Client = Client.createESA20240910Client();
    // Init resource
    let ratePlanInstCltCertRespBody = await Client.ratePlanInstCltCert(esa20240910Client);
    let siteCltCertRespBody = await Client.siteCltCert(ratePlanInstCltCertRespBody, esa20240910Client);
    let cltCertRespBody = await Client.cltCert(siteCltCertRespBody, esa20240910Client);
    // update resource
    await Client.updateCltCert(siteCltCertRespBody, cltCertRespBody, esa20240910Client);
    await Client.updateCltCert1(siteCltCertRespBody, cltCertRespBody, esa20240910Client);
    await Client.updateCltCert2(siteCltCertRespBody, cltCertRespBody, esa20240910Client);
    // destroy resource
    await Client.destroyCltCert(siteCltCertRespBody, cltCertRespBody, esa20240910Client);
  }

}

Client.main(process.argv.slice(2));
