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
var format_4123_Densidad_de_poblacin_91_EX_1 = new ol.format.GeoJSON();
var features_4123_Densidad_de_poblacin_91_EX_1 = format_4123_Densidad_de_poblacin_91_EX_1.readFeatures(json_4123_Densidad_de_poblacin_91_EX_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_4123_Densidad_de_poblacin_91_EX_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4123_Densidad_de_poblacin_91_EX_1.addFeatures(features_4123_Densidad_de_poblacin_91_EX_1);
var lyr_4123_Densidad_de_poblacin_91_EX_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_4123_Densidad_de_poblacin_91_EX_1, 
                style: style_4123_Densidad_de_poblacin_91_EX_1,
                popuplayertitle: "4123_ Densidad_de_población_91_EX",
                interactive: true,
    title: '4123_ Densidad_de_población_91_EX<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_91_EX_1_0.png" /> 14 - 96<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_91_EX_1_1.png" /> 96 - 523<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_91_EX_1_2.png" /> 523 - 1879<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_91_EX_1_3.png" /> 1879 - 6238<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_91_EX_1_4.png" /> 6238 - 14827<br />'
        });

lyr_GoogleSatellite_0.setVisible(true);lyr_4123_Densidad_de_poblacin_91_EX_1.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_4123_Densidad_de_poblacin_91_EX_1];
lyr_4123_Densidad_de_poblacin_91_EX_1.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'NOMBRE': 'NOMBRE', 'COUNT': 'COUNT', 'SUM_AREA': 'SUM_AREA', 'DENAMBA': 'DENAMBA', 'IDINDEC': 'IDINDEC', 'Class': 'Class', 'ID': 'ID', 'IN1': 'IN1', 'PROV': 'PROV', 'PAIS': 'PAIS', 'AMBA': 'AMBA', 'NOMPART': 'NOMPART', 'CODCIM': 'CODCIM', 'CODINDEC': 'CODINDEC', 'CODPBA': 'CODPBA', 'REFERENCIA': 'REFERENCIA', 'AREA': 'AREA', 'PERIMETRO': 'PERIMETRO', 'COLOR': 'COLOR', 'GNA': 'GNA', 'NAM': 'NAM', 'FNA': 'FNA', 'SAG': 'SAG', 'Field': 'Field', 'Shape_Leng': 'Shape_Leng', 'Shape_Area': 'Shape_Area', 'IDJUR': 'IDJUR', 'Field1': 'Field1', 'Field2': 'Field2', 'NAM1': 'NAM1', 'NAM_1': 'NAM_1', 'Total': 'Total', 'Varones': 'Varones', 'Mujeres': 'Mujeres', 'Indice_de_': 'Indice_de_', 'Superficie': 'Superficie', 'Densidad_d': 'Densidad_d', 'ObjectID_1': 'ObjectID_1', });
lyr_4123_Densidad_de_poblacin_91_EX_1.set('fieldImages', {'OBJECTID': 'TextEdit', 'NOMBRE': 'TextEdit', 'COUNT': 'TextEdit', 'SUM_AREA': 'TextEdit', 'DENAMBA': 'TextEdit', 'IDINDEC': 'TextEdit', 'Class': 'TextEdit', 'ID': 'TextEdit', 'IN1': 'TextEdit', 'PROV': 'TextEdit', 'PAIS': 'TextEdit', 'AMBA': 'TextEdit', 'NOMPART': 'TextEdit', 'CODCIM': 'TextEdit', 'CODINDEC': 'TextEdit', 'CODPBA': 'TextEdit', 'REFERENCIA': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETRO': 'TextEdit', 'COLOR': 'TextEdit', 'GNA': 'TextEdit', 'NAM': 'TextEdit', 'FNA': 'TextEdit', 'SAG': 'TextEdit', 'Field': 'TextEdit', 'Shape_Leng': 'TextEdit', 'Shape_Area': 'TextEdit', 'IDJUR': 'TextEdit', 'Field1': 'TextEdit', 'Field2': 'TextEdit', 'NAM1': 'TextEdit', 'NAM_1': 'TextEdit', 'Total': 'TextEdit', 'Varones': 'TextEdit', 'Mujeres': 'TextEdit', 'Indice_de_': 'TextEdit', 'Superficie': 'TextEdit', 'Densidad_d': 'TextEdit', 'ObjectID_1': 'Range', });
lyr_4123_Densidad_de_poblacin_91_EX_1.set('fieldLabels', {'OBJECTID': 'hidden field', 'NOMBRE': 'hidden field', 'COUNT': 'hidden field', 'SUM_AREA': 'hidden field', 'DENAMBA': 'hidden field', 'IDINDEC': 'hidden field', 'Class': 'hidden field', 'ID': 'hidden field', 'IN1': 'hidden field', 'PROV': 'hidden field', 'PAIS': 'hidden field', 'AMBA': 'hidden field', 'NOMPART': 'hidden field', 'CODCIM': 'hidden field', 'CODINDEC': 'hidden field', 'CODPBA': 'hidden field', 'REFERENCIA': 'hidden field', 'AREA': 'hidden field', 'PERIMETRO': 'hidden field', 'COLOR': 'hidden field', 'GNA': 'hidden field', 'NAM': 'hidden field', 'FNA': 'hidden field', 'SAG': 'hidden field', 'Field': 'hidden field', 'Shape_Leng': 'hidden field', 'Shape_Area': 'hidden field', 'IDJUR': 'hidden field', 'Field1': 'hidden field', 'Field2': 'hidden field', 'NAM1': 'hidden field', 'NAM_1': 'inline label - always visible', 'Total': 'hidden field', 'Varones': 'hidden field', 'Mujeres': 'hidden field', 'Indice_de_': 'hidden field', 'Superficie': 'hidden field', 'Densidad_d': 'inline label - always visible', 'ObjectID_1': 'hidden field', });
lyr_4123_Densidad_de_poblacin_91_EX_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});