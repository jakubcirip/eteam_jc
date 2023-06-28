import { Utils } from '../../Utils';
import { Error500 } from '../helpers/errors';
import * as config from 'config';

export class PricingManager {
  static async canIncrementAmount(
    req: any,
    hrId: number,
    currentAmount: number,
    planKey:
      | 'mp3Total'
      | 'mp4Total'
      | 'mailTotal'
      | 'positionTotal'
      | 'formsTotal'
      | 'idleInterviewTotal'
      | 'activeInterviewTotal'
      | 'imgTotal',
    toAdd: number = 1
  ) {
    const plan = await PricingManager.getPlan(req, hrId);
    const limit = +plan._internal[planKey];

    if (limit === -1) {
      return true;
    }

    if (currentAmount + toAdd > limit) {
      return false;
    }

    return true;
  }

  static async canUploadFile(
    req: any,
    hrId: number,
    fileSize: number,
    planKey: 'mp3Size' | 'mp4Size' | 'mailSize' | 'imgSize'
  ) {
    const plan = await PricingManager.getPlan(req, hrId);

    const limit = plan._internal[planKey];

    if (limit === -1) {
      return true;
    }

    if (fileSize > limit) {
      return false;
    }

    return true;
  }

  private static async getPlan(req: any, hrId: number) {
    const companyId = await Utils.hrIdToCompanyId(req, hrId);

    const planData = await Utils.companyToMany(req, companyId, ['sub_model']);
    if (!planData) {
      throw Error500(req, __('PricingManager.canUploadFile.companyNotFound'));
    }

    const planId = +planData.sub_model;

    const plans: any[] = config.get('plans');
    const plan = plans.find((p) => p.id === planId);

    if (!plan) {
      throw Error500(req, __('PricingManager.canUploadFile.planNotFound'));
    }

    return plan;
  }
}
