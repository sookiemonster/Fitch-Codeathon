function capitalizeFirstLetter(string) {
    if (!string) return string; 
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


module.exports = capitalizeFirstLetter;