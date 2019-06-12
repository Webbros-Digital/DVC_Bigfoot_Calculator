<template>
  <div class="row">
    <div class='col'>
      <div class='row'>
        <div class='col'>
          <h1>Bigfoot Benefits and Payback Calculator</h1>
          <form-wizard title=''
            subtitle='' color='#ffc113' ref="formWizard"
            @on-change='wizardPageChanged'>
            <tab-content title="Road" icon='fas fa-road' class='pt-2 pt-md-4'>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
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
                label-cols-lg="8"
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
                label-cols-lg="8"
                label="Percentage where CTI is required"
                label-for="ctiReqPct">
                <b-input-group append='%'>
                  <b-form-input
                    id="ctiReqPct"
                    type='number'
                    min='0'
                    max='100'
                    v-model.number="form.ctiReqPct"
                    v-on:keyup.enter="$refs.formWizard.nextTab()">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
            </tab-content>
            <tab-content title="Fuel" icon='fas fa-gas-pump' class='pt-2 pt-md-4'>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Fuel Cost"
                label-for="fuelCost">
                <b-input-group prepend='$' append='/ litre'>
                  <b-form-input
                    id="fuelCost"
                    type='number'
                    min='0.50'
                    max='6.00'
                    step='0.01'
                    v-model.number="form.fuelCost"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
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
                label-cols-lg="8"
                label="Fuel Consumption savings when using CTI (%)"
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
            </tab-content>
            <tab-content title="Vehicle" icon='fas fa-truck-monster' class='pt-2 pt-md-4'>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Number of axles to be fitted with CTI"
                label-for="axels">
                <b-form-input
                  id="axels"
                  type='number'
                  min='1'
                  max='10'
                  step='1'
                  v-model.number="form.axels"
                  v-on:keyup.enter="nextInput($event)">
                </b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Number of tyres to be fitted with CTI"
                label-for="tyres">
                <b-form-input
                  id="tyres"
                  type='number'
                  min='1'
                  max='10'
                  step='1'
                  v-model.number="form.tyres"
                  v-on:keyup.enter="nextInput($event)">
                </b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Average cost per tyre"
                label-for="costPerTyre">
                <b-input-group prepend='$'>
                  <b-form-input
                    id="costPerTyre"
                    type='number'
                    min='0'
                    max='2000'
                    step='0.01'
                    v-model.number="form.costPerTyre"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Tyre wear savings when using CTI (%)"
                label-for="tyreWearPct">
                <b-input-group append='%'>
                  <b-form-input
                    id="tyreWearPct"
                    type='number'
                    min='0'
                    max='100'
                    step='1'
                    v-model.number="form.tyreWearPct"
                    v-on:keyup.enter="$refs.formWizard.nextTab()">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
            </tab-content>
            <tab-content title="Service" icon='fas fa-wrench' class='pt-2 pt-md-4'>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Blowouts per year"
                label-for="blowouts">
                <b-form-input
                  id="blowouts"
                  type='number'
                  min='0'
                  max='100'
                  step='0.1'
                  v-model.number="form.blowouts"
                  v-on:keyup.enter="nextInput($event)">
                </b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Road service calls per year"
                label-for="serviceCalls">
                <b-form-input
                  id="serviceCalls"
                  type='number'
                  min='0'
                  max='100'
                  step='0.1'
                  v-model.number="form.serviceCalls"
                  v-on:keyup.enter="nextInput($event)">
                </b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Road Service Call Out ($ per call out)"
                label-for="serviceCallout">
                <b-input-group prepend='$'>
                  <b-form-input
                    id="serviceCallout"
                    type='number'
                    min='0'
                    max='2000'
                    step='0.01'
                    v-model.number="form.serviceCallout"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="HPMV Infringements per year"
                label-for="infringements">
                <b-form-input
                  id="infringements"
                  type='number'
                  min='0'
                  max='100'
                  step='0.1'
                  v-model.number="form.infringements"
                  v-on:keyup.enter="nextInput($event)">
                </b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="HPMV Tyre Inflation Infringement Cost"
                label-for="infringementCost">
                <b-input-group prepend='$'>
                  <b-form-input
                    id="infringementCost"
                    type='number'
                    min='0'
                    max='10000'
                    step='1'
                    v-model.number="form.infringementCost"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Tyre Maintenance Checks ($ per month)"
                label-for="maintainanceChecks">
                <b-input-group prepend='$'>
                  <b-form-input
                    id="maintainanceChecks"
                    type='number'
                    min='0'
                    max='2000'
                    step='0.01'
                    v-model.number="form.maintainanceChecks"
                    v-on:keyup.enter="$refs.formWizard.nextTab()">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
            </tab-content>
            <tab-content title="Operating Costs" icon='fas fa-cogs' class='pt-2 pt-md-4'>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
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
                    :placeholder="form.getCtiCostFitted + ''"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="CTI Equipment Maintenance (% of installed cost)"
                label-for="ctiEquipmentMaintainancePct">
                <b-input-group append='%'>
                  <b-form-input
                    id="ctiEquipmentMaintainancePct"
                    type='number'
                    min='0'
                    max='100'
                    step='1'
                    v-model.number="form.ctiEquipmentMaintainancePct"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Extended operating season (days per year)"
                label-for="extendedOperatingSeason">
                <b-input-group append='days'>
                  <b-form-input
                    id="extendedOperatingSeason"
                    type='number'
                    min='0'
                    max='365'
                    step='1'
                    v-model.number="form.extendedOperatingSeason"
                    v-on:keyup.enter="nextInput($event)">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label-cols-lg="8"
                label="Net return per day"
                label-for="returnPerDay">
                <b-input-group prepend='$'>
                  <b-form-input
                    id="returnPerDay"
                    type='number'
                    min='0'
                    max='10000'
                    step='0.01'
                    v-model.number="form.returnPerDay"
                    v-on:keyup.enter="$refs.formWizard.nextTab()">
                  </b-form-input>
                </b-input-group>
              </b-form-group>
            </tab-content>
            <tab-content title="Other Benefits" icon='fas fa-wind' class='pt-2 pt-md-4'>
              <div class='row'>
                <div class='col'>
                  <p class='text-muted small'>
                    Tick what matters to You
                  </p>
                  <div class='row'>
                    <div class='col text-left'>
                      <template v-for='(benefit, index) in otherBenefits'>
                        <div class='row mb-2 mb-lg-4' :key='benefit.id'
                            v-if='index % 2 == 0'>
                          <div class='col'>
                            <b-form-checkbox
                              :id="'benefit_' + benefit.id"
                              v-model="benefit.checked"
                              class='col'
                              >
                              {{ benefit.description}}
                            </b-form-checkbox>
                          </div>
                        </div>
                      </template>
                    </div>
                    <div class='col text-left'>
                      <template v-for='(benefit, index) in otherBenefits'>
                        <div class='row mb-2 mb-lg-4' :key='benefit.id'
                            v-if='index % 2 == 1'>
                          <div class='col'>
                            <b-form-checkbox
                              :id="'benefit_' + benefit.id"
                              v-model="benefit.checked"
                              class='col'
                              >
                              {{ benefit.description}}
                            </b-form-checkbox>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </tab-content>
            <tab-content title="Summary" icon='fas fa-list' class='pt-2 pt-md-4 pb-2 pb-md-4'>
              <div class='row'>
                <div class='col'>
                  <p>
                    Total Benefits Score: <b class='float-right'>{{ benifitScoreBand }}</b>
                  </p>
                  <p>
                    Payback Period: <b class='float-right'>{{ form.paybackPeriod.toFixed(2) }} years</b>
                  </p>
                  <p>
                    Total Savings: <b class='float-right'>${{ form.totalSavings.toFixed(2) }}</b>
                  </p>
                  <p class='text-muted small'>* Please note that Payback Period and other calculations are not guarantees, but may represent typical results.</p>
                  
                  <h5 class='mt-5'>Savings Breakdown</h5>
                  
                  <div class='row'>
                    <div class='col'>
                      Blowout Savings
                    </div>
                    <div class='col'>
                      ${{ form.blowoutSavings.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      Tyre Wear Savings
                    </div>
                    <div class='col'>
                      ${{ form.wearSavings.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      Fuel Savings
                    </div>
                    <div class='col'>
                      ${{ form.fuelSavings.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      Service Call Savings
                    </div>
                    <div class='col'>
                      ${{ form.serviceSavings.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      Extended Season Additional Returns
                    </div>
                    <div class='col'>
                      ${{ form.additionalReturns.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      Tyre Maintenance Savings
                    </div>
                    <div class='col'>
                      ${{ form.maintainanceSavings.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      HPMV Tyre Infringement Savings
                    </div>
                    <div class='col'>
                      ${{ form.infingementSavings.toFixed(2) }}
                    </div>
                  </div>
                  <div class='row'>
                    <div class='col'>
                      CTI Annual Maintenance Costs
                    </div>
                    <div class='col'>
                      ${{ form.maintainanceCosts.toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>
            </tab-content>
            <template slot="footer" slot-scope="props">
              <div class='row'>
                <div class='col-6'>
                  <button class="wizard-btn bg-secondary text-primary" tabindex="-1" type="button" v-if="props.activeTabIndex > 0" @click="prevPage(props)" :style="props.fillButtonStyle">
                    Previous
                  </button>
                </div>
                <div class='col-6 text-right'>
                  <button class="wizard-btn bg-secondary text-primary" tabindex="-1" type="button" v-if="!props.isLastStep" @click="nextPage(props)" :style="props.fillButtonStyle">
                    Next
                  </button>
                  <b-button @click='resetForm' tabindex="-1" class='wizard-btn bg-primary text-secondary' v-else>Reset</b-button>
                </div>
              </div>
            </template>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { asEnumerable } from 'linq-es2015';
import CalculatorInputs from '@/models/calculator-inputs';
import {FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

@Component({
  components: {
    FormWizard,
    TabContent
  }
})
export default class Calculator extends Vue {
  public $refs!: Vue['$refs'] & {
    formWizard: { reset: () => void, $el: Element}
  };

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

    this.$refs.formWizard.reset();
  }

  public wizardPageChanged() {
    this.$refs.formWizard.$el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  public nextInput(event: KeyboardEvent) {
    // do nothing just yet
    let current = (event.currentTarget as HTMLInputElement).parentElement;

    while (current !== null) {
      if (current.classList.contains('form-row')) {
        if (current.nextElementSibling) {
          const rowSibling = this.getNextSibling(current, '.form-row');

          if (rowSibling) {
            const inputs = rowSibling.querySelectorAll('input');
            if (inputs.length) {
              inputs[0].focus();
            }
          }
        }

        break;
      }

      current = current.parentElement;
    }
  }

  public prevPage(props: {prevTab: () => void}) {
    props.prevTab();
  }

  public nextPage(props: {nextTab: () => void}) {
    props.nextTab();
  }

  public showResults(props: {nextTab: () => void}) {
    props.nextTab();
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

  private getNextSibling(elem: HTMLElement, selector: string): Element | null {

    // Get the next sibling element
    let sibling = elem.nextElementSibling;

    // If there's no selector, return the first sibling
    if (!selector) {
      return sibling;
    }

    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      if (sibling.matches(selector)) {
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }

    return sibling;
  }
}
</script>
<style lang="scss">

.vue-form-wizard.md {
  .wizard-icon-circle {
    outline: none;
  }
  .wizard-nav-pills > li.active > a .wizard-icon-circle {
    background-color: #ffc113;
  }
  .wizard-icon-circle .wizard-icon,
  .wizard-nav-pills > li.active > a .wizard-icon {
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.3em;
    color: #1a325d;
  }
  .wizard-btn {
    min-width: 80px;
  }
  
  .wizard-tab-content,
  .wizard-card-footer {
    padding: 0;
  }
} 
@media (max-width: 800px) {
  .vue-form-wizard.md {
    .wizard-navigation .wizard-progress-with-circle {
      top: 25px;
    }
    .wizard-icon-circle {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }
    .wizard-icon-circle .wizard-icon,
    .wizard-nav-pills > li.active > a .wizard-icon {
      font-size: 0.8em;
    }
    .stepTitle {
      font-size: 0.6em;
    }
  }
}
@media (max-width: 400px) {
  .vue-form-wizard.md {
     .wizard-navigation .wizard-progress-with-circle {
      top: 22px;
    }
    .wizard-icon-circle {
      width: 34px;
      height: 34px;
      font-size: 1em;
    }
    
    .wizard-icon-circle .wizard-icon,
    .wizard-nav-pills > li.active > a .wizard-icon {
      font-size: 0.8em;
    }
    .stepTitle {
      font-size: 0.6em;
    }
  }
}

</style>
