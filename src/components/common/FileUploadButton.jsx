import React, { } from 'react';
import { Alert } from 'react-native';
import { } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from "react-native-document-picker";
import { } from '../../constants/banners';
import { handleFetchError, uploadToS3,  } from '../../actions';
import SpinnerHolder from '../common/SpinnerHolder';
import ErrorDialog from '../ErrorDialog';
import { LOGO_BRIGHT_BLUE, LOGO_DARK_BLUE, } from '../../constants/colors';
import { trackPromise } from 'react-promise-tracker';
import getStyleSheet from '../../styles/styles';  

const cacheFile = async ({name, uri}) => {


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
						copyToCacheDirectory: false // https://github.com/expo/expo/issues/21792
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
						const cacheFilePath =  await cacheFile(result)
						console.log(cacheFilePath)
					} else if (result?.type === 'cancel')
						Alert.alert('Document selection cancelled')
				}}>{'Choose file to upload'}</Icon.Button> 
				<SpinnerHolder />
				<ErrorDialog />
		</>
	);
}