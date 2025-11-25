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

  static async ratePlanInstSmimea(client: ESA20240910): Promise<$ESA20240910.PurchaseRatePlanResponseBody> {
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

  static async siteSmimea(ratePlanInstSmimeaResponseBody: $ESA20240910.PurchaseRatePlanResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateSiteResponseBody> {
    console.info("Begin Call CreateSite to create resource");
    let createSiteRequest = new $ESA20240910.CreateSiteRequest({
      siteName: "gositecdn.cn",
      instanceId: ratePlanInstSmimeaResponseBody.instanceId,
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

  static async recordSmimea(siteSmimeaResponseBody: $ESA20240910.CreateSiteResponseBody, client: ESA20240910): Promise<$ESA20240910.CreateRecordResponseBody> {
    console.info("Begin Call CreateRecord to create resource");
    let data = new $ESA20240910.CreateRecordRequestData({
      usage: 1,
      matchingType: 1,
      certificate: "7777276264696475536f6d313237",
      selector: 1,
    });
    let createRecordRequest = new $ESA20240910.CreateRecordRequest({
      recordName: "www.gositecdn.cn",
      comment: "This is a remark",
      siteId: siteSmimeaResponseBody.siteId,
      type: "SMIMEA",
      data: data,
      ttl: 100,
    });
    let createRecordResponse = await Client.createRecordWithRetry(client, createRecordRequest);
    console.info("Call CreateRecord success, response: ");
    console.info(Util.toJSONString(createRecordResponse));
    return createRecordResponse.body;
  }

  static async createRecordWithRetry(client: ESA20240910, createRecordRequest: $ESA20240910.CreateRecordRequest): Promise<$ESA20240910.CreateRecordResponse> {
    let errorCode = "";
    let retry1 = 0;
    let interval1 = 5000;
    let retry2 = 0;
    let interval2 = 5000;

    while ((retry1 < 10) || (retry2 < 20)) {
      try {
        let createRecordResponse = await client.createRecord(createRecordRequest);
        console.info("Call CreateRecord success, response: ");
        console.info(Util.toJSONString(createRecordResponse));
        return createRecordResponse;
      } catch (__err) {
        if (__err instanceof $dara.BaseError) {
          const error = __err;
          errorCode = error.code;
        }
      }      
      if (errorCode == "Site.ServiceBusy") {
        console.info("Call CreateRecord failed, errorCode: Site.ServiceBusy, please retry");
        await $dara.sleep(interval1);
        retry1++;
      }

      if (errorCode == "TooManyRequests") {
        console.info("Call CreateRecord failed, errorCode: TooManyRequests, please retry");
        await $dara.sleep(interval2);
        retry2++;
      }

    }
    throw $dara.newError({
      message: "Call CreateRecord failed",
    });
  }

  static async updateRecordSmimea(createRecordResponseBody: $ESA20240910.CreateRecordResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call UpdateRecord to update resource");
    let data = new $ESA20240910.UpdateRecordRequestData({
      usage: 3,
      matchingType: 3,
      certificate: "7737246264656475536f6d617256",
      selector: 3,
    });
    let updateRecordRequest = new $ESA20240910.UpdateRecordRequest({
      comment: "test_record_comment",
      data: data,
      ttl: 86400,
      recordId: createRecordResponseBody.recordId,
    });
    let updateRecordResponse = await Client.updateRecordWithRetry(client, updateRecordRequest);
    console.info("Call UpdateRecord success, response: ");
    console.info(Util.toJSONString(updateRecordResponse));
  }

  static async updateRecordWithRetry(client: ESA20240910, updateRecordRequest: $ESA20240910.UpdateRecordRequest): Promise<$ESA20240910.UpdateRecordResponse> {
    let errorCode = "";
    let retry1 = 0;
    let interval1 = 5000;
    let retry2 = 0;
    let interval2 = 3000;

    while ((retry1 < 20) || (retry2 < 10)) {
      try {
        let updateRecordResponse = await client.updateRecord(updateRecordRequest);
        console.info("Call UpdateRecord success, response: ");
        console.info(Util.toJSONString(updateRecordResponse));
        return updateRecordResponse;
      } catch (__err) {
        if (__err instanceof $dara.BaseError) {
          const error = __err;
          errorCode = error.code;
        }
      }      
      if (errorCode == "TooManyRequests") {
        console.info("Call UpdateRecord failed, errorCode: TooManyRequests, please retry");
        await $dara.sleep(interval1);
        retry1++;
      }

      if (errorCode == "Record.ServiceBusy") {
        console.info("Call UpdateRecord failed, errorCode: Record.ServiceBusy, please retry");
        await $dara.sleep(interval2);
        retry2++;
      }

    }
    throw $dara.newError({
      message: "Call UpdateRecord failed",
    });
  }

  static async destroyRecordSmimea(createRecordResponseBody: $ESA20240910.CreateRecordResponseBody, client: ESA20240910): Promise<void> {
    console.info("Begin Call DeleteRecord to destroy resource");
    let deleteRecordRequest = new $ESA20240910.DeleteRecordRequest({
      recordId: createRecordResponseBody.recordId,
    });
    let deleteRecordResponse = await Client.deleteRecordWithRetry(client, deleteRecordRequest);
    console.info("Call DeleteRecord success, response: ");
    console.info(Util.toJSONString(deleteRecordResponse));
  }

  static async deleteRecordWithRetry(client: ESA20240910, deleteRecordRequest: $ESA20240910.DeleteRecordRequest): Promise<$ESA20240910.DeleteRecordResponse> {
    let errorCode = "";
    let retry1 = 0;
    let interval1 = 5000;
    let retry2 = 0;
    let interval2 = 1000;

    while ((retry1 < 20) || (retry2 < 10)) {
      try {
        let deleteRecordResponse = await client.deleteRecord(deleteRecordRequest);
        console.info("Call DeleteRecord success, response: ");
        console.info(Util.toJSONString(deleteRecordResponse));
        return deleteRecordResponse;
      } catch (__err) {
        if (__err instanceof $dara.BaseError) {
          const error = __err;
          errorCode = error.code;
        }
      }      
      if (errorCode == "TooManyRequests") {
        console.info("Call DeleteRecord failed, errorCode: TooManyRequests, please retry");
        await $dara.sleep(interval1);
        retry1++;
      }

      if (errorCode == "Record.ServiceBusy") {
        console.info("Call DeleteRecord failed, errorCode: Record.ServiceBusy, please retry");
        await $dara.sleep(interval2);
        retry2++;
      }

    }
    throw $dara.newError({
      message: "Call DeleteRecord failed",
    });
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
    let ratePlanInstSmimeaRespBody = await Client.ratePlanInstSmimea(esa20240910Client);
    let siteSmimeaRespBody = await Client.siteSmimea(ratePlanInstSmimeaRespBody, esa20240910Client);
    let recordSmimeaRespBody = await Client.recordSmimea(siteSmimeaRespBody, esa20240910Client);
    // update resource
    await Client.updateRecordSmimea(recordSmimeaRespBody, esa20240910Client);
    // destroy resource
    await Client.destroyRecordSmimea(recordSmimeaRespBody, esa20240910Client);
  }

}

Client.main(process.argv.slice(2));
