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
var format_4122_Variacin_porcentual_2001_2010_1 = new ol.format.GeoJSON();
var features_4122_Variacin_porcentual_2001_2010_1 = format_4122_Variacin_porcentual_2001_2010_1.readFeatures(json_4122_Variacin_porcentual_2001_2010_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_4122_Variacin_porcentual_2001_2010_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4122_Variacin_porcentual_2001_2010_1.addFeatures(features_4122_Variacin_porcentual_2001_2010_1);
var lyr_4122_Variacin_porcentual_2001_2010_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_4122_Variacin_porcentual_2001_2010_1, 
                style: style_4122_Variacin_porcentual_2001_2010_1,
                popuplayertitle: "4122_Variación_porcentual_2001_2010",
                interactive: true,
    title: '4122_Variación_porcentual_2001_2010<br />\
    <img src="styles/legend/4122_Variacin_porcentual_2001_2010_1_0.png" /> -78,4 - 4,1<br />\
    <img src="styles/legend/4122_Variacin_porcentual_2001_2010_1_1.png" /> 4,1 - 10,3<br />\
    <img src="styles/legend/4122_Variacin_porcentual_2001_2010_1_2.png" /> 10,3 - 13,6<br />\
    <img src="styles/legend/4122_Variacin_porcentual_2001_2010_1_3.png" /> 13,6 - 23,4<br />\
    <img src="styles/legend/4122_Variacin_porcentual_2001_2010_1_4.png" /> 23,4 - 3136,2<br />'
        });

lyr_googlesastellite_0.setVisible(true);lyr_4122_Variacin_porcentual_2001_2010_1.setVisible(true);
var layersList = [lyr_googlesastellite_0,lyr_4122_Variacin_porcentual_2001_2010_1];
lyr_4122_Variacin_porcentual_2001_2010_1.set('fieldAliases', {'ID': 'ID', 'IN1': 'IN1', 'PROV': 'PROV', 'PAIS': 'PAIS', 'AMBA': 'AMBA', 'NOMPART': 'NOMPART', 'CODCIM': 'CODCIM', 'CODINDEC': 'CODINDEC', 'CODPBA': 'CODPBA', 'REFERENCIA': 'REFERENCIA', 'AREA': 'AREA', 'PERIMETRO': 'PERIMETRO', 'COLOR': 'COLOR', 'GNA': 'GNA', 'NAM': 'NAM', 'FNA': 'FNA', 'SAG': 'SAG', 'Field': 'Field', 'Area23': 'Area23', 'NAM_1': 'NAM_1', 'Area23_1': 'Area23_1', 'pobla91': 'pobla91', 'pobla01': 'pobla01', 'pobla10': 'pobla10', 'pobla22': 'pobla22', 'Area_Km2': 'Area_Km2', 'densidad20': 'densidad20', 'densidad_1': 'densidad_1', 'densidad_2': 'densidad_2', 'densidad19': 'densidad19', 'vp0110': 'vp0110', 'vp1022': 'vp1022', 'vp0122': 'vp0122', 'ObjectID': 'ObjectID', });
lyr_4122_Variacin_porcentual_2001_2010_1.set('fieldImages', {'ID': 'TextEdit', 'IN1': 'TextEdit', 'PROV': 'TextEdit', 'PAIS': 'TextEdit', 'AMBA': 'TextEdit', 'NOMPART': 'TextEdit', 'CODCIM': 'TextEdit', 'CODINDEC': 'TextEdit', 'CODPBA': 'TextEdit', 'REFERENCIA': 'TextEdit', 'AREA': 'TextEdit', 'PERIMETRO': 'TextEdit', 'COLOR': 'TextEdit', 'GNA': 'TextEdit', 'NAM': 'TextEdit', 'FNA': 'TextEdit', 'SAG': 'TextEdit', 'Field': 'TextEdit', 'Area23': 'TextEdit', 'NAM_1': 'TextEdit', 'Area23_1': 'TextEdit', 'pobla91': 'TextEdit', 'pobla01': 'TextEdit', 'pobla10': 'TextEdit', 'pobla22': 'TextEdit', 'Area_Km2': 'TextEdit', 'densidad20': 'TextEdit', 'densidad_1': 'TextEdit', 'densidad_2': 'TextEdit', 'densidad19': 'TextEdit', 'vp0110': 'TextEdit', 'vp1022': 'TextEdit', 'vp0122': 'TextEdit', 'ObjectID': 'Range', });
lyr_4122_Variacin_porcentual_2001_2010_1.set('fieldLabels', {'ID': 'hidden field', 'IN1': 'hidden field', 'PROV': 'hidden field', 'PAIS': 'hidden field', 'AMBA': 'hidden field', 'NOMPART': 'hidden field', 'CODCIM': 'hidden field', 'CODINDEC': 'hidden field', 'CODPBA': 'hidden field', 'REFERENCIA': 'hidden field', 'AREA': 'hidden field', 'PERIMETRO': 'hidden field', 'COLOR': 'hidden field', 'GNA': 'hidden field', 'NAM': 'inline label - always visible', 'FNA': 'hidden field', 'SAG': 'hidden field', 'Field': 'hidden field', 'Area23': 'hidden field', 'NAM_1': 'hidden field', 'Area23_1': 'hidden field', 'pobla91': 'hidden field', 'pobla01': 'inline label - always visible', 'pobla10': 'inline label - always visible', 'pobla22': 'hidden field', 'Area_Km2': 'hidden field', 'densidad20': 'hidden field', 'densidad_1': 'hidden field', 'densidad_2': 'hidden field', 'densidad19': 'hidden field', 'vp0110': 'inline label - always visible', 'vp1022': 'hidden field', 'vp0122': 'hidden field', 'ObjectID': 'hidden field', });
lyr_4122_Variacin_porcentual_2001_2010_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});