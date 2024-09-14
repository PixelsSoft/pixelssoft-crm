
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from 'firebase/storage';
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


export const getFileDetails = ( fileURL ) => {

    const storageRef = ref( storage, fileURL );

    return getMetadata( storageRef )
        .then( ( metadata ) => {
            const fileSizeBytes = metadata.size; // File size in bytes
            const fileSizeMB = fileSizeBytes / ( 1024 * 1024 ); // Convert bytes to megabytes
            const fileSizeFormatted = fileSizeMB.toFixed( 2 ); // Round to 2 decimal places

            const fileName = metadata.name; // File name
            const fileFormat = getFileFormat( metadata.contentType ); // File format (based on content type)

            return {
                fileSize: fileSizeFormatted,
                fileName,
                fileFormat,
                url: fileURL
            };
        } )
        .catch( ( error ) => {
            console.error( 'Error fetching file metadata:', error );
            throw error; // Propagate the error to the caller
        } );
};

// Helper function to get file format from content type
export const getFileFormat = ( contentType ) => {
    const parts = contentType.split( '/' );
    return parts[1];
};

