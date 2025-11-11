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

  static async site(ratePlanInstResponseBody: $ESA20240910.PurchaseRatePlanResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateSiteResponseBody> {
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

  static async reqHdrModRule(siteResponseBody: $ESA20240910.CreateSiteResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateHttpRequestHeaderModificationRuleResponseBody> {
    console.info("Begin Call CreateHttpRequestHeaderModificationRule to create resource");
    let requestHeaderModification = new $ESA20240910.CreateHttpRequestHeaderModificationRuleRequestRequestHeaderModification({
      type: "static",
      value: "add",
      operation: "add",
      name: "testadd",
    });
    let requestHeaderModification1 = new $ESA20240910.CreateHttpRequestHeaderModificationRuleRequestRequestHeaderModification({
      operation: "del",
      name: "testdel",
    });
    let requestHeaderModification2 = new $ESA20240910.CreateHttpRequestHeaderModificationRuleRequestRequestHeaderModification({
      type: "dynamic",
      value: "ip.geoip.country",
      operation: "modify",
      name: "testmodify",
    });
    let createHttpRequestHeaderModificationRuleRequest = new $ESA20240910.CreateHttpRequestHeaderModificationRuleRequest({
      siteId: siteResponseBody.siteId,
      ruleEnable: "on",
      rule: "(http.host eq \"video.example.com\")",
      sequence: 1,
      siteVersion: 0,
      ruleName: "test",
      requestHeaderModification: [
        requestHeaderModification,
        requestHeaderModification1,
        requestHeaderModification2
      ],
    });
    let createHttpRequestHeaderModificationRuleResponse = await client.createHttpRequestHeaderModificationRule(createHttpRequestHeaderModificationRuleRequest);
    console.info("Call CreateHttpRequestHeaderModificationRule success, response: ");
    console.info(Util.toJSONString(createHttpRequestHeaderModificationRuleResponse));
    return createHttpRequestHeaderModificationRuleResponse.body;
  }

  static async updateReqHdrModRule(siteResponseBody: $ESA20240910.CreateSiteResponseBody, createHttpRequestHeaderModificationRuleResponseBody: $ESA20240910.CreateHttpRequestHeaderModificationRuleResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call UpdateHttpRequestHeaderModificationRule to update resource");
    let requestHeaderModification = new $ESA20240910.UpdateHttpRequestHeaderModificationRuleRequestRequestHeaderModification({
      type: "static",
      value: "modify1",
      operation: "modify",
      name: "testmodify1",
    });
    let updateHttpRequestHeaderModificationRuleRequest = new $ESA20240910.UpdateHttpRequestHeaderModificationRuleRequest({
      siteId: siteResponseBody.siteId,
      ruleEnable: "off",
      rule: "(http.request.uri eq \"/content?page=1234\")",
      sequence: 1,
      ruleName: "test_modify",
      requestHeaderModification: [
        requestHeaderModification
      ],
      configId: createHttpRequestHeaderModificationRuleResponseBody.configId,
    });
    let updateHttpRequestHeaderModificationRuleResponse = await client.updateHttpRequestHeaderModificationRule(updateHttpRequestHeaderModificationRuleRequest);
    console.info("Call UpdateHttpRequestHeaderModificationRule success, response: ");
    console.info(Util.toJSONString(updateHttpRequestHeaderModificationRuleResponse));
  }

  static async destroyReqHdrModRule(siteResponseBody: $ESA20240910.CreateSiteResponseBody, createHttpRequestHeaderModificationRuleResponseBody: $ESA20240910.CreateHttpRequestHeaderModificationRuleResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call DeleteHttpRequestHeaderModificationRule to destroy resource");
    let deleteHttpRequestHeaderModificationRuleRequest = new $ESA20240910.DeleteHttpRequestHeaderModificationRuleRequest({
      siteId: siteResponseBody.siteId,
      configId: createHttpRequestHeaderModificationRuleResponseBody.configId,
    });
    let deleteHttpRequestHeaderModificationRuleResponse = await client.deleteHttpRequestHeaderModificationRule(deleteHttpRequestHeaderModificationRuleRequest);
    console.info("Call DeleteHttpRequestHeaderModificationRule success, response: ");
    console.info(Util.toJSONString(deleteHttpRequestHeaderModificationRuleResponse));
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
    let siteRespBody = await Client.site(ratePlanInstRespBody, esa20240910Client);
    let reqHdrModRuleRespBody = await Client.reqHdrModRule(siteRespBody, esa20240910Client);
    // update resource
    await Client.updateReqHdrModRule(siteRespBody, reqHdrModRuleRespBody, esa20240910Client);
    // destroy resource
    await Client.destroyReqHdrModRule(siteRespBody, reqHdrModRuleRespBody, esa20240910Client);
  }

}

Client.main(process.argv.slice(2));
