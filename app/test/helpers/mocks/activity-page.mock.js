/* eslint-disable quote-props, quotes */
export const actions = {
  "SPOT": "SPOT",
  "FINAL": "FINAL",
  "SWITCH": "SWITCH",
  "DUMP_AND_RETURN": "DUMP & RETURN",
  "LIVE_LOAD": "LIVE LOAD",
  "PICKUP": "PICKUP CAN",
  "DROPOFF": "DROPOFF CAN",
  "RELOCATE": "RELOCATE"
};
export const truck = {
  "name": "Truck name"
};
export const workOrders = [
  {
    "id": "110",
    "action": "SPOT",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "12",
    "action": "FINAL",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "65",
    "action": "SWITCH",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "81",
    "action": "DUMP & RETURN",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "44",
    "action": "LIVE LOAD",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "35",
    "action": "PICKUP CAN",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "70",
    "action": "DROPOFF CAN",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  },
  {
    "id": "68",
    "action": "RELOCATE",
    "size": "30",
    "material": "Manifested Non-Friable",
    "location1": {
      "name": "11655 Weld County Road 59, Keenesburg, CO 80643"
    },
    "location2": {
      "name": "11654 Weld County Road 59, Keenesburg, CO 80643"
    },
    "contactName": "Johny Doe",
    "contactNumber": "(303) 808-8471",
    "customerName": "Benchmark Construction"
  }
];
export const cans = [{
  "name": "321",
  "size": "12"
}, {
  "name": "123",
  "size": "48"
}];

export const checkboxesState = {
  clockIn: true,
  preTrip: false,
  postTrip: false,
  clockOut: false
};

export const checkboxesNames = {
  clockIn: 'clockIn',
  preTrip: 'preTrip',
  postTrip: 'postTrip',
  clockOut: 'clockOut'
};
