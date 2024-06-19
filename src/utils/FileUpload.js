
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { startLoading, stopLoading } from "../redux/Slices/utiltities/Utiltities";

export const handleUpload = ( dispatch, file ) => {
    return new Promise( ( resolve, reject ) => {
        if ( file ) {
            dispatch( startLoading() );
            const storageRef = ref( storage, `documents/${file.name}` );
            const uploadTask = uploadBytesResumable( storageRef, file );

            uploadTask.on(
                'state_changed',
                ( snapshot ) => {
                    // Progress function (optional)
                    const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                    console.log( 'Upload is ' + progress + '% done' );
                },
                ( error ) => {
                    // Error function
                    dispatch( stopLoading() );
                    console.log( error );
                    reject( error ); // Reject the promise with the error
                },
                () => {
                    // Complete function
                    getDownloadURL( uploadTask.snapshot.ref )
                        .then( ( downloadURL ) => {
                            dispatch( stopLoading() );
                            resolve( downloadURL ); // Resolve the promise with the download URL
                            return downloadURL
                            console.log( 'File available at', downloadURL );
                        } )
                        .catch( ( error ) => {
                            console.log( 'Failed to get download URL', error );
                            reject( error ); // Reject the promise with the error
                        } );
                }
            );
        } else {
            reject( new Error( "No file provided" ) ); // Reject the promise if no file is provided
        }
    } );
};
