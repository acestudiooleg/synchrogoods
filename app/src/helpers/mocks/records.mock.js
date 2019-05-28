import R from 'ramda';
import {images} from './mock-constants';

const {guitar, girl, can, greenCan} = images;
export const manifest = [
  {
    id: 1,
    workOrderId: 2,
    createdBy: 'string',
    createdDate: '2016-09-20T09:44:43.775Z',
    modifiedBy: 'string',
    modifiedDate: '2016-09-20T09:44:43.775Z',
    type: 'MANIFEST',
    note: {
      picture: guitar,
      text: 'string',
      quantity: 10,
      unittype: 'YARDS',
      landfill: 'string',
      ticketNumber: 'string',
      profileNumber: 'string',
      manifestNumber: 'string',
      newState: 'START_WORK_ORDER'
    }
  },
  {
    id: 2,
    workOrderId: 3,
    createdBy: 'string',
    createdDate: '2016-09-20T09:44:43.775Z',
    modifiedBy: 'string',
    modifiedDate: '2016-09-20T09:44:43.775Z',
    type: 'MANIFEST',
    note: {
      picture: girl,
      text: 'string',
      quantity: 20,
      unittype: 'YARDS',
      landfill: 'string',
      ticketNumber: 'string',
      profileNumber: 'string',
      manifestNumber: 'string',
      newState: 'START_WORK_ORDER'
    }
  }
];

export const weight = [
  {
    id: 3,
    workOrderId: 4,
    createdBy: 'string',
    createdDate: '2016-09-20T09:44:43.775Z',
    modifiedBy: 'string',
    modifiedDate: '2016-09-20T09:44:43.775Z',
    type: 'WEIGHT_RECORD',
    note: {
      picture: can,
      text: 'string',
      quantity: 10,
      unittype: 'YARDS',
      landfill: 'string',
      ticketNumber: 'string',
      profileNumber: 'string',
      manifestNumber: 'string',
      newState: 'START_WORK_ORDER'
    }
  },
  {
    id: 4,
    workOrderId: 5,
    createdBy: 'string',
    createdDate: '2016-09-20T09:44:43.775Z',
    modifiedBy: 'string',
    modifiedDate: '2016-09-20T09:44:43.775Z',
    type: 'WEIGHT_RECORD',
    note: {
      picture: greenCan,
      text: 'string',
      quantity: 20,
      unittype: 'YARDS',
      landfill: 'string',
      ticketNumber: 'string',
      profileNumber: 'string',
      manifestNumber: 'string',
      newState: 'START_WORK_ORDER'
    }
  }
];

export const scaleTicket = [
  {
    id: 3,
    workOrderId: 4,
    createdBy: 'string',
    createdDate: '2016-09-20T09:44:43.775Z',
    modifiedBy: 'string',
    modifiedDate: '2016-09-20T09:44:43.775Z',
    type: 'SCALETICKET',
    note: {
      picture: can,
      text: 'string',
      quantity: 10,
      unittype: 'YARDS',
      landfill: 'string',
      ticketNumber: 'string',
      profileNumber: 'string',
      manifestNumber: 'string',
      newState: 'START_WORK_ORDER'
    }
  },
  {
    id: 4,
    workOrderId: 5,
    createdBy: 'string',
    createdDate: '2016-09-20T09:44:43.775Z',
    modifiedBy: 'string',
    modifiedDate: '2016-09-20T09:44:43.775Z',
    type: 'SCALETICKET',
    note: {
      picture: greenCan,
      text: 'string',
      quantity: 20,
      unittype: 'YARDS',
      landfill: 'string',
      ticketNumber: 'string',
      profileNumber: 'string',
      manifestNumber: 'string',
      newState: 'START_WORK_ORDER'
    }
  }
];

export const noteWithoutPicture = {
  ...manifest[1],
  note: {
    ...manifest[1].note,
    picture: ''
  }
};

export const noteWithWrongType =
  R.set(R.lensProp('type'), 'WRONG', noteWithoutPicture);
