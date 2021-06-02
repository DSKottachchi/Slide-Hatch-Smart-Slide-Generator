import React from 'react';
import axios from 'axios';

const ImageUpload = () => {
    let slideSetArr;
    var listOfImages =[];

    function importAll(r) {
        return r.keys().map(r);
    }

    componentWillMount();

    // IMPORTING ALL IMAGES FROM UPLOADS FOLDER
    function componentWillMount() {
        listOfImages = importAll(require.context('../../../client/public/uploads/', false, /\.(png|jpe?g|svg)$/));
    }

    // REMOVE IMAGES FROM UPLOADS FOLDER
    const removeImage = async (filename) => {
        console.log("Filenmae:",  filename);
        try {
            const res = await axios.delete('http://localhost:5000/delete', {url: filename});
        } catch(err) {
            if(err === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log("as", err.response);
            }
        }
    }   

    return (
        <div className="slide-preview">
            {/* IMAGE LIST CONTAINER START */}
            { listOfImages && listOfImages.map((image, index) => 
                <div className="slide-preview-item">
                    <div className="img-wrap" key={image.id}>
                        <img key={index} src={image.default} alt="info" />
                    </div>
                </div>
            )}
            {/* IMAGE LIST CONTAINER ENDS */}
        </div>
    );
}

export default ImageUpload;