<template>
  <div class="row">
    <div class='col'>
      <div class="row">
        <div class='col'>
          <h1>Bigfoot Benefits and Payback Calculator*</h1>
        </div>
      </div>
      <div class="row">
        <div class='col-12 col-md-6'>
          <h1>Inputs</h1>
          <b-form @submit.prevent="">
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Annual Distace Travelled"
              label-for="distance">
              <b-input-group append='km'>
                <b-form-input
                  id="distance"
                  type='number'
                  min='10000'
                  step='10000'
                  v-model.number="form.distance">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Percentage where CTI is required"
              label-for="ctiReqPct">
              <b-input-group append='%'>
                <b-form-input
                  id="ctiReqPct"
                  type='number'
                  min='0'
                  max='100'
                  v-model.number="form.ctiReqPct">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Road Conditions (Flat Good =1, Steep Poor = 5)"
              label-for="roadConditions"
              type='number'>
              <b-form-input id="roadConditions" type='range' min='1' max='5'
                v-model.number="form.roadConditions">
              </b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Fuel Consumption (normal)  (km per litre)"
              label-for="fuelConsumption">
              <b-input-group append='km/l'>
                <b-form-input
                  id="ctiReqPct"
                  type='number'
                  min='0.50'
                  max='2.00'
                  step='0.01'
                  v-model.number="form.fuelConsumption"
                  :placeholder="fuelConsumption">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Fuel consumption savings when using CTI (%)"
              label-for="fuelConsumptionSavingsPct">
              <b-input-group append='%'>
                <b-form-input
                  id="fuelConsumptionSavingsPct"
                  type='number'
                  min='0'
                  max='100'
                  v-model.number="form.fuelConsumptionSavingsPct">
                </b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Average Tyre life (km)"
              label-for="tyreLife">
              <b-input-group append='km'>
                <b-form-input
                  id="tyreLife"
                  type='number'
                  min='1000'
                  max='100000'
                  step='1000'
                  v-model.number="form.tyreLife">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Tyre wear savings when using CTI (%)"
              label-for="tyreWearPct">
              <b-input-group append='%'>
                <b-form-input
                  id="tyreWearPct"
                  type='number'
                  min='0'
                  max='100'
                  step='1'
                  v-model.number="form.tyreWearPct">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Blowouts per year"
              label-for="blowouts">
              <b-form-input
                id="blowouts"
                type='number'
                min='0'
                max='100'
                step='0.1'
                v-model.number="form.blowouts">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Road service calls per year"
              label-for="serviceCalls">
              <b-form-input
                id="serviceCalls"
                type='number'
                min='0'
                max='100'
                step='0.1'
                v-model.number="form.serviceCalls">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="HPMV Infringements per year"
              label-for="infringements">
              <b-form-input
                id="infringements"
                type='number'
                min='0'
                max='100'
                step='0.1'
                v-model.number="form.infringements">
              </b-form-input>
            </b-form-group>
            
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Number of axles to be fitted with CTI"
              label-for="axels">
              <b-form-input
                id="axels"
                type='number'
                min='1'
                max='10'
                step='1'
                v-model.number="form.axels">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Number of tyres to be fitted with CTI"
              label-for="tyres">
              <b-form-input
                id="tyres"
                type='number'
                min='1'
                max='10'
                step='1'
                v-model.number="form.tyres">
              </b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Fuel cost"
              label-for="fuelCost">
              <b-input-group prepend='$' append='/ litre'>
                <b-form-input
                  id="fuelCost"
                  type='number'
                  min='0.50'
                  max='2.00'
                  step='0.01'
                  v-model.number="form.fuelCost">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Average cost per tyre"
              label-for="costPerTyre">
              <b-input-group prepend='$'>
                <b-form-input
                  id="costPerTyre"
                  type='number'
                  min='0'
                  max='2000'
                  step='0.01'
                  v-model.number="form.costPerTyre">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Road Service Call Out ($ per call out)"
              label-for="serviceCallout">
              <b-input-group prepend='$'>
                <b-form-input
                  id="serviceCallout"
                  type='number'
                  min='0'
                  max='2000'
                  step='0.01'
                  v-model.number="form.serviceCallout">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Tyre Maintenance Checks ($ per month)"
              label-for="maintainanceChecks">
              <b-input-group prepend='$'>
                <b-form-input
                  id="maintainanceChecks"
                  type='number'
                  min='0'
                  max='2000'
                  step='0.01'
                  v-model.number="form.maintainanceChecks">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="CTI Equipment Maintenance (% of installed cost)"
              label-for="ctiEquipmentMaintainancePct">
              <b-input-group append='%'>
                <b-form-input
                  id="ctiEquipmentMaintainancePct"
                  type='number'
                  min='0'
                  max='100'
                  step='1'
                  v-model.number="form.ctiEquipmentMaintainancePct">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="HPMV Tyre Inflation Infringement Cost"
              label-for="infringementCost">
              <b-input-group prepend='$'>
                <b-form-input
                  id="infringementCost"
                  type='number'
                  min='0'
                  max='10000'
                  step='1'
                  v-model.number="form.infringementCost">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Extended operating season (days per year)"
              label-for="extendedOperatingSeason">
              <b-input-group append='days'>
                <b-form-input
                  id="extendedOperatingSeason"
                  type='number'
                  min='0'
                  max='365'
                  step='1'
                  v-model.number="form.extendedOperatingSeason">
                </b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Net return per day"
              label-for="returnPerDay">
              <b-input-group prepend='$'>
                <b-form-input
                  id="returnPerDay"
                  type='number'
                  min='0'
                  max='10000'
                  step='0.01'
                  v-model.number="form.returnPerDay">
                </b-form-input>
              </b-input-group>
            </b-form-group>
          </b-form>
        </div>
        <div class='col-12 col-md-6'>
          <h2>Calculations</h2>
          <table class='table'>
            <tbody>
              <tr><td>Blowout Savings</td><td>${{ blowoutSavings.toFixed(2) }}</td></tr>
              <tr><td>Tyre Wear Savings</td><td>${{ wearSavings.toFixed(2) }}</td></tr>
              <tr><td>Fuel Savings</td><td>${{ fuelSavings.toFixed(2) }}</td></tr>
              <tr><td>Service Call Savings</td><td>${{ serviceSavings.toFixed(2) }}</td></tr>
              <tr><td>Extended Season Additional Returns</td><td>${{ additionalReturns.toFixed(2) }}</td></tr>
              <tr><td>Tyre Maintenance Savings</td><td>${{ maintainanceSavings.toFixed(2) }}</td></tr>
              <tr><td>HPMV Tyre Infringement Savings</td><td>${{ infingementSavings.toFixed(2) }}</td></tr>
              <tr><td>CTI Annual Maintenance Costs</td><td>${{ maintainanceCosts.toFixed(2) }}</td></tr>
              <tr><td>Total Savings</td><td>${{ totalSavings.toFixed(2) }}</td></tr>
            </tbody>
          </table>

          <b-form-group
            label-cols-sm="6"
            label-cols-lg="6"
            label="CTI Cost Fitted**"
            label-for="ctiCostFitted"
            :description="this.form.ctiCostFitted && this.form.ctiCostFitted === 0 ? null : '**Indicative cost only used. Contact Bigfoot Equipment Ltd for a Quote. '">
            <b-input-group prepend='$'>
              <b-form-input
                id="ctiCostFitted"
                type='number'
                min='0'
                max='10000'
                step='0.01'
                v-model.number="form.ctiCostFitted"
                :placeholder="ctiCostFitted + ''">
              </b-form-input>
            </b-input-group>
          </b-form-group>

          <table class='table'>
            <tbody>
              <tr>
                <td><b>Payback Period (years): {{ paybackPeriod.toFixed(2) }}</b></td>
                <td>{{ paybackScore }}</td>
              </tr>
              <tr>
                <td>Other Benefits</td>
                <td></td>
              </tr>
              <tr
                v-for='benefit in otherBenefits'
                :key='benefit.id'>
                <td>
                  <label :for="'benefit_' + benefit.id">
                    {{ benefit.description }}
                  </label>
                  <b-form-checkbox
                    :id="'benefit_' + benefit.id"
                    v-model="benefit.checked"
                    class='d-inline ml-2 mr-2 float-right'>
                  </b-form-checkbox>
                </td>
                <td>
                  {{ benefit.checked === true ? benefit.points : '' }}
                </td>
              </tr>
              <tr>
                <td>
                  Total Benefits Score (out of 100): <b class='float-right'>{{ benifitScoreBand }}</b>
                </td>
                <td>
                  {{ totalBenefitsScore }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { asEnumerable } from 'linq-es2015';

@Component({
})
export default class Calculator extends Vue {
  public form: {
    distance: number,
    ctiReqPct: number,
    roadConditions: number,
    fuelConsumption?: number,
    fuelConsumptionSavingsPct: number,
    tyreLife: number,
    tyreWearPct: number,
    blowouts: number,
    serviceCalls: number,
    infringements: number,
    axels: number,
    tyres: number,
    fuelCost: number,
    costPerTyre: number,
    serviceCallout: number,
    maintainanceChecks: number,
    ctiEquipmentMaintainancePct: number,
    infringementCost: number,
    extendedOperatingSeason: number,
    returnPerDay: number,
    ctiCostFitted?: number
  } = {
    distance: 150000,
    ctiReqPct: 15,
    roadConditions: 3,
    fuelConsumption: undefined,
    fuelConsumptionSavingsPct: 3,
    tyreLife: 57000,
    tyreWearPct: 20,
    blowouts: .5,
    serviceCalls: 1,
    infringements: 0.1,
    axels: 2,
    tyres: 8,
    fuelCost: 1.47,
    costPerTyre: 600,
    serviceCallout: 210,
    maintainanceChecks: 60,
    ctiEquipmentMaintainancePct: 3,
    infringementCost: 2000,
    extendedOperatingSeason: 3,
    returnPerDay: 120,
    ctiCostFitted: undefined
  };

  public otherBenefits: Array<{ id: number, description: string, points: number, checked: boolean }> = [
    {
      id: 1,
      description: 'Improved driver safety and comfort',
      points: 5,
      checked: true
    },
    {
      id: 2,
      description: 'Improved traction and mobility',
      points: 5,
      checked: true
    },
    {
      id: 3,
      description: 'Required for some contracts',
      points: 10,
      checked: true
    },
    {
      id: 4,
      description: 'Reduced downtime',
      points: 5,
      checked: true
    },
    {
      id: 5,
      description: 'Extended vehicle life',
      points: 5,
      checked: true
    },
    {
      id: 6,
      description: 'Reduced damage to truck and trailers',
      points: 5,
      checked: true
    },
    {
      id: 7,
      description: 'Improved driver safety and comfort',
      points: 5,
      checked: true
    }
  ];
  public paybackPeriods: Array<{ period: number, points: number }> = [
    { period: -10.0, points: 0   },
    { period: 0	 , points: 0     },
    { period: 1	 , points: 60    },
    { period: 1.5	 , points: 55},
    { period: 2	 , points: 50    },
    { period: 2.5	 , points: 45},
    { period: 3	 , points: 42    },
    { period: 3.5	 , points: 40},
    { period: 4	 , points: 35    },
    { period: 5	 , points: 32    },
    { period: 6	 , points: 30    },
    { period: 7	 , points: 28    },
    { period: 8	 , points: 25    },
    { period: 9	 , points: 22    },
    { period: 10	 , points: 20},
    { period: 11	 , points: 10}
  ];
  public ctiFitted: Array<{ axels: number, cost: number }> = [
    { axels: 1, cost: 7000 },
    { axels: 2, cost: 7500 },
    { axels: 3, cost: 10000},
    { axels: 4, cost: 11000},
    { axels: 5, cost: 12000},
    { axels: 6, cost: 13000}
  ];
  public fuelAdjustment: Array<{ axels: number, cost: number }> = [
    { axels: 1, cost: 2.70 },
    { axels: 2, cost: 2.35 },
    { axels: 3, cost: 1.90 },
    { axels: 4, cost: 1.40 },
    { axels: 5, cost: 0.85 }
  ];
  public tyreLife: Array<{ axels: number, cost: number }> = [
    { axels: 1, cost: 70000 },
    { axels: 2, cost: 64000 },
    { axels: 3, cost: 57000 },
    { axels: 4, cost: 49000 },
    { axels: 5, cost: 40000 }
  ];

  public get fuelConsumption() {
    if (this.form.fuelConsumption || this.form.fuelConsumption === 0) {
      return this.form.fuelConsumption;
    }

    return 1.9;
  }

  public get blowoutSavings() {
    return (this.form.costPerTyre + this.form.serviceCallout) * this.form.blowouts;
  }

  public get wearSavings() {
    return this.form.tyres * (this.form.distance / this.form.tyreLife)
      * this.form.costPerTyre * ((this.form.tyreWearPct / 100) * (this.form.ctiReqPct / 100));
  }

  public get fuelSavings() {
    return ((this.form.distance * (this.form.ctiReqPct / 100)) / this.fuelConsumption)
      * this.form.fuelCost * (this.form.fuelConsumptionSavingsPct / 100);
  }

  public get serviceSavings() {
    return (this.form.serviceCalls * this.form.serviceCallout);
  }

  public get additionalReturns() {
    return (this.form.extendedOperatingSeason * this.form.returnPerDay);
  }

  public get maintainanceSavings() {
    return (this.form.maintainanceChecks * 12);
  }

  public get infingementSavings() {
    return (this.form.infringementCost * this.form.infringements);
  }

  public get ctiCostFitted() {
    if (this.form.ctiCostFitted || this.form.ctiCostFitted === 0) {
      return this.form.ctiCostFitted;
    }

    const ctiFitted = asEnumerable(this.ctiFitted);

    const foundAxel: { axels: number, cost: number }
      = ctiFitted
        .FirstOrDefault((cf) => cf.axels === this.form.axels);

    if (foundAxel) {
      return foundAxel.cost;
    }

    return ctiFitted.Max((cf) => cf.cost);
  }

  public get maintainanceCosts() {
    return -1 * this.ctiCostFitted * (this.form.ctiEquipmentMaintainancePct / 100);
  }

  public get totalSavings() {
    return this.blowoutSavings + this.wearSavings + this.fuelSavings + this.serviceSavings
      + this.additionalReturns + this.maintainanceSavings + this.infingementSavings
      + this.maintainanceCosts;
  }

  public get paybackPeriod() {
    return this.ctiCostFitted / this.totalSavings;
  }

  public get paybackScore() {
    const rounded = Math.floor(this.paybackPeriod * 2) / 2;
    const ppEnumerable = asEnumerable(this.paybackPeriods)
      .OrderBy((pp) => pp.period);

    const periods = ppEnumerable
      .Where((pp) => pp.period >= rounded);

    if (periods.Count()) {
      return periods.First().points;
    }

    return ppEnumerable.First().points;
  }

  public get totalBenefitsScore() {
    const benefitsScore = asEnumerable(this.otherBenefits).Where((ob) => ob.checked).Sum((ob) => ob.points);

    return benefitsScore + this.paybackScore;
  }

  public get benifitScoreBand() {
    if (this.totalBenefitsScore >= 80) {
      return 'Very High';
    }
    if (this.totalBenefitsScore >= 60) {
      return 'High';
    }
    if (this.totalBenefitsScore >= 40) {
      return 'Medium';
    }
    if (this.totalBenefitsScore >= 20) {
      return 'Low';
    }
    return 'Very Low';
  }
}
</script>
