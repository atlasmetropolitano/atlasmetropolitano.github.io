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
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_0.png" /> 23 - 158<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_1.png" /> 158 - 869<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_2.png" /> 869 - 3940<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_3.png" /> 3940 - 6593<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_22_1_4.png" /> 6593 - 15154<br />'
        });

lyr_GoogleSatellite_0.setVisible(true);lyr_4123_Densidad_de_poblacin_22_1.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_4123_Densidad_de_poblacin_22_1];
lyr_4123_Densidad_de_poblacin_22_1.set('fieldAliases', {'ID': 'ID', 'IN1': 'IN1', 'PROV': 'PROV', 'PAIS': 'PAIS', 'AMBA': 'AMBA', 'NOMPART': 'NOMPART', 'CODCIM': 'CODCIM', 'CODINDEC': 'CODINDEC', 'CODPBA': 'CODPBA', 'REFERENCIA': 'REFERENCIA', 'AREA': 'AREA', 'PERIMETRO': 'PERIMETRO', 'COLOR': 'COLOR', 'GNA': 'GNA', 'NAM': 'NAM', 'FNA': 'FNA', 'SAG': 'SAG', 'Field': 'Field', 'Area23': 'Area23', 'NAM_1': 'NAM_1', 'POBTOTAL': 'POBTOTAL', 'ObjectID': 'ObjectID', 'densidad22': 'densidad22', });
lyr_4123_Densidad_de_poblacin_22_1.set('fieldImages', {'ID': 'TextEdit', 'IN1': 'TextEdit', 'PROV': 'TextEdit', 'PAIS': 'TextEdit', 'AMBA': 'TextEdit', 'NOMPART': 'TextEdit', 'CODCIM': 'TextEdit', 'CODINDEC': 'TextEdit', 'CODPBA': 'TextEdit', 'REFERENCIA': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETRO': 'TextEdit', 'COLOR': 'TextEdit', 'GNA': 'TextEdit', 'NAM': 'TextEdit', 'FNA': 'TextEdit', 'SAG': 'TextEdit', 'Field': 'TextEdit', 'Area23': 'TextEdit', 'NAM_1': 'TextEdit', 'POBTOTAL': 'TextEdit', 'ObjectID': 'Range', 'densidad22': 'TextEdit', });
lyr_4123_Densidad_de_poblacin_22_1.set('fieldLabels', {'ID': 'hidden field', 'IN1': 'hidden field', 'PROV': 'hidden field', 'PAIS': 'hidden field', 'AMBA': 'hidden field', 'NOMPART': 'hidden field', 'CODCIM': 'hidden field', 'CODINDEC': 'hidden field', 'CODPBA': 'hidden field', 'REFERENCIA': 'hidden field', 'AREA': 'hidden field', 'PERIMETRO': 'hidden field', 'COLOR': 'hidden field', 'GNA': 'hidden field', 'NAM': 'hidden field', 'FNA': 'hidden field', 'SAG': 'hidden field', 'Field': 'hidden field', 'Area23': 'hidden field', 'NAM_1': 'inline label - always visible', 'POBTOTAL': 'hidden field', 'ObjectID': 'hidden field', 'densidad22': 'inline label - always visible', });
lyr_4123_Densidad_de_poblacin_22_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});