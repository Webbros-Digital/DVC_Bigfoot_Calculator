export {
  ctiFitted,
  paybackPeriods,
  fuelAdjustment,
  tyreLife
};

const ctiFitted: Array<{ axels: number, cost: number }> = [
  { axels: 1, cost: 7000 },
  { axels: 2, cost: 7500 },
  { axels: 3, cost: 10000},
  { axels: 4, cost: 11000},
  { axels: 5, cost: 12000},
  { axels: 6, cost: 13000}
];

const paybackPeriods: Array<{ period: number, points: number }> = [
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

const fuelAdjustment: Array<{ roadCondition: number, cost: number }> = [
  { roadCondition: 1, cost: 2.70 },
  { roadCondition: 2, cost: 2.35 },
  { roadCondition: 3, cost: 1.90 },
  { roadCondition: 4, cost: 1.40 },
  { roadCondition: 5, cost: 0.85 }
];
const tyreLife: Array<{ roadCondition: number, life: number }> = [
  { roadCondition: 1, life: 70000 },
  { roadCondition: 2, life: 64000 },
  { roadCondition: 3, life: 57000 },
  { roadCondition: 4, life: 49000 },
  { roadCondition: 5, life: 40000 }
];
