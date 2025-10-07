const cloudinary=require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file,folder,quality,height)=>{    
    try{
        //options creation 
        const options={folder};
        if(quality) options.quality=quality;
        if(height)  options.height=height;
    
        options.resource_type="auto";
        //uploading and returning the resposne
        return await cloudinary.uploader.upload(file.tempFilePath,options);
    
        
    }catch(error){
        console.log("Error occured while uploading to cloudinary",error);
        return res.status(500).json({
            success:false,
            message:"Cloudinary upload failed"
        })
    }
}