var ext_tile_script_version_info = "Leaf-Tile version 1.2.04.20240216";
var ext_tile_script_author_info  = "by SATO Takanori, 2016-2024";

var use_ext_tile = true;

// 本体 mapTypeIdFromNameWord関数から
function extMapTypeIdFromNameWord(word) {
	var id = null;
	switch ( word.toLowerCase() ) {
		case "gsiair":
		case "air":
		case "airphoto":
			id = "GSIair";
			break;
		case "gsislope":
		case "gsislopemap":
		case "slope":
		case "slopemap":
			id = "GSIslope";
			break;
		case "gsilcm25k":
		case "gsilcm":
		case "lcm":
		case "land condition":
		case "landcondition":
			id = "GSIlcm25k";
			break;
		case "gsilum4bl":
		case "gsilum":
		case "lum":
		case "land use":
		case "landuse":
			id = "GSIlum4bl";
			break;
		case "narokanto":
		case "naro":
		case "findshawmskanto":
		case "findshawms":
		case "hawms":
		case "hawmskanto":
		case "jinsoku":
			id = "NaroKanto";
			break;
		case "narotokyo":
			id = "NaroTokyo";
			break;
		case "kjmap2man":
		case "meiji2man":
		case "meiji":
			id = "Kjmap2man";
			break;
		case "kjmap25k1920":
		case "25k1920":
			id = "Kjmap25k1920";
			break;
		case "kjmap25k1930":
		case "25k1930":
			id = "Kjmap25k1930";
			break;
		case "kjmap25k1950":
		case "25k1950":
			id = "Kjmap25k1950";
			break;
		case "kjmap25k1970":
		case "25k1970":
			id = "Kjmap25k1970";
			break;
		case "kjmap50k1910":
		case "50k1910":
			id = "Kjmap50k1910";
			break;
		case "kjmap50k1940":
		case "50k1940":
			id = "Kjmap50k1940";
			break;
		case "gsisaigai": // 互換性のため残留
		case "gsi2015flood":
			id = "GSI2015flood";
			break;
		case "gsi2018rain":
			id = "GSI2018rain";
			break;
		case "gsi2018rain0709":
			id = "GSI2018rain0709";
			break;
		case "gsi2018flood":
			id = "GSI2018flood";
			break;
		case "gsilcmfc":
		case "gsilcmfc2":
			id = "GSIlcmfc2";
			break;
		case "fault":
		case "afm":
		case "gsiafm":
			id = "GSIafm";
			break;
		case "flood":
		case "flood1":
		case "hazardflood1":
			id = "HazardFlood1";
			break;
		case "flood2":
		case "hazardflood2":
			id = "HazardFlood2";
			break;
		case "debrisflow":
		case "hazardflow":
		case "hazarddebrisflow":
			id = "HazardFlow";
			break;
		case "steepslope":
		case "hazardslope":
		case "hazardsteepslope":
			id = "HazardSlope";
			break;
		case "landslide":
		case "hazardlandslide":
			id = "HazardLandslide";
			break;
		case "tnm":
		case "tnmtopo":
		case "usgs":
		case "usgstopo":
		case "tnmusgstopo":
			id = "TNMusgsTopo";
			break;
		case "tnmimagery":
		case "tnmimageryonly":
		case "usgsimagery":
		case "usgsimageryonly":
		case "tnmusgsimageryonly":
			id = "TNMusgsImageryOnly";
			break;
		case "tnmimagerytopo":
		case "usgsimagerytopo":
		case "tnmusgsimagerytopo":
			id = "TNMusgsImageryTopo";
			break;
		case "swiss":
		case "swiss color":
		case "swisscolor":
		case "swisstopo":
		case "swisstopo color":
		case "swisstopocolor":
			id = "SwissTopoColor";
			break;
		case "swiss gray":
		case "swiss grey":
		case "swissgray":
		case "swissgrey":
		case "swisstopo gray":
		case "swisstopo grey":
		case "swisstopogray":
		case "swisstopogrey":
			id = "SwissTopoGray";
			break;
		case "swiss image":
		case "swisstopo image":
		case "swisstopoimage":
			id = "SwissTopoImage";
			break;
		case "hgoto_kinugawa":
		case "hgotokinugawa":
			id = "hgotoKinugawa";
			break;
		case "age65":
		case "censusage65":
			id = "CensusAge65";
			break;
		case "age65o":
		case "censusage65o":
			id = "CensusAge65o";
			break;
	}
	return id;
}

// 本体 mapTypeIdFromNameWordOverlay関数（Leaf-PO専用）から
function extMapTypeIdFromNameWordOverlay(word) {
	var id = null;
	switch ( word.toLowerCase() ) {
		case "gsiair":
		case "air":
		case "airphoto":
			id = "GSIairo";
			break;
	}
	return id;
}

// 本体 mapSourceNote関数から
function extMapSourceNoteProcess1() {
	useMapNote['NaroKanto'] = false;
	useMapNote['NaroTokyo'] = false;
	useMapNote['Kjmap'] = false;
	useMapNote['GSIafm'] = false;
	useMapNote['Hazard'] = false;
	useMapNote['TnmUsgs'] = false;
	useMapNote['swisstopo'] = false;
	useMapNote['hgoto'] = false;
	useMapNote['Census2010'] = false;
	useMapNote['WorldBank'] = false;
	useMapNote['Census2010+WorldBank'] = false;
	useMapNote['NaturalEarth'] = false;
	useMapLegend['GSIlcm25k'] = false;
	useMapLegend['GSIlum4bl'] = false;
	useMapLegend['GSIlcmfc2'] = false;
	useMapLegend['GSIafm'] = false;
}

// 本体 mapSourceNote関数から
function extMapSourceNoteProcess2(mapTypeId) {
		switch ( mapTypeId ) {
			case "GSIair":
				useMapNote['GSI'] = true;
				useMapNote['GSI5M'] = true; useMapNote['GSI5M_j'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapNote['GSIphotoScale'] = true;
				break;
			case "GSIslope":
				useMapNote['GSI'] = true;
				break;
			case "GSIlcm25k":
				useMapNote['GSI'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapLegend['GSIlcm25k'] = true;
				break;
			case "GSIlum4bl":
				useMapNote['GSI'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapLegend['GSIlum4bl'] = true;
				break;
			case "NaroKanto":
				useMapNote['NaroKanto'] = true;
				break;
			case "NaroTokyo":
				useMapNote['NaroTokyo'] = true;
				break;
			case "Kjmap2man":
			case "Kjmap25k1920":
			case "Kjmap25k1930":
			case "Kjmap25k1950":
			case "Kjmap25k1970":
			case "Kjmap50k1910":
			case "Kjmap50k1940":
				useMapNote['Kjmap'] = true;
				break;
			case "GSI2015flood":
			case "GSI2018rain":
			case "GSI2018rain0709":
				useMapNote['GSI'] = true;
				break;
			case "GSI2018flood":
				useMapNote['GSI'] = true; useMapNote['GSIrelief'] = true;
				break;
			case "GSIlcmfc2":
				useMapNote['GSI'] = true;
				useMapLegend['GSIlcmfc2'] = true;
				break;
			case "GSIafm":
				useMapNote['GSI'] = true; useMapNote['GSI_VMAP0'] = true;
				useMapNote['GSIafm'] = true;
				useMapLegend['GSIafm'] = true;
				break;
			case "HazardFlood1":
			case "HazardFlood2":
			case "HazardFlow":
			case "HazardSlope":
			case "HazardLandslide":
				useMapNote['Hazard'] = true;
				break;
			case "hgotoKinugawa":
				useMapNote['hgoto'] = true;
				break;
			case "CensusAge65":
//				useMapNote['Census2010'] = true; useMapNote['WorldBank'] = true;
				useMapNote['Census2010+WorldBank'] = true;
				useMapNote['NaturalEarth'] = true;
				break;
			case "CensusAge65o":
				useMapNote['GSI'] = true; useMapNote['GSI_VMAP0'] = true;
//				useMapNote['Census2010'] = true; useMapNote['WorldBank'] = true;
				useMapNote['Census2010+WorldBank'] = true;
				useMapNote['NaturalEarth'] = true;
				break;
			// *** Leaf-PO 用 **********
			case "GSIairo":
				useMapNote['GSI'] = true;
				useMapNote['GSIphotoScale'] = true;
				break;
		}
}

// 本体 mapSourceNote関数から
function extMapSourceNoteProcess3() {
	var mapNoteText = "";
	if ((useMapLegend['GSIlcm25k'] == true)||(useMapLegend['GSIlum4bl'] == true)||(useMapLegend['GSIlcmfc2'] == true)) {
		mapNoteText += "凡例： ";
		if (useMapLegend['GSIlcm25k'] == true) {
			mapNoteText += "<a href=\"//cyberjapandata.gsi.go.jp/legend/lcm25k_2012/lc_legend.pdf\" target=\"_blank\">土地条件図</a>";
		}
		if (useMapLegend['GSIlum4bl'] == true) {
			if (useMapLegend['GSIlcm25k'] == true) {
				mapNoteText += " / ";
			}
			mapNoteText += "<a href=\"//cyberjapandata.gsi.go.jp/legend/takuchi_hanrei.png\" target=\"_blank\">土地利用図</a>";
		}
		if (useMapLegend['GSIlcmfc2'] == true) {
			if ((useMapLegend['GSIlcm25k'] == true)||(useMapLegend['GSIlum4bl'] == true)) {
				mapNoteText += " / ";
			}
			mapNoteText += "<a href=\"//cyberjapandata.gsi.go.jp/legend/lcmfc2_legend.jpg\" target=\"_blank\">治水地形分類図</a>";
		}
		mapNoteText += "<br /><br />";
	}
	return mapNoteText;
}

// 本体 mapSourceNote関数から
function extMapSourceNoteProcess4() {
	var mapNoteText = "";
	if (useMapNote['Kjmap'] == true) {
		mapNoteText += "地図切り替えメニューに地図の種類として表示されている数字（年）や年号は，地図が作成された大まかな時期を表しています。（最大で20年程度の期間内に作成された地図をつなぎ合わせています。）　正確な測量年や刊行年を示すものではありませんので，ご注意ください。<br /><br />";
	}
	return mapNoteText;
}

// 本体 mapSourceNote関数から
function extMapSourceNoteProcess5() {
	var mapNoteText = "";
	if (useMapNote['GSIafm'] == true) {
		mapNoteText += "このウェブサイトでは国土地理院作成の「都市圏活断層図」（国土地理院技術資料）を使用しています。 都市圏活断層図の各地区の調査者名と技術資料No.は国土地理院のウェブページ<a href=\"https://www.gsi.go.jp/bousaichiri/active_fault.html\" target=\"_blank\">「活断層図（都市圏活断層図）について」</a>をご参照ください。<br />";
		mapNoteText += "<a href=\"https://www.gsi.go.jp/common/000084060.pdf\" target=\"_blank\">都市圏活断層図の凡例はこちらをご覧ください。</a><br />";
	}
	if (useMapNote['Hazard'] == true) {
		mapNoteText += "このウェブサイトでは「<a href=\"https://disaportal.gsi.go.jp/\" target=\"_blank\">重ねるハザードマップ</a>」のオープンデータ配信による地図画像を使用しています。<br />";
		mapNoteText += "<a href=\"https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/opendata.html\" target=\"_blank\">凡例などについてはハザードマップポータルサイトの当該ページをご覧ください。</a><br />";
	}
	if (useMapNote['NaroKanto'] == true || useMapNote['NaroTokyo'] == true) {
		mapNoteText += "このウェブサイトでは農研機構農業環境研究部門による<a href=\"https://habs.rad.naro.go.jp/\" target=\"_blank\">歴史的農業環境閲覧システム</a>の地図画像（";
		if (useMapNote['NaroKanto'] == true) {
			mapNoteText += "陸軍参謀本部作成 第一軍管地方ニ万分一迅速測図原図";
		}
		if (useMapNote['NaroKanto'] == true && useMapNote['NaroTokyo'] == true) {
			mapNoteText += "，";
		}
		if (useMapNote['NaroTokyo'] == true) {
			mapNoteText += "参謀本部陸軍部測量局作成 五千分一東京図測量原図";
		}
		mapNoteText += "）を使用しています。<br />";
	}
	if (useMapNote['Kjmap'] == true) {
		mapNoteText += "このウェブサイトでは谷謙二氏による<a href=\"https://ktgis.net/kjmapw/index.html\" target=\"_blank\">時系列地形図閲覧サイト「今昔マップ on the web」</a>の地図画像を使用しています。 ご利用に当たっては同サイトの<a href=\"https://ktgis.net/kjmapw/note.html\" target=\"_blank\">使用上の注意</a>をご覧ください。<br />";
	}
	if (useMapNote['hgoto'] == true) {
		mapNoteText += "このウェブサイトでは広島大学大学院文学研究科の<a href=\"https://home.hiroshima-u.ac.jp/~hgoto/HideakiGOTO/home.html\" target=\"_blank\">後藤秀昭</a>氏による地形アナグリフ画像を使用しています。 この地形アナグリフ画像は国土地理院の基盤地図情報（数値標高モデル）をもとに作成されたものです。<br />";
	}
	if (useMapNote['Census2010'] == true) {
		mapNoteText += "このウェブサイトでは総務省統計局「平成22年国勢調査結果」をもとに沼津高専佐藤崇徳研究室が加工して作成した地図を使用しています。<br />";
	}
	if (useMapNote['WorldBank'] == true) {
		mapNoteText += "このウェブサイトでは世界銀行の資料をもとに沼津高専佐藤崇徳研究室が加工して作成した地図を使用しています。<br />";
	}
	if (useMapNote['Census2010+WorldBank'] == true) {
		mapNoteText += "このウェブサイトでは総務省統計局「平成22年国勢調査結果」および世界銀行の資料をもとに沼津高専佐藤崇徳研究室が加工して作成した地図を使用しています。<br />";
	}
	if (useMapNote['NaturalEarth'] == true) {
//		mapNoteText += "Made with Natural Earth. Free vector and raster map data @ naturalearthdata.com.<br />";
	}
	return mapNoteText;
}

// 本体 writeUrl関数から
function extMapTypeCodeForUrl(mapTypeId) {
	var map_type_code = "";
	switch ( mapTypeId ) {
		case "GSIair":
			map_type_code = "gsiair";
			break;
		case "GSIslope":
			map_type_code = "gsislope";
			break;
		case "GSIlcm25k":
			map_type_code = "gsilcm";
			break;
		case "GSIlum4bl":
			map_type_code = "gsilum";
			break;
		case "NaroKanto":
			map_type_code = "narokanto";
			break;
		case "NaroTokyo":
			map_type_code = "narotokyo";
			break;
		case "Kjmap2man":
			map_type_code = "kjmap2man";
			break;
		case "Kjmap25k1920":
			map_type_code = "kjmap25k1920";
			break;
		case "Kjmap25k1930":
			map_type_code = "kjmap25k1930";
			break;
		case "Kjmap25k1950":
			map_type_code = "kjmap25k1950";
			break;
		case "Kjmap25k1970":
			map_type_code = "kjmap25k1970";
			break;
		case "Kjmap50k1910":
			map_type_code = "kjmap50k1910";
			break;
		case "Kjmap50k1940":
			map_type_code = "kjmap50k1940";
			break;
		case "GSI2015flood":
			map_type_code = "gsi2015flood";
			break;
		case "GSI2018rain":
			map_type_code = "gsi2018rain";
			break;
		case "GSI2018rain0709":
			map_type_code = "gsi2018rain0709";
			break;
		case "GSI2018flood":
			map_type_code = "gsi2018flood";
			break;
		case "GSIlcmfc2":
			map_type_code = "gsilcmfc";
			break;
		case "GSIafm":
			map_type_code = "fault";
			break;
		case "HazardFlood1":
			map_type_code = "hazardflood1";
			break;
		case "HazardFlood2":
			map_type_code = "hazardflood2";
			break;
		case "HazardFlow":
			map_type_code = "hazardflow";
			break;
		case "HazardSlope":
			map_type_code = "hazardslope";
			break;
		case "HazardLandslide":
			map_type_code = "hazardlandslide";
			break;
		case "TNMusgsTopo":
			map_type_code = "usgstopo";
			break;
		case "TNMusgsImageryOnly":
			map_type_code = "usgsimageryonly";
			break;
		case "TNMusgsImageryTopo":
			map_type_code = "usgsimagerytopo";
			break;
		case "SwissTopoColor":
			map_type_code = "swisstopocolor";
			break;
		case "SwissTopoGray":
			map_type_code = "swisstopogray";
			break;
		case "SwissTopoImage":
			map_type_code = "swisstopoimage";
			break;
		case "hgotoKinugawa":
			map_type_code = "";
			break;
		case "CensusAge65":
			map_type_code = "age65";
			break;
		case "CensusAge65o":
			map_type_code = "age65o";
			break;
	}
	return map_type_code;
}

// 本体 writeUrl関数から（Leaf-PO専用）
function extMapTypeCodeForUrlOverlay(mapTypeId) {
	var map_type_code = "";
	switch ( mapTypeId ) {
		case "GSIairo":
			map_type_code = "gsiair";
			break;
	}
	return map_type_code;
}

// 本体 indicateMapInfo関数（Leaf-C専用）から
function extMapTypeCodeArrayForMapInfo(mapTypeId) {
	var map_type_codename = "";
	var map_type_expression = "";
	switch ( mapTypeId ) {
		case "GSIair":
			map_type_codename = "GSIairphoto";
			map_type_expression = "地理院タイル 簡易空中写真（2004年～）";
			break;
		case "GSIslope":
			map_type_codename = "GSIslope";
			map_type_expression = "地理院タイル 傾斜量図";
			break;
		case "GSIlcm25k":
			map_type_codename = "GSIlcm";
			map_type_expression = "地理院タイル 数値地図25000（土地条件）";
			break;
		case "GSIlum4bl":
			map_type_codename = "GSIlum";
			map_type_expression = "地理院タイル 数値地図5000（土地利用）";
			break;
		case "NaroKanto":
			map_type_codename = "NaroKanto";
			map_type_expression = "農研機構 歴史的農業環境 迅速測図";
			break;
		case "NaroTokyo":
			map_type_codename = "NaroTokyo";
			map_type_expression = "農研機構 歴史的農業環境 東京図測量原図";
			break;
		case "Kjmap2man":
		case "Kjmap25k1920":
		case "Kjmap25k1930":
		case "Kjmap25k1950":
		case "Kjmap25k1970":
		case "Kjmap50k1910":
		case "Kjmap50k1940":
			map_type_codename = "******";
			map_type_expression = "今昔マップ on the web";
			break;
		case "GSI2015flood":
			map_type_codename = "gsi2015flood";
			map_type_expression = "地理院タイル 平成27年9月関東・東北豪雨 正射画像";
			break;
		case "GSI2018rain":
			map_type_codename = "gsi2018rain";
			map_type_expression = "地理院タイル 平成30年7月豪雨 正射画像";
			break;
		case "GSI2018rain0709":
			map_type_codename = "gsi2018rain0709";
			map_type_expression = "地理院タイル 平成30年7月豪雨 正射画像(7/9撮影)";
			break;
		case "GSI2018flood":
			map_type_codename = "gsi2018flood";
			map_type_expression = "地理院タイル 平成30年7月豪雨 浸水推定段彩図";
			break;
		case "GSIlcmfc2":
			map_type_codename = "gsilcmfc";
			map_type_expression = "地理院タイル 治水地形分類図";
			break;
		case "GSIafm":
			map_type_codename = "fault";
			map_type_expression = "地理院タイル 都市圏活断層図";
			break;
		case "HazardFlood1":
			map_type_codename = "hazardflood1";
			map_type_expression = "重ねるハザードマップ 洪水浸水想定区域（計画規模）";
			break;
		case "HazardFlood2":
			map_type_codename = "hazardflood2";
			map_type_expression = "重ねるハザードマップ 洪水浸水想定区域（想定最大規模）";
			break;
		case "HazardFlow":
			map_type_codename = "hazardflow";
			map_type_expression = "重ねるハザードマップ 土砂災害警戒区域（土石流）";
			break;
		case "HazardSlope":
			map_type_codename = "hazardslope";
			map_type_expression = "重ねるハザードマップ 土砂災害警戒区域（急傾斜地の崩壊）";
			break;
		case "HazardLandslide":
			map_type_codename = "hazardlandslide";
			map_type_expression = "重ねるハザードマップ 土砂災害警戒区域（地すべり）";
			break;
		case "TNMusgsTopo":
			map_type_codename = "usgstopo";
			map_type_expression = "The National Map / USGS Topo";
			break;
		case "TNMusgsImageryOnly":
			map_type_codename = "usgsimagery";
			map_type_expression = "The National Map / USGS Imagery Only";
			break;
		case "TNMusgsImageryTopo":
			map_type_codename = "usgsimagerytopo";
			map_type_expression = "The National Map / USGS Imagery Topo";
			break;
		case "SwissTopoColor":
			map_type_codename = "*****";
			map_type_expression = "swisstopo Color map";
			break;
		case "SwissTopoGray":
			map_type_codename = "*****";
			map_type_expression = "swisstopo Grey map";
			break;
		case "SwissTopoImage":
			map_type_codename = "*****";
			map_type_expression = "swisstopo Aerial imagery";
			break;
		case "hgotoKinugawa":
			map_type_codename = "*****";
			map_type_expression = "後藤秀昭 鬼怒川中流〜下流の地形アナグリフ";
			break;
		case "CensusAge65":
			map_type_codename = "CensusAge65";
			map_type_expression = "老年人口率（2010年）";
			break;
		case "CensusAge65o":
			map_type_codename = "CensusAge65o";
			map_type_expression = "老年人口率（2010年）＋背景地図";
			break;
	}
	return [map_type_codename, map_type_expression];
}

// 本体 load関数から
function extLayerSet() {
	// 地理院タイル 簡易空中写真（2004年～）
	baseLayerIdsArray.push('GSIair');
	baseLayerName['GSIair'] = "地理院簡易写真";
	baseLayer['GSIair'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 14,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png', {
			minZoom: 5,
			maxNativeZoom: 14,
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 15,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 傾斜量図
	baseLayerIdsArray.push('GSIslope');
	baseLayerName['GSIslope'] = "傾斜量図";
	baseLayer['GSIslope'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/slopemap/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minNativeZoom: 3,
			maxNativeZoom: 15,
			errorTileUrl: "tile_white.gif"
		})
	]);
	// 地理院タイル 土地条件
	baseLayerIdsArray.push('GSIlcm25k');
	baseLayerName['GSIlcm25k'] = "土地条件";
	baseLayer['GSIlcm25k'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 9,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			maxZoom: 18,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/lcm25k_2012/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 4,
			maxNativeZoom: 16,
			maxZoom: 18
//			, errorTileUrl: "tile_nodata.gif"
		})
	]);
// 地理院タイル 土地利用（近畿圏2008年，中部圏2003年，首都圏2005年）
	baseLayerIdsArray.push('GSIlum4bl');
	baseLayerName['GSIlum4bl'] = "土地利用";
	baseLayer['GSIlum4bl'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 12,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/lum4bl_kinki2008/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 1,
			maxNativeZoom: 16,
			maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.23, 134.86), L.latLng(35.21, 136.01))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/lum4bl_chubu2003/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 1,
			maxNativeZoom: 16,
			maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.63, 136.36), L.latLng(35.46, 137.38))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/lum4bl_capital2005/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 1,
			maxNativeZoom: 16,
			maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(35.10, 138.95), L.latLng(36.28, 140.45))
		})
	]);
	// 農研機構 歴史的農業環境WMS配信サービス（関東平野迅速測図） // boiledorange73@sakura
	baseLayerIdsArray.push('NaroKanto');
	baseLayerName['NaroKanto'] = "旧版地図 [明治初期] (迅速測図)";
	baseLayer['NaroKanto'] = L.tileLayer('//boiledorange73.sakura.ne.jp/ws/tile/Kanto_Rapid-900913/{z}/{x}/{y}.png', {
		attribution: "<a href='//habs.rad.naro.go.jp/' target='_blank'>農研機構農業環境研究部門</a>",
		maxNativeZoom: 17,
		errorTileUrl: "tile_nodata.gif"
	});
	// 農研機構 歴史的農業環境WMS配信サービス（東京図測量原図） // boiledorange73@sakura
	baseLayerIdsArray.push('NaroTokyo');
	baseLayerName['NaroTokyo'] = "旧版地図 [明治初期] (東京 1:5000)";
	baseLayer['NaroTokyo'] = L.tileLayer('//boiledorange73.sakura.ne.jp/ws/tile/Tokyo5000-900913/{z}/{x}/{y}.png', {
		attribution: "<a href='//habs.rad.naro.go.jp/' target='_blank'>農研機構農業環境研究部門</a>",
		maxNativeZoom: 17,
		errorTileUrl: "tile_nodata.gif"
	});
	// 今昔マップ 明治２万
	baseLayerIdsArray.push('Kjmap2man');
	baseLayerName['Kjmap2man'] = "旧版地図 [明治後期] (２万分１)";
	baseLayer['Kjmap2man'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/matsuyama/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(33.736, 132.600), L.latLng(33.937, 133.001))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hiroshima/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.085, 132.122), L.latLng(50, 133.0005))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/okayama/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 133.0018), L.latLng(50, 134.10000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/keihansin/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 135.00001), L.latLng(50, 136.40624))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/chukyo/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 136.40626), L.latLng(50, 137.81499))
//			bounds: L.latLngBounds(L.latLng(25, 136.40626), L.latLng(50, 139.21874))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hamamatsu/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 137.1997), L.latLng(34.87, 139.21874))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tokyo50/2man/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 139.21876), L.latLng(50, 160.00000))
		})
	]);
	// 今昔マップ 25000  1920
	baseLayerIdsArray.push('Kjmap25k1920');
	baseLayerName['Kjmap25k1920'] = "旧版地図 [1920年頃] (2.5万)";
	baseLayer['Kjmap25k1920'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/okinawas/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 120.00000), L.latLng(30, 132.18749))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/fukuoka/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(30, 120.00000), L.latLng(50, 132.18749))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hiroshima/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.085, 132.122), L.latLng(50, 133.0005))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/okayama/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 133.0018), L.latLng(50, 134.10000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/keihansin/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 135.00001), L.latLng(50, 136.40624))
			}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/chukyo/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 136.40626), L.latLng(50, 137.81499))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hamamatsu/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 137.121), L.latLng(34.921, 139.21874))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tokyo50/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 139.21876), L.latLng(36.59787, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sendai/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(36.59790, 139.21876), L.latLng(40.97989, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sapporo/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(40.97990, 139.21876), L.latLng(50, 160.00000))
		})
	]);
	// 今昔マップ 25000  1930
	baseLayerIdsArray.push('Kjmap25k1930');
	baseLayerName['Kjmap25k1930'] = "旧版地図 [1930年頃] (2.5万)";
	baseLayer['Kjmap25k1930'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/fukuoka/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 120.00000), L.latLng(50, 132.18749))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/matsuyama/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(33.753, 132.625), L.latLng(33.920, 133.001))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hiroshima/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.085, 132.122), L.latLng(50, 133.0005))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/okayama/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 133.0018), L.latLng(50, 134.10000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/keihansin/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 135.00001), L.latLng(50, 136.40624))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/chukyo/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 136.40626), L.latLng(50, 137.81499))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tokyo50/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 139.21876), L.latLng(36.59787, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sendai/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(36.59790, 139.21876), L.latLng(40.97989, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sapporo/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(40.97990, 139.21876), L.latLng(50, 160.00000))
		})
	]);
	// 今昔マップ 25000  1950
	baseLayerIdsArray.push('Kjmap25k1950');
	baseLayerName['Kjmap25k1950'] = "旧版地図 [1950年頃] (2.5万)";
	baseLayer['Kjmap25k1950'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/fukuoka/02/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 120.00000), L.latLng(50, 132.18749))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hiroshima/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.085, 132.122), L.latLng(50, 133.0005))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/keihansin/02/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 135.00001), L.latLng(50, 136.40624))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/chukyo/03/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 136.40626), L.latLng(50, 137.81499))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hamamatsu/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 137.121), L.latLng(34.921, 139.21874))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tokyo50/02/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 139.21876), L.latLng(36.59787, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sendai/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(36.59790, 139.21876), L.latLng(40.97989, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sapporo/02/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(40.97990, 139.21876), L.latLng(50, 160.00000))
		})
	]);
	// 今昔マップ 25000  1970
	baseLayerIdsArray.push('Kjmap25k1970');
	baseLayerName['Kjmap25k1970'] = "旧版地図 [1970年頃] (2.5万)";
	baseLayer['Kjmap25k1970'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/okinawas/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 120.00000), L.latLng(30, 132.18749))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/fukuoka/03/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(30, 120.00000), L.latLng(50, 132.18749))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/matsuyama/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(33.753, 132.622), L.latLng(33.920, 132.998))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/hiroshima/02/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.085, 132.122), L.latLng(50, 133.0005))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/okayama/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 133.0018), L.latLng(50, 134.10000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/keihansin/04/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 135.00001), L.latLng(50, 136.40624))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/chukyo/05/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 136.40626), L.latLng(50, 137.81499))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tokyo50/03/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(25, 139.21876), L.latLng(36.59787, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sendai/02/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(36.59790, 139.21876), L.latLng(40.97989, 160.00000))
		}),
//		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/sapporo/03/{z}/{x}/{y}.png', {
		L.tileLayer('tile_nodata.gif', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 16, maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(40.97990, 139.21876), L.latLng(50, 160.00000))
		})
	]);
	// 今昔マップ 50000  1910
	baseLayerIdsArray.push('Kjmap50k1910');
	baseLayerName['Kjmap50k1910'] = "旧版地図 [明治大正] (5万)";
	baseLayer['Kjmap50k1910'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 17
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/kanto/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 15, maxZoom: 16,
			bounds: L.latLngBounds(L.latLng(25, 120.00000), L.latLng(37.71858, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tohoku_pacific_coast/00/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 15, maxZoom: 16,
			bounds: L.latLngBounds(L.latLng(36.83800, 140.75200), L.latLng(50, 160.00000))
		})
	]);
	// 今昔マップ 50000  1940
	baseLayerIdsArray.push('Kjmap50k1940');
	baseLayerName['Kjmap50k1940'] = "旧版地図 [昭和前期] (5万)";
	baseLayer['Kjmap50k1940'] = L.layerGroup([
		L.tileLayer('tile_nodata.gif', {
			maxZoom: 7
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 17
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/kanto/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 15, maxZoom: 16,
			bounds: L.latLngBounds(L.latLng(25, 120.00000), L.latLng(37.71858, 160.00000))
		}),
		L.tileLayer('//ktgis.net/kjmapw/kjtilemap/tohoku_pacific_coast/01/{z}/{x}/{y}.png', {
			tms: true,
			attribution: "<a href='https://ktgis.net/kjmapw/' target='_blank'>今昔マップ on the web</a>",
			minZoom: 8,
			maxNativeZoom: 15, maxZoom: 16,
			bounds: L.latLngBounds(L.latLng(36.83800, 140.75200), L.latLng(50, 160.00000))
		})
	]);
	// 地理院タイル 平成27年9月関東・東北豪雨 正射画像
	baseLayerIdsArray.push('GSI2015flood');
	baseLayerName['GSI2015flood'] = "写真(被災後)";
	baseLayer['GSI2015flood'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/20150911dol2/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(35.99, 139.93), L.latLng(36.18, 140.04))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/20150911dol5/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(36.18, 139.86), L.latLng(36.31, 139.95))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/20150911dol3/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(36.48, 139.69), L.latLng(36.62, 139.79))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/20150911dol4/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(36.80, 139.69), L.latLng(36.86, 139.74))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/20150912dol/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(38.40, 140.80), L.latLng(38.59, 141.05))
		})
	]);
	// 地理院タイル 平成30年7月豪雨 正射画像
	baseLayerIdsArray.push('GSI2018rain');
	baseLayerName['GSI2018rain'] = "写真(被災後)";
	baseLayer['GSI2018rain'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/201807H3007gouu_takahashigawa_0712do/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(34.547, 133.535), L.latLng(34.835, 133.795))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/201807H3007gouu_hijikawa_0718do/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(33.511, 132.442), L.latLng(33.643, 132.597))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/201807H3007gouu_ozu_0711do/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(33.295, 132.425), L.latLng(33.607, 132.779))
		})
	]);
	// 地理院タイル 平成30年7月豪雨 正射画像（７月９日撮影）
	baseLayerIdsArray.push('GSI2018rain0709');
	baseLayerName['GSI2018rain0709'] = "写真(被災直後)";
	baseLayer['GSI2018rain0709'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/201807H3007gouu_takahashigawa_0709do/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 10,
			bounds: L.latLngBounds(L.latLng(34.548, 133.577), L.latLng(34.666, 133.795))
		})
	]);
	// 地理院タイル 平成30年7月豪雨 浸水推定段彩図
	baseLayerIdsArray.push('GSI2018flood');
	baseLayerName['GSI2018flood'] = "浸水推定(平成30年7月豪雨)";
	baseLayer['GSI2018flood'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			maxZoom: 4,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxNativeZoom: 15,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/201807H3007gouu_hijikawa_dansaizu/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 6,
			maxNativeZoom: 16,
			maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(33.450, 132.483), L.latLng(33.605, 132.692))
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/201807H3007gouu_takahashigawa_dansaizu/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 6,
			maxNativeZoom: 16,
			maxZoom: 17,
			bounds: L.latLngBounds(L.latLng(34.570, 133.469), L.latLng(34.788, 133.752))
		})
	]);
	// 地理院タイル 治水地形分類図 更新版
	baseLayerIdsArray.push('GSIlcmfc2');
	baseLayerName['GSIlcmfc2'] = "治水地形分類図";
	baseLayer['GSIlcmfc2'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 13,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/lcmfc2/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxZoom: 13
//			, errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/lcmfc2/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 14,
			maxNativeZoom: 16,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 地理院タイル 都市圏活断層図
	baseLayerIdsArray.push('GSIafm');
	baseLayerName['GSIafm'] = "活断層";
	baseLayer['GSIafm'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 16,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 17,
			maxZoom: 18
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxZoom: 10
//			, errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/afm/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 11,
			maxZoom: 16,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 重ねるハザードマップ 洪水浸水想定区域（計画規模）
	baseLayerIdsArray.push('HazardFlood1');
	baseLayerName['HazardFlood1'] = "洪水浸水想定";
	baseLayer['HazardFlood1'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18,
			maxZoom: 18
		}),
		L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l1_shinsuishin_newlegend_data/{z}/{x}/{y}.png', {
			attribution: "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
			minZoom: 2,
			maxZoom: 17,
			opacity: 0.8,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 重ねるハザードマップ 洪水浸水想定区域（想定最大規模）
	baseLayerIdsArray.push('HazardFlood2');
	baseLayerName['HazardFlood2'] = "洪水浸水想定(想定最大)";
	baseLayer['HazardFlood2'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18,
			maxZoom: 18
		}),
		L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png', {
			attribution: "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
			minZoom: 2,
			maxZoom: 17,
			opacity: 0.8,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 重ねるハザードマップ 土砂災害警戒区域（土石流）
	baseLayerIdsArray.push('HazardFlow');
	baseLayerName['HazardFlow'] = "土砂災害警戒区域(土石流)";
	baseLayer['HazardFlow'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18,
			maxZoom: 18
		}),
		L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png', {
			attribution: "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
			minZoom: 2,
			maxZoom: 17,
			opacity: 0.8,
			errorTileUrl: "tile_trans.gif"
		})
	]);
	// 重ねるハザードマップ 土砂災害警戒区域（急傾斜地の崩壊）
	baseLayerIdsArray.push('HazardSlope');
	baseLayerName['HazardSlope'] = "土砂災害警戒区域(急傾斜地)";
	baseLayer['HazardSlope'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18,
			maxZoom: 18
		}),
		L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png', {
			attribution: "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
			minZoom: 2,
			maxZoom: 17,
			opacity: 0.8,
			errorTileUrl: "tile_trans.gif"
		})
	]);
	// 重ねるハザードマップ 土砂災害警戒区域（地すべり）
	baseLayerIdsArray.push('HazardLandslide');
	baseLayerName['HazardLandslide'] = "土砂災害警戒区域(地すべり)";
	baseLayer['HazardLandslide'] = L.layerGroup([
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 2,
			maxZoom: 17,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 18,
			maxZoom: 18
		}),
		L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png', {
			attribution: "<a href='https://disaportal.gsi.go.jp/index.html' target='_blank'>ハザードマップポータルサイト</a>",
			minZoom: 2,
			maxZoom: 17,
			opacity: 0.8,
			errorTileUrl: "tile_trans.gif"
		})
	]);
	// The National Map / USGS Topo
	baseLayerIdsArray.push('TNMusgsTopo');
	baseLayerName['TNMusgsTopo'] = "USGS Topo";
	baseLayer['TNMusgsTopo'] = L.layerGroup([
		L.tileLayer('//basemap.nationalmap.gov/ArcGIS/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
			attribution: "<a href='//www.usgs.gov' target='_blank'>U.S. Geological Survey</a>",
			minZoom: 0,
			minNativeZoom: 1,
//			maxZoom: 16,
			maxNativeZoom: 16,
			maxZoom: 18,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// The National Map / USGS ImageryOnly
	baseLayerIdsArray.push('TNMusgsImageryOnly');
	baseLayerName['TNMusgsImageryOnly'] = "USGS Imagery";
	baseLayer['TNMusgsImageryOnly'] = L.layerGroup([
		L.tileLayer('//basemap.nationalmap.gov/ArcGIS/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
			attribution: "<a href='//www.usgs.gov' target='_blank'>U.S. Geological Survey</a>",
			minZoom: 0,
//			maxZoom: 15,
			maxNativeZoom: 15,
			maxZoom: 18,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// The National Map / USGS ImageryTopo
	baseLayerIdsArray.push('TNMusgsImageryTopo');
	baseLayerName['TNMusgsImageryTopo'] = "USGS ImageryTopo";
	baseLayer['TNMusgsImageryTopo'] = L.layerGroup([
		L.tileLayer('//basemap.nationalmap.gov/ArcGIS/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
			attribution: "<a href='//www.usgs.gov' target='_blank'>U.S. Geological Survey</a>",
			minZoom: 0,
//			maxZoom: 15,
			maxNativeZoom: 15,
			maxZoom: 18,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// SwissTopo（スイス連邦地理局）カラー地図
	baseLayerIdsArray.push('SwissTopoColor');
	baseLayerName['SwissTopoColor'] = "swisstopo Color map";
	baseLayer['SwissTopoColor'] = L.layerGroup([
	L.tileLayer('//wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg', {
			attribution: "<a href='//www.swisstopo.admin.ch/' target='_blank'>swisstopo</a>",
		//	minZoom: 2,
			maxZoom: 19,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// SwissTopo（スイス連邦地理局）白黒地図
	baseLayerIdsArray.push('SwissTopoGray');
	baseLayerName['SwissTopoGray'] = "swisstopo Grey map";
	baseLayer['SwissTopoGray'] = L.layerGroup([
	L.tileLayer('//wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg', {
			attribution: "<a href='//www.swisstopo.admin.ch/' target='_blank'>swisstopo</a>",
		//	minZoom: 2,
			maxZoom: 19,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// SwissTopo（スイス連邦地理局）空中写真
	baseLayerIdsArray.push('SwissTopoImage');
	baseLayerName['SwissTopoImage'] = "swisstopo Aerial imagery";
	baseLayer['SwissTopoImage'] = L.layerGroup([
	L.tileLayer('//wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg', {
			attribution: "<a href='//www.swisstopo.admin.ch/' target='_blank'>swisstopo</a>",
		//	minZoom: 2,
			maxZoom: 19,
			errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 後藤秀昭アナグリフ 鬼怒川水害
	baseLayerIdsArray.push('hgotoKinugawa');
	baseLayerName['hgotoKinugawa'] = "地形立体視";
	baseLayer['hgotoKinugawa'] = L.layerGroup([
		L.tileLayer('http://home.hiroshima-u.ac.jp/~hgoto/kimugawa_ana/{z}/{x}/{y}.png', {
			attribution: "画像：後藤秀昭",
			minZoom: 8,
			maxZoom: 14,
			bounds: L.latLngBounds(L.latLng(35.76, 139.64), L.latLng(36.67, 140.43))
//			, errorTileUrl: "tile_nodata.gif"
		})
	]);
	// 佐藤崇徳 老年人口率
	baseLayerIdsArray.push('CensusAge65');
	baseLayerName['CensusAge65'] = "老年人口率";
	baseLayer['CensusAge65'] = L.layerGroup([
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/countries/{z}/{x}/{y}.png', {
			attribution: "世界銀行の資料をもとに作成",
			maxZoom: 4,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/prefectures/{z}/{x}/{y}.png', {
			attribution: "総務省統計局「平成22年国勢調査結果」をもとに作成",
			minZoom: 5,
			maxZoom: 7,
			bounds: L.latLngBounds(L.latLng(20.4, 122.9), L.latLng(45.6, 148.8)),
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/municipalities/{z}/{x}/{y}.png', {
			attribution: "総務省統計局「平成22年国勢調査結果」をもとに作成",
			minZoom: 8,
			maxZoom: 11,
			bounds: L.latLngBounds(L.latLng(33.43, 134.25), L.latLng(41.56, 142.10)),
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/smallareas/{z}/{x}/{y}.png', {
			attribution: "総務省統計局「平成22年国勢調査結果」をもとに作成",
			minZoom: 12,
			maxZoom: 16,
			bounds: L.latLngBounds(L.latLng(34.600, 138.511), L.latLng(35.446, 139.177)),
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 17
		})
	]);
	// 佐藤崇徳 老年人口率 背景地図に重ね合わせ
	baseLayerIdsArray.push('CensusAge65o');
	baseLayerName['CensusAge65o'] = "老年人口率＋背景地図";
	baseLayer['CensusAge65o'] = L.layerGroup([
		L.tileLayer('tile_white.gif', {
//			attribution: "",
			maxZoom: 4,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 5,
			maxZoom: 11,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
			attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
			minZoom: 12,
			maxZoom: 16,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/countries/{z}/{x}/{y}.png', {
			attribution: "世界銀行の資料をもとに作成",
			maxZoom: 4,
			opacity: 0.6,
			errorTileUrl: "tile_nodata.gif"
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/prefectures/{z}/{x}/{y}.png', {
			attribution: "総務省統計局「平成22年国勢調査結果」をもとに作成",
			minZoom: 5,
			maxZoom: 7,
			bounds: L.latLngBounds(L.latLng(20.4, 122.9), L.latLng(45.6, 148.8)),
			opacity: 0.6
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/municipalities/{z}/{x}/{y}.png', {
			attribution: "総務省統計局「平成22年国勢調査結果」をもとに作成",
			minZoom: 8,
			maxZoom: 11,
			bounds: L.latLngBounds(L.latLng(33.43, 134.25), L.latLng(41.56, 142.10)),
			opacity: 0.6
		}),
		L.tileLayer('//user.numazu-ct.ac.jp/~tsato/webmap/tiles/census/age65/smallareas/{z}/{x}/{y}.png', {
			attribution: "総務省統計局「平成22年国勢調査結果」をもとに作成",
			minZoom: 12,
			maxZoom: 16,
			bounds: L.latLngBounds(L.latLng(34.600, 138.511), L.latLng(35.446, 139.177)),
			opacity: 0.6
		}),
		L.tileLayer('tile_nodata.gif', {
			minZoom: 17
		})
	]);
}

// 本体 load関数から（Leaf-PO専用）
function extLayerSetForPO() {
	// 地理院タイル 簡易空中写真（2004年～）
	overlayIdsArray.push('GSIairo');
	overlayName['GSIairo'] = "写真 2004年以降撮影 (簡易)";
	overlay['GSIairo'] = L.tileLayer('//cyberjapandata.gsi.go.jp/xyz/airphoto/{z}/{x}/{y}.png', {
		attribution: "<a href='//maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
		minZoom: 10,
		minNativeZoom: 14,
		maxZoom: 18,
		errorTileUrl: "tile_nodata.gif"
	});
}
