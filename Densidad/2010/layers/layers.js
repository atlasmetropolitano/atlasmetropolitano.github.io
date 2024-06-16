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
var format_4123_Densidad_de_poblacin_10_1 = new ol.format.GeoJSON();
var features_4123_Densidad_de_poblacin_10_1 = format_4123_Densidad_de_poblacin_10_1.readFeatures(json_4123_Densidad_de_poblacin_10_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_4123_Densidad_de_poblacin_10_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4123_Densidad_de_poblacin_10_1.addFeatures(features_4123_Densidad_de_poblacin_10_1);
var lyr_4123_Densidad_de_poblacin_10_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_4123_Densidad_de_poblacin_10_1, 
                style: style_4123_Densidad_de_poblacin_10_1,
                popuplayertitle: "4123_ Densidad_de_población_10",
                interactive: true,
    title: '4123_ Densidad_de_población_10<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_10_1_0.png" /> 0 - 130<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_10_1_1.png" /> 130 - 718<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_10_1_2.png" /> 718 - 3236<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_10_1_3.png" /> 3236 - 5797<br />\
    <img src="styles/legend/4123_Densidad_de_poblacin_10_1_4.png" /> 5797 - 14237<br />'
        });

lyr_GoogleSatellite_0.setVisible(true);lyr_4123_Densidad_de_poblacin_10_1.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_4123_Densidad_de_poblacin_10_1];
lyr_4123_Densidad_de_poblacin_10_1.set('fieldAliases', {'ID': 'ID', 'IN1': 'IN1', 'PROV': 'PROV', 'PAIS': 'PAIS', 'AMBA': 'AMBA', 'NOMPART': 'NOMPART', 'CODCIM': 'CODCIM', 'CODINDEC': 'CODINDEC', 'CODPBA': 'CODPBA', 'REFERENCIA': 'REFERENCIA', 'AREA': 'AREA', 'PERIMETRO': 'PERIMETRO', 'COLOR': 'COLOR', 'GNA': 'GNA', 'NAM': 'NAM', 'Area23': 'Area23', 'FNA': 'FNA', 'SAG': 'SAG', 'Field': 'Field', 'IDJUR': 'IDJUR', 'F1': 'F1', 'NOMPART_1': 'NOMPART_1', 'codindec_1': 'codindec_1', 'MPVPOVAR': 'MPVPOVAR', 'MPVPOMUJ': 'MPVPOMUJ', 'POBTOTAL': 'POBTOTAL', 'Area_Km2': 'Area_Km2', 'den_2010': 'den_2010', 'ObjectID': 'ObjectID', });
lyr_4123_Densidad_de_poblacin_10_1.set('fieldImages', {'ID': 'TextEdit', 'IN1': 'TextEdit', 'PROV': 'TextEdit', 'PAIS': 'TextEdit', 'AMBA': 'TextEdit', 'NOMPART': 'TextEdit', 'CODCIM': 'TextEdit', 'CODINDEC': 'TextEdit', 'CODPBA': 'TextEdit', 'REFERENCIA': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETRO': 'TextEdit', 'COLOR': 'TextEdit', 'GNA': 'TextEdit', 'NAM': 'TextEdit', 'Area23': 'TextEdit', 'FNA': 'TextEdit', 'SAG': 'TextEdit', 'Field': 'TextEdit', 'IDJUR': 'TextEdit', 'F1': 'TextEdit', 'NOMPART_1': 'TextEdit', 'codindec_1': 'TextEdit', 'MPVPOVAR': 'TextEdit', 'MPVPOMUJ': 'TextEdit', 'POBTOTAL': 'TextEdit', 'Area_Km2': 'TextEdit', 'den_2010': 'TextEdit', 'ObjectID': 'Range', });
lyr_4123_Densidad_de_poblacin_10_1.set('fieldLabels', {'ID': 'hidden field', 'IN1': 'hidden field', 'PROV': 'hidden field', 'PAIS': 'hidden field', 'AMBA': 'hidden field', 'NOMPART': 'hidden field', 'CODCIM': 'hidden field', 'CODINDEC': 'hidden field', 'CODPBA': 'hidden field', 'REFERENCIA': 'hidden field', 'AREA': 'hidden field', 'PERIMETRO': 'hidden field', 'COLOR': 'hidden field', 'GNA': 'hidden field', 'NAM': 'inline label - always visible', 'Area23': 'hidden field', 'FNA': 'hidden field', 'SAG': 'hidden field', 'Field': 'hidden field', 'IDJUR': 'hidden field', 'F1': 'hidden field', 'NOMPART_1': 'hidden field', 'codindec_1': 'hidden field', 'MPVPOVAR': 'hidden field', 'MPVPOMUJ': 'hidden field', 'POBTOTAL': 'hidden field', 'Area_Km2': 'hidden field', 'den_2010': 'inline label - always visible', 'ObjectID': 'hidden field', });
lyr_4123_Densidad_de_poblacin_10_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});