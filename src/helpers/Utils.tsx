// import moment from 'moment';
import moment from 'moment-timezone';
import formatNumber from 'format-number';
import decimalFormat from 'decimal-format';
import { post } from './Api';
import { auth } from 'core';

export const keyValue = (object: any) => {
  const data = Object.entries((object ?? {})).map(([key, value]: any) => {
    return {
      key,
      value
    };
  });

  return data;
};

export const findCenter = (width: number, height: number, size: number) => {
  const y = height / 2 - size / 2;
  const x = width / 2 - size / 2;

  return {
    x,
    y,
  };
};

export const formatDate = ({ date, format = 'lll' }: { date: string, format?: string }) => {
  return moment(date).tz("Asia/Singapore").format(format);
};

export const currency = (amount: number) => {
  const formatter = new decimalFormat('#,##0.00');
  return formatter.format(amount);
}

export const log = async (message: string) => {
  const { data } = await post({
    url: '/telegram/log',
    params: { message },
    token: true,
  });

  return data;
}

export const excerpt = (str: string, length = 50) => {
  if (str.length > length) {
    return str.substring(0, length) + '...';
  }

  return str;
};

export const generateMessageId = (deviceId: string) => {
  const uid = auth.currentUser?.uid;

  const ids = [deviceId, uid,].sort();

  return `${ids[0]}_${ids[1]}`;
};
