import Constants from 'expo-constants';
import { Linking, Alert, Platform } from 'react-native';
import aws from 'aws-sdk';
import {EXPO_PUBLIC_BORROWER_S3_ACCESS_KEY,EXPO_PUBLIC_BORROWER_S3_ACCESS_SECRET, 
  EXPO_PUBLIC_BORROWER_S3_DOCUMENTS_BUCKET,EXPO_PUBLIC_AWS_REGION_CODE} from '@env'

const s3 = new aws.S3({
  accessKeyId: EXPO_PUBLIC_BORROWER_S3_ACCESS_KEY ,
  secretAccessKey: EXPO_PUBLIC_BORROWER_S3_ACCESS_SECRET,
  region: EXPO_PUBLIC_AWS_REGION_CODE,
});

export async function uploadToS3(bodyAsBase64, metadata) {
  const key = metadata?.borrowerId + '/' + metadata?.sessionId
  //console.log(metadata)
  return await s3
    .upload({
      Body: bodyAsBase64,
      Bucket: EXPO_PUBLIC_BORROWER_S3_DOCUMENTS_BUCKET,
      Key: key,
      ContentType: metadata?.contentType,
      Metadata: metadata
    }).promise() ;
}

export const openUrl = url => {
  return dispatch => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('Incorrect link ' + url);
        } else {
          dispatch(() => Linking.openURL(url));
        }
      })
      .catch(err => dispatch(console.log(err)));
  }
};

export const callNumber = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== 'android') 
    phoneNumber = `telprompt:${phone}`;
  else 
    phoneNumber = `tel:${phone}`;

  return dispatch => {
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          dispatch(() => Linking.openURL(phoneNumber));
        }
      })
      .catch(err => dispatch(console.log(err)));
  }
};
/**
 * Converts an object to a query string.
 */
export const toQueryString = (params) => {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

export const numberToCurrency = (number) => {
	return '$' + (!number ? '0' : number.toLocaleString(undefined, {maximumFractionDigits:0}));
}

//Convert $547,345.34 to 547345.34
export const currencyToNumber = (text) => {
	if (typeof text === 'string') {
		text = text.replace(/\$/, '0') // Replace currency symbol with leading 0
		text = text.replace(/,/, '') // Remove commas
	}
	return parseInt(text);
}

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
