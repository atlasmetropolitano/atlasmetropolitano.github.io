var wms_layers = [];


        var lyr_googlesastellite_0 = new ol.layer.Tile({
            'title': 'google sastellite',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
            })
        });
var format_4122_Variacin_porcentual_1991_2022_1 = new ol.format.GeoJSON();
var features_4122_Variacin_porcentual_1991_2022_1 = format_4122_Variacin_porcentual_1991_2022_1.readFeatures(json_4122_Variacin_porcentual_1991_2022_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_4122_Variacin_porcentual_1991_2022_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4122_Variacin_porcentual_1991_2022_1.addFeatures(features_4122_Variacin_porcentual_1991_2022_1);
var lyr_4122_Variacin_porcentual_1991_2022_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_4122_Variacin_porcentual_1991_2022_1, 
                style: style_4122_Variacin_porcentual_1991_2022_1,
                popuplayertitle: "4122_Variación_porcentual_1991_2022",
                interactive: true,
    title: '4122_Variación_porcentual_1991_2022<br />\
    <img src="styles/legend/4122_Variacin_porcentual_1991_2022_1_0.png" /> -2 - 11<br />\
    <img src="styles/legend/4122_Variacin_porcentual_1991_2022_1_1.png" /> 11 - 36<br />\
    <img src="styles/legend/4122_Variacin_porcentual_1991_2022_1_2.png" /> 36 - 60<br />\
    <img src="styles/legend/4122_Variacin_porcentual_1991_2022_1_3.png" /> 60 - 100<br />\
    <img src="styles/legend/4122_Variacin_porcentual_1991_2022_1_4.png" /> 100 - 195<br />'
        });

lyr_googlesastellite_0.setVisible(true);lyr_4122_Variacin_porcentual_1991_2022_1.setVisible(true);
var layersList = [lyr_googlesastellite_0,lyr_4122_Variacin_porcentual_1991_2022_1];
lyr_4122_Variacin_porcentual_1991_2022_1.set('fieldAliases', {'ID': 'ID', 'IN1': 'IN1', 'PROV': 'PROV', 'PAIS': 'PAIS', 'AMBA': 'AMBA', 'NOMPART': 'NOMPART', 'CODCIM': 'CODCIM', 'CODINDEC': 'CODINDEC', 'CODPBA': 'CODPBA', 'REFERENCIA': 'REFERENCIA', 'AREA': 'AREA', 'PERIMETRO': 'PERIMETRO', 'COLOR': 'COLOR', 'GNA': 'GNA', 'NAM': 'NAM', 'FNA': 'FNA', 'SAG': 'SAG', 'Field': 'Field', 'Area23': 'Area23', 'IDJUR': 'IDJUR', 'Partido': 'Partido', 'P1991': 'P1991', 'P2022': 'P2022', 'Variación': 'Variación', 'ObjectID': 'ObjectID', });
lyr_4122_Variacin_porcentual_1991_2022_1.set('fieldImages', {'ID': 'TextEdit', 'IN1': 'TextEdit', 'PROV': 'TextEdit', 'PAIS': 'TextEdit', 'AMBA': 'TextEdit', 'NOMPART': 'TextEdit', 'CODCIM': 'TextEdit', 'CODINDEC': 'TextEdit', 'CODPBA': 'TextEdit', 'REFERENCIA': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETRO': 'TextEdit', 'COLOR': 'TextEdit', 'GNA': 'TextEdit', 'NAM': 'TextEdit', 'FNA': 'TextEdit', 'SAG': 'TextEdit', 'Field': 'TextEdit', 'Area23': 'TextEdit', 'IDJUR': 'TextEdit', 'Partido': 'TextEdit', 'P1991': 'TextEdit', 'P2022': 'TextEdit', 'Variación': 'TextEdit', 'ObjectID': 'Range', });
lyr_4122_Variacin_porcentual_1991_2022_1.set('fieldLabels', {'ID': 'hidden field', 'IN1': 'hidden field', 'PROV': 'hidden field', 'PAIS': 'hidden field', 'AMBA': 'hidden field', 'NOMPART': 'hidden field', 'CODCIM': 'hidden field', 'CODINDEC': 'hidden field', 'CODPBA': 'hidden field', 'REFERENCIA': 'hidden field', 'AREA': 'hidden field', 'PERIMETRO': 'hidden field', 'COLOR': 'hidden field', 'GNA': 'hidden field', 'NAM': 'hidden field', 'FNA': 'hidden field', 'SAG': 'hidden field', 'Field': 'hidden field', 'Area23': 'hidden field', 'IDJUR': 'hidden field', 'Partido': 'inline label - always visible', 'P1991': 'inline label - always visible', 'P2022': 'inline label - always visible', 'Variación': 'inline label - always visible', 'ObjectID': 'hidden field', });
lyr_4122_Variacin_porcentual_1991_2022_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});