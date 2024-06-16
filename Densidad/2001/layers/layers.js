ol.proj.proj4.register(proj4);
ol.proj.get("EPSG:4326").setExtent([-59.930554, -35.462306, -57.156187, -33.766008]);
var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
            })
        });
var format_4123_Densidad_de_poblacin_01_1 = new ol.format.GeoJSON();
var features_4123_Densidad_de_poblacin_01_1 = format_4123_Densidad_de_poblacin_01_1.readFeatures(json_4123_Densidad_de_poblacin_01_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_4123_Densidad_de_poblacin_01_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4123_Densidad_de_poblacin_01_1.addFeatures(features_4123_Densidad_de_poblacin_01_1);
var lyr_4123_Densidad_de_poblacin_01_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_4123_Densidad_de_poblacin_01_1, 
                style: style_4123_Densidad_de_poblacin_01_1,
                popuplayertitle: "4123_ Densidad_de_población_01",
                interactive: true,
    title: '4123_ Densidad_de_población_01<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_01_1_0.png" /> 0 - 97<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_01_1_1.png" /> 97 - 629<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_01_1_2.png" /> 629 - 3004<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_01_1_3.png" /> 3004 - 5377<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_01_1_4.png" /> 5377 - 13676<br />'
        });

lyr_GoogleSatellite_0.setVisible(true);lyr_4123_Densidad_de_poblacin_01_1.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_4123_Densidad_de_poblacin_01_1];
lyr_4123_Densidad_de_poblacin_01_1.set('fieldAliases', {'COLOR': 'COLOR', 'GNA': 'GNA', 'NAM': 'NAM', 'SAG': 'SAG', 'IDJUR': 'IDJUR', 'AREAWW': 'AREAWW', 'PERIME': 'PERIME', 'IDWWWW': 'IDWWWW', 'IDUSUA': 'IDUSUA', 'PCIIND': 'PCIIND', 'DEPIND': 'DEPIND', 'DEPINN': 'DEPINN', 'DEPPBA': 'DEPPBA', 'DEPPBN': 'DEPPBN', 'PAISWW': 'PAISWW', 'PROVIN': 'PROVIN', 'CLASS': 'CLASS', 'NOMDEP': 'NOMDEP', 'NOMDEN': 'NOMDEN', 'NAM_1': 'NAM_1', 'DEPINN_1': 'DEPINN_1', 'Población': 'Población', 'Sup_km2': 'Sup_km2', 'den2001': 'den2001', 'ObjectID': 'ObjectID', });
lyr_4123_Densidad_de_poblacin_01_1.set('fieldImages', {'COLOR': 'TextEdit', 'GNA': 'TextEdit', 'NAM': 'TextEdit', 'SAG': 'TextEdit', 'IDJUR': 'TextEdit', 'AREAWW': 'TextEdit', 'PERIME': 'TextEdit', 'IDWWWW': 'Range', 'IDUSUA': 'Range', 'PCIIND': 'TextEdit', 'DEPIND': 'TextEdit', 'DEPINN': 'TextEdit', 'DEPPBA': 'TextEdit', 'DEPPBN': 'TextEdit', 'PAISWW': 'TextEdit', 'PROVIN': 'TextEdit', 'CLASS': 'TextEdit', 'NOMDEP': 'TextEdit', 'NOMDEN': 'TextEdit', 'NAM_1': 'TextEdit', 'DEPINN_1': 'TextEdit', 'Población': 'TextEdit', 'Sup_km2': 'TextEdit', 'den2001': 'TextEdit', 'ObjectID': 'Range', });
lyr_4123_Densidad_de_poblacin_01_1.set('fieldLabels', {'COLOR': 'hidden field', 'GNA': 'hidden field', 'NAM': 'hidden field', 'SAG': 'hidden field', 'IDJUR': 'hidden field', 'AREAWW': 'hidden field', 'PERIME': 'hidden field', 'IDWWWW': 'hidden field', 'IDUSUA': 'hidden field', 'PCIIND': 'hidden field', 'DEPIND': 'hidden field', 'DEPINN': 'hidden field', 'DEPPBA': 'hidden field', 'DEPPBN': 'hidden field', 'PAISWW': 'hidden field', 'PROVIN': 'hidden field', 'CLASS': 'hidden field', 'NOMDEP': 'hidden field', 'NOMDEN': 'hidden field', 'NAM_1': 'inline label - always visible', 'DEPINN_1': 'hidden field', 'Población': 'hidden field', 'Sup_km2': 'hidden field', 'den2001': 'inline label - always visible', 'ObjectID': 'hidden field', });
lyr_4123_Densidad_de_poblacin_01_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});