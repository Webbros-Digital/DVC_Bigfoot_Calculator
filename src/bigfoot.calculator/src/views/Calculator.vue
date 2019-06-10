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
          <b-form @submit.prevent="" @reset="resetForm" :key='formKey'>
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
              <div><span class='float-right text-muted'>{{ form.roadConditions }}</span></div>
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
                  :placeholder="form.getFuelConsumption + ''">
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
                  type='range'
                  min='1'
                  max='5'
                  step='0.5'
                  v-model.number="form.fuelConsumptionSavingsPct">
                </b-form-input>
              </b-input-group>
              <div><span class='float-right text-muted'>{{ form.fuelConsumptionSavingsPct }}</span></div>
            </b-form-group>

            <b-form-group
              label-cols-sm="6"
              label-cols-lg="6"
              label="Average Tyre life (km)"
              label-for="tyreLife">
              <b-input-group append='km'>
                <b-form-input
                  id="tyreLife"
                  min='1000'
                  max='100000'
                  step='1000'
                  disabled
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
                  max='6.00'
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
            <b-button class='float-right' type='reset'>Reset</b-button>
          </b-form>
          * Please note that Payback Period and other calculations are not guarantees, but may represent typical results.
        </div>
        <div class='col-12 col-md-6'>
          <h2>Calculations</h2>
          <table class='table'>
            <tbody>
              <tr><td>Blowout Savings</td><td>${{ form.blowoutSavings.toFixed(2) }}</td></tr>
              <tr><td>Tyre Wear Savings</td><td>${{ form.wearSavings.toFixed(2) }}</td></tr>
              <tr><td>Fuel Savings</td><td>${{ form.fuelSavings.toFixed(2) }}</td></tr>
              <tr><td>Service Call Savings</td><td>${{ form.serviceSavings.toFixed(2) }}</td></tr>
              <tr><td>Extended Season Additional Returns</td><td>${{ form.additionalReturns.toFixed(2) }}</td></tr>
              <tr><td>Tyre Maintenance Savings</td><td>${{ form.maintainanceSavings.toFixed(2) }}</td></tr>
              <tr><td>HPMV Tyre Infringement Savings</td><td>${{ form.infingementSavings.toFixed(2) }}</td></tr>
              <tr><td>CTI Annual Maintenance Costs</td><td>${{ form.maintainanceCosts.toFixed(2) }}</td></tr>
              <tr><td>Total Savings</td><td>${{ form.totalSavings.toFixed(2) }}</td></tr>
            </tbody>
          </table>

          <b-form-group
            label-cols-sm="6"
            label-cols-lg="6"
            label="CTI Cost Fitted**"
            label-for="ctiCostFitted"
            :description="form.ctiCostFitted || form.ctiCostFitted === 0 ? null : '**Indicative cost only used. Contact Bigfoot Equipment Ltd for a Quote. '">
            <b-input-group prepend='$'>
              <b-form-input
                id="ctiCostFitted"
                type='number'
                min='0'
                max='10000'
                step='0.01'
                v-model.number="form.ctiCostFitted"
                :placeholder="form.getCtiCostFitted + ''">
              </b-form-input>
            </b-input-group>
          </b-form-group>

          <table class='table'>
            <tbody>
              <tr>
                <td><b>Payback Period (years): {{ form.paybackPeriod.toFixed(2) }}</b></td>
                <td>{{ form.paybackScore }}</td>
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
import CalculatorInputs from '@/models/calculator-inputs';

@Component({
})
export default class Calculator extends Vue {
  public formKey: number = Date.now();

  public form: CalculatorInputs = new CalculatorInputs();

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

  public resetForm() {
    this.form = new CalculatorInputs();
    this.formKey = Date.now();
    this.otherBenefits.forEach((ob) => ob.checked = true);
  }

  public get totalBenefitsScore() {
    const benefitsScore = asEnumerable(this.otherBenefits).Where((ob) => ob.checked).Sum((ob) => ob.points);

    return benefitsScore + this.form.paybackScore;
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
