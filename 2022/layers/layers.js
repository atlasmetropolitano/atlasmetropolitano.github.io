ol.proj.proj4.register(proj4);
ol.proj.get("EPSG:4326").setExtent([-59.907562, -35.426541, -57.133195, -33.730243]);
var wms_layers = [];


        var lyr_googlemaps_0 = new ol.layer.Tile({
            'title': 'google maps',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'
            })
        });
var format_4123_Densidad_de_poblacin_22_1 = new ol.format.GeoJSON();
var features_4123_Densidad_de_poblacin_22_1 = format_4123_Densidad_de_poblacin_22_1.readFeatures(json_4123_Densidad_de_poblacin_22_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_4123_Densidad_de_poblacin_22_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4123_Densidad_de_poblacin_22_1.addFeatures(features_4123_Densidad_de_poblacin_22_1);
var lyr_4123_Densidad_de_poblacin_22_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_4123_Densidad_de_poblacin_22_1, 
                style: style_4123_Densidad_de_poblacin_22_1,
                popuplayertitle: "4123_ Densidad_de_población_22",
                interactive: true,
    title: '4123_ Densidad_de_población_22<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_0.png" /> 0 - 1000<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_1.png" /> 1000 - 4000<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_2.png" /> 4000 - 7000<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_3.png" /> 7000 - 11000<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_4.png" /> 11000 - 15154<br />'
        });

lyr_googlemaps_0.setVisible(true);lyr_4123_Densidad_de_poblacin_22_1.setVisible(true);
var layersList = [lyr_googlemaps_0,lyr_4123_Densidad_de_poblacin_22_1];
lyr_4123_Densidad_de_poblacin_22_1.set('fieldAliases', {'NAM': 'NAM', 'POBTOTAL': 'POBTOTAL', 'densidad22': 'densidad22', });
lyr_4123_Densidad_de_poblacin_22_1.set('fieldImages', {'NAM': 'TextEdit', 'POBTOTAL': 'TextEdit', 'densidad22': 'TextEdit', });
lyr_4123_Densidad_de_poblacin_22_1.set('fieldLabels', {'NAM': 'inline label - always visible', 'POBTOTAL': 'inline label - always visible', 'densidad22': 'inline label - always visible', });
lyr_4123_Densidad_de_poblacin_22_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});