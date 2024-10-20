import {DivIcon, Icon, divIcon} from 'leaflet';

const sampleIcon = new Icon ({
    iconUrl : 'https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-legal-business-and-finance-icongeek26-linear-colour-icongeek26.png',
    iconSize : [35,35], // size of the icon
    iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
})

const sampleDivIcon = (label:number):DivIcon => {
    return divIcon ({
        className: "icon",
        iconSize : [35,35],
        html: `<div class="fill-line" style="transform: translateY(${100-label}%)"></div><span class="my-div-span">${label}<small>%</small></span>`
    });
}

export { sampleIcon, sampleDivIcon };