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

  static async videoProc(siteResponseBody: $ESA20240910.CreateSiteResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateVideoProcessingResponseBody> {
    console.info("Begin Call CreateVideoProcessing to create resource");
    let createVideoProcessingRequest = new $ESA20240910.CreateVideoProcessingRequest({
      videoSeekEnable: "on",
      siteId: siteResponseBody.siteId,
      ruleEnable: "on",
      flvVideoSeekMode: "by_byte",
      mp4SeekEnd: "end",
      flvSeekStart: "start",
      rule: "(http.host eq \"video.example.com\")",
      sequence: 1,
      mp4SeekStart: "start",
      siteVersion: 0,
      flvSeekEnd: "end",
      ruleName: "test",
    });
    let createVideoProcessingResponse = await client.createVideoProcessing(createVideoProcessingRequest);
    console.info("Call CreateVideoProcessing success, response: ");
    console.info(Util.toJSONString(createVideoProcessingResponse));
    return createVideoProcessingResponse.body;
  }

  static async updateVideoProc(siteResponseBody: $ESA20240910.CreateSiteResponseBody, createVideoProcessingResponseBody: $ESA20240910.CreateVideoProcessingResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call UpdateVideoProcessing to update resource");
    let updateVideoProcessingRequest = new $ESA20240910.UpdateVideoProcessingRequest({
      videoSeekEnable: "off",
      siteId: siteResponseBody.siteId,
      ruleEnable: "off",
      flvVideoSeekMode: "by_time",
      mp4SeekEnd: "e",
      flvSeekStart: "s",
      rule: "(http.request.uri eq \"/content?page=1234\")",
      sequence: 1,
      mp4SeekStart: "s",
      flvSeekEnd: "e",
      ruleName: "test_modify",
      configId: createVideoProcessingResponseBody.configId,
    });
    let updateVideoProcessingResponse = await client.updateVideoProcessing(updateVideoProcessingRequest);
    console.info("Call UpdateVideoProcessing success, response: ");
    console.info(Util.toJSONString(updateVideoProcessingResponse));
  }

  static async destroyVideoProc(siteResponseBody: $ESA20240910.CreateSiteResponseBody, createVideoProcessingResponseBody: $ESA20240910.CreateVideoProcessingResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call DeleteVideoProcessing to destroy resource");
    let deleteVideoProcessingRequest = new $ESA20240910.DeleteVideoProcessingRequest({
      siteId: siteResponseBody.siteId,
      configId: createVideoProcessingResponseBody.configId,
    });
    let deleteVideoProcessingResponse = await client.deleteVideoProcessing(deleteVideoProcessingRequest);
    console.info("Call DeleteVideoProcessing success, response: ");
    console.info(Util.toJSONString(deleteVideoProcessingResponse));
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
    //resource_VideoProcessing_test
    let ratePlanInstRespBody = await Client.ratePlanInst(esa20240910Client);
    //resource_Site_VideoProcessing_test
    let siteRespBody = await Client.site(ratePlanInstRespBody, esa20240910Client);
    let videoProcRespBody = await Client.videoProc(siteRespBody, esa20240910Client);
    // update resource
    await Client.updateVideoProc(siteRespBody, videoProcRespBody, esa20240910Client);
    // destroy resource
    await Client.destroyVideoProc(siteRespBody, videoProcRespBody, esa20240910Client);
  }

}

Client.main(process.argv.slice(2));
