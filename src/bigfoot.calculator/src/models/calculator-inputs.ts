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

    return ppEnumerable.First().points;
  }
}
