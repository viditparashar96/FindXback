// SDK initialization

var ImageKit = require("imagekit");

exports.initimagekit=()=>{
    var imagekit = new ImageKit({
        publicKey : "public_5ba0PiFI4/Ek9zBSuNU6SLkMPrM=",
        privateKey : "private_ssYfrigNGg1tH1RI7fbwy3cXy10=",
        urlEndpoint : "https://ik.imagekit.io/rxdzogdyn"
    });
    return imagekit
}

