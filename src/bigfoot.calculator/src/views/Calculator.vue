<template>
  <div class="row mt-5 mb-5" style='min-height: 500px'>
    <template v-if='landingPage'>
      <div class='col'>
        <div class='row mb-4'>
          <div class='col'>
            <h2>What's Important To You?</h2>
          </div>
        </div>
        <div class='row align-items-center'>
          <div class='col-12 col-md-6 border-right'>
            <div class='row'>
              <div class='col text-left'>
                <template v-for='(benefit, index) in otherBenefits'>
                  <div class='row mb-1' :key='benefit.id'
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
                  <div class='row mb-1' :key='benefit.id'
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
          <div class='col-12 col-md-6 text-center mt-4 mt-md-0'>
            <b-button class='startButton' @click='startButtonClick'>
              <img src='@/assets/images/startbutton.png' /><div>Start</div>
              <div class='ignition'>&nbsp;</div>
            </b-button>
          </div>
        </div>
      </div>
    </template>
    <div class='col' v-else>
      <div class='wizard-nav-behind'></div>
      <form-wizard title=''
        subtitle='' color='#ffc113' ref="formWizard"
        @on-change='wizardPageChanged'
        shape='circle'>
        <template slot="step" slot-scope="props">
          <wizard-step :tab="props.tab"
            :step-size="props.stepSize"
            @click.native="props.navigateToTab(props.index)"
            @keyup.enter.native="props.navigateToTab(props.index)"
            :transition="props.transition"
            :index="props.index">
          </wizard-step>
        </template>
        <tab-content title="Road" icon='fas fa-road' class='pt-2 pt-md-4'>
          <h2>1. Road</h2>
          <b-form-group
            label-cols-sm="6"
            label-cols-lg="8"
            label="Annual Distance Travelled"
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
            label="Road Conditions (Moderate terrain, Good Surface =1, Challenging Terrain and Surface = 5)"
            label-for="roadConditions"
            type='number'>
            <b-form-input id="roadConditions" type='range' min='1' max='5'
              v-model.number="form.roadConditions">
            </b-form-input>
            <div class='d-flex justify-content-between'>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </b-form-group>
          <b-form-group
            label-cols-sm="6"
            label-cols-lg="8"
            label="Percentage where CTI is required (the Bigfoot advantage)"
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
          <h2>2. Fuel</h2>
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
            label="Fuel Consumption (average)"
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
        </tab-content>
        <tab-content title="Vehicle" icon='fas fa-truck-monster' class='pt-2 pt-md-4'>
          <h2>3. Vehicle</h2>
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
              max='1000'
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
            label="Tyre wear savings when using CTI"
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
        <tab-content title="Costs & Benefits" icon='fas fa-cogs' class='pt-2 pt-md-4'>
          <h2>4. Costs & Benefits</h2>
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
        </tab-content>
        <tab-content title="Summary" icon='fas fa-list' class='pt-2 pt-md-4 pb-2 pb-md-4'>
          <h2>Summary</h2>
          <div class='row mb-5'>
            <div class='col text-center'>
              <div class='benefits d-inline-block'>
                <div class='speedo'>
                  <img :src="speedoImg" class='img-fluid speedo' />
                </div>
                <h4 class='text-white mb-4'>Bigfoot Benefits</h4>
                <div class='paybackPeriod p-2 pl-4 pr-4'>
                  Payback Period: <span class='text-primary'><b>{{ form.paybackPeriod.toFixed(2) }} Years | </b></span>Total&nbsp;Savings: <span class='text-primary'><b>${{ form.totalSavings.toFixed(0) }}</b></span>
                </div>
                <div class='requestQuote mt-4'> 
                  <a href='https://www.bigfoot.co.nz/#SITE_FOOTERinlineContent' target='_blank'>
                    <button class='btn wizard-btn previous' type='button' @click="requestQuote">Request a Quote</button>
                  </a>
                </div>
              </div>
              <!-- <p class='text-muted small'>* Please note that Payback Period and other calculations are not guarantees, but may represent typical results.</p> -->
            </div>
          </div>
          <hr />
          <div class='row mt-5'>
            <div class='col-12 col-lg-10'>
              <div class='row'>
                <div class='col'>
                  <h5>Savings Breakdown</h5>
                </div>
              </div>
              <div class='row' v-for='bd in breakdown' :key='bd.text'>
                <div class='col-12 col-sm-10 d-flex'>
                  <div class='bd-name'>{{ bd.text }}</div>
                  <div class='filler d-none d-sm-flex'></div>
                </div>
                <div class='col-12 col-sm-2 text-right text-sm-left d-flex'>
                  <div class='filler d-sm-none'></div><b>${{ bd.value }}</b>
                </div>
              </div>
            </div>
          </div>
        </tab-content>
        <template slot="footer" slot-scope="props">
          <div class='row'>
            <div class='col-6'>
              <button class="wizard-btn previous" tabindex="-1" type="button" @click="prevPage(props)">
                Previous <i class='fas fa-caret-left'></i>
              </button>
            </div>
            <div class='col-6 text-right'>
              <button class="wizard-btn next" tabindex="-1" type="button" v-if="!props.isLastStep" @click="nextPage(props)">
                Next <font-awesome-icon icon="caret-right" />
              </button>

              <b-button @click='resetForm' tabindex="-1" class='wizard-btn reset' v-else>
                Reset <font-awesome-icon icon="undo-alt" />
              </b-button>
            </div>
          </div>
        </template>
      </form-wizard>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { asEnumerable } from 'linq-es2015';
import CalculatorInputs from '@/models/calculator-inputs';
import {FormWizard, TabContent } from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';
import CustomWizardStep from '@/components/CustomWizardStep.vue';
import * as vanal from 'vue-analytics';

@Component({
  components: {
    FormWizard,
    TabContent,
    'wizard-step': CustomWizardStep
  }
})
export default class Calculator extends Vue {
  public $refs!: Vue['$refs'] & {
    formWizard: { reset: () => void, $el: Element}
  };

  public $ga: any;

  public formKey: number = Date.now();
  public landingPage: boolean = true;

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

  public get speedoImg() {
    if (this.totalBenefitsScore >= 80) {
      return require('@/assets/images/veryhigh.png');
    }
    if (this.totalBenefitsScore >= 60) {
      return require('@/assets/images/high.png');
    }
    if (this.totalBenefitsScore >= 40) {
      return require('@/assets/images/medium.png');
    }
    return require('@/assets/images/low.png');
  }

  public get breakdown() {
    return [
      {
        text: 'Blowout Savings',
        value: this.form.blowoutSavings.toFixed(0)
      },
      {
        text: 'Tyre Wear Savings',
        value: this.form.wearSavings.toFixed(0)
      },
      {
        text: 'Fuel Savings',
        value: this.form.fuelSavings.toFixed(0)
      },
      {
        text: 'Service Call Savings',
        value: this.form.serviceSavings.toFixed(0)
      },
      {
        text: 'Extended Season Additional Returns',
        value: this.form.additionalReturns.toFixed(0)
      },
      {
        text: 'Tyre Maintenance Savings',
        value: this.form.maintainanceSavings.toFixed(0)
      },
      {
        text: 'CTI Annual Maintenance Costs',
        value: this.form.maintainanceCosts.toFixed(0)
      }
    ];
  }

  public get guageOptions() {
    return {
      angle: 0,
      lineWidth: 0.44,
      radiusScale: 1,
      pointer: {
        length: 0.6,
        strokeWidth: 0.035,
        color: '#000000'
      },
      limitMax: false,
      limitMin: false,
      colorStart: '#6FADCF',
      colorStop: '#8FC0DA',
      strokeColor: '#E0E0E0',
      generateGradient: true,
      highDpiSupport: true
    };
  }

  public resetForm() {
    this.form = new CalculatorInputs();
    this.formKey = Date.now();
    this.otherBenefits.forEach((ob) => ob.checked = true);

    this.$refs.formWizard.reset();
    this.landingPage = true;
  }

  public wizardPageChanged(prevIndex: number, nextIndex: number) {
    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    });

    let eventLabel = '';
    switch (nextIndex) {
      case 0:
        eventLabel = 'Step1_Road';
        break;
      case 1:
        eventLabel = 'Step2_Fuel';
        break;
      case 2:
        eventLabel = 'Step3_Vehicle';
        break;
      case 3:
        eventLabel = 'Step4_Cost_Benefits';
        break;
      case 4:
        eventLabel = 'Step5_Results';
        break;
      case 5:
        eventLabel = 'Step5_Results';
        break;
    }
    if (eventLabel !== '') {
      this.$ga.event('Calculator_Lead', 'Click', eventLabel);
    }
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

  public startButtonClick() {
    this.$ga.event('Calculator_Lead', 'Click', 'Step1_Road');
    this.landingPage = false;
  }

  public prevPage(props: {prevTab: () => void, activeTabIndex: number}) {
    if (props.activeTabIndex === 0) {
      this.landingPage = true;
    } else {
      props.prevTab();
    }
  }

  public nextPage(props: {nextTab: () => void, activeTabIndex: number}) {
    props.nextTab();
  }

  public requestQuote() {
    this.$ga.event('Calculator_Lead', 'Click', 'Requested_Quote');
  }

  public mounted() {
    this.$ga.event('Calculator_Lead', 'Click', 'Entry');
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
.custom-control-input:checked ~ .custom-control-label::before {
  color: #1a325d !important;
  border-color: white !important;
}
.row .col-12.border-right {
  border-right: 2px solid white !important;
}
@media (max-width: 767px) {
  .row .col-12.border-right {
    border-right: 0 !important;
  }
}
button.btn.startButton {
  // height: 110px;
  background-color: transparent;
  border: none;
  div {
    position: relative;
    right: -34px;
    top: -63px;
    color: #ffc113;
    font-family: "Alfa Slab One", cursive;
    font-size: 23px;
  }
  div.ignition {
    background-color: #F26522;
    height: 28px;
    width: 6px;
    top: -96px;
    right: -53px;
    transform: rotate(-42deg);
    transition: transform 0.2s ease;
  }
  img {
    position: relative;
    left: 0;
    width: 221px;
  }
}
button.btn.startButton:focus,
button.btn.startButton:active,
button.btn.startButton:hover {
  color:#ffc113 !important;
  background-color: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
  div.ignition {
    transform: rotate(0deg);
  }
}
.wizard-nav-behind {
  position: relative;
  top: 58px;
  height: 4px;
  background-color: #7687a6;
  width: 93%;
}
.vue-form-wizard.md .wizard-navigation .wizard-progress-with-circle {
  top: 25px;
  background-color: transparent;
}
hr {
  background-color: white;
}

.benefits {
  .paybackPeriod {
    background-color: rgb(255, 193, 19);
    border-radius: 8px;
    color: black;
  }
}
.vue-form-wizard .requestQuote button {
  color: rgb(255, 193, 19);
  border: 2px solid rgb(255, 193, 19);
  border-radius: 5px;
  font-family: "Alfa Slab One", cursive;
  font-weight: 100;
  font-size: 22px;
}
.bd-name {
  white-space: pre;
  padding-right: 5px;
}
.filler {
  width: 100%;
  height: 1.2em;
  border-bottom: 1px solid rgb(255, 193, 19);
  display: inline-block;
}
.vue-form-wizard .wizard-nav-pills {
  flex-wrap: nowrap;
  div:focus {
    outline: none;
  }
}
.custom-checkbox label,
.col-form-label {
  text-transform: capitalize;
}
.vue-form-wizard .wizard-card-footer {
  button.wizard-btn {
    background-color: #1a325d;
    border: 2px solid rgb(255, 193, 19);
    color: rgb(255, 193, 19);
    height: 40px;
    padding: 0;
    padding-left: 6px;
    padding-right: 6px;
    min-width: fit-content;
    font-family: "Alfa Slab One", cursive;
    font-weight: 200;
    font-size: 1.2em;
    svg {
      position: absolute;
      right: 0;
      height: 100%;
      width: 2.1em;
      top:0;
      background-color: rgb(255, 193, 19);
      border: 1px solid rgb(255, 193, 19);
      color: white;
      border-radius: 20px;
    }
  }
  button.wizard-btn.previous {
    padding-left: 30px;
    margin-left: 5px;
    border-radius: 0 5px 5px 0;
    svg {
      left: 0;
      padding-right: 5px;
    }
  }
  button.wizard-btn.reset:focus,
  button.wizard-btn.reset:active,
  button.wizard-btn.reset:hover {
    background-color: transparent !important;
    // border-color: transparent !important;
    box-shadow: none !important;
  }
  button.wizard-btn.next,
  button.wizard-btn.reset {
    padding-right: 30px;
    margin-right: 5px;
    border-radius: 5px 0 0 5px;
    svg {
      right: 0;
      padding-left: 5px;
    }
  }
  button.wizard-btn.reset {
    border-color: #f26a2f;
    color: #f26a2f;
    svg {
      background-color: #f26a2f;
      border-color: #f26a2f;
      padding: 8px;
    }
  }
}
.custom-range::-moz-range-thumb {
  background-color: rgb(255, 193, 19) !important;
}

.custom-range::-webkit-slider-thumb {
  background-color: rgb(255, 193, 19) !important;
}

</style>
