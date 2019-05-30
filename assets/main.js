const imagePreview = document.getElementById('preview');
const imageUploader = document.getElementById('img-uploader');
const imageLayout = document.getElementById('layout');
const imageUploaderBar = document.getElementById('img-bar');

const cloudinary_url ='https://api.cloudinary.com/v1_1/dx9n8tsyu/image/upload';
const cloudinary_upload_preset ='xeu4hlpn';

imageUploader.addEventListener('change',async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',cloudinary_upload_preset);


    const res = await axios.post(cloudinary_url,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        },
        onUploadProgress: function (e) {
            const progressBar = Math.round((e.loaded * 100) / e.total);
            imageUploaderBar.style=`width: ${progressBar}%`;
          },
    });
    previewDom();
    imagePreview.src= res.data.secure_url;
});

function previewDom(){
imageLayout.classList = 'img-fluid d-none';
imagePreview.classList = 'img-fluid visible';
imageUploaderBar.style=`width: 1%`;
};

