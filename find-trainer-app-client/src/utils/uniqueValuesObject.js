export default (obj1, obj2) => {
    let data = {};
    for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                data[key] = obj1[key];
            }
        } else {
            console.log("property doesnt exist in object");
        }
    }
    return data;
};
