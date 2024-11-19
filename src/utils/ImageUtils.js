const getImageUrl = (imageJson) => {
    try {
        return JSON.parse(imageJson).url;
    } catch (e) {
        console.error("Error parsing image JSON:", e);
        return ""; // or a default image URL
    }
};

export default getImageUrl;