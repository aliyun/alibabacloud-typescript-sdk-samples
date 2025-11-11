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

  static async ratePlanInst(client: ESA20240910): Promise<$ESA20240910.PurchaseRatePlanResponseBody> {
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

  static async httpBasicConf(ratePlanInstResponseBody: $ESA20240910.PurchaseRatePlanResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateSiteResponseBody> {
    console.info("Begin Call CreateSite to create resource");
    let createSiteRequest = new $ESA20240910.CreateSiteRequest({
      siteName: "gositecdn.cn",
      instanceId: ratePlanInstResponseBody.instanceId,
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

  static async httpsBasicConf(httpBasicConfResponseBody: $ESA20240910.CreateSiteResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateHttpsBasicConfigurationResponseBody> {
    console.info("Begin Call CreateHttpsBasicConfiguration to create resource");
    let createHttpsBasicConfigurationRequest = new $ESA20240910.CreateHttpsBasicConfigurationRequest({
      siteId: httpBasicConfResponseBody.siteId,
      ciphersuite: "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
      ruleEnable: "on",
      https: "on",
      http3: "on",
      http2: "on",
      tls10: "on",
      tls11: "on",
      sequence: 1,
      tls12: "on",
      tls13: "on",
      ciphersuiteGroup: "all",
      rule: "true",
      ruleName: "test_global1",
      ocspStapling: "on",
    });
    let createHttpsBasicConfigurationResponse = await client.createHttpsBasicConfiguration(createHttpsBasicConfigurationRequest);
    console.info("Call CreateHttpsBasicConfiguration success, response: ");
    console.info(Util.toJSONString(createHttpsBasicConfigurationResponse));
    return createHttpsBasicConfigurationResponse.body;
  }

  static async updateHttpsBasicConf(httpBasicConfResponseBody: $ESA20240910.CreateSiteResponseBody, createHttpsBasicConfigurationResponseBody: $ESA20240910.CreateHttpsBasicConfigurationResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call UpdateHttpsBasicConfiguration to update resource");
    let updateHttpsBasicConfigurationRequest = new $ESA20240910.UpdateHttpsBasicConfigurationRequest({
      siteId: httpBasicConfResponseBody.siteId,
      ciphersuite: "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
      ruleEnable: "off",
      https: "off",
      http3: "off",
      http2: "off",
      tls10: "off",
      tls11: "off",
      sequence: 2,
      tls12: "off",
      tls13: "off",
      ciphersuiteGroup: "custom",
      rule: "true",
      ruleName: "test_global1",
      ocspStapling: "off",
      configId: createHttpsBasicConfigurationResponseBody.configId,
    });
    let updateHttpsBasicConfigurationResponse = await client.updateHttpsBasicConfiguration(updateHttpsBasicConfigurationRequest);
    console.info("Call UpdateHttpsBasicConfiguration success, response: ");
    console.info(Util.toJSONString(updateHttpsBasicConfigurationResponse));
  }

  static async destroyHttpsBasicConf(httpBasicConfResponseBody: $ESA20240910.CreateSiteResponseBody, createHttpsBasicConfigurationResponseBody: $ESA20240910.CreateHttpsBasicConfigurationResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call DeleteHttpsBasicConfiguration to destroy resource");
    let deleteHttpsBasicConfigurationRequest = new $ESA20240910.DeleteHttpsBasicConfigurationRequest({
      siteId: httpBasicConfResponseBody.siteId,
      configId: createHttpsBasicConfigurationResponseBody.configId,
    });
    let deleteHttpsBasicConfigurationResponse = await client.deleteHttpsBasicConfiguration(deleteHttpsBasicConfigurationRequest);
    console.info("Call DeleteHttpsBasicConfiguration success, response: ");
    console.info(Util.toJSONString(deleteHttpsBasicConfigurationResponse));
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
    let ratePlanInstRespBody = await Client.ratePlanInst(esa20240910Client);
    let httpBasicConfRespBody = await Client.httpBasicConf(ratePlanInstRespBody, esa20240910Client);
    let httpsBasicConfRespBody = await Client.httpsBasicConf(httpBasicConfRespBody, esa20240910Client);
    // update resource
    await Client.updateHttpsBasicConf(httpBasicConfRespBody, httpsBasicConfRespBody, esa20240910Client);
    // destroy resource
    await Client.destroyHttpsBasicConf(httpBasicConfRespBody, httpsBasicConfRespBody, esa20240910Client);
  }

}

Client.main(process.argv.slice(2));
