import React, { } from 'react';
import { Alert } from 'react-native';
import { } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import * as DocumentPicker from "expo-document-picker";
import Constants from 'expo-constants';
import * as FileSystem from "expo-file-system";
import * as Buffer from 'buffer';
import getStyleSheet from '../../styles/styles';  
import { } from '../../constants/banners';
import { handleFetchError, uploadToS3,  } from '../../actions';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, } from '../../constants/colors';
import { trackPromise } from 'react-promise-tracker';

const cacheFile = async ({name, uri}) => {
	var cacheDirPath = FileSystem.cacheDirectory + "uploads/"
	var cacheDir = await FileSystem.getInfoAsync(cacheDirPath)
	if (cacheDir.exists) {
		console.log(cacheDir);
	} else {
		const makeCacheResult = await FileSystem.makeDirectoryAsync(cacheDirPath);
		console.log(makeCacheResult);
	}
	const cacheFilePath = cacheDirPath + name;
	console.log(cacheFilePath);
	await FileSystem.copyAsync({ from: uri, to: cacheFilePath });
	const info = await FileSystem.getInfoAsync(cacheFilePath);
	console.log(info, 'info');
	return cacheFilePath;
}

const readAndUpload = async (uri, metadata) => {
	return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
	.then(data => {
		//console.log('Uploading {uri} to S3'.replaceAll('{uri}', uri))
		//console.log(metadata)
		const buffer = Buffer.Buffer.from(data, "base64");

		return uploadToS3(buffer,metadata)
	});

}

export default function FileUploadButton(props) {
	return (
		<>
			<Icon.Button name="clouduploado" size={20} borderRadius={25}
				backgroundColor={LOGO_BRIGHT_BLUE} color={LOGO_DARK_BLUE}  
				iconStyle={{margin:1}} 
				onPress={async ()=> {
					const result = await DocumentPicker.getDocumentAsync({
						type: [
							'image/*',
							'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
							'application/pdf',
							'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
							'application/zip'], 
						copyToCacheDirectory: Constants.platform.ios ? true : false // https://github.com/expo/expo/issues/21792
					})

					if (result?.type == 'success') {
						console.log(result);
						let { name, size, uri, mimeType } = result;
						let metadata = {
							borrowerId : props?.borrowerId, 
							documentType: props?.documentType, 
							documentTypeId: props?.documentTypeId,
							brokerId: props?.brokerId,
							sessionId: props?.sessionId, 
							sharing: props?.sharing, 
							source: props?.source, 
							status: props?.status, 
							overwrite: '' + props?.overwrite, 
							filename: name, 
							filesize: '' + size,
							contentType: mimeType,
						}
						console.log(metadata)
						const cacheFilePath =  Constants.platform.ios ? uri : await cacheFile(result)
						console.log(cacheFilePath)
						trackPromise(readAndUpload(cacheFilePath, metadata))
							.then((result) => {
								console.log('In uploader')
								console.log(result)
								if (props?.onComplete)
									props.onComplete({...result, ...metadata, success:true})
							})
							.catch((error) => {
								console.log('Read and upload error')
								console.log(error)
								if (props?.onComplete)
									props.onComplete({...error, ...metadata, success:false})
								Promise.reject(error)
							})
					} else if (result?.type === 'cancel')
						Alert.alert('Document selection cancelled')
				}}>{'Choose file to upload'}</Icon.Button> 
				<SpinnerHolder />
				<ErrorDialog />
		</>
	);
}