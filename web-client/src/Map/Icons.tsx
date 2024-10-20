import {DivIcon, divIcon} from 'leaflet';
import Color from "colorjs.io"

const vendorIcon = divIcon ({
    className: "vendor-icon",
    iconSize: [30,30],
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899z"/></svg>`
});

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

export { vendorIcon, StationIcon };