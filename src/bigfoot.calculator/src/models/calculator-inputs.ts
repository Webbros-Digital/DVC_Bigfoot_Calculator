import { asEnumerable } from 'linq-es2015';
import * as datasets from '@/models/staticdata';

export default class CalculatorInputs {
  public distance: number;
  public ctiReqPct: number;
  public roadConditions: number;
  public fuelConsumption?: number;
  public fuelConsumptionSavingsPct: number;
  public tyreWearPct: number;
  public blowouts: number;
  public serviceCalls: number;
  public infringements: number;
  public axels: number;
  public tyres: number;
  public fuelCost: number;
  public costPerTyre: number;
  public serviceCallout: number;
  public maintainanceChecks: number;
  public ctiEquipmentMaintainancePct: number;
  public infringementCost: number;
  public extendedOperatingSeason: number;
  public returnPerDay: number;
  public ctiCostFitted?: number;

  constructor() {
    this.distance = 150000;
    this.ctiReqPct = 15;
    this.roadConditions = 3;
    this.fuelConsumption = undefined;
    this.fuelConsumptionSavingsPct = 3;
    this.tyreWearPct = 20;
    this.blowouts = 0.5;
    this.serviceCalls = 1;
    this.infringements = 0.1;
    this.axels = 2;
    this.tyres = 8;
    this.fuelCost = 1.47;
    this.costPerTyre = 600;
    this.serviceCallout = 210;
    this.maintainanceChecks = 60;
    this.ctiEquipmentMaintainancePct = 3;
    this.infringementCost = 2000;
    this.extendedOperatingSeason = 3;
    this.returnPerDay = 120;
    this.ctiCostFitted = undefined;
  }

  /*
  Get the fuel consumption, calculated if not explicitly set
  */
  public get getFuelConsumption(): number {
    if (this.fuelConsumption || this.fuelConsumption === 0) {
      return this.fuelConsumption;
    }

    const fuelEnumerable = asEnumerable(datasets.fuelAdjustment);
    const conditionsAdjustment = fuelEnumerable
      .FirstOrDefault((fa) => fa.roadCondition === this.roadConditions);

    if (conditionsAdjustment) {
      return conditionsAdjustment.cost;
    }
    return fuelEnumerable.Max((fa) => fa.cost);
  }


  /*
   * Calculated Outputs
   */
  public get tyreLife() {
    const tyreEnumerable = asEnumerable(datasets.tyreLife);
    const tyreLifeVal = tyreEnumerable
      .FirstOrDefault((tl) => tl.roadCondition === this.roadConditions);

    if (tyreLifeVal) {
      return tyreLifeVal.life;
    }
    return tyreEnumerable.Max((tl) => tl.life);
  }

  public get blowoutSavings() {
    return (this.costPerTyre + this.serviceCallout) * this.blowouts;
  }

  public get wearSavings() {
    return this.tyres * (this.distance / this.tyreLife)
      * this.costPerTyre * ((this.tyreWearPct / 100) * (this.ctiReqPct / 100));
  }

  public get fuelSavings() {
    return ((this.distance * (this.ctiReqPct / 100)) / this.getFuelConsumption)
      * this.fuelCost * (this.fuelConsumptionSavingsPct / 100);
  }

  public get serviceSavings() {
    return (this.serviceCalls * this.serviceCallout);
  }

  public get additionalReturns() {
    return (this.extendedOperatingSeason * this.returnPerDay);
  }

  public get maintainanceSavings() {
    return (this.maintainanceChecks * 12);
  }

  public get infingementSavings() {
    return (this.infringementCost * this.infringements);
  }

  public get getCtiCostFitted() {
    if (this.ctiCostFitted || this.ctiCostFitted === 0) {
      return this.ctiCostFitted;
    }

    const ctiFitted = asEnumerable(datasets.ctiFitted);

    const foundAxel: { axels: number, cost: number }
      = ctiFitted
        .FirstOrDefault((cf) => cf.axels === this.axels);

    if (foundAxel) {
      return foundAxel.cost;
    }

    return ctiFitted.Max((cf) => cf.cost);
  }

  public get maintainanceCosts() {
    return -1 * this.getCtiCostFitted * (this.ctiEquipmentMaintainancePct / 100);
  }

  public get totalSavings() {
    return this.blowoutSavings + this.wearSavings + this.fuelSavings + this.serviceSavings
      + this.additionalReturns + this.maintainanceSavings + this.infingementSavings
      + this.maintainanceCosts;
  }

  public get paybackPeriod() {
    return this.getCtiCostFitted / this.totalSavings;
  }

  public get paybackScore() {
    const rounded = Math.floor(this.paybackPeriod * 2) / 2;
    const ppEnumerable = asEnumerable(datasets.paybackPeriods)
      .OrderBy((pp) => pp.period);

    const periods = ppEnumerable
      .Where((pp) => pp.period >= rounded);

    if (periods.Count()) {
      return periods.First().points;
    }

    return ppEnumerable.Last().points;
  }

  /*
    Validation
  */
  public get distanceValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (this.distance !== 0 && this.distance && this.distance >= 50000) as boolean,
      minimum: 50000
    };
  }
  public get ctiReqPctValidation(): { valid: boolean, minimum: number, maximum: number } {
    return {
      valid: (this.ctiReqPct !== 0 && this.ctiReqPct && this.ctiReqPct >= 10 && this.ctiReqPct <= 100) as boolean,
      minimum: 10,
      maximum: 100
    };
  }
  public get fuelCostValidation(): { valid: boolean, minimum: number, maximum: number } {
    return {
      valid: (this.fuelCost !== 0 && this.fuelCost && this.fuelCost >= 1 && this.fuelCost <= 3) as boolean,
      minimum: 1,
      maximum: 3
    };
  }
  public get fuelConsumptionValidation(): { valid: boolean, minimum: number, maximum: number } {
    const calcFuelConsumption = this.getFuelConsumption;
    return {
      valid: (calcFuelConsumption && calcFuelConsumption >= 0.85 && calcFuelConsumption <= 2.70) as boolean,
      minimum: 0.85,
      maximum: 2.70
    };
  }
  public get axelsValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (this.axels !== 0 && this.axels && this.axels >= 1) as boolean,
      minimum: 1
    };
  }
  public get tyresValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (this.tyres !== 0 && this.tyres && this.tyres >= 2) as boolean,
      minimum: 2
    };
  }
  public get costPerTyreValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (this.costPerTyre !== 0 && this.costPerTyre && this.costPerTyre >= 200) as boolean,
      minimum: 200
    };
  }
  public get tyreWearPctValidation(): { valid: boolean, minimum: number, maximum: number } {
    return {
      valid: (
        this.tyreWearPct !== 0 && this.tyreWearPct && this.tyreWearPct >= 10 && this.tyreWearPct <= 100
      ) as boolean,
      minimum: 10,
      maximum: 100
    };
  }
  public get blowoutsValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (
        this.blowouts === 0 || (this.blowouts && this.blowouts >= 0)
      ) as boolean,
      minimum: 0
    };
  }
  public get serviceCallsValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (
        this.serviceCalls !== 0 && this.serviceCalls && this.serviceCalls >= 1
      ) as boolean,
      minimum: 1
    };
  }
  public get serviceCalloutValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (
        this.serviceCallout === 0 || (this.serviceCallout && this.serviceCallout >= 0)
      ) as boolean,
      minimum: 0
    };
  }
  public get maintainanceChecksValidation(): { valid: boolean, minimum: number } {
    return {
      valid: (
        this.maintainanceChecks === 0 || (this.maintainanceChecks && this.maintainanceChecks >= 0)
      ) as boolean,
      minimum: 0
    };
  }
  public get ctiEquipmentMaintainancePctValidation(): { valid: boolean, minimum: number, maximum: number } {
    return {
      valid: (
        this.ctiEquipmentMaintainancePct === 0 || (
          this.ctiEquipmentMaintainancePct &&
          this.ctiEquipmentMaintainancePct <= 10 &&
          this.ctiEquipmentMaintainancePct >= 0
        )
      ) as boolean,
      minimum: 0,
      maximum: 10
    };
  }
  public get extendedOperatingSeasonValidation(): { valid: boolean, minimum: number, maximum: number } {
    return {
      valid: (
        this.extendedOperatingSeason === 0 || (
          this.extendedOperatingSeason && this.extendedOperatingSeason >= 0 && this.extendedOperatingSeason <= 365
        )
      ) as boolean,
      minimum: 0,
      maximum: 365
    };
  }
}
