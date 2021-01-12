
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/updateImage');
const path = require('path');
const fs = require('fs');

const fileUpload = (req, res) => {

    const type = req.params.type;
    const id = req.params.id;

    const typeValid = ['doctors', 'hospitals', 'users'];

    if(!typeValid.includes(type))
    {
        console.log(typeValid.includes(type));
        return res.status(404).json({
            ok: false,
            message: 'The type is not a valid type',
            ubication: 'file upload'
        });
    }

    // validate the image
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'the files weren´t uploaded'
        });
    }

    // processing the image
    const img = req.files.img;
    
    const cutName = img.name.split('.'); 
    /* if the image has a name type  wolverine.1.3.jpg, we just want the type
    of image, in this case, jpg.
    the function slipt will return an array with four positions
    cutname = ['wolverine', '1','3','jpg'] */
    
    const fileExtension = cutName[cutName.length - 1];
    
    const validExtensions = ['png','jpg','jpeg','gif'];

    if(!validExtensions.includes(fileExtension))
    {
        return res.status(404).json({
            ok: false,
            message: 'the extension is not valid'
        });
    }

    // generating the name of the file
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // path to save the image
    const path = `./uploadFiles/${type}/${fileName}`;

    // moving the image
    img.mv(path, function(err) {
        if (err)
        {   console.log(err);
            return res.status(500).json({
              ok: false,
              message: 'Error while we moved the image'
            });
        }

        updateImage(type, id, fileName);
        

        res.json({
            ok: true,
            message: 'Image moved succesfully',
            UploadFile: fileName
        });
      });
}



const returnImage = ( req, res ) => {

    const type = req.params.type;
    const picture = req.params.picture;

    const pathImg = path.join( __dirname, `../uploadFiles/${type}/${picture}`);
    const noImage = path.join( __dirname, `../uploadFiles/noImage.jpg`);
    if(fs.existsSync(pathImg))
    {
        res.sendFile(pathImg);
    }
    else{
        res.sendFile(noImage);
    }
    
}


module.exports = {
    fileUpload,
    returnImage,
}