var script_version_info = "Leaf-An version 1.6.08.20240222";
var script_author_info  = "by SATO Takanori, 2007-2024";

var data_file = "gomaan.txt";
var data_dir = "";
var use_jquery_colorbox = true;  // jQuery Colorbox を使用する場合は htmlファイルで組み込みが必要

var center_lat = 36.0;
var center_lng = 136.5;
var map_zoom = 4;
var map_type_preset = "OSM";
var zoom_max = 18;
var zoom_min = 0;
var map_type_options_preset = [
	"GSIstd",
	"GSIphoto",
	"OSM"
];
var info_window_max_width = 400;
var use_search_box = false;
var use_link_url = false;
var use_geolocation = false;
var followCurrentLocation = false;
var current_position_image_file = "position.png";
var sideBarVisibility = true;
var iconSideBar_right_close = "arrow_lc.png";
var iconSideBar_right_open = "arrow_lo.png";
var iconSideBar_bottom_close = "arrow_pc.png";
var iconSideBar_bottom_open = "arrow_po.png";
var opening_message = "";
var opening_message_lat = ""; var opening_message_lng = "";
var description = "<p style=\"margin:0.5em 0em; font-size:100%; line-height:125%; text-align:justify; text-justify:inter-ideograph;\">"
	+ "地図中に表示されたマーカー等をクリックすると、その場所についての情報を見ることができます。"
	+ "</p>";
var visibility_marker = true;
var cache_refresh = false;
var description4system0 = "";
var description4system = "";

var default_url = "";
var map = null;
var map_type_id = null;
var useMapNote = {};
var useMapLegend = {};
var markers = [];
var infoFolderNum = 0;
var layerNum = 0;
var layerName = [];
var layerVisibility = [];
var jsonLayers = [];
var jsonLayerNum = 0;
var jsonLayerName = [];
var jsonLayerVisibility = [];
var customLayerNum = 0;
var customLayerNote1 = "";
var customLayerNote2 = "";
var baseLayerIdsArray = []; // Leaflet専用
var currentBaseLayer = null; // Leaflet専用
var initialBaseLayer = null; // Leaflet専用
var baseLayer = []; // Leaflet専用
var baseLayerName = []; // Leaflet専用
var controlLayers = null; // Leaflet専用
var baseLayersArray = []; // Leaflet専用
var layout_type = 0;
var url_arg_data = "";
var url_arg_file = "";
var positionMarker = null;
var positionCircle = null;
var elementCheckboxGeolocation = null;
var elementCheckboxGeolocationFollow = null;
var geolocationWatchId = null;
var searchQuery = "";
var searchPref = "";
var searchResult = [];
var searchIndex = 0;
var searchPopup = null;
var searchKeepQuery = false;

// Leaflet.Spriteの有無を判定（使用する場合は htmlファイルで組み込みが必要）
var use_leaflet_sprite = true;
if (typeof L.spriteIcon === "undefined") {
	var use_leaflet_sprite = false;
}

// 外部ファイルによる地図タイル定義の拡張の有無を判定
if (typeof use_ext_tile === "undefined") {
	var use_ext_tile = false;
}

function setColorbox() {
	if (use_jquery_colorbox == true) {
		$("a.lightbox").colorbox({opacity:0.7, maxWidth:'100%', maxHeight:'100%'}); // jQuery Colorbox のセット
	}
}

function mapTypeIdFromNameWord(word) {
	var id = null;
	switch ( word.toLowerCase() ) {
		case "roadmap":
		case "road map":
		case "m":
			id = "OSM"; // GoogleROADMAPの代替
			break;
		case "terrain":
		case "p":
			id = "OSM"; // GoogleTERRAINの代替
			break;
		case "satellite":
		case "k":
			id = "GSIphoto"; // GoogleSATELLITEの代替
			break;
		case "hybrid":
		case "h":
			id = "GSIphoto";
//			id = "GSIphotoName"; // GoogleHYBRIDの代替
			break;
		case "gsistd":
		case "std":
		case "gsi":
		case "gsimap":
			id = "GSIstd";
			break;
		case "gsipale":
		case "pale":
			id = "GSIpale";
			break;
		case "gsienglish":
		case "english":
			id = "GSIenglish";
			break;
		case "gsirelief":
		case "relief":
			id = "GSIrelief";
			break;
		case "gsihillshade":
		case "hillshademap":
		case "hillshade":
		case "shade":
			id = "GSIhillshade";
			break;
		case "gsiblank":
		case "blank":
			id = "GSIblank";
			break;
		case "gsiphoto":
		case "gsiseamlessphoto":
		case "photo":
		case "seamlessphoto":
			id = "GSIphoto";
			break;
		case "gsiort":
		case "ort":
			id = "GSIort";
			break;
		case "gsigazo1":
		case "gazo1":
		case "nlii1":
			id = "GSIgazo1";
			break;
		case "gsigazo2":
		case "gazo2":
		case "nlii2":
			id = "GSIgazo2";
			break;
		case "gsigazo3":
		case "gazo3":
		case "nlii3":
			id = "GSIgazo3";
			break;
		case "gsigazo4":
		case "gazo4":
		case "nlii4":
			id = "GSIgazo4";
			break;
		case "gsiortold10":
		case "ort_old10":
		case "ortold10":
			id = "GSIortOld10";
			break;
		case "gsiortusa10":
		case "ort_usa10":
		case "ortusa10":
			id = "GSIortUSA10";
			break;
		case "gsitoho1":
		case "toho1":
		case "tohoku1":
			id = "GSItoho1";
			break;
		case "gsitoho2":
		case "toho2":
		case "tohoku2":
			id = "GSItoho2";
			break;
		case "osm":
		case "openstreetmap":
		case "open street map":
			id = "OSM";
			break;
		case "coordinate":
		case "coord":
		case "xyz":
			id = "Coordinate";
			break;
		case "coordinatesw":
		case "coordsw":
		case "xyz2":
			id = "CoordinateSw";
			break;
		case "white":
			id = "White";
			break;
	}
	if (use_ext_tile == true) {
		var id_ext_tile = extMapTypeIdFromNameWord(word);
		if (id_ext_tile != null) {
			id = id_ext_tile;
		}
	}
	return id;
}

function mapSourceNote(argMapTypeId, argMapTypeIdsArray) {
	var grossMapTypeIdsArray = [];
	if (argMapTypeId != null) {
		grossMapTypeIdsArray = [argMapTypeId];
	}
	if (argMapTypeIdsArray instanceof Array){
		for (var i = 0; i < argMapTypeIdsArray.length; i++) {
			grossMapTypeIdsArray.push(argMapTypeIdsArray[i]);
		}
	}
	useMapNote['GSI'] = false;
	useMapNote['GSI5M'] = false;
	useMapNote['GSI5M_j'] = false;
	useMapNote['GSI5M_e'] = false;
	useMapNote['GSI_VMAP0'] = false;
	useMapNote['GSIrelief'] = false;
	useMapNote['GSIsat'] = false;
	useMapNote['GSIphotoScale'] = false;
	useMapNote['GSIphotoYear'] = false;
	useMapNote['OSM'] = false;
	useMapLegend['GSIstd'] = false;
	useMapLegend['GSIpale'] = false;
	useMapLegend['GSIenglish'] = false;
	if (use_ext_tile == true) {
		extMapSourceNoteProcess1();
	}
	for (var i = 0; i < grossMapTypeIdsArray.length; i++) {
		switch ( grossMapTypeIdsArray[i] ) {
			case "GSIstd":
				useMapNote['GSI'] = true;
				useMapNote['GSI5M'] = true; useMapNote['GSI5M_j'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapLegend['GSIstd'] = true;
				break;
			case "GSIpale":
				useMapNote['GSI'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapLegend['GSIpale'] = true;
				break;
			case "GSIenglish":
				useMapNote['GSI'] = true;
				useMapNote['GSI5M'] = true; useMapNote['GSI5M_e'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapLegend['GSIenglish'] = true;
				break;
			case "GSIrelief":
				useMapNote['GSI'] = true; useMapNote['GSIrelief'] = true;
				break;
			case "GSIhillshade":
				useMapNote['GSI'] = true;
				break;
			case "GSIblank":
				useMapNote['GSI'] = true; useMapNote['GSI_VMAP0'] = true;
				break;
			case "GSIphoto":
				useMapNote['GSI'] = true; useMapNote['GSIsat'] = true;
				break;
			case "GSIort":
				useMapNote['GSI'] = true;
				useMapNote['GSI5M'] = true; useMapNote['GSI5M_j'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapNote['GSIphotoScale'] = true;
				break;
			case "GSIgazo1":
			case "GSIgazo2":
			case "GSIgazo3":
			case "GSIgazo4":
			case "GSIortOld10":
			case "GSIortUSA10":
				useMapNote['GSI'] = true; 
				useMapNote['GSI5M'] = true; useMapNote['GSI5M_j'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapNote['GSIphotoScale'] = true; useMapNote['GSIphotoYear'] = true;
				break;
			case "GSItoho1":
			case "GSItoho2":
				useMapNote['GSI'] = true;
				break;
			case "Coordinate":
			case "CoordinateSw":
				useMapNote['GSI'] = true;
				useMapNote['GSI5M'] = true; useMapNote['GSI5M_j'] = true; useMapNote['GSI_VMAP0'] = true;
				break;
			case "OSM":
				useMapNote['OSM'] = true;
				break;
			default:
				if (use_ext_tile == true) {
					extMapSourceNoteProcess2( grossMapTypeIdsArray[i] );
				}
				break;
		}
	}
	var mapNoteText = "";
	mapNoteText += customLayerNote1 + "<br />";
	if ( (useMapLegend['GSIstd'] == true)||(useMapLegend['GSIpale'] == true) ) {
		mapNoteText += "凡例： ";
	}
	if (useMapLegend['GSIstd'] == true) {
		mapNoteText += "地理院地図 ズームレベル <a href=\"//cyberjapandata.gsi.go.jp/legend/globalmaphyoko-legend.pdf\" target=\"_blank\">0-4</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/5000000-legend.pdf\" target=\"_blank\">5-8</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/std1000000_legend.pdf\" target=\"_blank\">9-11</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/std_200000_legend.pdf\" target=\"_blank\">12-14</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/std_25000_legend.pdf\" target=\"_blank\">15-17</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/std_2500_legend.pdf\" target=\"_blank\">18</a>";
	}
	if (useMapLegend['GSIpale'] == true) {
		if (useMapLegend['GSIstd'] == true) {
			mapNoteText += " / ";
		}
		mapNoteText += "地理院淡色地図 ズームレベル <a href=\"//cyberjapandata.gsi.go.jp/legend/pale_5000000_legend.pdf\" target=\"_blank\">5-8</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/pale_1000000_legend.pdf\" target=\"_blank\">9-11</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/pale_200000_legend.pdf\" target=\"_blank\">12-14</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/pale_25000_legend.pdf\" target=\"_blank\">15-17</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/pale_2500_legend.pdf\" target=\"_blank\">18</a>";
	}
	if ( (useMapLegend['GSIstd'] == true)||(useMapLegend['GSIpale'] == true) ) {
		mapNoteText += "<br /><br />";
	}
	if (useMapLegend['GSIenglish'] == true) {
		mapNoteText += "Legend: GSI Maps (English) zoom level <a href=\"//cyberjapandata.gsi.go.jp/legend/english_5000000_legend.pdf\" target=\"_blank\">5-8</a>, <a href=\"//cyberjapandata.gsi.go.jp/legend/hyoujyun1000000e_legend.pdf\" target=\"_blank\">9-11</a><br /><br />";
	}
	if (use_ext_tile == true) {
		mapNoteText += extMapSourceNoteProcess3();
	}
	if (useMapNote['GSIphotoScale'] == true) {
		mapNoteText += "国土地理院の空中写真のうち一部のもの（過去の写真など）は一定の縮尺以上に拡大しないと表示されません。 また，画像の整備地域が限られているため，表示されない地域もあります。 空中写真の代わりに地図が色に染まって表示される場合はズームレベルを上げる（拡大する）と空中写真が表示されます。 色に染まっていない普通の地図が表示される場合はその地域の空中写真はありません。<br /><br />";
	}
	if (useMapNote['GSIphotoYear'] == true) {
		mapNoteText += "地図切り替えメニューに空中写真の種類として表示されている数字（年）は，空中写真が撮影された大まかな時期を表しています。（５年程度の期間内に撮影された空中写真をつなぎ合わせています。）　正確な撮影年を示すものではありませんので，ご注意ください。<br /><br />";
	}
	if (use_ext_tile == true) {
		mapNoteText += extMapSourceNoteProcess4();
	}
	mapNoteText += customLayerNote2 + "<br />";
	if (useMapNote['GSI'] == true) {
		mapNoteText += "このウェブサイトでは国土地理院の提供する<a href=\"//maps.gsi.go.jp/development/ichiran.html\" target=\"_blank\">「地理院タイル」</a>を使用しています。 ご利用に当たっては<a href=\"https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html\" target=\"_blank\">地理院コンテンツ利用規約</a>をご覧ください。 "; // +"<br />";
		mapNoteText += "<a href=\"//maps.gsi.go.jp/development/ichiran.html\" target=\"_blank\">地図の種類</a>によっては基本測量成果に該当するものがあります。 基本測量成果に該当する地図を使用（複製等）する場合には<a href=\"https://www.gsi.go.jp/LAW/2930-index.html\" target=\"_blank\">国土地理院の地図の利用手続</a>をご覧ください。<br />";
	}
	if (useMapNote['GSI5M'] == true) {
		mapNoteText += "The bathymetric contours are derived from those contained within the GEBCO Digital Atlas, published by the BODC on behalf of IOC and IHO (2003) (<a href=\"https://www.gebco.net\" target=\"_blank\">https://www.gebco.net</a>).<br />";
		mapNoteText += "海上保安庁許可 第292502号 （水路業務法第25条に基づく類似刊行物）<br />";
	}
//	if (useMapNote['GSI5M_j'] == true) {
//		mapNoteText += "海上保安庁許可 第292502号 （水路業務法第25条に基づく類似刊行物）<br />";
//	}
//	if (useMapNote['GSI5M_e'] == true) {
//		mapNoteText += "海上保安庁許可 第292502号 （水路業務法第25条に基づく類似刊行物）<br />";
//	}
	if (useMapNote['GSI_VMAP0'] == true) {
		mapNoteText += "Shoreline data is derived from: United States. National Imagery and Mapping Agency. &quot;Vector Map Level 0 (VMAP0).&quot; Bethesda, MD: Denver, CO: The Agency; USGS Information Services, 1997.<br />";
	}
	if (useMapNote['GSIrelief'] == true) {
		mapNoteText += "段彩陰影図の海域部は海上保安庁海洋情報部の資料を使用して作成。<br />";
	}
	if (useMapNote['GSIsat'] == true) {
		mapNoteText += "データソース：Landsat8画像(GSI,TSIC,GEO Grid/AIST), Landsat8画像(courtesy of the U.S. Geological Survey),  海底地形(GEBCO)<br />";
		mapNoteText += "Images on this map obtained from site <a href=\"https://lpdaac.usgs.gov/data_access\" target=\"_blank\">https://lpdaac.usgs.gov/data_access</a> maintained by the NASA Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth Resources Observation and Science (EROS) Center, Sioux Falls, South Dakota.<br />";
	}
	if (useMapNote['OSM'] == true) {
		mapNoteText += "このウェブサイトでは OpenStreetMap を使用しています。 &copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors<br />";
	}
	if (use_ext_tile == true) {
		mapNoteText += extMapSourceNoteProcess5();
	}
	return mapNoteText;
}

function createTileLayer(argZoom1, argZoom2, argTms, argLayerName, argAttr, argUrl) {
	var zoom1 = null; var zoom1extension = 0;
	var zoom2 = null; var zoom2extension = 0;
	zoom1 = parseInt(argZoom1, 10);
	if (isNaN(zoom1)) {
		zoom1 = 0;
	} else {
		if ( zoom1 < 0 ) {
			zoom1 = 0;
		} else if (zoom1 > 18) {
			zoom1 = 18;
		}
	}
	if ((argZoom1.substr(-1) == "+") || (argZoom1.substr(-1) == "-")) {
		zoom1extension = 1;
		if ((argZoom1.substr(-2) == "++") || (argZoom1.substr(-2) == "--")) {
			zoom1extension = 2;
		}
	}
	zoom2 = parseInt(argZoom2, 10);
	if (isNaN(zoom2)) {
		zoom2 = 0;
	} else {
		if ( zoom2 < 0 ) {
			zoom2 = 0;
		} else if (zoom2 > 18) {
			zoom2 = 18;
		}
	}
	if ((argZoom2.substr(-1) == "+") || (argZoom2.substr(-1) == "-")) {
		zoom2extension = 1;
		if ((argZoom2.substr(-2) == "++") || (argZoom2.substr(-2) == "--")) {
			zoom2extension = 2;
		}
	}
	var tileMinZoom = 0; var tileMaxZoom = 18;
	if (zoom1 < zoom2) {
		tileMinZoom = zoom1; tileMaxZoom = zoom2;
		tileMinZoomExtension = zoom1extension; tileMaxZoomExtension = zoom2extension;
	} else {
		tileMinZoom = zoom2; tileMaxZoom = zoom1;
		tileMinZoomExtension = zoom2extension; tileMaxZoomExtension = zoom1extension;
	}
	if (tileMaxZoom < 3) {
		tileMaxZoom = 18; tileMaxZoomExtension = 0;
	}
	var tileMinNativeZoom = tileMinZoom;
	if ( (tileMinZoomExtension > 0) && (tileMinZoom > 0) ) {
		if ( (tileMinZoomExtension > 1) && (tileMinZoom > 1) ) {
			// tileMinZoom -= 2;
			tileMinZoom -= 1;
		} else {
			tileMinZoom -= 1;
		}
	}
	var tileMaxNativeZoom = tileMaxZoom;
	if (tileMaxZoomExtension > 0) {
		if (tileMaxZoomExtension > 1) {
			tileMaxZoom += 2;
		} else {
			tileMaxZoom += 1;
		}
	}
	var tileTms = false;
	if ( (argTms.toLowerCase() == "tms") || (argTms.toLowerCase() == "sw") ) {
		tileTms = true;
	}
	var tileLayerName = "";
	if ( !(argLayerName.match(/^\s*$/)) ) {
		tileLayerName = argLayerName;
	}
	var tileAttr = "";
	if ( !(argAttr.match(/^\s*$/)) ) {
		tileAttr = argAttr;
	}
	var tileUrl = "";
	if ( !(argUrl.match(/^\s*$/)) ) {
		tileUrl = argUrl;
	}
	var tileLayerId = "";
	if (tileUrl != "") {
		customLayerNum += 1;
		tileLayerId = "Tile" + customLayerNum;
		if (tileLayerName == "") {
			tileLayerName = "TileMap " + customLayerNum;
		}
		baseLayerIdsArray.push(tileLayerId);
		baseLayerName[tileLayerId] = tileLayerName;
		var layersArray = [];
		var layerMain = L.tileLayer(tileUrl, {
			tms: tileTms,
			attribution: tileAttr,
			minZoom: tileMinZoom,
			maxZoom: tileMaxZoom,
			minNativeZoom: tileMinNativeZoom,
			maxNativeZoom: tileMaxNativeZoom,
			errorTileUrl: "tile_nodata.gif"
		});
		layersArray.push(layerMain);
		if (tileMinZoom > 0) {
			layersArray.push(L.tileLayer('tile_nodata.gif', {maxZoom: tileMinZoom - 1}));
		}
		if (tileMinZoom < 18) {
			layersArray.push(L.tileLayer('tile_nodata.gif', {minZoom: tileMaxZoom + 1}));
		}
		baseLayer[tileLayerId] = L.layerGroup(layersArray);
	}
	return tileLayerId;
}

function load() {
	// 国土地理院 地理院タイル
	// 地理院タイル 標準地図
	baseLayerIdsArray.push('GSIstd');
	baseLayerName['GSIstd'] = "地理院地図";
	baseLayer['GSIstd'] = L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
		attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
		errorTileUrl: "tile_nodata.gif"
	});
	// 地理院タイル 淡色地図
	baseLayerIdsArray.push('GSIpale');
	baseLayerName['GSIpale'] = "地理院淡色地図";
	baseLayer['GSIpale'] = L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
		attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
		minNativeZoom: 2,
		errorTileUrl: "tile_nodata.gif"
	});
	// 地理院タイル 英語版地図
	baseLayerIdsArray.push('GSIenglish');
	baseLayerName['GSIenglish'] = "GSI Maps (English)";
	baseLayer['GSIenglish'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>GSI Tiles</a>",
			maxZoom: 3,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/english/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>GSI Tiles</a>",
			minZoom: 4,
			maxZoom: 11,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>GSI Tiles</a>",
			minZoom: 12,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 色別標高図
	baseLayerIdsArray.push('GSIrelief');
	baseLayerName['GSIrelief'] = "段彩陰影";
	baseLayer['GSIrelief'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 4,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxNativeZoom: 15,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 陰影起伏図
	baseLayerIdsArray.push('GSIhillshade');
	baseLayerName['GSIhillshade'] = "陰影起伏";
	baseLayer['GSIhillshade'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/earthhillshade/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 4,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxNativeZoom: 15,
			errorTileUrl: "tile_white.gif"
		})
	]);
	// 地理院タイル 白地図
	baseLayerIdsArray.push('GSIblank');
	baseLayerName['GSIblank'] = "白地図";
	baseLayer['GSIblank'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 4,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			maxZoom: 18,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 写真（シームレス空中写真）
	baseLayerIdsArray.push('GSIphoto');
	baseLayerName['GSIphoto'] = "地理院写真";
	baseLayer['GSIphoto'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 1,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 電子国土基本図（オルソ画像）＋衛星画像
	baseLayerIdsArray.push('GSIort');
	baseLayerName['GSIort'] = "地理院オルソ";
	baseLayer['GSIort'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 13,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/photoarea/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 13
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 国土画像情報（第１期）
	baseLayerIdsArray.push('GSIgazo1');
	baseLayerName['GSIgazo1'] = "空中写真 [1975年頃]";
	baseLayer['GSIgazo1'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 9,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo1area/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 9
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo1/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			maxNativeZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 国土画像情報（第２期）
	baseLayerIdsArray.push('GSIgazo2');
	baseLayerName['GSIgazo2'] = "空中写真 [1980年頃]";
	baseLayer['GSIgazo2'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo2area/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 9
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			maxNativeZoom: 14
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo2/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			maxNativeZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 国土画像情報（第３期）
	baseLayerIdsArray.push('GSIgazo3');
	baseLayerName['GSIgazo3'] = "空中写真 [1985年頃]";
	baseLayer['GSIgazo3'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo3area/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 9
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			maxNativeZoom: 14
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo3/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			maxNativeZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 国土画像情報（第４期）
	baseLayerIdsArray.push('GSIgazo4');
	baseLayerName['GSIgazo4'] = "空中写真 [1990年頃]";
	baseLayer['GSIgazo4'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo4area/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 9
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			maxNativeZoom: 14
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/gazo4/{z}/{x}/{y}.jpg', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			maxNativeZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 空中写真（1961～1969年）
	baseLayerIdsArray.push('GSIortOld10');
	baseLayerName['GSIortOld10'] = "空中写真 [1963年頃]";
	baseLayer['GSIortOld10'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 14
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/ort_old10/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			maxNativeZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 空中写真（1945～1950年）
	baseLayerIdsArray.push('GSIortUSA10');
	baseLayerName['GSIortUSA10'] = "空中写真 [1947年頃]";
	baseLayer['GSIortUSA10'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxZoom: 14
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/ort_USA10/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			maxNativeZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 国土地理院 地理院タイル【災害対応等】
	// 地理院タイル 東日本大震災被災地オルソ画像（震災直後）
	baseLayerIdsArray.push('GSItoho1');
	baseLayerName['GSItoho1'] = "東日本写真(震災直後)";
	baseLayer['GSItoho1'] = L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/toho1/{z}/{x}/{y}.jpg', {
		attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
		maxNativeZoom: 17,
		errorTileUrl: "tile_nodata.gif"
	});
	// 地理院タイル 東日本大震災被災地オルソ画像（震災後）
	baseLayerIdsArray.push('GSItoho2');
	baseLayerName['GSItoho2'] = "東日本写真(震災後)";
	baseLayer['GSItoho2'] = L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/toho2/{z}/{x}/{y}.jpg', {
		attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
		errorTileUrl: "tile_nodata.gif"
	});
	// OpenStreetMap
	baseLayerIdsArray.push('OSM');
	baseLayerName['OSM'] = "OpenStreetMap";
	baseLayer['OSM'] = L.tileLayer('//tile.openstreetmap.org/{z}/{x}/{y}.png', {
//	baseLayer['OSM'] = L.tileLayer('//tile.openstreetmap.jp/{z}/{x}/{y}.png', {
		attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
		// maxZoom: 18,
		errorTileUrl: "tile_nodata.gif"
	});
	// その他
	// タイル座標表示 原点：北西 (Google Maps API)
	baseLayerIdsArray.push('Coordinate');
	baseLayerName['Coordinate'] = "タイル座標";
	var tileLayerCanvasCoordinate = new L.GridLayer();
	tileLayerCanvasCoordinate.createTile = function(tileCoords) {
		var tile = document.createElement('canvas');
		var ctx = tile.getContext('2d');
		tile.width = 256;
		tile.height = 256;
		var tile_x_r = tileCoords.x / Math.pow(2, tileCoords.z);
		var tile_y_r = tileCoords.y / Math.pow(2, tileCoords.z);
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.fillRect(0,0,256,256);
		ctx.strokeStyle = '#aaaaaa';
		ctx.strokeRect(0,0,256,256);
		ctx.fillStyle = '#000000';
		ctx.font = "bold 18px sans-serif";
		ctx.fillText("z=" + tileCoords.z, 5, 20);
		ctx.fillText("x=" + tileCoords.x + " (" + tile_x_r + ")", 5, 44);
		ctx.fillText("y=" + tileCoords.y + " (" + tile_y_r + ")", 5, 68);
		return tile;
	}
	baseLayer['Coordinate'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			errorTileUrl: "tile_nodata.gif"
		}),
		tileLayerCanvasCoordinate
	]);
	// タイル座標表示 原点：南西 (TMS)
	baseLayerIdsArray.push('CoordinateSw');
	baseLayerName['CoordinateSw'] = "タイル座標(TMS)";
	var tileLayerCanvasCoordinateSw = new L.GridLayer();
	tileLayerCanvasCoordinateSw.createTile = function(tileCoords) {
		var tile = document.createElement('canvas');
		var ctx = tile.getContext('2d');
		tile.width = 256;
		tile.height = 256;
		var tile_y = Math.pow(2, tileCoords.z) - tileCoords.y - 1;
		var tile_x_r = tileCoords.x / Math.pow(2, tileCoords.z);
		var tile_y_r = tile_y / Math.pow(2, tileCoords.z);
		ctx.fillStyle = 'rgba(255,255,255,0.5)';
		ctx.fillRect(0,0,256,256);
		ctx.strokeStyle = '#aaaaaa';
		ctx.strokeRect(0,0,256,256);
		ctx.fillStyle = '#000000';
		ctx.font = "bold 18px sans-serif";
		ctx.fillText("z=" + tileCoords.z, 5, 200);
		ctx.fillText("x=" + tileCoords.x + " (" + tile_x_r + ")", 5, 224);
		ctx.fillText("y=" + tile_y + " (" + tile_y_r + ")", 5, 248);
		return tile;
	}
	baseLayer['CoordinateSw'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			errorTileUrl: "tile_nodata.gif"
		}),
		tileLayerCanvasCoordinateSw
	]);
	// 全面白色の地図タイル (背景地図なし)
	baseLayerIdsArray.push('White');
	baseLayerName['White'] = "背景地図なし";
	baseLayer['White'] = L.tileLayer('');
	// 外部ファイルによるタイル地図の設定
	if (use_ext_tile == true) {
		extLayerSet();
	}

//	if (url_arg["file"].match(/^\S+$/)) {
	if (data_file.match(/^[\w\-][\w\-\.]*$/)) {
		if ( data_file.match(/\.$/) ) {  // ファイル名末尾がピリオド
			data_file += "txt";
		}
//		if ( !(data_file.split('/')[data_file.split('/').length - 1].match(/\./)) ) {  // ファイル名に拡張子なし
		if ( !(data_file.match(/\./)) ) {  // ファイル名に拡張子なし
			data_file += ".txt";
		}
		if ( !(data_file.match(/\.txt$/i)) ) {  // ファイル名末尾が .txt 以外
		//	data_file += ".txt";
		}
	} else {
		data_file = "";
	}
	if (data_dir.match(/^\S+$/)) {
		if ( !(data_dir.match(/\/$/)) ) {  // ディレクトリ名末尾がスラッシュ以外
			data_dir += "/";
		}
	} else {
		data_dir = "";
	}
	if (location.href.match(/^\w+\:\/\/\S+$/)) {
		if ( location.href.match(/^\w+\:\/\/.*[^\/][\/]/) ) {
			default_url = location.href.match(/^\w+\:\/\/.*[^\/][\/]/)[0];
		} else {
			default_url = location.href + "/";
		}
	} else {
		default_url = "";
	}
	map_type_id = mapTypeIdFromNameWord(map_type_preset);
	if (map_type_id == null) {
		map_type_id = "OSM";
	}
	getUrlArg(); // URL引数による地点等の指定を可能にする。
	// 地図の初期設定
	initialBaseLayer = baseLayer[map_type_id];
	var map_options = {
		center: [center_lat, center_lng],
		// zoom: map_zoom, // ※動作不良に対する仮の対処
		minZoom: 0,
		maxZoom: 18,
		zoomControl: false,
		layers: [initialBaseLayer]
	};
	map = L.map('map_canvas', map_options);
	map.addControl(new L.Control.Zoom({position: "bottomright"}));
	currentBaseLayer = initialBaseLayer;
	map.on('baselayerchange', function(evtLayer) {
		currentBaseLayer = evtLayer.layer;
	});
	// マップタイプ初期値に基づく地図出典注釈表示（地図外）の初期設定
	if (document.getElementById("map_source")) {
		var mapSourceNoteHtml = mapSourceNote(map_type_id);
		if (mapSourceNoteHtml != "") {
			document.getElementById("map_source").innerHTML = '<div style=\"margin-bottom:1em\">［地図について］</div>' + mapSourceNoteHtml;
		} else {
			document.getElementById("map_source").innerHTML = '';
		}
	}
	// 画面レイアウトの判定
	if (document.getElementById("description")) {
		if (!(document.getElementById("text_top")) && !(document.getElementById("text_bottom"))) {
			layout_type = 4;
		} else {
			layout_type = 2;
		}
	} else {
		layout_type = 0;
	}
	// 画面レイアウト別に地点属性表示の準備
	if ( (layout_type == 2) || (layout_type == 4) ) {
		map.on('click', function() {
			description_reset();
		});
	}

	var htmlCacheRefresh = "";
	if (data_file.match(/^\S+$/)) {
		var dataUrl = "";
		if (data_file.match(/^\w+\:/) || data_file.match(/^[\/]/)) {
			dataUrl = data_file;
		} else {
			dataUrl = data_dir + data_file;
		}
		downloadText(dataUrl, evaluateData, false);
		//
		var urlForReload = location.pathname + "?" + location.search.substr(1);
		if ( !(urlForReload.match(/cache=refresh$/)) ) {
			if ( !(urlForReload.match(/\?$/)) ) {
				urlForReload += "&";
			}
			urlForReload += "cache=refresh";
		}
		htmlCacheRefresh = "<a href=\"" + urlForReload + "\">データ再読み込み</a> / <a href=\"" + dataUrl + "\">参照</a>";
	}
	if (document.getElementById("cache_refresh")) {
		document.getElementById("cache_refresh").innerHTML = htmlCacheRefresh;
	}
	var htmlVersionInfo = "";
	if (use_ext_tile == true) {
		htmlVersionInfo = script_version_info + ' (' +  script_author_info + ') with ' + ext_tile_script_version_info + ' using Leaflet ' + L.version;
	} else {
		htmlVersionInfo = script_version_info + ' (' +  script_author_info + ') using Leaflet ' + L.version;
	}
	if (document.getElementById("script_version_info")) {
		document.getElementById("script_version_info").innerHTML = htmlVersionInfo;
	}
	if ( layout_type == 4 ) {
		description4system0 += '<div style=\"margin:1em 0em 0em; color:gray; font-size:60%; line-height:120%;\">';
		description4system0 += htmlVersionInfo;
		description4system0 += '<br />' + htmlCacheRefresh;
		description4system0 += '</div>';
		document.getElementById("description").innerHTML = description4system0;
		document.getElementById("description_canvas").scrollTop = 0;
	}
}

function evaluateData(downloadData) {
	markers[0] = [];
	layerName[0] = "";
	if (visibility_marker == true) {
		layerVisibility[0] = true;
	} else {
		layerVisibility[0] = false;
	}
	var textPageHeadTitle = ""; var textPageTopHtml =""; var textPageBottomHtml = "";
	var textPageRightHtml = ""; var textPageFullHtml = "";
	var mapTypeIdsArray = [];
	var zoom_request = null; var zoom_request_2 = null; var zoom_request_3 = null;
	var lat = ""; var lng = ""; var attr = ""; var titl = ""; var html = "";
	var obj_type = ""; var data_hold = false;
	var rowdata = downloadData.split(/[\r\n]+/);
	for (var i = 0 ; i < rowdata.length ; i++) {
	if ( (rowdata[i].length > 0) && !(rowdata[i].match(/^\s*;/)) ) {
		rowdata[i] += "\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
		var coldata = rowdata[i].split('\t',15);
		if ( (coldata[1].toLowerCase() != "continue")
				&& (coldata[1].toLowerCase() != "cont")
				&& (coldata[1].toLowerCase() != "cont.")
				&& (coldata[1].toLowerCase() != "collapse")
				&& (coldata[1].toLowerCase() != "fold") ) {
			if (data_hold == true) {
				addMarker(obj_type, lat, lng, attr, titl, html, layerNum);
				obj_type = ""; lat = ""; lng = ""; attr = ""; titl = ""; html = "";
				data_hold = false;
			}
			switch (coldata[1].toLowerCase()) {
//				case "map":
				case "view":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						center_lat = coldata[2];
						center_lng = coldata[3];
					}
					if ( (coldata[4] != "") && !(isNaN(coldata[4]-0)) ) {
						if (parseInt(coldata[4], 10) >= 0) {
							zoom_request = parseInt(coldata[4], 10);
						}
					}
					if (coldata[5] != "") {
						if (mapTypeIdFromNameWord(coldata[5]) != null) {
							map_type_id = mapTypeIdFromNameWord(coldata[5]);
						}
					}
					break;
				case "zoom":
					obj_type = "zoom";
					zoom_request_2 = null;
					zoom_request_3 = null;
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0)) ) {
						zoom_request_2 = parseInt(coldata[2], 10);
						if ( zoom_request_2 < 0 ) {
							zoom_request_2 = null;
						}
					}
					if ( (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						zoom_request_3 = parseInt(coldata[3], 10);
						if ( zoom_request_3 < 0 ) {
							zoom_request_3 = null;
						}
					}
					break;
				case "maptype":
				case "map type":
					obj_type = "maptype";
					if (coldata[2] != "") {
						if (mapTypeIdFromNameWord(coldata[2]) != null) {
							mapTypeIdsArray.push(mapTypeIdFromNameWord(coldata[2]));
						}
					}
					if (coldata[3] != "") {
						if (mapTypeIdFromNameWord(coldata[3]) != null) {
							mapTypeIdsArray.push(mapTypeIdFromNameWord(coldata[3]));
						}
					}
					break;
				case "tile":
				case "maptile":
				case "map tile":
					obj_type = "tile";
					var customTileLayerId = createTileLayer(coldata[2], coldata[3], coldata[4], coldata[5], coldata[6], coldata[7]);
					if (customTileLayerId != false) {
							mapTypeIdsArray.push(customTileLayerId);
					}
					break;
				case "tilenote":
				case "tile note":
				case "mapnote":
				case "map note":
					switch (coldata[2].toLowerCase()) {
						case "notice":
							obj_type = "tile_note_notice";
							customLayerNote1 += "<div>" + createInfoHtml(4, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]) + "</div>";
							break;
						default:
							obj_type = "tile_note";
							customLayerNote2 += "<div>" + createInfoHtml(4, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]) + "</div>";
							break;
					}
					break;
				case "search":
					if (coldata[2].toLowerCase() == "yes") {
						use_search_box = true;
					} else if (coldata[2].toLowerCase() == "no") {
						use_search_box = false;
					}
					break;
				case "linkurl":
					if (coldata[2].toLowerCase() == "yes") {
						use_link_url = true;
					} else if (coldata[2].toLowerCase() == "no") {
						use_link_url = false;
					}
					break;
				case "location":
				case "geolocation":
				case "gps":
					if ((coldata[2].toLowerCase() == "yes") || (coldata[2].toLowerCase() == "on")) {
						use_geolocation = true;
					} else if ((coldata[2].toLowerCase() == "no") || (coldata[2].toLowerCase() == "off")) {
						use_geolocation = false;
					}
					if ((coldata[3].toLowerCase() == "yes") || (coldata[3].toLowerCase() == "on")) {
						followCurrentLocation = true;
					} else if ((coldata[3].toLowerCase() == "no") || (coldata[3].toLowerCase() == "off")) {
						followCurrentLocation = false;
					}
					break;
				case "side":
				case "sidebar":
					if (coldata[2].toLowerCase() == "yes") {
						sideBarVisibility = true;
					} else if (coldata[2].toLowerCase() == "no") {
						sideBarVisibility = false;
					}
					break;
				case "page":
					if ((coldata[3].toLowerCase() == "") || (coldata[3].toLowerCase() == "leaflet")) {
						switch (coldata[2].toLowerCase()) {
							case "title":
								textPageHeadTitle = coldata[9];
								break;
							case "top":
								obj_type = "page_top";
								textPageTopHtml += createInfoHtml(2, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
								break;
							case "bottom":
								obj_type = "page_bottom";
								textPageBottomHtml += createInfoHtml(2, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
								break;
							case "right":
								obj_type = "page_right";
								textPageRightHtml += createInfoHtml(2, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
								break;
							case "full":
								obj_type = "page_full";
								textPageFullHtml += createInfoHtml(2, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
								break;
						}
					}
					break;
				case "message":
				case "balloon":
					obj_type = "message";
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						lat  = coldata[2];
						lng  = coldata[3];
					}
					html = createInfoHtml(0, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
					data_hold = true;
					break;
				case "layer":
					obj_type = "layer";
					layerNum += 1;
					markers[layerNum] = [];
					if ( (coldata[2] != "") && (coldata[2].match(/^\S+$/)) ) {
						layerName[layerNum] = coldata[2];
					} else {
						layerName[layerNum] = 'レイヤ ' + layerNum;
					}
					if (visibility_marker == false) {
						layerVisibility[layerNum] = false;
					} else if (coldata[3].toLowerCase() == "yes") {
						layerVisibility[layerNum] = true;
					} else if (coldata[3].toLowerCase() == "no") {
						layerVisibility[layerNum] = false;
					} else {
						layerVisibility[layerNum] = true;
					}
					break;
				case "marker":
				case "icon":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						obj_type = "marker";
						lat  = coldata[2];
						lng  = coldata[3];
						attr = coldata[4];
						titl = coldata[5];
						html = createInfoHtml(0, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
						data_hold = true;
					}
					break;
				case "circle":
				case "buffer":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						obj_type = "circle";
						lat = L.latLng(coldata[2], coldata[3]);
						lng = "";
						attr = coldata[4];
						titl = coldata[5];
						html = createInfoHtml(0, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
						data_hold = true;
					}
					break;
				case "polyline":
				case "line":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						obj_type = "polyline";
						lat = [];
						lat.push(L.latLng(coldata[2], coldata[3]));
						lng = "";
						attr = coldata[4];
						titl = coldata[5];
						html = createInfoHtml(0, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
						data_hold = true;
					}
					break;
				case "polygon":
				case "poly":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						obj_type = "polygon";
						lat = [];
						lat.push(L.latLng(coldata[2], coldata[3]));
						lng = "";
						attr = coldata[4];
						titl = coldata[5];
						html = createInfoHtml(0, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
						data_hold = true;
					}
					break;
				case "rectangle":
				case "rect":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
						obj_type = "rectangle";
						lat = L.latLng(coldata[2], coldata[3]);
						lng = "";
						attr = coldata[4];
						titl = coldata[5];
						html = createInfoHtml(0, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]);
						data_hold = true;
					}
					break;
				case "groundoverlay":
				case "ground":
				case "overlay":
					if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
							&& (coldata[3] != "") && !(isNaN(coldata[3]-0))
							&& (coldata[5].match(/^\S+$/)) ) {
						obj_type = "groundoverlay";
						lat = L.latLng(coldata[2], coldata[3]);
						lng = "";
						attr = coldata[4];
						titl = coldata[5];
						html = ""; // オーバーレイ画像の属性情報表示は不可
						data_hold = true;
					}
					break;
				case "gpx":
					accessGpx(coldata[2], layerNum, coldata[3]);
					break;
//				case "kml":
//					renderKml(coldata[2]); // 未対応
//					break;
				case "geojson":
				case "json":
					accessJson(coldata[2], coldata[3], coldata[4], coldata[5]);
					break;
			}
		} else {  // "continue" の場合
			var foldSwitch = 0;
			if ((coldata[1].toLowerCase() == "collapse") || (coldata[1].toLowerCase() == "fold")) {
				foldSwitch = 1;
			}
			switch (obj_type) {
				case "maptype":
					if (coldata[2] != "") {
						if (mapTypeIdFromNameWord(coldata[2]) != null) {
							mapTypeIdsArray.push(mapTypeIdFromNameWord(coldata[2]));
						}
					}
					if (coldata[3] != "") {
						if (mapTypeIdFromNameWord(coldata[3]) != null) {
							mapTypeIdsArray.push(mapTypeIdFromNameWord(coldata[3]));
						}
					}
					break;
				case "tile":
					var customTileLayerId = createTileLayer(coldata[2], coldata[3], coldata[4], coldata[5], coldata[6], coldata[7]);
					if (customTileLayerId != false) {
							mapTypeIdsArray.push(customTileLayerId);
					}
					break;
				case "tile_note":
					switch (coldata[2].toLowerCase()) {
						case "notice":
							obj_type = "tile_note_notice";
							customLayerNote1 += "<div>" + createInfoHtml(4, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]) + "</div>";
							break;
						default:
							obj_type = "tile_note";
							customLayerNote2 += "<div>" + createInfoHtml(4, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]) + "</div>";
							break;
					}
					break;
				case "tile_note_notice":
					switch (coldata[2].toLowerCase()) {
						case "source":
							obj_type = "tile_note";
							customLayerNote2 += "<div>" + createInfoHtml(4, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]) + "</div>";
							break;
						default:
							obj_type = "tile_note_notice";
							customLayerNote1 += "<div>" + createInfoHtml(4, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13]) + "</div>";
							break;
					}
					break;
				case "page_top":
					textPageTopHtml += createInfoHtml(2 + foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					break;
				case "page_bottom":
					textPageBottomHtml += createInfoHtml(2 + foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					break;
				case "page_right":
					textPageRightHtml += createInfoHtml(2 + foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					break;
				case "page_full":
					textPageFullHtml += createInfoHtml(2 + foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					break;
				case "message":
					if (data_hold == true) {
						html += createInfoHtml(foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					}
					break;
				case "marker":
					if (data_hold == true) {
						html += createInfoHtml(foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					}
					break;
				case "circle":
					if (data_hold == true) {
						if ( (lng == "")
								&& (coldata[2] != "") && !(isNaN(coldata[2]-0)) ) {
							lng = coldata[2] * 1000;
						}
						html += createInfoHtml(foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					}
					break;
				case "polyline":
					if (data_hold == true) {
						if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
								&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
							lat.push(L.latLng(coldata[2], coldata[3]));
						}
						html += createInfoHtml(foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					}
					break;
				case "polygon":
					if (data_hold == true) {
						if ( (coldata[2] != "") && !(isNaN(coldata[2]-0))
								&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
							lat.push(L.latLng(coldata[2], coldata[3]));
						}
						html += createInfoHtml(foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					}
					break;
				case "rectangle":
					if (data_hold == true) {
						if ( (lng == "")
								&& (coldata[2] != "") && !(isNaN(coldata[2]-0))
								&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
							lng = L.latLng(coldata[2], coldata[3]);
						}
						html += createInfoHtml(foldSwitch, coldata[6], coldata[7], coldata[8], coldata[9], coldata[10], coldata[11], coldata[12], coldata[13], coldata[5]);
					}
					break;
				case "groundoverlay":
					if (data_hold == true) {
						if ( (lng == "")
								&& (coldata[2] != "") && !(isNaN(coldata[2]-0))
								&& (coldata[3] != "") && !(isNaN(coldata[3]-0)) ) {
							lng = L.latLng(coldata[2], coldata[3]);
						}
						if ( (html == "") && (coldata[5] != "") ) {
							html = coldata[5];
						}
					}
					break;
			}
		}
	}
	}
	if (data_hold == true) {
		addMarker(obj_type, lat, lng, attr, titl, html, layerNum);
		obj_type = ""; lat = ""; lng = ""; attr = ""; titl = ""; html = "";
		data_hold = false;
	}

	if ( (zoom_request_2 != null) && (zoom_request_3 != null)
			&& (zoom_request_2 < zoom_request_3) ) {
		var zoom_request_2_temp = zoom_request_2;
		var zoom_request_3_temp = zoom_request_3;
		zoom_request_2 = zoom_request_temp_3;
		zoom_request_3 = zoom_request_temp_2;
	}
	if (zoom_request_2 != null) {
		zoom_max = zoom_request_2;
	}
	if (zoom_request_3 != null) {
		zoom_min = zoom_request_3;
	}
	if ( (zoom_request != null) && (zoom_request >= 0) ) {
		map_zoom = zoom_request;
	}
	getUrlArg(); // URL引数の再読込による表示設定情報の上書き
	if (zoom_max != null) {
		if (map_zoom > zoom_max) {
			map_zoom = zoom_max;
		}
	}
	if (zoom_min != null) {
		if (map_zoom < zoom_min) {
			map_zoom = zoom_min;
		}
	}
	map.setView(L.latLng(center_lat, center_lng), map_zoom);
	map.setMaxZoom(zoom_max);
	map.setMinZoom(zoom_min);
	map.removeLayer(initialBaseLayer);
	if (mapTypeIdsArray.length < 1) {
		mapTypeIdsArray = map_type_options_preset;
	}
	for (var i = 0; i < mapTypeIdsArray.length; i++) {
		var iMapTypeId = mapTypeIdsArray[i];
		if (iMapTypeId != null) {
			baseLayersArray[baseLayerName[iMapTypeId]] = baseLayer[iMapTypeId];
		}
	}
	if (markers.length > 1) {
		layerName[0] = "レイヤ 0";
	} else {
		layerName[0] = "上載せ情報";
	}
	var overlaysArray = [];
	for (var i = 0 ; i < markers.length; i++) {
		if (markers[i].length > 0) {
			overlaysArray[layerName[i]] = L.layerGroup(markers[i]);
		}
	}
	if (controlLayers != null) {
		map.removeControl(controlLayers);
	}
	if ( (markers.length > 1) || (markers[0].length > 0) ) {
		controlLayers = L.control.layers(baseLayersArray, overlaysArray);
	} else {
		controlLayers = L.control.layers(baseLayersArray);
	}
	controlLayers.addTo(map);
	for (var i = 0 ; i < markers.length; i++) {
		if ( (layerVisibility[i] == true) && (markers[i].length > 0) ) {
			map.addLayer(overlaysArray[layerName[i]]);
		}
	}
	map.addLayer(baseLayer[map_type_id]);
//	currentBaseLayer = baseLayer[map_type_id];
	L.control.scale({imperial:false}).addTo(map);
	geolocationSetup();
	controlLayers.expand();

	if (opening_message != "") {
		if ( (opening_message_lat == "") || (opening_message_lng == "") ) {
			opening_message_lat = center_lat;
			opening_message_lng = center_lng;
		}
		map.openPopup(opening_message, L.latLng(opening_message_lat, opening_message_lng));
	}

	if ( layout_type == 2 ) {  // ▼▼▼ Goma-Aw ▼▼▼
		if (textPageRightHtml != "") {
			description = textPageRightHtml;
		}
		description_reset();
	}  // ▲▲▲ Goma-Aw ▲▲▲
	// ▼▼▼ 検索フォームの組込 ▼▼▼
	if (use_search_box == true) {
		if (document.getElementById("search_box")) {
			if (document.getElementById("place") == null) {
				document.getElementById("search_box").innerHTML = htmlSearchBox();
			}
		}
	} else {
		if (document.getElementById("search_box")) {
			document.getElementById("search_box").innerHTML = "";
		}
	}
	// ▲▲▲ 検索フォームの組込 ▲▲▲
	// ▼▼▼ このページへのリンクの組込 ▼▼▼
	if ((use_link_url == true) && (document.getElementById("link_div"))) {
		document.getElementById("link_div").innerHTML = "<div>このページのURL</div>";
		document.getElementById("link_div").innerHTML += "<div style=\"margin-left:2em; word-break:break-all;\"><span id=\"link_url\">( Not Available )</span></div>";
		document.getElementById("link_div").innerHTML += "<div style=\"margin:0.2em 0em 1em 2em;\"><input type=\"button\" name=\"ButtonWriteUrl\" id=\"ButtonWriteUrl\" onClick=\"writeUrl();\" value=\"現在の地図表示状態に更新\" style=\"font-size:80%\" title=\"現在の地図表示状態を再現するURLに更新します。\" /></div>";
		document.getElementById("link_div").innerHTML += "<hr />";
	}
	writeInitialUrl();
	// ▲▲▲ このページへのリンクの組込 ▲▲▲
	// ▼▼▼ 地図以外のページ内容の記述 ▼▼▼
	if (document.getElementById("text_top")) {
		document.getElementById("text_top").innerHTML = textPageTopHtml;
	}
	if (document.getElementById("text_bottom")) {
		document.getElementById("text_bottom").innerHTML = textPageBottomHtml;
	}
	if ( textPageHeadTitle != "" ) {
		document.title = textPageHeadTitle;
	}
	// 地図出典注釈表示
	if (document.getElementById("map_source")) {
		var mapSourceNoteHtml = mapSourceNote(map_type_id, mapTypeIdsArray);
		if (mapSourceNoteHtml != "") {
			document.getElementById("map_source").innerHTML = '<div style=\"margin-bottom:1em\">［地図について］</div>' + mapSourceNoteHtml;
		} else {
			document.getElementById("map_source").innerHTML = '';
		}
	}
	// ▲▲▲ 地図以外のページ内容の記述 ▲▲▲
	if ( layout_type == 4 ) {  // ▼▼▼ Goma-Awタイプ４ ▼▼▼
		// 地図以外のページ内容の記述
		if (textPageFullHtml != "") {
			description = textPageFullHtml;
		} else if ( (textPageTopHtml != "") || (textPageBottomHtml != "") ) {
			description = textPageTopHtml + textPageRightHtml + textPageBottomHtml;
		}
		description += '<hr style=\"margin-top:1em;\" />';
		// 検索フォームの組込
		if (use_search_box == true) {
			if ((document.getElementById("search_box") == null) && (document.getElementById("place") == null)) {
				description += '<div id=\"search_box\" style=\"margin-top:1em; margin-bottom:1em;\">';
				description += htmlSearchBox();
				description += '</div>';
				description += '<hr />';
			}
		}
		// このページへのリンクの組込
		if (use_link_url == true) {
			description += '<div style=\"margin:1em 0em;\">';
			description += '<div>このページのURL</div>';
			description += '<div style=\"margin-left:0.5em; word-break:break-all;\"><span id=\"link_url\">( Not Available )</span></div>';
			description += '<div style=\"margin:0.2em 0em 0em 0.2em;\"><input type=\"button\" name=\"ButtonWriteUrl\" id=\"ButtonWriteUrl\" onClick=\"writeUrl();\" value=\"現在の地図表示状態に更新\" style=\"font-size:80%\" title=\"現在の地図表示状態を再現するURLに更新します。\" /></div>';
			description += '</div>';
			description += '<hr />';
		}
		// システム情報記載ページへのリンク，記述完了
		description += '<div style=\"font-size:100%;\"><a href=\"#\" onclick=\"description_systemInfo(); return false;\">［地図について］</a></div>';
		description_reset();
		// システム情報（地図出典，バージョン情報）
		description4system += '<div style=\"text-align:right; font-size:100%;\"><a href=\"#\" onclick=\"description_reset(); return false;\">［戻る］</a></div>';
		description4system += '<h4 style=\"margin:0.2em 0em;\">この地図について</h4>';
		description4system += '<div style=\"margin:0.5em 0em; font-size:70%; line-height:120%; text-align:justify; text-justify:inter-ideograph;\">' + mapSourceNote(map_type_id, mapTypeIdsArray) + '</div>';
		description4system += description4system0;
		description4system += '<hr />';
		description4system += '<div style=\"font-size:100%;\"><a href=\"#\" onclick=\"description_reset(); return false;\">［戻る］</a></div>';
		if (document.getElementById("description_s")) {
			document.getElementById("description_s").innerHTML = description4system;
		}
		// サイドバーの表示設定
		setSideBarControl();
		if (sideBarVisibility == true) {
			showSideBar(1);
		} else {
			showSideBar(0);
		}
	}  // ▲▲▲ Goma-Awタイプ４ ▲▲▲
	// ▼▼▼ 検索機能の組込 ▼▼▼
	if (use_search_box == true) {
		setSearchFunction();
	}
	// ▲▲▲ 検索機能の組込 ▲▲▲
	setColorbox(); // jQuery Colorbox のセット
}

function createInfoHtml(docMode, item_html, item_link_url, item_link_target, item_title, item_text, item_image_url, item_image_width, item_image_height, item_folder) {
	var html_a1 = ""; var html_a2 = ""; var html_h = ""; var html_img = ""; var html_p = "";
	var image_width_description = ""; var image_height_description = "";
	var html_folder1 = ""; var html_folder2 = "";
	var created_html = "";
	item_title = item_title.replace(/</g, "&lt;"); item_title = item_title.replace(/>/g, "&gt;");
	item_text = item_text.replace(/</g, "&lt;"); item_text = item_text.replace(/>/g, "&gt;");
	item_title = item_title.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/gi, '<span style="word-break:break-all;">$&</span>');
	item_text = item_text.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/gi, '<span style="word-break:break-all;">$&</span>');
	item_title = item_title.replace(/\\n/g, "<br />");
	item_text = item_text.replace(/\\n/g, "<br />");
	if ( !(item_link_url.match(/^\s*$/)) ) {
		if ( !(item_link_url.match(/^\w+\:/)) && !(item_link_url.match(/^\/+/)) ) {
			item_link_url = data_dir + item_link_url;
		}
		switch ( item_link_target.toLowerCase() ) {
			case "":
				if (docMode > 3) {
					html_a1 = "<a href=\"" + item_link_url + "\" target=\"_blank\">";
				} else {
					html_a1 = "<a href=\"" + item_link_url + "\" target=\"_self\">";
				}
				break;
			case "_lightbox":
			case "_colorbox":
				html_a1 = "<a href=\"" + item_link_url + "\" class=\"lightbox\" target=\"" + item_link_target + "\">";
				break;
			default:
				html_a1 = "<a href=\"" + item_link_url + "\" target=\"" + item_link_target + "\">";
				break;
		}
		html_a2 = "</a>";
		if ( (item_title.match(/^\s*$/)) && (item_image_url.match(/^\s*$/)) && (item_text.match(/^\s*$/)) ) {
			html_p = "<p style=\"margin:0.5em 0em;\">" + html_a1 + item_link_url + html_a2 + "</p>";
		}
	}
	if ( !(item_image_url.match(/^\s*$/)) ) {
		if ( !(item_image_url.match(/^\w+\:/)) && !(item_image_url.match(/^\/+/)) ) {
			item_image_url = data_dir + item_image_url;
		}
		if ( (item_image_width != "") && !(isNaN(item_image_width - 0)) && (Math.round(item_image_width) > 0) ) {
			image_width_description = " width=\"" + parseInt(item_image_width, 10) + "\"";
		}
		if ( (item_image_height != "") && !(isNaN(item_image_height - 0)) && (Math.round(item_image_height) > 0) ) {
			image_height_description = " height=\"" + parseInt(item_image_height, 10) + "\"";
		}
		html_img = "<div style=\"margin:0.5em 0em;\">" + html_a1 + "<img src=\"" + item_image_url + "\""
			+ image_width_description + image_height_description + " border=\"0\" alt=\"[ Picture ]\" />" + html_a2 + "</div>";
		html_a1 = ""; html_a2 = "";
	}
	if ( !(item_title.match(/^\s*$/)) ) {
		if (docMode > 3) {
			html_h = "<h4 style=\"margin:0.5em 0em;\">" + html_a1 + item_title + html_a2 + "</h4>";
		} else if ( (docMode == 2) || (docMode == 3) ) {
			html_h = "<h2 style=\"margin:0.5em 0em;\">" + html_a1 + item_title + html_a2 + "</h2>";
		} else {
			html_h = "<h4 style=\"margin:0.5em 0em;\">" + html_a1 + item_title + html_a2 + "</h4>";
		}
	}
	if ( !(item_text.match(/^\s*$/)) ) {
		if (docMode > 3) {
			html_p = html_a1 + item_text + html_a2;
		} else {
			html_p = "<p style=\"margin:0.5em 0em; text-align:justify; text-justify:inter-ideograph;\">" + html_a1 + item_text + html_a2 + "</p>";
		}
	}
	if ( (docMode == 1) || (docMode == 3) ) {
		var folderOpenTitle = "";
		var folderCloseTitle = "";
		if ((item_folder == undefined) || (item_folder == null)) {
			item_folder = "";
		} else {
			item_folder = item_folder.replace(/</g, "&lt;"); item_title = item_title.replace(/>/g, "&gt;");
			item_folder = item_folder.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/gi, '<span style="word-break:break-all;">$&</span>');
			item_folder = item_folder.replace(/\\n/g, "<br />");
		}
		if (item_folder.match(/^\s*$/)) {
			folderOpenTitle = "[ 追加情報を表示 ]";
			folderCloseTitle = "[ 追加情報を閉じる ]";
		} else {
			folderOpenTitle = item_folder;
			folderCloseTitle = "" + item_folder + "を閉じる";
		}
		infoFolderNum += 1;
		html_folder1 = '<div id="foldedTitle' + infoFolderNum + '" style="margin:0.5em 0em;"><a href=\"#\" onclick=\"openInfoFolder(' + infoFolderNum + '); return false;\">' + folderOpenTitle + '</a></div>';
		html_folder1 += '<div id="foldedInfo' + infoFolderNum + '" style="display:none">';
		html_folder2 = '<div style="margin:0.5em 0em;"><a href=\"#\" onclick=\"closeInfoFolder(' + infoFolderNum + '); return false;\">' + folderCloseTitle + '</a></div>';
		html_folder2 += '</div>';
	}
	created_html = html_folder1 + html_h + html_img + html_p + item_html + html_folder2;
	return created_html;
}

function openInfoFolder(folderId) {
	if (folderId != undefined) {
		var idDivFoldedInfo = "foldedInfo" + folderId;
		var idDivFolderTitle = "foldedTitle" + folderId;
		if (document.getElementById(idDivFoldedInfo) && document.getElementById(idDivFolderTitle)) {
			document.getElementById(idDivFoldedInfo).style.display = "block";
			document.getElementById(idDivFolderTitle).style.display = "none";
		}
	}
}

function closeInfoFolder(folderId) {
	if (folderId != undefined) {
		var idDivFoldedInfo = "foldedInfo" + folderId;
		var idDivFolderTitle = "foldedTitle" + folderId;
		if (document.getElementById(idDivFoldedInfo) && document.getElementById(idDivFolderTitle)) {
			document.getElementById(idDivFoldedInfo).style.display = "none";
			document.getElementById(idDivFolderTitle).style.display = "block";
		}
	}
}

function addMarker(mkr_type, mkr_lat, mkr_lng, mkr_attr, mkr_titl, mkr_html, mkr_layer) {
	var marker = null;
	switch (mkr_type) {
		case "marker":
			if (use_leaflet_sprite == true) {
				var iconColor ="";
				switch (mkr_attr.toLowerCase()) {
					case "blue":
					case "green":
					case "orange":
					case "yellow":
					case "red":
					case "purple":
					case "violet":
						iconColor = mkr_attr.toLowerCase();
						break;
				}
				marker = L.marker([mkr_lat, mkr_lng], {icon: L.spriteIcon(iconColor), title: mkr_titl});
			} else {
				marker = L.marker([mkr_lat, mkr_lng], {title: mkr_titl});
			}
			setMarkerPopup(marker, mkr_type, mkr_titl, mkr_html);
			markers[mkr_layer].push(marker);
			break;
		case "circle":
			if ( (mkr_lat != "") && (mkr_lng != "") ) {
				if ( (mkr_attr == "") || mkr_attr.match(/^\s*$/) ) { mkr_attr = "#ff3f00"; }
				marker = L.circle(mkr_lat, mkr_lng, {
						// title:mkr_titl,
						color: mkr_attr,
						opacity: 0.8,
						weight: 3,
						fillColor: mkr_attr,
						fillOpacity: 0.2
				});
				setMarkerPopup(marker, mkr_type, mkr_titl, mkr_html);
				markers[mkr_layer].push(marker);
			}
			break;
		case "polyline":
			if ( (mkr_attr == "") || mkr_attr.match(/^\s*$/) ) { mkr_attr = "#ff3f00"; }
			marker = L.polyline(mkr_lat, {
					// title:mkr_titl,
					color: mkr_attr,
					opacity: 0.8,
					weight: 3,
			});
			setMarkerPopup(marker, mkr_type, mkr_titl, mkr_html);
			markers[mkr_layer].push(marker);
			break;
		case "polygon":
			if ( (mkr_attr == "") || mkr_attr.match(/^\s*$/) ) { mkr_attr = "#ff3f00"; }
			marker = L.polygon(mkr_lat, {
					// title:mkr_titl,
					color: mkr_attr,
					opacity: 0.8,
					weight: 3,
					fillColor: mkr_attr,
					fillOpacity: 0.2
			});
			setMarkerPopup(marker, mkr_type, mkr_titl, mkr_html);
			markers[mkr_layer].push(marker);
			break;
		case "rectangle":
			if ( (mkr_lat != "") && (mkr_lng != "") ) {
				if ( (mkr_attr == "") || mkr_attr.match(/^\s*$/) ) { mkr_attr = "#ff3f00"; }
				marker = L.rectangle(correctBounds(mkr_lat, mkr_lng), {
						// title:mkr_titl,
						color: mkr_attr,
						opacity: 0.8,
						weight: 3,
						fillColor: mkr_attr,
						fillOpacity: 0.2
				});
				setMarkerPopup(marker, mkr_type, mkr_titl, mkr_html);
				markers[mkr_layer].push(marker);
			}
			break;
		case "groundoverlay":
			if ( (mkr_lat != "") && (mkr_lng != "") ) {
				var fileUrl = "";
				if ( mkr_titl.match(/^\w+\:\/\/\S+$/) ) { // 完全なURLの場合
					fileUrl = mkr_titl;
				} else if ( mkr_titl.match(/^[\/]/) ) { // 絶対パスの場合
					fileUrl = mkr_titl;
				} else { // 相対パス(orファイル名のみ)の場合
					fileUrl = data_dir + mkr_titl;
				}
				var opacity = 1;
				if ((mkr_attr != "") && !(isNaN(mkr_attr-0))) {
					if ((mkr_attr >= 0) && (mkr_attr <= 1)) {
						opacity = mkr_attr - 0;
					} else if ((mkr_attr > 1) && (mkr_attr <= 100)) {
						opacity = mkr_attr / 100;
					} else {
						opacity = 1;
					}
				} else {
					opacity = 1;
				}
				marker = L.imageOverlay(fileUrl, correctBounds(mkr_lat, mkr_lng), {
						opacity: opacity
				});
				markers[mkr_layer].push(marker);
			}
			break;
		case "message":
			if ( (mkr_lat != "") && !(isNaN(mkr_lat - 0))
					&& (mkr_lng != "") && !(isNaN(mkr_lng - 0)) ) {
				opening_message_lat = mkr_lat;
				opening_message_lng = mkr_lng;
			}
			opening_message += mkr_html;
			break;
	}
	return marker;
}

function setMarkerPopup(marker, mkr_type, mkr_titl, mkr_html) {
	var mkr_popup_msg = "";
	if (mkr_html != "") {
		switch (mkr_type) {
			case "marker":
				if ( (layout_type == 2) || (layout_type == 4) ) {  // ▼▼▼ Goma-Aw ▼▼▼
					if (mkr_titl != "") {
						mkr_popup_msg = "<h3 style=\"margin:0.5em 0em; font-size:90%;\">"+ mkr_titl + "</h3><hr />";
					}
					mkr_popup_msg += "<p style=\"margin:0.5em 0em;\">この地点に関する情報を<br />表示しています。</p>";
					marker.bindPopup(mkr_popup_msg);
					marker.on('click', function() {
						description_set(mkr_html);
						setColorbox(); // jQuery Colorbox のセット
					});
					marker.on('popupclose', function() {
						description_reset();
					});
				} else {  // ▲▲▲ Goma-Aw ▲▲▲ // ▼▼▼ 通常 ▼▼▼
					marker.bindPopup(mkr_html);
					marker.on('click', function() {
						setColorbox(); // jQuery Colorbox のセット
					});
				}  // ▲▲▲ 通常 ▲▲▲
				break;
			case "circle":
			case "polyline":
			case "polygon":
			case "rectangle":
				if ( (layout_type == 2) || (layout_type == 4) ) {  // ▼▼▼ Goma-Aw ▼▼▼
					if (mkr_type == "groundoverlay") { // mkr_titlをファイル名指定に使用しているのでタイトルは無効
						mkr_popup_msg = "<p style=\"margin:0.5em 0em;\">この地図に関する情報を<br />表示しています。</p>";
					} else {
						if (mkr_titl != "") {
							mkr_popup_msg = "<h3 style=\"margin:0.5em 0em; font-size:90%;\">"+ mkr_titl + "</h3><hr />";
						}
						mkr_popup_msg += "<p style=\"margin:0.5em 0em;\">ここに関する情報を<br />表示しています。</p>";
					}
					marker.bindPopup(mkr_popup_msg);
					marker.on('click', function() {
						description_set(mkr_html);
						setColorbox(); // jQuery Colorbox のセット
					});
					marker.on('popupclose', function() {
						description_reset();
					});
				} else {  // ▲▲▲ Goma-Aw ▲▲▲ // ▼▼▼ 通常 ▼▼▼
					marker.bindPopup(mkr_html);
					marker.on('click', function() {
						setColorbox(); // jQuery Colorbox のセット
					});
				}  // ▲▲▲ 通常 ▲▲▲
				break;
			case "groundoverlay":
				// 未対応
				break;
		}
	} else {
		if (mkr_type == "marker") {
			if ( (layout_type == 2) || (layout_type == 4) ) {  // ▼▼▼ Goma-Aw ▼▼▼
				if (mkr_titl != "") {
					mkr_popup_msg = "<h3 style=\"margin:0.5em 0em; font-size:90%;\">"+ mkr_titl + "</h3><hr />";
				}
				mkr_popup_msg += "<p style=\"margin:0.5em 0em;\">この地点についての表示<br />する内容はありません。</p>";
				marker.bindPopup(mkr_popup_msg);
				marker.on('click', function() {
					description_reset();
				});
			} else {  // ▲▲▲ Goma-Aw ▲▲▲ // ▼▼▼ 通常 ▼▼▼
				if (mkr_titl != "") {
					mkr_popup_msg = "<h3 style=\"margin:0.5em 0em; font-size:90%;\">"+ mkr_titl + "</h3><hr />";
				}
				mkr_popup_msg += "<p style=\"margin:0.5em 0em;\">この地点についての表示<br />する内容はありません。</p>";
				marker.bindPopup(mkr_popup_msg);
			}  // ▲▲▲ 通常 ▲▲▲
		}
	}
}

// ▼▼▼ Goma-Aw の場合のみ使用する関数 ▼▼▼
function description_set(html) {
	document.getElementById("description").innerHTML = "<div>" + html + "</div>";
	if (document.getElementById("description_s")) {
		document.getElementById("description").style.display = "block";
		document.getElementById("description_s").style.display = "none";
	}
	document.getElementById("description_canvas").scrollTop = 0;
	if ( layout_type == 4 ) {
		showSideBar(1);
	}
	return html;
}

function description_reset() {
	document.getElementById("description").innerHTML = description;
	if ( (layout_type == 4) && (use_link_url == true) ) {
		writeInitialUrl();
	}
	if (document.getElementById("description_s")) {
		document.getElementById("description").style.display = "block";
		document.getElementById("description_s").style.display = "none";
	}
	document.getElementById("description_canvas").scrollTop = 0;
	setColorbox(); // jQuery Colorbox のセット
	return description;
}

function description_systemInfo() {
	if (document.getElementById("description_s")) {
		document.getElementById("description").style.display = "none";
		document.getElementById("description_s").style.display = "block";
	} else {
		document.getElementById("description").innerHTML = description4system;
	}
	document.getElementById("description_canvas").scrollTop = 0;
	return description4system;
}
// ▲▲▲ Goma-Aw の場合のみ使用する関数 ▲▲▲

// ▼▼▼ サイドバー表示/非表示切り替えで使用する関数 ▼▼▼
function setSideBarControl() {
	var controlSideBar = L.control();
	controlSideBar.onAdd = function(map) {
		var customControlDiv_SideBar = document.createElement('DIV');
		customControlDiv_SideBar.style.padding = '2px';
		var customControlBox_SideBar = document.createElement('DIV');
		var sideBarControlHtml = "";
		sideBarControlHtml += '<a href=\"#\" onclick=\"showSideBar(); return false;\">';
		sideBarControlHtml += '<div style=\"background-color:#ffffff; padding:7px; border-radius:4px; box-shadow:0px 0px 2px 2px rgba(0,0,0,0.22);\">';
		if (sideBarVisibility == true) {
			sideBarControlHtml += '<img id=\"sidebar_control1\" class=\"iconSideBarRight\" src=\"' + iconSideBar_right_close + '\" title=\"説明画面を閉じる\" style=\"vertical-align:middle;\">';
			sideBarControlHtml += '<img id=\"sidebar_control2\" class=\"iconSideBarBottom\" src=\"' + iconSideBar_bottom_close + '\" title=\"説明画面を閉じる\" style=\"vertical-align:middle;\">';
		} else {
			sideBarControlHtml += '<img id=\"sidebar_control1\" class=\"iconSideBarRight\" src=\"' + iconSideBar_right_open + '\" title=\"説明画面を開く\" style=\"vertical-align:middle;\">';
			sideBarControlHtml += '<img id=\"sidebar_control2\" class=\"iconSideBarBottom\" src=\"' + iconSideBar_bottom_open + '\" title=\"説明画面を開く\" style=\"vertical-align:middle;\">';
		}
		sideBarControlHtml += '</div>';
		sideBarControlHtml += '</a>';
		customControlBox_SideBar.innerHTML = sideBarControlHtml;
		L.DomEvent.disableClickPropagation(customControlBox_SideBar);
		L.DomEvent.disableScrollPropagation(customControlBox_SideBar);
		customControlDiv_SideBar.appendChild(customControlBox_SideBar);
		return customControlDiv_SideBar;
	};
	controlSideBar.setPosition('bottomright');
	controlSideBar.addTo(map);
}

function showSideBar(argVisibility) {
	var orderToShow = true;
	if (sideBarVisibility == true) {
		orderToShow = false;
	} else {
		orderToShow = true;
	}
	if (argVisibility == 0) {
		orderToShow = false;
	} else if (argVisibility == 1) {
		orderToShow = true;
	}
	var currentClassName = document.getElementById("map_canvas").className;
	if (orderToShow == true) {
		if (document.getElementById("description_canvas")) {
			document.getElementById("map_canvas").className = currentClassName.replace('canvasMap_sideClosed','canvasMap_sideOpen');
			document.getElementById("description_canvas").className = 'canvasDes_sideOpen';
		}
		if (document.getElementById("sidebar_control1")) {
			document.getElementById("sidebar_control1").src = iconSideBar_right_close;
			document.getElementById("sidebar_control1").title = '説明画面を閉じる';
		}
		if (document.getElementById("sidebar_control2")) {
			document.getElementById("sidebar_control2").src = iconSideBar_bottom_close;
			document.getElementById("sidebar_control2").title = '説明画面を閉じる';
		}
		sideBarVisibility = true;
	} else {
		if (document.getElementById("description_canvas")) {
			document.getElementById("map_canvas").className = currentClassName.replace('canvasMap_sideOpen','canvasMap_sideClosed');
			document.getElementById("description_canvas").className = 'canvasDes_sideClosed';
		}
		if (document.getElementById("sidebar_control1")) {
			document.getElementById("sidebar_control1").src = iconSideBar_right_open;
			document.getElementById("sidebar_control1").title = '説明画面を開く';
		}
		if (document.getElementById("sidebar_control2")) {
			document.getElementById("sidebar_control2").src = iconSideBar_bottom_open;
			document.getElementById("sidebar_control2").title = '説明画面を開く';
		}
		sideBarVisibility = false;
	}
	map.invalidateSize();
}
// ▲▲▲ サイドバー表示/非表示切り替えで使用する関数 ▲▲▲

function correctBounds(latlng1, latlng2) {
	var lat1 = 0; var lng1 = 0; var lat2 = 0; var lng2 = 0;
	var new_bounds = null;
	if ( latlng1.lat <= latlng2.lat ) {
		lat1 = latlng1.lat;
		lat2 = latlng2.lat;
	} else {
		lat1 = latlng2.lat;
		lat2 = latlng1.lat;
	}
	if ( (latlng2.lng - latlng1.lng >= 0) && (latlng2.lng - latlng1.lng <= 180) ) {
		lng1 = latlng1.lng;
		lng2 = latlng2.lng;
	} else if ( latlng2.lng - latlng1.lng > 180 ) {
		lng1 = latlng2.lng;
		lng2 = latlng1.lng;
	} else if ( (latlng2.lng - latlng1.lng >= -180) && (latlng2.lng - latlng1.lng < 0) ) {
		lng1 = latlng2.lng;
		lng2 = latlng1.lng;
	} else if ( latlng2.lng - latlng1.lng < -180 ) {
		lng1 = latlng1.lng;
		lng2 = latlng2.lng;
	}
	new_bounds = L.latLngBounds(L.latLng(lat1, lng1), L.latLng(lat2, lng2));
	return new_bounds;
}

function accessGpx(gpxFile, layerIndex, useCacheString) {
	var gpxUrl = "";
	var useCache = false; 
	if (gpxFile.match(/^\S+$/)) {
		if ( gpxFile.match(/\.$/) ) {  // ファイル名末尾がピリオド
			gpxFile += "gpx";
		}
		if ( !(gpxFile.split('/')[gpxFile.split('/').length - 1].match(/\./)) ) {  // ファイル名に拡張子なし
			gpxFile += ".gpx";
		}
		if ( !(gpxFile.match(/\.gpx$/i)) ) {  // ファイル名末尾が .gpx 以外
		//	gpxFile += ".gpx";
		}
		if (gpxFile.match(/^\w+\:/) || gpxFile.match(/^[\/]/)) {  // 絶対パスの場合
			gpxUrl = gpxFile;
		} else {  // 相対パスの場合
			gpxUrl = data_dir + gpxFile;
		}
		if ( (useCacheString.toLowerCase() == "yes") || (useCacheString.toLowerCase() == "cache") ) {
			useCache = true; 
		}
		downloadText(gpxUrl, evaluateGpx, true, layerIndex, useCache);
	}
}

function evaluateGpx(gpxData, layerIndex) {
	var lat = ""; var lng = ""; var path = ""; var attr = ""; var titl = ""; var html = ""; var titl_html = ""; var desc = "";
	var obj_type = ""; var data_hold = false;
	if ( (gpxData != undefined) && (gpxData != null) ) {
		if (gpxData.getElementsByTagName('gpx').length > 0) {
			var wpts_length = gpxData.getElementsByTagName('wpt').length;
			for (var i = 0 ; i < wpts_length; i++) {
				var wpt = gpxData.getElementsByTagName('wpt').item(i);
				lat = ""; lng = ""; attr = ""; titl = ""; html = ""; titl_html = ""; desc = "";
				obj_type = "marker";
				lat = wpt.getAttribute("lat");
				lng = wpt.getAttribute("lon");
				var wptNames = wpt.getElementsByTagName('name');
				if ( (wptNames.length > 0) && (wptNames.item(0).childNodes[0] != null) ) {
					titl = wptNames.item(0).childNodes[0].nodeValue;
					titl_html = '<h4 style=\"margin:0.5em 0em;\">' + titl + '</h4>';
				}
				var wptDescs = wpt.getElementsByTagName('desc');
				if ( (wptDescs.length > 0) && (wptDescs.item(0).childNodes[0] != null) ) {
					desc = '<div>' + wptDescs.item(0).childNodes[0].nodeValue + '</div>';
				}
				html = titl_html + desc;
				if ( (lat != null) && (lat != "") && !(isNaN(lat - 0))
						&& (lng != null) && (lng != "") && !(isNaN(lng - 0)) ) {
					addMarker(obj_type, lat, lng, attr, titl, html, layerIndex);
				}
			}
			var rtes_length = gpxData.getElementsByTagName('rte').length;
			for (var i = 0 ; i < rtes_length; i++) {
				lat = ""; lng = ""; titl = ""; html = ""; titl_html = ""; desc = "";
				path = [];
				var rtepts_length = gpxData.getElementsByTagName('rte').item(i).getElementsByTagName('rtept').length;
				for (var j = 0 ; j < rtepts_length ; j++) {
					var rtept = gpxData.getElementsByTagName('rte').item(i).getElementsByTagName('rtept').item(j);
					lat = ""; lng = ""; attr = ""; titl = ""; html = ""; titl_html = ""; desc = "";
					obj_type = "marker";
					lat = rtept.getAttribute("lat");
					lng = rtept.getAttribute("lon");
					var rteptNames = rtept.getElementsByTagName('name');
					if ( (rteptNames.length > 0) && (rteptNames.item(0).childNodes[0] != null) ) {
						titl = rteptNames.item(0).childNodes[0].nodeValue;
						titl_html = '<h4 style=\"margin:0.5em 0em;\">' + titl + '</h4>';
					}
					var rteptDescs = rtept.getElementsByTagName('desc');
					if ( (rteptDescs.length > 0) && (rteptDescs.item(0).childNodes[0] != null) ) {
						desc = '<div>' + rteptDescs.item(0).childNodes[0].nodeValue + '</div>';
					}
					html = titl_html + desc;
					if ( (lat != null) && (lat != "") && !(isNaN(lat - 0))
							&& (lng != null) && (lng != "") && !(isNaN(lng - 0)) ) {
						addMarker(obj_type, lat, lng, attr, titl, html, layerIndex);
						path.push(L.latLng(lat, lng));
					}
				}
				lat = ""; lng = ""; titl = ""; html = ""; titl_html = ""; desc = "";
				obj_type = "polyline";
				attr = "#ff3f00";
				var rteNames = gpxData.getElementsByTagName('rte').item(i).getElementsByTagName('name');
				if ( (rteNames.length > 0) && (rteNames.item(0).childNodes[0] != null) ) {
					titl = rteNames.item(0).childNodes[0].nodeValue;
					titl_html = '<h4 style=\"margin:0.5em 0em;\">' + titl + '</h4>';
				}
				var rteDescs = gpxData.getElementsByTagName('rte').item(i).getElementsByTagName('desc');
				if ( (rteDescs.length > 0) && (rteDescs.item(0).childNodes[0] != null) ) {
					desc = '<div>' + rteDescs.item(0).childNodes[0].nodeValue + '</div>';
				}
				html = titl_html + desc;
				if ( path.length > 1 ) {
					addMarker(obj_type, path, lng, attr, titl, html, layerIndex);
				}
			}
			var trks_length = gpxData.getElementsByTagName('trk').length;
			for (var i = 0 ; i < trks_length; i++) {
				lat = ""; lng = ""; titl = ""; html = ""; titl_html = ""; desc = "";
				var trkNames = gpxData.getElementsByTagName('trk').item(i).getElementsByTagName('name');
				if ( (trkNames.length > 0) && (trkNames.item(0).childNodes[0] != null) ) {
					titl = trkNames.item(0).childNodes[0].nodeValue;
					titl_html = '<h4 style=\"margin:0.5em 0em;\">' + titl + '</h4>';
				}
				var trkDescs = gpxData.getElementsByTagName('trk').item(i).getElementsByTagName('desc');
				if ( (trkDescs.length > 0) && (trkDescs.item(0).childNodes[0] != null) ) {
					desc = '<div>' + trkDescs.item(0).childNodes[0].nodeValue + '</div>';
				}
				html = titl_html + desc;
				var trksegs = gpxData.getElementsByTagName('trk').item(i).getElementsByTagName('trkseg');
				var trksegs_length = gpxData.getElementsByTagName('trk').item(i).getElementsByTagName('trkseg').length;
				for (var j = 0 ; j < trksegs_length ; j++) {
					path = [];
					var trkpts_length = gpxData.getElementsByTagName('trk').item(i).getElementsByTagName('trkseg').item(j).getElementsByTagName('trkpt').length;
					for (var k = 0 ; k < trkpts_length; k++) {
						var trkpt = gpxData.getElementsByTagName('trk').item(i).getElementsByTagName('trkseg').item(j).getElementsByTagName('trkpt').item(k);
						lat = trkpt.getAttribute("lat");
						lng = trkpt.getAttribute("lon");
						if ( (lat != null) && (lat != "") && !(isNaN(lat - 0))
								&& (lng != null) && (lng != "") && !(isNaN(lng - 0)) ) {
							path.push(L.latLng(lat, lng));
						}
					}
					lat = ""; lng = "";
					obj_type = "polyline";
					attr = "#ff7f00";
					if ( path.length > 1 ) {
						addMarker(obj_type, path, lng, attr, titl, html, layerIndex);
					}
				}
			}
			var overlaysArray = [];
			for (var i = 0 ; i < markers.length; i++) {
				if (markers[i].length > 0) {
					overlaysArray[layerName[i]] = L.layerGroup(markers[i]);
				}
			}
			if ( (markers.length > 1) || (markers[0].length > 0) ) {
				if (controlLayers != null) {
					map.removeControl(controlLayers);
				}
				controlLayers = L.control.layers(baseLayersArray, overlaysArray);
				controlLayers.addTo(map);
			}
			for (var i = 0 ; i < markers.length; i++) {
				if ( (layerVisibility[i] == true) && (markers[i].length > 0) ) {
					map.addLayer(overlaysArray[layerName[i]]);
				}
			}
		} else {
			alert ("GPXファイルではありません。\n（gpx要素がないか，XMLの解析でエラーが発生しました。）");
		}
	} else {
			alert ("GPXファイルではありません。\n（XMLの解析ができませんでした。）");
	}
}

function accessJson(jsonFile, layerName, visibilityString, useCacheString) {
	var jsonUrl = "";
	var useCache = false; 
	if (jsonFile.match(/^\S+$/)) {
		var jsonLayerIndex = jsonLayerNum;
		jsonLayerNum += 1;
		if (layerName.match(/^\s*$/)) {
			jsonLayerName[jsonLayerIndex] = "";
		} else {
			jsonLayerName[jsonLayerIndex] = layerName;
		}
		if (visibility_marker == false) {
			jsonLayerVisibility[jsonLayerIndex] = false;
		} else if (visibilityString.toLowerCase() == "yes") {
			jsonLayerVisibility[jsonLayerIndex] = true;
		} else if (visibilityString.toLowerCase() == "no") {
			jsonLayerVisibility[jsonLayerIndex] = false;
		} else {
			jsonLayerVisibility[jsonLayerIndex] = true;
		}
		if ( jsonFile.match(/\.$/) ) {  // ファイル名末尾がピリオド
			jsonFile += "geojson";
		}
		if ( !(jsonFile.split('/')[jsonFile.split('/').length - 1].match(/\./)) ) {  // ファイル名に拡張子なし
			jsonFile += ".geojson";
		}
		if ( !(data_file.match(/\.geojson$/i)) && !(data_file.match(/\.json$/i)) ) {  // ファイル名末尾が .geojson または .json 以外
		//	data_file += ".geojson";
		}
		if (jsonFile.match(/^\w+\:/) || jsonFile.match(/^[\/]/)) {  // 絶対パスの場合
			jsonUrl = jsonFile;
		} else {  // 相対パスの場合
			jsonUrl = data_dir + jsonFile;
		}
		if ( (useCacheString.toLowerCase() == "yes") || (useCacheString.toLowerCase() == "cache") ) {
			useCache = true; 
		}
		downloadText(jsonUrl, evaluateJson, false, jsonLayerIndex, useCache);
	}
}

function evaluateJson(jsonString, jsonLayerIndex) {
	var jsonData = null;
	if ( (jsonString != undefined) && (jsonString != null) ) {
//		jsonData = eval( "(" + jsonString + ")" );
		jsonData = JSON.parse(jsonString);
		if (jsonLayerIndex < 0) {
			jsonLayerIndex = 0;
		}
		jsonLayers[jsonLayerIndex] = L.geoJson(jsonData, {
			// 国土地理院「スタイルつき GeoJSON 規約」に対応
			style: function(feature) {
				var valueStrokeWeight = 3;
				var valueStrokeColor = '#ff3f00';
				var valueStrokeOpacity = 0.8;
				var valueFillColor = '#ff7f00';
				var valueFillOpacity = 0.2;
				if (feature.properties._weight != undefined) {
					valueStrokeWeight = feature.properties._weight;
				}
				if (feature.properties._color != undefined) {
					valueStrokeColor = feature.properties._color;
				}
				if (feature.properties._opacity != undefined) {
					valueStrokeOpacity = feature.properties._opacity;
				}
				if (feature.properties._fillColor != undefined) {
					valueFillColor = feature.properties._fillColor;
				}
				if (feature.properties._fillOpacity != undefined) {
					valueFillOpacity = feature.properties._fillOpacity;
				}
				var objStyle = {
					weight: valueStrokeWeight,
					color: valueStrokeColor,
					opacity: valueStrokeOpacity,
					fillColor: valueFillColor,
					fillOpacity: valueFillOpacity
				};
				if (feature.properties._stroke != undefined) {
					objStyle.stroke = feature.properties._stroke;
				}
				if (feature.properties._fill != undefined) {
					objStyle.fill = feature.properties._fill;
				}
				if (feature.properties._dashArray != undefined) {
					objStyle.dashArray = feature.properties._dashArray;
				}
				if (feature.properties._lineCap != undefined) {
					objStyle.lineCap = feature.properties._lineCap;
				}
				if (feature.properties._lineJoin != undefined) {
					objStyle.lineJoin = feature.properties._lineJoin;
				}
				return objStyle;
			},
			pointToLayer: function(feature, latlng){
				var layerFromGeoJsonPoint = null;
				var markerTitle = '';
				if (feature.properties.name != undefined) {
					markerTitle = feature.properties.name;
				} else if (feature.properties.id != undefined) {
					markerTitle = feature.properties.id;
				}
				if (feature.properties._markerType != undefined) {
					switch (feature.properties._markerType) {
						case "Icon":
							var valueIconUrl = null;
							var valueIconSize = [20,20];
							var valueIconAnchor = [10,10];
							if (feature.properties._iconUrl != undefined) {
								valueIconUrl = feature.properties._iconUrl;
							}
							if (feature.properties._iconSize != undefined) {
								valueIconSize = feature.properties._iconSize;
							}
							if (feature.properties._iconAnchor != undefined) {
								valueIconAnchor = feature.properties._iconAnchor;
							}
							var objIcon = null;
							if (valueIconUrl != null) {
								objIcon = L.icon({
									iconUrl: valueIconUrl,
									iconSize: valueIconSize,
									iconAnchor: valueIconAnchor
								});
							}
							if (objIcon != null) {
								layerFromGeoJsonPoint = L.marker(latlng, {
									icon: objIcon,
									title: markerTitle
								});
							} else {
								layerFromGeoJsonPoint = L.marker(latlng, {
									title: markerTitle
								});
							}
							break;
						case "DivIcon": // ★表示スタイルに問題あり
							var valueHtml ='';
							if (feature.properties._html != undefined) {
								valueHtml = feature.properties._html;
							}
							var objIcon = new L.divIcon({
								// className: 'leafan-div-icon',
								html: valueHtml
							});
							layerFromGeoJsonPoint = L.marker(latlng, {
								icon: objIcon,
								title: markerTitle
							});
							break;
						case "Circle":
							var valueRadius = 0;
							if (feature.properties._radius != undefined) {
								valueRadius = feature.properties._radius;
							}
							layerFromGeoJsonPoint = new L.Circle(latlng, {
								radius: valueRadius
							});
							break;
						case "CircleMarker":
							var valueRadius = 4;
							if (feature.properties._radius != undefined) {
								valueRadius = feature.properties._radius;
							}
							layerFromGeoJsonPoint = new L.CircleMarker(latlng, {
								radius: valueRadius
							});
							break;
						default:
							layerFromGeoJsonPoint = L.marker(latlng, {
								title: markerTitle
							});
					}
				} else {
					layerFromGeoJsonPoint = L.marker(latlng, {
						title: markerTitle
					});
				}
				return layerFromGeoJsonPoint;
			},
			onEachFeature: function(feature, marker){
				var mkr_html = "";
				var propertiesHtml = "";
				for (var propertyName in feature.properties) {
					if (propertyName.charAt(0) != '_') {
						var propertyNameAndValue = propertyName + " : " + feature.properties[propertyName];
						// JSONファイルの内容にJavaScriptが含まれる場合はエスケープする。
						if (propertyNameAndValue.search(/<script/i) != -1) {
							propertyNameAndValue = "JSON file contains script! The escaped content is below.<br />" + propertyNameAndValue.replace(/</g, "&lt;");
						}
						propertiesHtml += ("<div>" + propertyNameAndValue + "</div>");
					}
				}
				if (propertiesHtml != "") {
					mkr_html = "<h4 style=\"margin:0.5em 0em;\">このフィーチャの属性情報</h4>";
					mkr_html += ("<div style=\"margin:0.5em 0em;\">" + propertiesHtml + "</div>");
				} else {
					mkr_html = "<div style=\"margin:0.5em 0em;\">このフィーチャに属性情報はありません。</div>";
				}
				if ( (layout_type == 2) || (layout_type == 4) ) {  // ▼▼▼ Goma-Aw ▼▼▼
					var mkr_popup_msg = "<p style=\"margin:0.5em 0em;\">ここに関する情報を<br />表示しています。</p>";
					marker.bindPopup(mkr_popup_msg);
					marker.on('click', function() {
						description_set(mkr_html);
//						setColorbox(); // jQuery Colorbox のセット
					});
					marker.on('popupclose', function() {
						description_reset();
					});
				} else {  // ▲▲▲ Goma-Aw ▲▲▲ // ▼▼▼ 通常 ▼▼▼
					marker.bindPopup(mkr_html);
//					marker.on('click', function() {
//						setColorbox(); // jQuery Colorbox のセット
//					});
				}  // ▲▲▲ 通常 ▲▲▲
			}
		});
		if (jsonLayerVisibility[jsonLayerIndex] == true) {
			jsonLayers[jsonLayerIndex].addTo(map);
		}
		var overlaysArray = [];
		for (var i = 0 ; i < markers.length; i++) {
			if (markers[i].length > 0) {
				overlaysArray[layerName[i]] = L.layerGroup(markers[i]);
			}
		}
		if (jsonLayers.length == 1) {
			if (jsonLayerName[0] == "") {
				overlaysArray["GeoJSON レイヤ"] = jsonLayers[0];
			} else {
				overlaysArray[jsonLayerName[0] + " (GeoJSON)"] = jsonLayers[0];
			}
		} else {
			for (var i = 0 ; i < jsonLayers.length; i++) {
				if (jsonLayerName[i] == "") {
					overlaysArray["GeoJSON " + (i + 1)] = jsonLayers[i];
				} else {
					overlaysArray[jsonLayerName[i] + " (GeoJSON " + (i + 1) + ")"] = jsonLayers[i];
				}
			}
		}
		if (controlLayers != null) {
			map.removeControl(controlLayers);
		}
		controlLayers = L.control.layers(baseLayersArray, overlaysArray);
		controlLayers.addTo(map);
		for (var i = 0 ; i < markers.length; i++) {
			if ( (layerVisibility[i] == true) && (markers[i].length > 0) ) {
				map.addLayer(overlaysArray[layerName[i]]);
			}
		}
	} else {
			alert ("GeoJSONファイルを取得できませんでした。");
	}
}

function getBaseLayerId(objBaseLayer) {
	var baseLayerId = '';
	for (var i = 0; i < baseLayerIdsArray.length; i++) {
		if (baseLayer[baseLayerIdsArray[i]] == objBaseLayer) {
			baseLayerId = baseLayerIdsArray[i];
		}
	}
	return baseLayerId;
}

function jump(lat, lng, z) {
	var new_lat = 0; var new_lng = 0; var new_zoom = 0;
	if ( (lat != null) && (lat > -85) && (lat < 85) ) {
		new_lat = lat;
	} else {
		new_lat = map.getCenter().lat;
	}
	if ( (lng != null) && (lng >= -180) && (lng <= 180) ) {
		new_lng = lng;
	} else {
		new_lng = map.getCenter().lng;
	}
	if ( (z != null) && (z > 0) && (z < 22) ) {
		if (z > zoom_max) {z = zoom_max;}
		if (z < zoom_min) {z = zoom_min;}
		new_zoom = z;
	} else {
		new_zoom = map.getZoom();
	}
	map.setView(L.latLng(new_lat, new_lng), new_zoom);
}

function changeMap(requestedMapName) {
	var requestedMapTypeId = mapTypeIdFromNameWord(requestedMapName);
	if (requestedMapTypeId != null) {
		map.removeLayer(currentBaseLayer);
		map.addLayer(baseLayer[requestedMapTypeId]);
	} else {
		alert("Invalid Map Type !");
	}
}

// ▼▼▼ 現在位置の取得・表示に使用する関数 ▼▼▼
function geolocationSetup() {
	if ( (use_geolocation == true) && (navigator.geolocation) ) {
		var positionMarkerImage = L.icon({
			iconUrl: current_position_image_file,
		//	iconRetinaUrl: current_position_image_file,
			iconSize: [16, 16],
			iconAnchor: [8, 8],
		});
		positionMarker = new L.marker(L.latLng(0, 0), {
			icon: positionMarkerImage,
			zIndexOffset: -100,
			clickable:false
		});
		positionCircle = L.circle(L.latLng(0, 0), 0, {
			color: '#007fff',
			opacity: 0.3,
			weight: 3,
			fillColor: '#007fff',
			fillOpacity: 0.1,
			clickable: false
		});
		geolocationSetCheckboxControl();
	} else {
		use_geolocation = false;
	}
}

function geolocationSetCheckboxControl() {
		var controlGeolocation = L.control();
		controlGeolocation.onAdd = function(map) {
			var customControlDiv_Geolocation = document.createElement('DIV');
			customControlDiv_Geolocation.style.padding = '5px 10px';
			var customControlBox_Geolocation = document.createElement('DIV');
			customControlBox_Geolocation.style.backgroundColor = '#ffffff';
			customControlBox_Geolocation.style.borderRadius = '4px';
			customControlBox_Geolocation.style.boxShadow = '0px 0px 2px 2px rgba(0,0,0,0.22)';
			customControlBox_Geolocation.style.padding = '8px';
			customControlBox_Geolocation.style.fontSize = '12px';
			var customControl_Div1 = document.createElement('DIV');
			var customControl_Label1 = document.createElement('LABEL');
			// elementCheckboxGeolocation はグローバル変数
			elementCheckboxGeolocation = document.createElement('INPUT');
			elementCheckboxGeolocation.type = 'checkbox';
			elementCheckboxGeolocation.onclick = function() {geolocationCheckboxClicked()};
			var elementSpanText0 = document.createElement('SPAN');
			elementSpanText0.textContent = ' ';
			var elementSpanText1 = document.createElement('SPAN');
			elementSpanText1.textContent = '現在地表示';
			customControl_Label1.appendChild(elementCheckboxGeolocation);
			customControl_Label1.appendChild(elementSpanText0);
			customControl_Label1.appendChild(elementSpanText1);
			customControl_Div1.appendChild(customControl_Label1);
			var customControl_Div2 = document.createElement('DIV');
			var customControl_Label2 = document.createElement('LABEL');
			// elementCheckboxGeolocationFollow はグローバル変数
			elementCheckboxGeolocationFollow = document.createElement('INPUT');
			elementCheckboxGeolocationFollow.type = 'checkbox';
			if (followCurrentLocation == true) {
				elementCheckboxGeolocationFollow.checked = true;
			}
			elementCheckboxGeolocationFollow.disabled = true;
			var elementSpanText0 = document.createElement('SPAN');
			elementSpanText0.textContent = ' ';
			var elementSpanText2 = document.createElement('SPAN');
			elementSpanText2.textContent = '現在地追従';
			customControl_Label2.appendChild(elementCheckboxGeolocationFollow);
			customControl_Label2.appendChild(elementSpanText0);
			customControl_Label2.appendChild(elementSpanText2);
			customControl_Div2.appendChild(customControl_Label2);
			customControlBox_Geolocation.appendChild(customControl_Div1);
			customControlBox_Geolocation.appendChild(customControl_Div2);
			// コントロールの設置
			L.DomEvent.disableClickPropagation(customControlBox_Geolocation);
			L.DomEvent.disableScrollPropagation(customControlBox_Geolocation);
			customControlDiv_Geolocation.appendChild(customControlBox_Geolocation);
			return customControlDiv_Geolocation;
		};
		controlGeolocation.setPosition('topleft');
		controlGeolocation.addTo(map);
}

function geolocationCheckboxClicked() {
	if (elementCheckboxGeolocation.checked == true) {
		geolocationGetPosition();
	} else {
		geolocationClearPosition();
	}
}

function geolocationGetPosition() {
	if ( (use_geolocation == true) && (navigator.geolocation) ) {
		navigator.geolocation.getCurrentPosition(geolocationGetPositionSuccess, geolocationGetPositionError, {enableHighAccuracy: true});
	} else {
		use_geolocation = false;
		alert("位置情報を取得する機能が利用できません。");
	}
}

function geolocationGetPositionSuccess(position) {
	if (map.hasLayer(positionMarker) == true) {
		map.removeLayer(positionMarker);
	}
	if (map.hasLayer(positionCircle) == true) {
		map.removeLayer(positionCircle);
	}
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var acc = position.coords.accuracy;
	positionMarker.setLatLng(L.latLng(lat, lng));
	positionCircle.setLatLng(L.latLng(lat, lng));
	positionCircle.setRadius(acc);
	// 底が2，真数が［世界地図１辺の長さ÷表示タイル１辺の長さ］である対数値を，小数部分を切り捨てて整数化
	var zoom = Math.floor(Math.log(40000000 * Math.cos(lat * (Math.PI / 180)) / acc) / Math.log(2.0));
	if (zoom < 0) {zoom = 0;}
	if (zoom > 17) {zoom = 17;}
	map.setView(L.latLng(lat, lng), zoom);
	positionMarker.addTo(map);
	positionCircle.addTo(map);
	// 継続的な位置監視
	elementCheckboxGeolocationFollow.disabled = false;
	// geolocationWatchId はグローバル変数
	geolocationWatchId = navigator.geolocation.watchPosition(geolocationWatchPositionSuccess, null, {enableHighAccuracy: true});
}

function geolocationWatchPositionSuccess(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var acc = position.coords.accuracy;
	positionMarker.setLatLng(L.latLng(lat, lng));
	positionCircle.setLatLng(L.latLng(lat, lng));
	positionCircle.setRadius(acc);
	if (elementCheckboxGeolocationFollow.checked == true) {
	//	var currentViewBounds = map.getBounds();
	//	if (currentViewBounds.contains(L.latLng(lat, lng)) == false) {
			map.panTo(L.latLng(lat, lng));
	//	}
	}
}

function geolocationGetPositionError(err) {
	if (map.hasLayer(positionMarker) == true) {
		map.removeLayer(positionMarker);
	}
	if (map.hasLayer(positionCircle) == true) {
		map.removeLayer(positionCircle);
	}
	elementCheckboxGeolocation.checked = false;
	var errorMessage = "";
	switch ( err.code ) {
		case 1:
			errorMessage = "位置情報の使用許可が得られませんでした。";
			break;
		case 2:
			errorMessage = "デバイスの位置が判定できませんでした。";
			break;
		case 3:
			errorMessage = "位置情報の取得に時間がかかりすぎ、タイムアウトしました。";
			break;
		default:
			errorMessage = "不明";
	}
	alert("位置情報が取得できませんでした。\n理由：" + errorMessage);
}

function geolocationClearPosition() {
	if (geolocationWatchId != null) {
		navigator.geolocation.clearWatch(geolocationWatchId);
		geolocationWatchId = null;
	}
	elementCheckboxGeolocationFollow.disabled = true;
	if (map.hasLayer(positionMarker) == true) {
		map.removeLayer(positionMarker);
	}
	if (map.hasLayer(positionCircle) == true) {
		map.removeLayer(positionCircle);
	}
}
// ▲▲▲ 現在位置の取得・表示に使用する関数 ▲▲▲

// ▼▼▼ 検索機能組込の場合のみ使用する関数 ▼▼▼
function htmlSearchBox() {
	var html = "";
	html += '<div>';
	html += '<div style=\"font-size:100%;\">地名(住所)で地図を検索</div>';
	html += '<form action=\"#\" method=\"post\" onsubmit=\"searchPlace(this.place.value, this.prefecture.value); return false;\">';
	html += '<input type=\"text\" id=\"place\" name=\"place\" size=\"18\" maxlength=\"2048\" value=\"\" title=\"地名(住所)を入力\"> ';
	html += '<input type=\"submit\" value=\"検索\">';
	html += '<br>';
//	html += '<input type=\"hidden\" name=\"prefecture\" value=\"\">'; // 都道府県の選択を使用しない場合
	html += '<span style=\"font-size:70%;\">都道府県</span> ';
	html += '<select id=\"prefecture\" name=\"prefecture\">';
	html += '<option value=\"\">指定なし</option>';
	html += '<option value=\"北海道\">北海道</option>';
	html += '<option value=\"青森県\">青森県</option>';
	html += '<option value=\"岩手県\">岩手県</option>';
	html += '<option value=\"宮城県\">宮城県</option>';
	html += '<option value=\"秋田県\">秋田県</option>';
	html += '<option value=\"山形県\">山形県</option>';
	html += '<option value=\"福島県\">福島県</option>';
	html += '<option value=\"茨城県\">茨城県</option>';
	html += '<option value=\"栃木県\">栃木県</option>';
	html += '<option value=\"群馬県\">群馬県</option>';
	html += '<option value=\"埼玉県\">埼玉県</option>';
	html += '<option value=\"千葉県\">千葉県</option>';
	html += '<option value=\"東京都\">東京都</option>';
	html += '<option value=\"神奈川県\">神奈川県</option>';
	html += '<option value=\"新潟県\">新潟県</option>';
	html += '<option value=\"富山県\">富山県</option>';
	html += '<option value=\"石川県\">石川県</option>';
	html += '<option value=\"福井県\">福井県</option>';
	html += '<option value=\"山梨県\">山梨県</option>';
	html += '<option value=\"長野県\">長野県</option>';
	html += '<option value=\"岐阜県\">岐阜県</option>';
	html += '<option value=\"静岡県\">静岡県</option>';
	html += '<option value=\"愛知県\">愛知県</option>';
	html += '<option value=\"三重県\">三重県</option>';
	html += '<option value=\"滋賀県\">滋賀県</option>';
	html += '<option value=\"京都府\">京都府</option>';
	html += '<option value=\"大阪府\">大阪府</option>';
	html += '<option value=\"兵庫県\">兵庫県</option>';
	html += '<option value=\"奈良県\">奈良県</option>';
	html += '<option value=\"和歌山県\">和歌山県</option>';
	html += '<option value=\"鳥取県\">鳥取県</option>';
	html += '<option value=\"島根県\">島根県</option>';
	html += '<option value=\"岡山県\">岡山県</option>';
	html += '<option value=\"広島県\">広島県</option>';
	html += '<option value=\"山口県\">山口県</option>';
	html += '<option value=\"徳島県\">徳島県</option>';
	html += '<option value=\"香川県\">香川県</option>';
	html += '<option value=\"愛媛県\">愛媛県</option>';
	html += '<option value=\"高知県\">高知県</option>';
	html += '<option value=\"福岡県\">福岡県</option>';
	html += '<option value=\"佐賀県\">佐賀県</option>';
	html += '<option value=\"長崎県\">長崎県</option>';
	html += '<option value=\"熊本県\">熊本県</option>';
	html += '<option value=\"大分県\">大分県</option>';
	html += '<option value=\"宮崎県\">宮崎県</option>';
	html += '<option value=\"鹿児島県\">鹿児島県</option>';
	html += '<option value=\"沖縄県\">沖縄県</option>';
	html += '</select>';
	html += '</form>';
	html += '<div style=\"margin-top:0.5em; font-size:70%; line-height:120%;\">';
	html += '<a href=\"https://geocode.csis.u-tokyo.ac.jp/\" target=\"_blank\">';
	html += 'CSISシンプルジオコーディング実験';
	html += '</a>';
	html += 'を利用';
	html += '</div>';
	html += '</div>';
	return html;
}

function setSearchFunction() {
	searchPopup = L.popup();
	searchPopup.on('remove', function() {
		clearSearchQuery();
	});
}

function clearSearchQuery() {
	if (searchKeepQuery != true) {
		searchQuery = "";
		searchPref = "";
		if (document.getElementById("place")) {
			document.getElementById("place").value = "";
			document.getElementById("place").blur();
		}
		if (document.getElementById("prefecture")) {
			document.getElementById("prefecture").options[0].selected = true;
		}
	}
}

function searchPlace(queryString, queryPref) {
	if (queryString == undefined || queryString == null) {
		queryString = "";
	}
	if (queryPref == undefined || queryPref == null) {
		queryPref = "";
	}
	if ((queryString != "") && (queryString == searchQuery) && (queryPref == searchPref) ) {
		if (searchIndex < searchResult.length - 1) {
			showSearchResult(1);
		} else {
			showSearchResult(0);
		}
	} else {
		if (searchPopup.isOpen()) {
			searchKeepQuery = true;
			map.closePopup(searchPopup);
			searchKeepQuery = false;
		}
		if (queryString != "") {
			var geocoderUrl = "";
			geocoderUrl += "https://geocode.csis.u-tokyo.ac.jp/cgi-bin/simple_geocode.cgi";
			geocoderUrl += "?addr=";
			geocoderUrl += queryString;
			if (queryPref != "") {
				geocoderUrl += "&constraint=";
				geocoderUrl += queryPref;
			}
			geocoderUrl += "&charset=UTF8";
			downloadText(geocoderUrl, geocoderResult, true, [queryString, queryPref], true);
		}
	}
}

function geocoderResult(resultXml, queryStringAndPref) {
	searchResult = [];
	if ( (resultXml != undefined) && (resultXml != null) ) {
		if (resultXml.getElementsByTagName('results').length > 0) {
			var candidates_length = resultXml.getElementsByTagName('candidate').length;
			for (var i = 0 ; i < candidates_length; i++) {
				var candidate = resultXml.getElementsByTagName('candidate').item(i);
				var candidateAddress = "";
				var elmsAddress = candidate.getElementsByTagName('address');
				if ( (elmsAddress.length > 0) && (elmsAddress.item(0).childNodes[0] != null) ) {
					candidateAddress = elmsAddress.item(0).childNodes[0].nodeValue;
				}
				var candidateLongitude = "";
				var elmsLongitude = candidate.getElementsByTagName('longitude');
				if ( (elmsLongitude.length > 0) && (elmsLongitude.item(0).childNodes[0] != null) ) {
					candidateLongitude = elmsLongitude.item(0).childNodes[0].nodeValue;
				}
				var candidateLatitude = "";
				var elmsLatitude = candidate.getElementsByTagName('latitude');
				if ( (elmsLatitude.length > 0) && (elmsLatitude.item(0).childNodes[0] != null) ) {
					candidateLatitude = elmsLatitude.item(0).childNodes[0].nodeValue;
				}
				var candidateILvl = "";
				var elmsILvl = candidate.getElementsByTagName('iLvl');
				if ( (elmsILvl.length > 0) && (elmsILvl.item(0).childNodes[0] != null) ) {
					candidateILvl = elmsILvl.item(0).childNodes[0].nodeValue;
				}
				if ((candidateAddress != "") && (candidateLongitude != "") && (candidateLatitude != "") && (candidateILvl != "")) {
					if ( !(isNaN(candidateLongitude - 0)) && !(isNaN(candidateLatitude - 0)) && (candidateILvl >= 0) ) {
						var candidateData = [];
						candidateData[0] = candidateAddress;
						candidateData[1] = candidateLongitude - 0;
						candidateData[2] = candidateLatitude - 0;
						candidateData[3] = candidateILvl - 0;
						searchResult.push(candidateData);
					}
				}
			}
		}
		if (searchResult.length > 0) {
			searchQuery = queryStringAndPref[0];
			searchPref = queryStringAndPref[1];
			searchIndex = 0;
			showSearchResult(0);
		} else {
			var msg = "";
			msg += "「" + queryStringAndPref[0] + "」の場所は";
			if (queryStringAndPref[1] != "") {
				msg += queryStringAndPref[1] + "に";
			}
			msg += "見つかりませんでした。";
			alert(msg);
			clearSearchQuery();
		}
	} else {
		var msg = "";
		msg += "エラー！\n";
		msg += "「" + queryStringAndPref[0] + "」の場所を検索することができませんでした。";
		alert(msg);
		clearSearchQuery();
	}
}

function showSearchResult(request) {
	if (request == 1) {
		searchIndex += 1;
		if (searchIndex > searchResult.length - 1) {
			searchIndex = searchResult.length - 1;
		}
	} else if (request == -1) {
		searchIndex -= 1;
		if (searchIndex < 0) {
			searchIndex = 0;
		}
	} else if (request == 0) {
		searchIndex = 0;
	}
	var resultAddrRaw = searchResult[searchIndex][0];
	var resultAddr = resultAddrRaw.replace(/\//g, ' ');
	var resultLng = searchResult[searchIndex][1];
	var resultLat = searchResult[searchIndex][2];
	var resultLvl = searchResult[searchIndex][3];
	var popupHtml = "<div>" + resultAddr + "</div>";
	if ( (searchIndex > 0) || (searchIndex < searchResult.length - 1) ) {
		popupHtml += "<div style=\"margin-top:1em;\">";
		if (searchIndex > 0) {
			popupHtml += "<span style=\"color:blue; cursor:pointer;\" onclick=\"showSearchResult(-1);\">≪ 前の検索結果</span>";
		}
		if ( (searchIndex > 0) && (searchIndex < searchResult.length - 1) ) {
			popupHtml += "<span style=\"color:gray; cursor:default;\"> || </span>";
		}
		if (searchIndex < searchResult.length - 1) {
			popupHtml += "<span style=\"color:blue; cursor:pointer;\" onclick=\"showSearchResult(1);\">次の検索結果 ≫</span>";
		}
		popupHtml += "</div>";
	}
	var popupHtmlElement = document.createElement('DIV');
	popupHtmlElement.innerHTML = popupHtml;
	L.DomEvent.disableClickPropagation(popupHtmlElement);
	var zoom = map.getZoom();
	switch (resultLvl) {
		case 1: // 都道府県
			zoom = 7;
			break;
		case 2: // 郡・支庁・振興局
			zoom = 8;
			break;
		case 3: // 市町村・特別区（東京23区）
			zoom = 12;
			break;
		case 4: // 政令市の区
			zoom = 13;
			break;
		case 5: // 大字
			zoom = 14;
			break;
		case 6: //  丁目・小字
			zoom = 15;
			break;
		case 7: // 街区・地番
			zoom = 16;
			break;
		case 8: // 号・枝番
			zoom = 17;
			break;
		default:
			if (zoom < 7) {
				zoom = 7;
			} else if (zoom > 14) {
				zoom = 14
			}
			break;
	}
	map.setView(L.latLng(resultLat, resultLng), zoom);
	searchPopup.setLatLng(L.latLng(resultLat, resultLng));
	searchPopup.setContent(popupHtmlElement);
	map.openPopup(searchPopup);
}
// ▲▲▲ 検索機能組込の場合のみ使用する関数 ▲▲▲

function writeInitialUrl() {
	var url = location.protocol + "//" + location.host + location.pathname + location.search;
	var link_description = "<a href=\"" + url + "\">" + url + "</a>";
	if (document.getElementById("link_url")) {
		document.getElementById("link_url").innerHTML = link_description;
	}
}

function writeUrl() {
	var lat0raw = map.getCenter().lat;
	var lng0raw = map.getCenter().lng;
	while (lng0raw < -180) {lng0raw += 360;}
	while (lng0raw > 180) {lng0raw -= 360;}
	var lat_center = Math.round(lat0raw * 1000000) / 1000000;
	var lng_center = Math.round(lng0raw * 1000000) / 1000000;
	var zoom = map.getZoom();
	var map_type_code = "";
	switch (getBaseLayerId(currentBaseLayer)) {
		case "GSIstd":
			map_type_code = "gsistd";
			break;
		case "GSIpale":
			map_type_code = "gsipale";
			break;
		case "GSIenglish":
			map_type_code = "english";
			break;
		case "GSIrelief":
			map_type_code = "relief";
			break;
		case "GSIhillshade":
			map_type_code = "hillshade";
			break;
		case "GSIphoto":
			map_type_code = "gsiphoto";
//			map_type_code = "k";
			break;
		case "GSIort":
			map_type_code = "gsiort";
			break;
		case "GSIgazo1":
			map_type_code = "gsigazo1";
			break;
		case "GSIgazo2":
			map_type_code = "gsigazo2";
			break;
		case "GSIgazo3":
			map_type_code = "gsigazo3";
			break;
		case "GSIgazo4":
			map_type_code = "gsigazo4";
			break;
		case "GSIortOld10":
			map_type_code = "gsiortold10";
			break;
		case "GSIortUSA10":
			map_type_code = "gsiortusa10";
			break;
		case "GSItoho1":
			map_type_code = "gsitoho1";
			break;
		case "GSItoho2":
			map_type_code = "gsitoho2";
			break;
		case "OSM":
			map_type_code = "osm";
//			map_type_code = "m";
			break;
		case "Coordinate":
			map_type_code = "coord";
			break;
		case "CoordinateSw":
			map_type_code = "coordsw";
			break;
		case "White":
			map_type_code = "white";
			break;
		default:
			if (use_ext_tile == true) {
				map_type_code = extMapTypeCodeForUrl( getBaseLayerId(currentBaseLayer) );
			}
			break;
	}
	var visibility_marker_code = "";
	if (visibility_marker == false) {
		visibility_marker_code = "n";
	}
	var use_search_box_code = "";
	if (use_search_box == true) {
		use_search_box_code = "y";
	} else {
		use_search_box_code = "n";
	}
	var use_link_url_code = "y";
	var url = location.protocol + "//" + location.host + location.pathname;
	url += "?ll=" + lat_center + "," + lng_center;
	url += "&z=" + zoom;
	if (url_arg_data != "") {
		url += "&data=" + url_arg_data;
	}
	if (url_arg_file != "") {
		url += "&file=" + url_arg_file;
	}
	if (map_type_code != "") {
		url += "&t=" + map_type_code;
	}
	if (visibility_marker_code != "") {
		url += "&vm=" + visibility_marker_code;
	}
//	url += "&search=" + use_search_box_code;
//	url += "&url=" + use_link_url_code;
	var link_description = "<a href=\"" + url + "\">" + url + "</a>";
	if (document.getElementById("link_url")) {
		document.getElementById("link_url").innerHTML = link_description;
	}
}

function getUrlArg() {
	var url_arg = [];
	url_arg["ll"] = ""; url_arg["z"] = ""; url_arg["t"] = "";
	url_arg["data"] = ""; url_arg["file"] = ""; url_arg["cache"] = "";
	url_arg["vm"] = ""; url_arg["vo"] = "";
	url_arg["search"] = ""; url_arg["url"] = ""; url_arg["location"] = ""; url_arg["side"] = "";
	var url_arg_str = location.search.substr(1).split('&');
	for (var i = 0; i < url_arg_str.length; i++) {
		var s = url_arg_str[i].split('=');
		url_arg[s[0]] = decodeURIComponent(s[1]);
	}
	var ll = url_arg["ll"].split(',');
	if ( (ll[0] != "") && !(isNaN(ll[0] - 0)) && (ll[1] != "") && !(isNaN(ll[1] - 0)) ) {
		if ( (ll[0] >= -90) && (ll[0] <= 90) && (ll[1] >= -180) && (ll[1] <= 180) ) {
			center_lat = ll[0];
			center_lng = ll[1];
		}
	}
	if ( (url_arg["z"] != "") && !(isNaN(url_arg["z"] - 0)) ) {
		if ( (url_arg["z"] >= 0) && (url_arg["z"] <= 21) ) {
			map_zoom = parseInt(url_arg["z"], 10);
		}
	}
	if (url_arg["t"] != "") {
		if (mapTypeIdFromNameWord(url_arg["t"]) != null) {
			map_type_id = mapTypeIdFromNameWord(url_arg["t"]);
		}
	}
	if (url_arg["data"] != "") {
		if (url_arg["data"].match(/^[\w\-\.\/]+$/)) {
			url_arg_data = url_arg["data"];
			data_dir = url_arg_data;
			if ( !(data_dir.match(/\/$/)) ) {
				data_dir += "/";
			}
		}
	}
	if (url_arg["file"] != "") {
		if (url_arg["file"].match(/^[\w\-][\w\-\.]*$/)) {
			url_arg_file = url_arg["file"];
			data_file = url_arg_file;
			if ( data_file.match(/\.$/) ) {  // ファイル名末尾がピリオド
				data_file += "txt";
			}
			if ( !(data_file.match(/\./)) ) {  // ファイル名に拡張子なし
				data_file += ".txt";
			}
			if ( !(data_file.match(/\.txt$/i)) ) {  // ファイル名末尾が .txt 以外
			//	data_file += ".txt";
			}
		}
	}
	switch ( url_arg["cache"] ) {
		case "refresh":
		case "reload":
		case "no":
		case "n":
			cache_refresh = true;
			break;
	}
	switch ( url_arg["vm"] ) {
		case "yes":
		case "y":
			visibility_marker = true;
			break;
		case "no":
		case "n":
			visibility_marker = false;
			break;
	}
	switch ( url_arg["search"] ) {
		case "yes":
		case "y":
			use_search_box = true;
			break;
		case "no":
		case "n":
			use_search_box = false;
			break;
	}
	switch ( url_arg["url"] ) {
		case "yes":
		case "y":
			use_link_url = true;
			break;
		case "no":
		case "n":
			use_link_url = false;
			break;
	}
	switch ( url_arg["location"] ) {
		case "yes":
		case "y":
			use_geolocation = true;
			break;
		case "no":
		case "n":
			use_geolocation = false;
			break;
	}
	switch ( url_arg["side"] ) {
		case "yes":
		case "y":
			sideBarVisibility = true;
			break;
		case "no":
		case "n":
			sideBarVisibility = false;
			break;
	}
}

function downloadText(url, funcAfterDownload, forXml, forwardingArg, useCache) {
	var httpObj = null; var httpObjType = null;
	try {
		httpObj = new XMLHttpRequest();
		httpObjType = "XMLHttpRequest";
	} catch (e) {
		try {
			httpObj = new ActiveXObject("Msxml2.XMLHTTP");
			httpObjType = "Msxml2.XMLHTTP";
		} catch (e) {
			try {
				httpObj = new ActiveXObject("Microsoft.XMLHTTP");
				httpObjType = "Microsoft.XMLHTTP";
			} catch (e) {
				httpObj = null; httpObjType = null;
			}
		}
	}
	if (httpObj) {
		httpObj.onreadystatechange = function() {
			if (httpObj.readyState == 4) {
				var loadedContents = null; var httpStatusCode = null; var httpStatusText = null;
				try {
					if (httpObj.status == 200) {
						if (forXml == true) {
							loadedContents = httpObj.responseXML;
						} else {
							loadedContents = httpObj.responseText;
						}
					}
					httpStatusCode = httpObj.status;
					httpStatusText = httpObj.statusText;
				} catch (e) {
					httpStatusCode = 0;
				}
				if (httpStatusCode == 200) {
					funcAfterDownload(loadedContents, forwardingArg);
				} else {
					alert("Failed in downloading data.\n\n" + "http status: " + httpStatusCode + " " + httpStatusText + "\n\nURL: " + url);
				}
			}
		};
		httpObj.open('GET', url, true);
		if ( !(useCache == true) || (cache_refresh == true) ) {
			httpObj.setRequestHeader('Pragma', 'no-cache');
			httpObj.setRequestHeader('Cache-Control', 'no-cache');
			httpObj.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
		}
		httpObj.send(null);
	} else {
		alert("Failed in downloading a data file.\n\n" + "Cannot send the HTTP request.");
	}
	return httpObjType;
}

window.onload = load;
