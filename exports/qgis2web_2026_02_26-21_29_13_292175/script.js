// script.js
// All map and popup logic moved from index.html

// Add OpenTopoMap and USGS Topo as basemaps (default CRS)
var openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var usgsTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: 'Map courtesy USGS National Map'
});

var map = L.map('map', {
    zoomControl: false,
    maxZoom: 20,
    minZoom: 1,
    layers: [usgsTopo] // Set USGS Topo as the default base layer
}).fitBounds([[40.75873091868758,-115.72781493012262],[40.784271651888176,-115.66505465560475]]);

// Add both basemaps to layer control
var baseMaps = {
    "USGS Topo": usgsTopo,
    "OpenTopoMap": openTopo
};
L.control.layers(baseMaps, null, {collapsed: false, position: 'topright'}).addTo(map);
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

function removeEmptyRowsFromPopupContent(content, feature) {
 var tempDiv = document.createElement('div');
 tempDiv.innerHTML = content;
 var rows = tempDiv.querySelectorAll('tr');
 for (var i = 0; i < rows.length; i++) {
     var td = rows[i].querySelector('td.visible-with-data');
     var key = td ? td.id : '';
     if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
         rows[i].parentNode.removeChild(rows[i]);
     }
 }
 return tempDiv.innerHTML;
}
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var imgTd = tempDiv.querySelector('td img');
    if (imgTd) {
        var src = imgTd.getAttribute('src');
        if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.update();
            }, 10);
        } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = src;
            imgTd.parentNode.replaceChild(audio, imgTd);
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
            var video = document.createElement('video');
            video.controls = true;
            video.src = src;
            video.style.width = "400px";
            video.style.height = "300px";
            video.style.maxHeight = "60vh";
            video.style.maxWidth = "60vw";
            imgTd.parentNode.replaceChild(video, imgTd);
            popup._contentNode.classList.add('media');
            video.addEventListener('loadedmetadata', function() {
                popup.update();
            });
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else {
            popup._contentNode.classList.remove('media');
        }
    } else {
        popup._contentNode.classList.remove('media');
    }
}
var zoomControl = L.control.zoom({
    position: 'topleft'
}).addTo(map);
var bounds_group = new L.featureGroup([]);
function setBounds() {}

function pop_APE_NAD83_0(feature, layer) {
    var popupContent = '<table>' +
        '<tr><th>Investigation ID</th><td>' + (feature.properties['CRM_INVSTG'] !== null ? autolinker.link(String(feature.properties['CRM_INVSTG'])) : '') + '</td></tr>' +
        '<tr><th>Admin State</th><td>' + (feature.properties['ADMIN_ST'] !== null ? autolinker.link(String(feature.properties['ADMIN_ST'])) : '') + '</td></tr>' +
        '<tr><th>GIS Acres</th><td>' + (feature.properties['GIS_ACRES'] !== null ? autolinker.link(String(feature.properties['GIS_ACRES'])) : '') + '</td></tr>' +
        '<tr><th>BLM Acres</th><td>' + (feature.properties['BLM_ACRES'] !== null ? autolinker.link(String(feature.properties['BLM_ACRES'])) : '') + '</td></tr>' +
        '<tr><th>Created Date</th><td>' + (feature.properties['CREATE_DAT'] !== null ? autolinker.link(String(feature.properties['CREATE_DAT'])) : '') + '</td></tr>' +
        '<tr><th>Created By</th><td>' + (feature.properties['CREATE_BY'] !== null ? autolinker.link(String(feature.properties['CREATE_BY'])) : '') + '</td></tr>' +
        '</table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}
function style_APE_NAD83_0_0() {
    return {
        pane: 'pane_APE_NAD83_0',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(141,90,153,1.0)',
        interactive: true,
    }
}
map.createPane('pane_APE_NAD83_0');
map.getPane('pane_APE_NAD83_0').style.zIndex = 400;
map.getPane('pane_APE_NAD83_0').style['mix-blend-mode'] = 'normal';
var layer_APE_NAD83_0 = new L.geoJson(json_APE_NAD83_0, {
    attribution: '',
    interactive: true,
    dataVar: 'json_APE_NAD83_0',
    layerName: 'layer_APE_NAD83_0',
    pane: 'pane_APE_NAD83_0',
    onEachFeature: pop_APE_NAD83_0,
    style: style_APE_NAD83_0_0,
});
bounds_group.addLayer(layer_APE_NAD83_0);
map.addLayer(layer_APE_NAD83_0);

function pop_StagingArea_NAD83_1(feature, layer) {
    var popupContent = '<table>' +
        '<tr><th>Staging Area ID</th><td>' + (feature.properties['id'] !== null ? autolinker.link(String(feature.properties['id'])) : '') + '</td></tr>' +
        '<tr><th>Shape Length</th><td>' + (feature.properties['Shape_Leng'] !== null ? autolinker.link(String(feature.properties['Shape_Leng'])) : '') + '</td></tr>' +
        '<tr><th>Shape Area</th><td>' + (feature.properties['Shape_Area'] !== null ? autolinker.link(String(feature.properties['Shape_Area'])) : '') + '</td></tr>' +
        '</table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}
function style_StagingArea_NAD83_1_0() {
    return {
        pane: 'pane_StagingArea_NAD83_1',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(196,60,57,1.0)',
        interactive: true,
    }
}
map.createPane('pane_StagingArea_NAD83_1');
map.getPane('pane_StagingArea_NAD83_1').style.zIndex = 401;
map.getPane('pane_StagingArea_NAD83_1').style['mix-blend-mode'] = 'normal';
var layer_StagingArea_NAD83_1 = new L.geoJson(json_StagingArea_NAD83_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_StagingArea_NAD83_1',
    layerName: 'layer_StagingArea_NAD83_1',
    pane: 'pane_StagingArea_NAD83_1',
    onEachFeature: pop_StagingArea_NAD83_1,
    style: style_StagingArea_NAD83_1_0,
});
bounds_group.addLayer(layer_StagingArea_NAD83_1);
map.addLayer(layer_StagingArea_NAD83_1);

function pop_ExistingTrails_NAD83_2(feature, layer) {
    var popupContent = '<table>' +
        '<tr><th>Trail Name</th><td>' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name'])) : '') + '</td></tr>' +
        '<tr><th>Confidence</th><td>' + (feature.properties['Confidence'] !== null ? autolinker.link(String(feature.properties['Confidence'])) : '') + '</td></tr>' +
        '<tr><th>Length (Miles)</th><td>' + (feature.properties['Length_Mil'] !== null ? autolinker.link(String(feature.properties['Length_Mil'])) : '') + '</td></tr>' +
        '</table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}
function style_ExistingTrails_NAD83_2_0() {
    return {
        pane: 'pane_ExistingTrails_NAD83_2',
        opacity: 1,
        color: 'rgba(255,158,23,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 1.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_ExistingTrails_NAD83_2');
map.getPane('pane_ExistingTrails_NAD83_2').style.zIndex = 402;
map.getPane('pane_ExistingTrails_NAD83_2').style['mix-blend-mode'] = 'normal';
var layer_ExistingTrails_NAD83_2 = new L.geoJson(json_ExistingTrails_NAD83_2, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ExistingTrails_NAD83_2',
    layerName: 'layer_ExistingTrails_NAD83_2',
    pane: 'pane_ExistingTrails_NAD83_2',
    onEachFeature: pop_ExistingTrails_NAD83_2,
    style: style_ExistingTrails_NAD83_2_0,
});
bounds_group.addLayer(layer_ExistingTrails_NAD83_2);
map.addLayer(layer_ExistingTrails_NAD83_2);

function pop_ProjectFootprint_NAD83_3(feature, layer) {
    var popupContent = '<table>' +
        '<tr><th>Project Name</th><td>' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name'])) : '') + '</td></tr>' +
        '<tr><th>Admin State</th><td>' + (feature.properties['ADMIN_ST'] !== null ? autolinker.link(String(feature.properties['ADMIN_ST'])) : '') + '</td></tr>' +
        '<tr><th>GIS Acres</th><td>' + (feature.properties['GIS_ACRES'] !== null ? autolinker.link(String(feature.properties['GIS_ACRES'])) : '') + '</td></tr>' +
        '<tr><th>BLM Acres</th><td>' + (feature.properties['BLM_ACRES'] !== null ? autolinker.link(String(feature.properties['BLM_ACRES'])) : '') + '</td></tr>' +
        '<tr><th>Created Date</th><td>' + (feature.properties['CREATE_DAT'] !== null ? autolinker.link(String(feature.properties['CREATE_DAT'])) : '') + '</td></tr>' +
        '<tr><th>Created By</th><td>' + (feature.properties['CREATE_BY'] !== null ? autolinker.link(String(feature.properties['CREATE_BY'])) : '') + '</td></tr>' +
        '</table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}
function style_ProjectFootprint_NAD83_3_0() {
    return {
        pane: 'pane_ProjectFootprint_NAD83_3',
        opacity: 1,
        color: 'rgba(152,125,183,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 1.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_ProjectFootprint_NAD83_3');
map.getPane('pane_ProjectFootprint_NAD83_3').style.zIndex = 403;
map.getPane('pane_ProjectFootprint_NAD83_3').style['mix-blend-mode'] = 'normal';
var layer_ProjectFootprint_NAD83_3 = new L.geoJson(json_ProjectFootprint_NAD83_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ProjectFootprint_NAD83_3',
    layerName: 'layer_ProjectFootprint_NAD83_3',
    pane: 'pane_ProjectFootprint_NAD83_3',
    onEachFeature: pop_ProjectFootprint_NAD83_3,
    style: style_ProjectFootprint_NAD83_3_0,
});
bounds_group.addLayer(layer_ProjectFootprint_NAD83_3);
map.addLayer(layer_ProjectFootprint_NAD83_3);

function pop_SierraTrailworks_NAD83_4(feature, layer) {
    var popupContent = '<table>' +
        '<tr><th>Trail Name</th><td>' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name'])) : '') + '</td></tr>' +
        '<tr><th>Description</th><td>' + (feature.properties['descriptio'] !== null ? autolinker.link(String(feature.properties['descriptio'])) : '') + '</td></tr>' +
        '<tr><th>Timestamp</th><td>' + (feature.properties['timestamp'] !== null ? autolinker.link(String(feature.properties['timestamp'])) : '') + '</td></tr>' +
        '</table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}
function style_SierraTrailworks_NAD83_4_0() {
    return {
        pane: 'pane_SierraTrailworks_NAD83_4',
        opacity: 1,
        color: 'rgba(225,89,137,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 1.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_SierraTrailworks_NAD83_4');
map.getPane('pane_SierraTrailworks_NAD83_4').style.zIndex = 404;
map.getPane('pane_SierraTrailworks_NAD83_4').style['mix-blend-mode'] = 'normal';
var layer_SierraTrailworks_NAD83_4 = new L.geoJson(json_SierraTrailworks_NAD83_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_SierraTrailworks_NAD83_4',
    layerName: 'layer_SierraTrailworks_NAD83_4',
    pane: 'pane_SierraTrailworks_NAD83_4',
    onEachFeature: pop_SierraTrailworks_NAD83_4,
    style: style_SierraTrailworks_NAD83_4_0,
});
bounds_group.addLayer(layer_SierraTrailworks_NAD83_4);
map.addLayer(layer_SierraTrailworks_NAD83_4);

const url = {"Nominatim OSM": "https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&",
"France BAN": "https://api-adresse.data.gouv.fr/search/?"}
var photonControl = L.control.photon({
    url: url["Nominatim OSM"],
    feedbackLabel: '',
    position: 'topleft',
    includePosition: true,
    initial: true,
    // resultsHandler: myHandler,
}).addTo(map);
photonControl._container.childNodes[0].style.borderRadius="10px"
var x = null;
var marker = null;
var z = null;
photonControl.on('selected', function(e) {
    console.log(photonControl.search.resultsContainer);
    if (x != null) {
        map.removeLayer(obj3.marker);
        map.removeLayer(x);
    }
    obj2.gcd = e.choice;
    x = L.geoJSON(obj2.gcd).addTo(map);
    var label = typeof obj2.gcd.properties.label === 'undefined' ? obj2.gcd.properties.display_name : obj2.gcd.properties.label;
    obj3.marker = L.marker(x.getLayers()[0].getLatLng()).bindPopup(label).addTo(map);
    map.setView(x.getLayers()[0].getLatLng(), 17);
    z = typeof e.choice.properties.label === 'undefined'? e.choice.properties.display_name : e.choice.properties.label;
    console.log(e);
    e.target.input.value = z;
});
var search = document.getElementsByClassName("leaflet-photon leaflet-control")[0];
search.classList.add("leaflet-control-search")
search.style.display = "flex";
search.style.backgroundColor="rgba(255,255,255,0.5)" 
var button = document.createElement("div");
button.id = "gcd-button-control";
button.className = "gcd-gl-btn fa fa-search search-button";
search.insertBefore(button, search.firstChild);
last = search.lastChild;
last.style.display = "none";
button.addEventListener("click", function (e) {
    if (last.style.display === "none") {
        last.style.display = "block";
    } else {
        last.style.display = "none";
    }
});
setBounds();
