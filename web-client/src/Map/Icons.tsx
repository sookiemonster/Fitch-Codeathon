import {DivIcon, Icon, divIcon} from 'leaflet';
import Color from "colorjs.io"

const sampleIcon = new Icon ({
    iconUrl : 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-legal-business-and-finance-icongeek26-linear-colour-icongeek26.png',
    iconSize : [35,35], // size of the icon
    iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
})

const getColor = (t:number):Color => {
    let base = new Color("p3", [0, 1, 0]);
    let redgreen = base.range("red", {
        space: "lch", // interpolation space
        outputSpace: "srgb"
    });
    return redgreen(t / 100.0);
}

const StationIcon = (capacity:number):DivIcon => {
    return divIcon ({
        className: "icon",
        iconSize : [40,40],
        html: `<div class="fill-line" style="background-color: ${getColor(capacity)}; transform: translateY(${100-capacity}%)"></div><span class="my-div-span">${capacity}<small>%</small></span>`
    });
}

export { sampleIcon, StationIcon };