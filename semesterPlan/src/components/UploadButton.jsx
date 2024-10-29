import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export default function UploadButton() {
    
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isFileSelected, setIsFileSelected] = useState(false)

    function onFileUpload(event) {
        console.log(event)
        var selectedFile = event.target.files[0]
        setUploadedFile(selectedFile)
        setIsFileSelected(true)
        console.log(selectedFile)
    }

  return (
    <div>
        {isFileSelected ? (
				<div>
					<p>Filename: {uploadedFile.name}</p>
					<p>Filetype: {uploadedFile.type}</p>
					<p>Size in bytes: {uploadedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{uploadedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}


    
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
        >
            Upload file
            <VisuallyHiddenInput type="file" onChange={onFileUpload}/>
        </Button>

    </div>
  );
}
