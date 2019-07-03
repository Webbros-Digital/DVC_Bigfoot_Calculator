<template>
  <li :class="{complete: tab.checked, active:tab.active}">
    <a href="javascript:void(0)" :class="{disabled: !tab.checked}">
      <div class='wizard-step-indicator d-flex'
        role="tab"
        :tabindex="tab.checked ? 0 : ''"
        :id="`step-${tab.tabId}`"
        :aria-controls="tab.tabId"
        :aria-disabled="tab.active"
        :aria-selected="tab.active"
        :class="{checked: tab.checked,square_shape:isStepSquare, tab_shape:isTabShape}"
        :style="[tab.checked ? stepCheckedStyle : {}, tab.validationError ? errorStyle : {}]"
      >
        <div class='wizard-step-index d-flex' style="padding-top:0 !important">
          <template v-if="index < 4">
            {{ index + 1 }}
          </template>
          <template v-else>
            ✔
          </template>
        </div>
        <div class='wizard-step-icon d-flex'>
          <i :class="tab.icon" class="wizard-icon"></i>
        </div>
      </div>
      <!-- <div class="wizard-icon-circle md"
        role="tab"
        :tabindex="tab.checked ? 0 : ''"
        :id="`step-${tab.tabId}`"
        :aria-controls="tab.tabId"
        :aria-disabled="tab.active"
        :aria-selected="tab.active"
        :class="{checked: tab.checked,square_shape:isStepSquare, tab_shape:isTabShape}"
        :style="[tab.checked ? stepCheckedStyle : {}, tab.validationError ? errorStyle : {}]"
      >
        <transition :name="transition" mode="out-in">
          <div v-if="tab.active" class="wizard-icon-container"
            :class="{square_shape:isStepSquare, tab_shape:isTabShape}"
            :style="[tab.active ? iconActiveStyle: {}, tab.validationError ? errorStyle : {}]"
          >
            <slot name="active-step">
              <i v-if="tab.icon" :class="tab.icon" class="wizard-icon"></i>
              <i v-else class="wizard-icon">{{index + 1}}</i>
            </slot>
          </div>
          <slot v-if="!tab.active">
            <i v-if="!tab.active && tab.icon" :class="tab.icon" class="wizard-icon"></i>
            <i v-if="!tab.active && !tab.icon" class="wizard-icon">{{index + 1}}</i>
          </slot>
        </transition>
      </div> -->
    </a>
  </li>
</template>
<script>
  export default {
    name: 'wizard-step',
    props: {
      tab: {
        type: Object,
        default: () => {
          return {};
        }
      },
      transition: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      iconActiveStyle() {
        return {
          backgroundColor: this.tab.color
        };
      },
      stepCheckedStyle() {
        return {
          borderColor: this.tab.color
        };
      },
      errorStyle() {
        return {
          borderColor: this.tab.errorColor,
          backgroundColor: this.tab.errorColor
        };
      },
      stepTitleStyle() {
        const isError = this.tab.validationError;
        return {
          color: isError ? this.tab.errorColor : this.tab.color
        };
      },
      isStepSquare() {
        return this.tab.shape === 'square';
      },
      isTabShape() {
        return this.tab.shape === 'tab';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .vue-form-wizard.md .wizard-nav-pills > li.active > a .wizard-icon {
    font-size: 20px;
  }
  .wizard-step-indicator {
    width: 60px;
  }
  .wizard-step-index {
    background-color: #7687a6;
    width: 60px;
    color: #1a325d;
    border-radius: 10px 0 0 10px;
    margin-right: 13px;
    font-size: 1.5em;
    padding: 0;
    padding-left:10px;
    padding-right: 26px;
    font-family: 'Alfa Slab One';
    align-items: center;
    justify-content: center;
  }
  .wizard-step-icon {
    border-radius: 50%;
    width: 38px;
    height: 38px;
    background-color: #7687a6;
    color: #1a325d;
    padding: 7px;
    position:relative;
    border: 2px solid #1a325d;
    right: 32px;
    align-items: center;
    justify-content: center;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .complete {
    .wizard-step-index {
      color: rgb(255, 193, 19);
    }
    .wizard-step-icon {
      background-color: white;
      border: 2px solid rgb(255, 193, 19);
    }
  }
  .active {
    .wizard-step-index,
    .wizard-step-icon {
      background-color: rgb(255, 193, 19);
      color: #1a325d;
    }
    .wizard-step-icon {
      border: 2px solid #1a325d;
    }
  }
  @media (max-width: 767px) {
    .vue-form-wizard.md .wizard-nav-pills > li.active > a .wizard-icon {
      font-size: 18px;
    }
    .wizard-step-index {
      font-size: 1em;
      width: 46px;
    }
  }

// @media (max-width: 533px) {
//   .vue-form-wizard .wizard-nav-pills a, .vue-form-wizard .wizard-nav-pills li {
//     max-width: 100px;
//   }
// }

// @media (max-width: 333px) {
//   .vue-form-wizard .wizard-nav-pills a, .vue-form-wizard .wizard-nav-pills li {
//     max-width: 76px;
//   }
// }
</style>