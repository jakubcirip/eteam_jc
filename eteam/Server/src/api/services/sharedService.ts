import * as config from 'config';

import { PlansData } from '../models/swaggerTypes';
import { Utils } from '../../Utils';

export class SharedService {
  static async getPlansData(req: any): Promise<PlansData> {
    let companyId = req.session.companyId;
    let isCompany = true;

    if (!companyId) {
      isCompany = false;
      companyId = await Utils.hrIdToCompanyId(req, req.session.hrId);
    }

    const planId = await Utils.getPlanByCompanyId(req, companyId);

    let isUpgrade = false;

    const plansConfig: any[] = config.get('plans');

    const plans = {
      isCompany,
      plans: plansConfig.map((plan) => {
        if (planId === plan.id) {
          isUpgrade = true;
        }

        return {
          ...plan,
          active: planId === plan.id,
          upgrade: isUpgrade,
        };
      }),
    };

    return plans;
  }
}
