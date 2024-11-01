const UploadImage = async (image) => {
   try{
     const url = `https://api.cloudinary.com/v1_1/dadaiytmf/image/upload`;
     const formData = new FormData();
     formData.append("file", image);
     formData.append("upload_preset", "hv6knghb");

     console.log("Cloudinary URL:", url);
     console.log("Form Data:", formData.get("file"), formData.get("upload_preset"));

     const response = await fetch(url, {
       method: "POST",
       body: formData,
     });

     if(!response.ok){
       const errorMessage = await response.text();
       throw new Error(`Failed to upload image: ${errorMessage}`)
     }

     const data = await response.json();
     return data;
   }catch(err){
     console.error("Error uploading image to Cloudinary:", err.message);
     return null
   }
}

export default UploadImage