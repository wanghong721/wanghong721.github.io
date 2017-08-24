/*

oneBook3d
v 2.30;
www.onebook3d.riadesign.ru
swipe up,down,right,left

(13.03.2015)
updated:
automatic removal of
old book in the target element;

*/

window['ONEBOOK3DTHEBEST'] = true;

var ONEBOOK3D_ADDITIONAL_LANGUAGES = [{
    lng: 'it',
    save: 'Salva',
    light: 'Luminoso',
    dark: 'Scuro',
    next: 'Prossimo',
    prev: 'Precedente',
    zoom: 'Zoom',
    slope: 'Inclina',
    fromfullscreen: 'Rimpicciolisci',
    tofullscreen: 'Ingrandisci',
    close: 'Chiudi',
    left: 'Sinistra',
    right: 'Destra',
    toStart: 'Alla Partenza',
    toEnd: 'Alla Fine',
    goToHomelink: 'Aprire home page',
    clickToOpen: 'Clicca per aprire',
    useMousewheel: 'Usa la rotellina del mouse',
    forEasyViewing: 'Per visualizzare',
    askSaveImage: 'Selezionare la pagina da salvare, per favore',
    or: 'o'
}];

!function (t) {
    t.onebook = function (e, i, s) {
        var a = "ONEBOOK3DGLOBALDATASTORAGE", s = s && s !== t && s.size ? s : !1;
        window[a] || (window[a] = {
            FLIPS: {},
            NUMBER: 0,
            BOOKS: [],
            CURRENT: !1,
            SUPERBOOK: !1,
            SKIN: {},
            queueBooksBuilding: [],
            buildNextBook: function () {
                window[a].buildingNowFlag = !0;
                var e = window[a].queueBooksBuilding.shift();
                if (e) {
                    if (e.target) {
                        var i = t(e.target).attr("onebook3d");
                        if (i && window[a].BOOKS[i]) {
                            var s = window[a].BOOKS[i];
                            s.exit()
                        }
                    }
                    var o = t.extend(!0, {}, n);
                    o.init(e.arrSrc, e.options, e.target)
                } else window[a].buildingNowFlag = !1
            },
            GLOSSY: function () {
                for (var t, e = document.createElement("canvas"), i = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], s = 0; s < i.length; ++s) {
                    try {
                        t = e.getContext(i[s])
                    } catch (a) {
                    }
                    if (t) break
                }
                return null == t ? !1 : !0
            }()
        });
        var n = {
            init: function (e, i, s) {
                var n = this;
                this.IMAGES_SRC = e, this.$TARGET = s, this.startIndex = 1e3 + 20 * window[a].NUMBER, this.options = this.set_options_default(i), o.init(t.extend(this.options, {
                    onReady: function (t) {
                        n.initWithData(t)
                    }
                }))
            }, set_options_default: function (e) {
                return t.extend({
                    language: "en",
                    skin: "dark",
                    bgDark: "",
                    bgLight: "",
                    pageColor: "white",
                    border: 30,
                    typeAnimation: "",
                    startPage: 1,
                    slope: 0,
                    flip: "basic",
                    cesh: !0
                }, e || {})
            }, initWithData: function (e) {
                var i = this, s = this.startIndex, n = {
                    defineSkin: function (t) {
                        var e = {dark: "dark", light: "light"};
                        return e[t && t.toLowerCase()] || "dark"
                    }, defineSkinArray: function (t) {
                        if ("object" == typeof t) {
                            var e = n.defineSkin(t[0]), i = n.defineSkin(t[1]);
                            return [e, i]
                        }
                        return [n.defineSkin(t)]
                    }, defineLanguage: function (t) {
                        var e = ONEBOOK3D_ADDITIONAL_LANGUAGES, i = {en: 0, ru: 1};
                        if (e && e.length > 0) for (var s = 0; s < e.length; s++) i[e[s].lng] = s + 2;
                        return i[t.toLowerCase()] || 0
                    }, defineBorder: function (t) {
                        var t = parseInt(t, 10);
                        return 101 > t ? t : 30
                    }, defineSlope: function (t) {
                        var t = parseInt(t, 10);
                        return 3 > t ? t : 0
                    }
                };
                this.CFG = {
                    HOME_LINK: "http://www.onebook3d.riadesign.ru",
                    DIVIDE_IMAGES: !1,
                    PAGE_DEFAULT_COLOR: this.options.pageColor,
                    BORDER: n.defineBorder(this.options.border),
                    ARR_SLOPE_ANGLES: [0, 20, 40],
                    START_SLOPE_MODE: n.defineSlope(this.options.slope),
                    ROTATE_CENTER_OFFSET: 1.7,
                    ROTATE_CENTER_OFFSET_GL: .3,
                    SHEETS_SENSIVITY: 8,
                    PASPARTU_BEHAVIORS_PARAM: {width: 0, height: 80},
                    SPACE_AROUND_STAGE: {horizontal: 20, vertical: 20},
                    DRAG_PARAM: {px_per_persent: 3},
                    NUMBEROF_PRELOAD_SHEETS: 3,
                    MAX_SCREEN_SIZE: {width: 2e3, height: 1200},
                    ICONS_PANEL: {
                        tiny: {
                            height: 101,
                            width: 265,
                            noTitle: 20,
                            betweenIcons: 2,
                            pageNumbers: {width: 83, fontSize: 16}
                        },
                        small: {
                            height: 101,
                            width: 410,
                            noTitle: 20,
                            betweenIcons: 8,
                            pageNumbers: {width: 102, fontSize: 18}
                        },
                        middle: {
                            height: 101,
                            width: 470,
                            noTitle: 20,
                            betweenIcons: 6,
                            pageNumbers: {width: 92, fontSize: 16}
                        },
                        large: {
                            height: 140,
                            width: 700,
                            noTitle: 30,
                            betweenIcons: 10,
                            pageNumbers: {width: 105, fontSize: 16}
                        },
                        titleSection: 65,
                        overlay_pr: .8
                    },
                    ICONS_SIZE: {big: 50, small: 36},
                    MAX_FRAME_DRAGGABLE: 60,
                    MAX_MOUSE_SPEED_X: 90,
                    ZOOM_WAITER_SIZE: 60,
                    LANGUAGE: n.defineLanguage(this.options.language),
                    ZINDEX: {
                        bookBackground: s,
                        bookStage: s + 5,
                        bookIconsPanel: s + 10,
                        bookSaveMenu: s + 20,
                        zoomLayer: s + 2e3
                    },
                    GL_DEPTH_STEP: 3,
                    FV: window[this.getString([79, 78, 69, 66, 79, 79, 75, 51, 68, 84, 72, 69, 66, 69, 83, 84])]
                }, this.GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", this.AJAX_LOADER = "data:image/gif;base64,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", this.SRC_ICONS_BIG = "data:image/png;base64,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", this.SRC_ICONS_MINI = "data:image/png;base64,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", this.SRC_HOME_LINK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACG0lEQVR4nO2WTyhlcRTHD1n4lzIlTQ2lsJCReMkMCtGUjYXsZjGbKavJYhaKrGhqLG1kKaVRSqKsZKOIhfHv6SVmUrOippmUxYjv1zkvr+ve7nW9pOae+nTfve/ec77n/O7t9xWJ4nGR9dzyxsEoeJkmITEwDg68bsgMkOQHWAbToDGEiCLQD76DYbACrkPkuY1dO1L4O7AANkCv+DdTJ9oEc3wGxS5570WG43xH7tTniS7VDEiILt86yAeDoB6MgDlHjhLwBZSKLjdzNoAKUA4qwRvLWQh+gxovQVT+OuWca/0RVFuiZhO0Zv81WVLecwK6wZjoJAus8B9rJGEcgyXLea+m39t+ZcXXUq7lWqFW8Er0HdkEP206f63Rb+ATuHTJG/gdcq6t51qnBCf03op0SbAPZdfjd1oEJeMhX46noCDdPGlEgvwiEuQXkSC/iAT5hZ8g7lt9IDtN9egeBkQ36FCC3opumNtgCLwIISLppebBouhmGwv6sNfexY7o+mg5JkGZyz3OvYxT5W6/J2rUGoLUdNqPM1GrmWMFaJ7iJmQfdIpObdYSfQWHjhzM2WdipkCbNVQramHpgzj15LR/pT7sNGjOoLWosiQ80lPzvaKNpe9pB6uiDpLn9EkTYEvUjMWMI2t0xxo5BeduBf0EuQWXgk6xBXSILh+vsWNOmA6RU10xsRTxL0Sd0EGr+gFcgB7RCUbx/8QNBj9rFr9f954AAAAASUVORK5CYII=", this.SRC_HELP_ARROW = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAaCAYAAAAT6cSuAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAByklEQVR4nO2XOUtDQRSFryKiQUURSVxQERcQ10qwEhEULKwsUoudP8FGLS0tBAs7xUJE0NrCykIRcSmMjVjEfQVRweUc7oQEMQmEN04IOfDx3iTzZs7cmbnznkhWaacC1wZsaQjcgFrXRmyIs3YIdkG+Yy9W1AiewKJrI7Y0DD7BuGsjtjQD3kGPayM2lAs2QRgEHHuxohIQAjuSoQmmGbyABddGbGlE4iQYrt1R0PbfjjzWpPyRYErBJfgG12AVTIj7wTLorSAIZsEWuAXzCeofgDkW8syPj6AKdIB+0AemQRl4BSfmoSPRt4Mz0Qz14cEA6KFS9HWKe4cHdAtoMvc+0w897IM1sBGnrW7TxhILOUk67QKdojPYLjr4ipg6d6KDvBCNKHVlrl/gAZSbMk0Wm3aZtv2GyP8UA8nAhQynEg1qskBycvZM3UH2n2hw8URDdaBaNOKRa0CiK8H/65k30dcliqvkXjQIJBzDeQp+qCKwDQpF99tziu2knbjP1kW/FOrdWvFeTDTMkL2ujXitMdEMH3RtxGsxq3PGplwb8VoNopl6RXTPZYyYGY9Fv8R9jr14rmXRzFjj2ojX4jnKQ3rAtZGsbOoHTqZUb7lFI8sAAAAASUVORK5CYII=", this.GLOSSY = window[a].GLOSSY, this.BOOK_INTERNAL = this.$TARGET ? !0 : !1, this.PRE_NAME = "OneBook3d_" + Math.floor(1e6 * Math.random()) + "_", window[a].BOOKS[this.PRE_NAME] = this, window[a].CURRENT = this.PRE_NAME, this.BOOK_INTERNAL || (window[a].SUPERBOOK = this.PRE_NAME), this.SKIN_ARRAY = n.defineSkinArray(this.options.skin);
                var o = !this.BOOK_INTERNAL && this.SKIN_ARRAY.length > 1 ? 1 : 0;
                this.DARK_MODE = "light" === this.SKIN_ARRAY[o] ? !1 : !0, this.addStyle(), this.$gStage = this.getStage(), this.$gContainter = t("#" + this.divNames.book_container), this.$gBookLoader = t("#" + this.divNames.book_loader), this.$gGlossyContainter = t("#" + this.divNames.glossy_container), this.LNG = {
                    save: ["Save", "Сохранить"],
                    light: ["Light", "Светлый"],
                    dark: ["Dark", "Темный"],
                    prev: ["Prev", "Назад"],
                    next: ["Next", "Далее"],
                    zoom: ["Zoom", "Масштаб"],
                    zoomclose: ["Zoom", "Масштаб"],
                    slope: ["Slope", "Наклон"],
                    fromfullscreen: ["Smaller", "Уменьшить"],
                    tofullscreen: ["Larger", "Увеличить"],
                    close: ["Close", "Закрыть"],
                    left: ["Left", "Слева"],
                    right: ["Right", "Справа"],
                    toStart: ["To start", "В начало"],
                    toEnd: ["To end", "В конец"],
                    hlpGoToHomelink: ["Open homepage", "Открыть домашнюю страницу"],
                    hlpClickToOpen: ["Click to open", "Открой меня"],
                    hlpUseMousewheel: ["Use mouse wheel<br>for easy viewing", "Используйте колесо мыши<br>для листания"],
                    hlpUseMousewheelGL: [["Use mouse wheel", "for easy viewing"], ["Используйте колесо", "мыши для листания"]],
                    askSaveImage: ["Select the page to save, please", "Какое изображение сохранить?"],
                    askSaveLinks: ['<a href="#">Left</a> or <a href="#">Right</a>', '<a href="#">Левое</a> или <a href="#">Правое</a>']
                };
                var h = ONEBOOK3D_ADDITIONAL_LANGUAGES;
                if (h && h.length > 0) for (var r = 0; r < h.length; r++) this.LNG.save.push(h[r].save), this.LNG.light.push(h[r].light), this.LNG.dark.push(h[r].dark), this.LNG.prev.push(h[r].prev), this.LNG.next.push(h[r].next), this.LNG.zoom.push(h[r].zoom), this.LNG.zoomclose.push(h[r].zoom), this.LNG.slope.push(h[r].slope), this.LNG.fromfullscreen.push(h[r].fromfullscreen), this.LNG.tofullscreen.push(h[r].tofullscreen), this.LNG.close.push(h[r].close), this.LNG.left.push(h[r].left), this.LNG.right.push(h[r].right), this.LNG.toStart.push(h[r].toStart), this.LNG.toEnd.push(h[r].toEnd), this.LNG.hlpGoToHomelink.push(h[r].goToHomelink), this.LNG.hlpClickToOpen.push(h[r].clickToOpen), this.LNG.hlpUseMousewheel.push(h[r].useMousewheel + "<br>" + h[r].forEasyViewing), this.LNG.hlpUseMousewheelGL.push([h[r].useMousewheel, h[r].forEasyViewing]), this.LNG.askSaveImage.push(h[r].askSaveImage), this.LNG.askSaveLinks.push('<a href="#">' + h[r].left + "</a> " + h[r].or + ' <a href="#">' + h[r].right + "</a>");
                this.BTNS_OFFSET = {
                    save: [["-100px"]],
                    skin: [["-50px", "0px"], ["dark", "light"], "DARK_MODE"],
                    prev: [["-150px"]],
                    zoom: [["-200px"]],
                    next: [["-250px"]],
                    slope: [["-300px"]],
                    togglebook: [["-350px", "-400px"], ["toStart", "toEnd"], "START_FROM_END"],
                    close: [["-450px"]],
                    zoomclose: [["-450px"]]
                }, this.BTNS_MINI_OFFSET = {
                    save: [["-72px"]],
                    skin: [["-36px", "0px"], ["dark", "light"], "DARK_MODE"],
                    prev: [["-108px"]],
                    zoom: [["-144px"]],
                    next: [["-180px"]],
                    slope: [["-216px"]],
                    tofullscreen: [["-252px"]],
                    fromfullscreen: [["-288px"]],
                    togglebook: [["-324px", "-360px"], ["toStart", "toEnd"], "START_FROM_END"],
                    close: [["-396px"]],
                    zoomclose: [["-396px"]]
                }, this.PANEL_TYPE = "", this.LARGE_ICONS = !1, this.FRDATA = e, this.FIRST_FRAME = 0, this.ARR_PAGES_SRC = [], this.ARR_PAGES_TITLE = [], this.getSrcAndTitles(this.IMAGES_SRC), !this.CFG.DIVIDE_IMAGES && this.ARR_PAGES_SRC.length % 2 > 0 && this.ARR_PAGES_SRC.push(this.CFG.PAGE_DEFAULT_COLOR), this.START_FROM_END = 0, this.START_PAGE = this.options.startPage, this.GSCALE = 1, this.ALL_PAGES_MAP = [], this.ALLSHEETS = [], this.$ARR_SHEETS = [], this.GL_ARR_SHEETS = [], this.FIRST_IMAGE_SIZE = {
                    w: 0,
                    h: 0
                }, this.SHEETS_WAS_BUILT = [], this.SHEET_DISPLAYED = null, this.QUEUE_IMAGES_LOADED = [], this.IMG_NOW_LOADING = [], this.NOW_LOADING_COUNTER = 0, this.IMG_NOW_LOADING_FOR_ZOOM = [], this.options.cesh || this.addCeshNames(Math.floor(1e4 * Math.random())), this.ANIMATION_SLOPE = !1, this.ZOOM_MODE = 0, this.STAGE = {
                    width: 0,
                    height: 0
                }, this.STAGE_CENTER = {top: 0, left: 0}, this.STAGE_BOUNDING_BOX = {
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0
                }, this.MAX_BOUNDS = {
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0
                }, this.ENVIRON = this.getEnviron(), !this.BOOK_INTERNAL && i.build_background(), this.prepareBookSize(), this.prepareIconsPanelSize(), this.prepareSkinImages(function () {
                    i.findBookSizeByFirstImage(function () {
                        i.fit3dDataToBookSize()
                    })
                })
            }, prepareBookSize: function () {
                this.WINSIZE = {
                    width: t(window).width(),
                    height: t(window).height()
                }, this.TARGETSIZE = this.$TARGET ? {
                    left: this.$TARGET.offset().left,
                    top: 0,
                    width: this.$TARGET.width(),
                    height: 100
                } : !1, this.ZOOMSIZE = {height: this.WINSIZE.height, width: this.WINSIZE.width, top: 0, left: 0}
            }, getString: function (t) {
                for (var e = "", i = 0; i < t.length; i++) e += t[i] ? String.fromCharCode(t[i]) : " ";
                return e
            }, prepareIconsPanelSize: function () {
                var t = this.CFG.ICONS_PANEL, e = this.$TARGET ? this.TARGETSIZE : this.WINSIZE;
                if (this.BOOK_INTERNAL) {
                    if (e.width < t.tiny.width) return !1;
                    e.width < t.small.width ? (this.LARGE_ICONS = !1, this.PANEL_TYPE = "tiny") : (this.LARGE_ICONS = !1, this.PANEL_TYPE = "small")
                } else if (this.fsapi.isFullScreen()) {
                    if (e.width < t.large.width) return !1;
                    this.LARGE_ICONS = !0, this.PANEL_TYPE = "large"
                } else {
                    if (e.width < t.middle.width) return !1;
                    this.LARGE_ICONS = !1, this.PANEL_TYPE = "middle"
                }
            }, getTotalSheets: function () {
                return this.ALLSHEETS.length
            }, getEnviron: function () {
                var t = navigator.userAgent, e = -1 != t.indexOf("Chrome"), i = -1 != t.indexOf("Safari"),
                    s = -1 != t.indexOf("OPR"), a = -1 != t.indexOf("WebKit"), n = {
                        ios: -1 != navigator.userAgent.indexOf("iP"),
                        android: -1 != navigator.userAgent.indexOf("Android"),
                        firefox: -1 != navigator.userAgent.indexOf("Firefox"),
                        windows: -1 != navigator.userAgent.indexOf("Windows"),
                        mac: -1 != navigator.userAgent.indexOf("Macintosh"),
                        webkit: a,
                        safari: i && !e,
                        chrome: i && e && !s,
                        opera: s,
                        ipad: -1 != navigator.userAgent.indexOf("iPad"),
                        iphone: -1 != navigator.userAgent.indexOf("iPhone")
                    };
                return n.touch = n.ios || n.android, n
            }, getSrcAndTitles: function (t) {
                var t = t.slice() || [], e = 0;
                if (this.NO_ONE_TITLES = !0, t.length) {
                    for (var i = 0, s = t.length; s > i; i++) "string" == typeof t[i] ? (this.ARR_PAGES_SRC.push(t[i]), this.ARR_PAGES_TITLE.push("")) : "object" == typeof t[i] && 2 == t[i].length && (e++, this.ARR_PAGES_SRC.push(t[i][0]), this.ARR_PAGES_TITLE.push(t[i][1]));
                    this.NO_ONE_TITLES = e ? !1 : !0
                }
            }, addStyle: function () {
                var t = this, e = this.PRE_NAME;
                this.divNames = {
                    background: e + "background",
                    book_stage: e + "stage",
                    book_help_layer: e + "help_layer",
                    book_container: e + "stage_container",
                    glossy_container: e + "glossy_container",
                    book_loader: e + "book_loader",
                    book_icons_panel: e + "icons_panel",
                    book_spread_title: e + "spread_title",
                    book_page_numbers: e + "page_numbers",
                    icons_container: e + "icons_container",
                    zoom_layer: e + "zoom_layer",
                    zoom_content: e + "zoom_content",
                    zoom_title_spread: e + "zoom_title_spread",
                    zoom_behavior_section: e + "zoom_behavior_section",
                    zoom_buttons: e + "zoom_buttons",
                    zoom_waiter: e + "zoom_waiter_layer",
                    save_menu: e + "save_menu"
                };
                var i = function (e) {
                        var i = document.createElement("style");
                        i.type = "text/css", i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e)), t.CSS = document.getElementsByTagName("head")[0].appendChild(i)
                    }, s = "#" + this.divNames.background, a = "#" + this.divNames.book_stage,
                    n = "#" + this.divNames.book_container, o = "#" + this.divNames.glossy_container,
                    h = "#" + this.divNames.book_help_layer, r = "#" + this.divNames.book_loader,
                    d = "." + this.divNames.book_spread_title, l = "#" + this.divNames.book_page_numbers,
                    g = "#" + this.divNames.book_icons_panel, A = "#" + this.divNames.zoom_layer,
                    p = "." + this.divNames.zoom_content, c = "." + this.divNames.zoom_title_spread,
                    f = "#" + this.divNames.zoom_waiter;
                saveMenu = "." + this.divNames.save_menu;
                var E = this.CFG.ZINDEX, S = "";
                S += A + "{position:relative;}\n", S += A + " .btn_title{font:12px arial;color:black;padding:5px;white-space:nowrap;}\n", S += p + "{overflow:hidden;text-align:center;background:#e5e5e5;}\n", S += p + " .zoom_pages{border-collapse:collapse;border:0px;background:white;}\n", S += p + " .zoom_pages td{padding:0px;}\n", S += c + "{border-top:1px solid white;}\n", S += c + " p{font:14px arial;color:black;line-height:140%;margin:0px;}\n", S += c + " p span{font:bold 14px arial;color:gray;margin-right:8px;}\n", S += saveMenu + " h1{font:16px arial;color:white;}\n", S += saveMenu + " p{font:16px arial;color:white;}\n", S += saveMenu + " a{font:16px arial;color:white;}\n", S += l + "{color:#b2b2b2;}\n", S += l + ".light{color:#555555;}\n", S += [a + "{", "position:absolute;left:0px;top:0px;", "overflow:hidden;", "-webkit-perspective:1000px;", "-moz-perspective:1000px;", "-ms-perspective:1000px;", "z-index:" + E.bookStage + ";}\n"].join(""), S += [a + ".pointer:hover{", "cursor:pointer;}\n"].join(""), S += [s + "{", "position:fixed;left:0px;top:0px;right:0px;bottom:0px;", this.options.bgDark ? "background:" + this.options.bgDark + ";" : "background:#282828;", "z-index:" + E.bookBackground + ";}\n"].join(""), S += [s + ".light{", this.options.bgLight ? "background:" + this.options.bgLight + ";" : "background:#d0d0d0;", ";}\n"].join(""), S += [n + "{", "width:100%; height:100%;", "top:0px;left:0px;position:absolute;", "-webkit-transform-style: preserve-3d;", "-moz-transform-style: preserve-3d;", "-ms-transform-style: preserve-3d;", "z-index:20;}\n"].join(""), S += [o + "{", "width:100%; height:100%;", "top:0px;left:0px;position:absolute;", "z-index:25;}\n"].join(""), S += [n + " div{", "height:300px;", "-webkit-transform-origin:left center;", "-moz-transform-origin:left center;", "-ms-transform-origin:left center;", "-webkit-transform-style: preserve-3d;", "-ms-transform-style: preserve-3d;", "-moz-transform-style: preserve-3d;}\n"].join(""), S += [n + " .all_edges{", "-moz-perspective:5000px;-moz-transform-origin:left center;-moz-transform-style: preserve-3d;", "-ms-perspective:5000px;-ms-transform-origin:left center;-ms-transform-style: preserve-3d;", "}\n"].join(""), S += [n + " .wholeimage{", "-webkit-transform-origin:left center;-moz-transform-origin:left center;-ms-transform-origin:left center;", "-webkit-transform-style:preserve-3d;-moz-transform-style: preserve-3d;-ms-transform-style: preserve-3d;", "font:bold 20px arial;color:white;}\n"].join(""), S += [n + " .wholeimage,", n + " .wholeimage span,", n + " .wholeimage div{", "}\n"].join(""), S += [n + " div .back, \n", n + " div .front, \n", n + " .front_image, \n", n + " .front_image>div, \n", n + " .back_image, \n", n + " .back_image>div {", "-moz-transform-style: preserve-3d;", "-ms-transform-style: preserve-3d;", "display:block;width:100%;height:100%;", "top:0px;left:0px;position:absolute;", "-webkit-backface-visibility: hidden;", "-ms-backface-visibility: hidden;", "-moz-backface-visibility: hidden;}\n"].join(""), S += [h + "{", "position:absolute;", "outline: 1px solid transparent;", "-webkit-transform:translate3d(0px,0px,-1px);", "-moz-transform:translate3d(0px,0px,-1px);", "-ms-transform:translate3d(0px,0px,-1px);", "z-index:0;}\n"].join(""), S += h + " a {text-decoration:none;}", S += h + " a:hover {text-decoration:underline;}", S += h + " p {padding:20px 20px 20px 0px;margin:0px;}", S += h + " p span{display:block;margin-top:10px;}", S += h + " .hlpLeftSide {border:1px solid #cccccc;border-right:none;}\n", S += h + " .hlpRightSide {border:1px solid #cccccc;border-left:none;}\n", S += h + " .hlpLeftSide p span[name=home_link]{width:36px;height:30px;margin:10px 0px 0px auto;opacity:0.8;}", S += h + " .hlpLeftSide p span[name=click_to_open] a{font:21px arial;color:white;}", S += h + " .hlpLeftSide p span[name=use_mousewheel]{font:12px arial;color:#d4d4d4;}", S += h + " .hlpLeftSide p span[name=help_arrow]{width:55px;height:26px;margin:10px 0px 0px auto;opacity:0.8;}", S += h + " .hlpRightSide p span[name=goto_start] a{font:18px arial;color:white;}", S += h + " p.middleSize {padding:10px 10px 10px 0px;}", S += h + " p.middleSize span{margin-top:5px;}", S += h + " .hlpLeftSide p.middleSize span[name=click_to_open] a{font:16px arial;}", S += h + " .hlpRightSide p.middleSize span[name=goto_start] a{font:14px arial;}", S += h + ".light .hlpLeftSide {border:1px solid #bfbfbf;border-right:none;}\n", S += h + ".light .hlpRightSide {border:1px solid #bfbfbf;border-left:none;}\n", S += h + ".light .hlpLeftSide p span[name=home_link]{opacity:0.4;}", S += h + ".light .hlpLeftSide p span[name=click_to_open] a{color:#656565;}", S += h + ".light .hlpLeftSide p span[name=use_mousewheel]{color:#656565;}", S += h + ".light .hlpLeftSide p span[name=help_arrow]{opacity:0.4;}", S += h + ".light .hlpRightSide p span[name=goto_start] a{color:#656565;}", S += [r + "{", 'background:white url("' + this.AJAX_LOADER + '") center no-repeat;', "position:absolute;top:0px;left:0px;width:90px;height:90px;", "-moz-border-radius:15px;", "border-radius:15px;", "opacity:0.5;display:none;", "z-index:100;}\n"].join(""), S += [f + "{", "position:absolute;", "width:100px;height:100px;", "left:0px;top:0px;", "z-index:300;}\n"].join(""), S += [g + "{", "position:absolute;", "top:0px;left:0px;text-align:center;", "z-index:" + E.bookIconsPanel + ";}\n"].join(""), S += g + " " + d + " p{font:14px arial;color:#aaaaaa;line-height:140%;margin:0px;}\n", S += g + " " + d + " span{font:bold 14px arial;color:#ffffff;margin-right:8px;}\n", S += g + ".light " + d + " p{color:#000000;}\n", S += g + ".light " + d + " span{color:#888888;}\n", S += g + " .btn_title{font:12px arial;color:#ffffff;padding:5px;white-space:nowrap;}\n", S += g + ".light .btn_title{color:black;}\n", S += [".unselectable{", "-webkit-user-select:none;", "-khtml-user-select:none;", "-moz-user-select:none;", "user-select: none;}\n"].join(""), S += [".noPointerEvents{", "pointer-events:none;}\n"].join(""), i(S)
            }, getStage: function () {
                var e = this.divNames.book_stage, i = this.divNames.book_container, s = this.divNames.glossy_container,
                    a = this.divNames.book_loader, n = this.divNames.zoom_waiter, o = t("#" + e);
                o.size() && o.remove();
                var h = this.GLOSSY ? '<div id="' + s + '" style="pointer-events:none;"></div>' : "",
                    r = ['<div id="' + e + '">', '<div id="' + i + '"></div>', h, '<div id="' + a + '" style="display:none;"></div>', '<div id="' + n + '" style="display:none;"></div>', "</div>"].join("");
                return t("body").append(r), t("#" + e)
            }, getGlStage: function () {
                var t = {}, e = this.$gStage.width(), i = this.$gStage.height();
                this.$gGlossyContainter.css({
                    width: e,
                    height: i
                }), t.container = document.getElementById(this.divNames.glossy_container), t.renderer = new THREE.WebGLRenderer({
                    alpha: !0,
                    antialias: !0
                }), t.renderer.setSize(e, i), t.container.appendChild(t.renderer.domElement), t.scene = new THREE.Scene;
                var s = e / i;
                return t.bookBase = new THREE.Object3D, t.bookBase.position.y = -(this.CFG.BOOK_GL_SIZE.height * this.CFG.ROTATE_CENTER_OFFSET_GL), t.scene.add(t.bookBase), t.camera = new THREE.PerspectiveCamera(74.25 / s, s, .1, 3e3), t.camera.position.z = 1200, t.camera.position.y = 0, t.scene.add(t.camera), t
            }, bookHide: function () {
                this.$gStage.hide(), this.$gIconsPanel && this.$gIconsPanel.hide()
            }, bookShow: function () {
                this.$gStage.show(), this.$gIconsPanel && this.$gIconsPanel.show()
            }, bgLoaderShow: function (t) {
                var e = this.$gBookBackground && this.$gBookBackground.find("div");
                t ? e && e.is(":hidden") && e.show() : e && e.is(":visible") && e.hide()
            }, bookLoaderShow: function (t) {
                t ? this.$gBookLoader.is(":hidden") && this.$gBookLoader.show() : this.$gBookLoader.is(":visible") && this.$gBookLoader.fadeOut()
            }, exit: function () {
                this.TMR_RESIZE && (clearTimeout(this.TMR_RESIZE), this.TMR_RESIZE = null), window[a].NUMBER -= 1, window[a].SUPERBOOK = !1, delete window[a].BOOKS[this.PRE_NAME], this.zoomOut(), this.$gStage && this.$gStage.remove(), this.$gSaveMenu && this.$gSaveMenu.remove(), this.$gIconsPanel && this.$gIconsPanel.remove(), this.$gBookBackground && this.$gBookBackground.fadeOut("normal", function () {
                    this.remove()
                }), this.CSS.remove(), t(window).unbind("." + this.PRE_NAME), t(document).unbind("keyup." + this.PRE_NAME);
                var e = this.options.parentBook, i = this.CURRENT.spread, s = this.CURRENT.slope_mode, n = function () {
                    var t = window[a].BOOKS;
                    for (var n in t) if (t.hasOwnProperty(n)) {
                        var o = n === e, h = t[n], r = h.isNeedResizeReposInternal();
                        if (e && o) {
                            var d = i ? 2 * i : 1;
                            h.START_PAGE = d, h.slopeToggle(s), window[a].CURRENT = h.PRE_NAME;
                            var l = h.CURRENT.spread !== i;
                            "resize" === r ? h.restart() : ("reposition" === r && h.restart(r), l && h.gotoSpread(i))
                        } else r && h.restart(r)
                    }
                };
                n()
            }, restart: function (t) {
                if ("reposition" === t) {
                    var e = this.TARGETSIZE, i = this.STAGE, s = Math.round((e.width - i.width) / 2 + e.left),
                        a = this.getIconsPanelWidth(), n = Math.round((e.width - a) / 2 + e.left),
                        o = Math.round((e.width - this.$gSaveMenu.width()) / 2 + e.left);
                    this.$gStage.css({left: s}), this.$gIconsPanel.css({left: n}), this.$gSaveMenu.css({left: o}), this.prepareBookSize(), this.calculateBounds()
                } else this.zoomOut(), this.GSCALE = 1, this.SHEETS_WAS_BUILT = [], this.QUEUE_IMAGES_LOADED = [], this.IMG_NOW_LOADING = [], this.NOW_LOADING_COUNTER = 0, this.prepareBookSize(), this.prepareIconsPanelSize(), this.deleteAllGLSheets(), this.fit3dDataToBookSize()
            }, deleteAllGLSheets: function () {
                if (this.GLOSSY) {
                    var t = [];
                    for (var e in this.GL_ARR_SHEETS) t.push(this.GL_ARR_SHEETS[e].num);
                    for (var e = 0; e < t.length; e++) {
                        var i = t[e], s = this.getSheetByIndex(i);
                        s && (this.gGL.bookBase.remove(s.mesh), delete this.GL_ARR_SHEETS[i])
                    }
                }
            }, gotoSpread: function (t) {
                var e = this, i = this.getTotalSheets();
                if (this.GLOSSY && (e.GL_LINK_TO_START = !1, e.$gStage.removeClass("pointer")), !this.ZOOM_MODE && !this.ANIMATION_FLAG) {
                    0 === t ? (this.START_FROM_END = !0, this.toggleBook()) : t === i ? (this.START_FROM_END = !1, this.toggleBook()) : (this.CURRENT.spread = t, this.GLOSSY || (this.$gHelpLayer.find(".hlpLeftSide").css({opacity: 0}), this.$gHelpLayer.find(".hlpRightSide").css({opacity: 0})));
                    var s = this.SHEETS_WAS_BUILT;
                    for (var a in s) s.hasOwnProperty(a) && this.deleteSheet(a);
                    this.buildAndPreloadSheets(), this.changeSpreadTitle(), this.pageNumbersChange();
                    var n = this.$G_ARR_BUTTONS.togglebook;
                    n && n.update()
                }
            }, prepareSkinImages: function (t) {
                var e = this, i = window[a].SKIN, s = {
                    invertCanvas: function (t) {
                        for (var e = t.getContext("2d"), i = e.getImageData(0, 0, t.width, t.height), s = i.data, a = 0; a < s.length; a += 4) s[a] = 255 - s[a], s[a + 1] = 255 - s[a + 1], s[a + 2] = 255 - s[a + 2];
                        return e.putImageData(i, 0, 0), t
                    }, cloneCanvas: function (t) {
                        var e = document.createElement("canvas"), i = e.getContext("2d");
                        return e.width = t.width, e.height = t.height, i.drawImage(t, 0, 0), e
                    }, drawHomeLink: function () {
                        if (i.HOME_LINK) s.drawHelpArrow(); else {
                            var t = new Image;
                            t.onload = function () {
                                var t = document.createElement("canvas");
                                t.width = this.width, t.height = this.height;
                                var e = t.getContext("2d");
                                e.drawImage(this, 0, 0, this.width, this.height), i.HOME_LINK = {
                                    light: t,
                                    dark: s.invertCanvas(s.cloneCanvas(t))
                                }, s.drawHelpArrow()
                            }, t.src = e.SRC_HOME_LINK
                        }
                    }, drawHelpArrow: function () {
                        if (i.HELP_ARROW) s.drawIconsBig(); else {
                            var t = new Image;
                            t.onload = function () {
                                var t = document.createElement("canvas");
                                t.width = this.width, t.height = this.height;
                                var e = t.getContext("2d");
                                e.drawImage(this, 0, 0, this.width, this.height), i.HELP_ARROW = {
                                    light: t,
                                    dark: s.invertCanvas(s.cloneCanvas(t))
                                }, s.drawIconsBig()
                            }, t.src = e.SRC_HELP_ARROW
                        }
                    }, drawIconsBig: function () {
                        if (i.ICONS) s.drawIconsMini(); else {
                            var t = new Image;
                            t.onload = function () {
                                var t = document.createElement("canvas");
                                t.width = this.width, t.height = this.height;
                                var e = t.getContext("2d");
                                e.drawImage(this, 0, 0, this.width, this.height), i.ICONS = {
                                    light: t,
                                    dark: s.invertCanvas(s.cloneCanvas(t))
                                }, s.drawIconsMini()
                            }, t.src = e.SRC_ICONS_BIG
                        }
                    }, drawIconsMini: function () {
                        if (i.ICONS_MINI) t && t(); else {
                            var a = new Image;
                            a.onload = function () {
                                var e = document.createElement("canvas");
                                e.width = this.width, e.height = this.height;
                                var a = e.getContext("2d");
                                a.drawImage(this, 0, 0, this.width, this.height), i.ICONS_MINI = {
                                    light: e,
                                    dark: s.invertCanvas(s.cloneCanvas(e))
                                }, t && t()
                            }, a.src = e.SRC_ICONS_MINI
                        }
                    }
                };
                s.drawHomeLink()
            }, getIconsPanelWidth: function () {
                return this.CFG.ICONS_PANEL[this.PANEL_TYPE].width
            }, getIconsPanelHeight: function () {
                var t = this.CFG.ICONS_PANEL, e = t[this.PANEL_TYPE].height, i = t[this.PANEL_TYPE].noTitle,
                    s = t.titleSection;
                return this.NO_ONE_TITLES ? e - s + i : e
            }, fsapi: {
                goFullScreen: function (t) {
                    var e = t ? document.getElementById(t) : document.documentElement,
                        i = e.requestFullScreen || e.webkitRequestFullScreen || e.mozRequestFullScreen || e.msRequestFullscreen;
                    i.call(e)
                }, exitFullScreen: function () {
                    var t = document,
                        e = t.exitFullscreen || t.webkitCancelFullScreen || t.webkitExitFullScreen || t.webkitExitFullscreen || t.mozCancelFullScreen || t.msExitFullscreen;
                    e.call(t)
                }, isFullScreen: function () {
                    return document.fullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.msFullscreenElement
                }
            }, buildIconsPanel: function () {
                var e = this, i = this.CFG.ICONS_PANEL,
                    s = (this.STAGE, this.CFG.BOOK_SIZE, this.divNames.book_icons_panel),
                    a = this.divNames.icons_container, n = this.divNames.book_spread_title,
                    o = this.DARK_MODE ? "" : " light", h = {
                        build: function () {
                            if (e.NO_ONE_TITLES) {
                                var s = i[r].noTitle;
                                return g = t(['<table cellpadding="0" cellspacing="0" width="100%" align="center" border=0>', '<tr><td height="' + s + 'px" style="font-size:0;line-height:0;"><img width="1px" height="1px" src="' + e.GIF + '"></td></tr>', '<tr><td><div class="' + a + '" style="position:relative;"></div></td></tr>', "</table>"].join(""))
                            }
                            var o = e.CFG.ICONS_PANEL.titleSection;
                            return g = t(['<table cellpadding="0" cellspacing="0" width="100%" align="center" border=0>', '<tr><td height="' + o + 'px" class="' + n + '">&nbsp;</td></tr>', '<tr><td><div class="' + a + '" style="position:relative;"></div></td></tr>', "</table>"].join(""))
                        }
                    }, r = this.PANEL_TYPE, d = this.getIconsPanelWidth(), l = this.getIconsPanelHeight();
                if (r) {
                    var g = h.build(), A = t("#" + s);
                    A.size() && A.remove();
                    var A = t('<div id="' + s + '" class="unselectable' + o + '" style="visibility:hidden;"></div>').append(g).css({
                        width: d,
                        height: l
                    });
                    t("body").append(A), this.$gIconsPanel = A, !this.BOOK_INTERNAL && this.$gIconsPanel.mousewheel && this.$gIconsPanel.mousewheel(function () {
                        return !1
                    });
                    var p = t('<div style="width:1px;display:table-cell;"><img width="' + i[r].betweenIcons + 'px" src="' + this.GIF + '"></div>'),
                        c = A.find("." + a);
                    this.$gSpreadTitle = A.find("." + n);
                    var f = {
                        skin: function () {
                            e.$gSaveMenu.hide(), e.ZOOM_MODE || e.toggleSkin()
                        }, save: function () {
                            e.ZOOM_MODE || e.saveImagesAs()
                        }, next: function () {
                            e.gotoNext()
                        }, prev: function () {
                            e.gotoPrev()
                        }, zoom: function () {
                            e.$gSaveMenu.hide(), e.ZOOM_MODE || e.zoomIn()
                        }, close: function () {
                            e.$gSaveMenu.hide(), e.ZOOM_MODE || (e.fsapi.isFullScreen() ? (e.fsapi.exitFullScreen(), setTimeout(function () {
                                e.exit()
                            }, 700)) : e.exit())
                        }, fullScreen: function () {
                            if (e.$gSaveMenu.hide(), !e.ZOOM_MODE) if (e.BOOK_INTERNAL) {
                                var i = t.extend(e.options, {
                                    startPage: e.START_PAGE,
                                    parentBook: e.PRE_NAME,
                                    slope: e.CURRENT.slope_mode
                                });
                                t.onebook(e.IMAGES_SRC, i)
                            } else e.fsapi.isFullScreen() ? e.fsapi.exitFullScreen() : (e.bookHide(), e.bgLoaderShow(!0), e.fsapi.goFullScreen())
                        }, slope: function () {
                            e.$gSaveMenu.hide(), e.ZOOM_MODE || e.slopeAnimate()
                        }, toggleBook: function () {
                            e.$gSaveMenu.hide(), e.toggleBook()
                        }
                    }, E = e.fsapi.isFullScreen() ? "fromfullScreen" : "tofullScreen";
                    if ("tiny" === r) {
                        var S = this.cloneIconsSet();
                        S.find(">div").append(this.buttonCreate("Prev", f.prev)).append(p.clone()), S.find(">div").append(this.buttonCreate("Save", f.save)).append(p.clone()), S.find(">div").append(this.pageNumbersCreate(r)).append(p.clone()), S.find(">div").append(this.buttonCreate("Slope", f.slope)).append(p.clone()), S.find(">div").append(this.buttonCreate(E, f.fullScreen)).append(p.clone()), S.find(">div").append(this.buttonCreate("Next", f.next)), c.append(S), g.css({
                            position: "absolute",
                            zIndex: 10,
                            top: 0,
                            left: d / 2 - S.width() / 2
                        }), this.$gButtonsTitle = A.find(".btn_title")
                    } else if ("small" === r) {
                        var u = this.cloneIconsSet();
                        u.find(">div").append(this.buttonCreate("Save", f.save)).append(p.clone()), u.find(">div").append(this.pageNumbersCreate(r)).append(p.clone()), c.append(u.css({"float": "left"}));
                        var S = this.cloneIconsSet();
                        S.find(">div").append(this.buttonCreate("Prev", f.prev)).append(p.clone()), S.find(">div").append(this.buttonCreate("Zoom", f.zoom)).append(p.clone()), S.find(">div").append(this.buttonCreate("Next", f.next)), c.append(S), S.css({
                            position: "absolute",
                            zIndex: 10,
                            top: 0,
                            left: d / 2 - S.width() / 2
                        });
                        var R = this.cloneIconsSet();
                        R.find(">div").append(this.buttonCreate("togglebook", f.toggleBook)).append(p.clone()), R.find(">div").append(this.buttonCreate("Slope", f.slope)).append(p.clone()), R.find(">div").append(this.buttonCreate(E, f.fullScreen)), c.append(R.css({"float": "right"})), this.$gButtonsTitle = A.find(".btn_title")
                    } else if ("middle" === r) {
                        var u = this.cloneIconsSet();
                        u.find(">div").append(this.buttonCreate("Save", f.save)).append(p.clone()), u.find(">div").append(this.buttonCreate("Skin", f.skin)).append(p.clone()), u.find(">div").append(this.pageNumbersCreate(r)).append(p.clone()), c.append(u.css({"float": "left"}));
                        var S = this.cloneIconsSet();
                        S.find(">div").append(this.buttonCreate("Prev", f.prev)).append(p.clone()), S.find(">div").append(this.buttonCreate("Zoom", f.zoom)).append(p.clone()), S.find(">div").append(this.buttonCreate("Next", f.next)), c.append(S), S.css({
                            position: "absolute",
                            zIndex: 10,
                            top: 0,
                            left: d / 2 - S.width() / 2
                        });
                        var R = this.cloneIconsSet();
                        R.find(">div").append(this.buttonCreate("togglebook", f.toggleBook)).append(p.clone()), R.find(">div").append(this.buttonCreate("Slope", f.slope)).append(p.clone()), R.find(">div").append(this.buttonCreate(E, f.fullScreen)), R.find(">div").append(p.clone()).append(this.buttonCreate("Close", f.close)), c.append(R.css({"float": "right"})), this.$gButtonsTitle = A.find(".btn_title")
                    } else if ("large" === r) {
                        var u = this.cloneIconsSet();
                        u.find(">div").append(this.buttonCreate("Save", f.save)).append(p.clone()), u.find(">div").append(this.buttonCreate("Skin", f.skin)).append(p.clone()), c.append(u.css({"float": "left"}));
                        var S = this.cloneIconsSet();
                        S.find(">div").append(this.buttonCreate("Prev", f.prev)).append(p.clone()), S.find(">div").append(this.buttonCreate("Zoom", f.zoom)).append(p.clone()), S.find(">div").append(this.buttonCreate("Next", f.next)), c.append(S), S.css({
                            position: "absolute",
                            zIndex: 10,
                            top: 0,
                            left: d / 2 - S.width() / 2
                        });
                        var R = this.cloneIconsSet();
                        R.find(">div").append(this.buttonCreate("togglebook", f.toggleBook)).append(p.clone()), R.find(">div").append(this.buttonCreate("Slope", f.slope)), e.$TARGET || R.find(">div").append(p.clone()).append(this.buttonCreate("Close", f.close)), c.append(R.css({"float": "right"})), this.$gButtonsTitle = A.find(".btn_title")
                    }
                    this.changeSpreadTitle(), this.pageNumbersChange()
                }
            }, getHlpLayerGL: function () {
                var t = this.DARK_MODE ? "dark" : "light";
                return {
                    left: this.gGL && this.gGL.helpLayers ? this.gGL.helpLayers[t].left : "",
                    right: this.gGL && this.gGL.helpLayers ? this.gGL.helpLayers[t].right : ""
                }
            }, toggleSkinHlpLayerGLTo: function (t) {
                this.gGL && this.gGL.helpLayers && ("dark" === t ? (this.gGL.helpLayers.dark.left.material.opacity = 0, this.gGL.helpLayers.dark.right.material.opacity = 0, this.gGL.helpLayers.light.left.material.opacity = 1, this.gGL.helpLayers.light.right.material.opacity = 1) : (this.gGL.helpLayers.dark.left.material.opacity = 1, this.gGL.helpLayers.dark.right.material.opacity = 1, this.gGL.helpLayers.light.left.material.opacity = 0, this.gGL.helpLayers.light.right.material.opacity = 0)), this.startRender()
            }, toggleBook: function () {
                if (!this.ZOOM_MODE && !this.ANIMATION_FLAG) {
                    if (this.GLOSSY) var t = this.getHlpLayerGL();
                    this.START_FROM_END ? (this.START_FROM_END = !1, this.CURRENT.spread = 0, this.GLOSSY ? t.left && t.right && (t.left.material.opacity = 1, t.right.material.opacity = 0) : (this.$gHelpLayer.find(".hlpLeftSide").css({opacity: 1}), this.$gHelpLayer.find(".hlpRightSide").css({opacity: 0}))) : (this.START_FROM_END = !0, this.CURRENT.spread = this.getTotalSheets(), this.GLOSSY ? t.left && t.right && (t.left.material.opacity = 0, t.right.material.opacity = 1) : (this.$gHelpLayer.find(".hlpLeftSide").css({opacity: 0}), this.$gHelpLayer.find(".hlpRightSide").css({opacity: 1})));
                    var e = this.SHEETS_WAS_BUILT;
                    for (var i in e) e.hasOwnProperty(i) && this.deleteSheet(i);
                    this.START_PAGE = 2 * this.CURRENT.spread ? 2 * this.CURRENT.spread : 1, this.buildAndPreloadSheets(), this.changeSpreadTitle(), this.pageNumbersChange(), this.$G_ARR_BUTTONS.togglebook && this.$G_ARR_BUTTONS.togglebook.update()
                }
            }, toggleSkin: function () {
                var e = this, i = t("#" + this.divNames.book_page_numbers), s = this.DARK_MODE ? "light" : "dark",
                    n = window[a].SKIN, o = {
                        btn_update: function () {
                            for (var t in e.$G_ARR_BUTTONS) e.$G_ARR_BUTTONS[t].update()
                        }, hlp_update_images: function () {
                            e.GLOSSY || (e.$gHelpLayer.find("span[name=home_link]").css({background: "url(" + n.HOME_LINK[s].toDataURL() + ") no-repeat center"}), e.$gHelpLayer.find("span[name=help_arrow]").css({background: "url(" + n.HELP_ARROW[s].toDataURL() + ") no-repeat center"}))
                        }
                    };
                if (this.GLOSSY) {
                    this.getHlpLayerGL()
                }
                if (this.DARK_MODE) {
                    this.DARK_MODE = !1;
                    var h = this.getHlpLayerBgImage();
                    this.$gBookBackground.addClass("light"), i.addClass("light"), this.$gIconsPanel.addClass("light"), this.GLOSSY ? this.toggleSkinHlpLayerGLTo("dark") : (this.$gHelpLayer.addClass("light"), this.$gHelpLayer.find(".hlpLeftSide").css({background: "url(" + h.toDataURL() + ")"}), this.$gHelpLayer.find(".hlpRightSide").css({background: "url(" + bgImagetoDataURL() + ")"})), o.hlp_update_images(), o.btn_update()
                } else {
                    this.DARK_MODE = !0;
                    var h = this.getHlpLayerBgImage();
                    this.$gBookBackground.removeClass("light"), i.removeClass("light"), this.$gIconsPanel.removeClass("light"), this.GLOSSY ? this.toggleSkinHlpLayerGLTo("light") : (this.$gHelpLayer.removeClass("light"), this.$gHelpLayer.find(".hlpLeftSide").css({background: "url(" + h.toDataURL() + ")"}), this.$gHelpLayer.find(".hlpRightSide").css({background: "url(" + h.toDataURL() + ")"})), o.hlp_update_images(), o.btn_update()
                }
            }, cloneIconsSet: function () {
                var e = t('<div style="display:table;"><div style="display:table-row"></div></div>');
                return e.clone()
            }, pageNumbersCreate: function (e) {
                var i = this.divNames.book_page_numbers, s = this.CFG.ICONS_PANEL[e], a = s.pageNumbers.width,
                    n = s.pageNumbers.fontSize, o = this.DARK_MODE ? "" : 'class="light" ',
                    h = t(['<div id="' + i + '" ' + o, 'style="display:table-cell;vertical-align:middle;width:' + a + "px;font:" + n + 'px arial;">', '<span style=""></span></div>'].join(""));
                return h
            }, pageNumbersChange: function () {
                var e = this.divNames.book_page_numbers, i = this.CURRENT.spread, s = this.getTotalSheets(),
                    a = i + "&nbsp;/&nbsp;" + s;
                t("#" + e).find("span").html(a)
            }, buttonCreate: function (e, i, s) {
                this.$G_ARR_BUTTONS = this.$G_ARR_BUTTONS ? this.$G_ARR_BUTTONS : [];
                var n = this, e = e.toLowerCase(), o = s ? s.mode : this.DARK_MODE ? "dark" : "light";
                if (this.LARGE_ICONS) var h = window[a].SKIN.ICONS, r = this.BTNS_OFFSET, d = this.CFG.ICONS_SIZE.big,
                    l = ['<table width="100%" cellpadding="0" cellspacing="0">', '<tr><td height="' + d + 'px" align="center">', '<div class="btn_image" style="width:' + d + "px;height:" + d + 'px;" ><img src="' + this.GIF + '"></div>', "</td></tr>", '<tr><td align="center" class="btn_title">-</td></tr></table>'].join(""); else var h = window[a].SKIN.ICONS_MINI,
                    r = this.BTNS_MINI_OFFSET, d = this.CFG.ICONS_SIZE.small,
                    l = ['<div class="btn_image" style="width:' + d + "px;height:" + d + 'px;">', '<img src="' + this.GIF + '"></div>', "</div>"].join("");
                {
                    var g = function () {
                            var t = r[e][0], i = t.length > 1;
                            if (i) var s = r[e][2], a = n[s] ? 0 : 1, o = r[e][0][a], h = r[e][1][a]; else var o = t, h = e;
                            return {offset: o, lngTitle: n.getLNG(h)}
                        }, A = function (t) {
                            var e = n.DARK_MODE ? {start: .7, end: 1} : {start: .8, end: .5};
                            return e[t]
                        }, p = g(), c = "url(" + h[o].toDataURL() + ") no-repeat " + p.offset + " 0px",
                        f = t('<div class="book_btn" style="width:' + d + 'px;display:table-cell;cursor:pointer;">' + l + "</div>"),
                        E = f.clone(),
                        S = E.find(".btn_image").css({background: c, opacity: A("end")}).attr({title: p.lngTitle});
                    E.find(".btn_title").html(p.lngTitle)
                }
                return E.hover(function () {
                    S.css({opacity: A("start")})
                }, function () {
                    S.css({opacity: A("end")})
                }).mousedown(function () {
                    S.css({backgroundPosition: p.offset + " 1px"})
                }).mouseup(function () {
                    S.css({backgroundPosition: p.offset + " 0px"}), i && i(e)
                }), E.update = function () {
                    var t = g(), e = n.DARK_MODE ? "dark" : "light",
                        i = "url(" + h[e].toDataURL() + ") no-repeat " + t.offset + " 0px",
                        s = this.find(".btn_image").css({background: i, opacity: A("end")}).attr({title: t.lngTitle});
                    s = this.find(".btn_title").html(t.lngTitle)
                }, this.$G_ARR_BUTTONS[e] = E, E
            }, gotoNext: function () {
                this.$gSaveMenu.hide(), this.ZOOM_MODE || (this.ANIMATION_FLAG || this.startDrag ? this.ORDER_TO_ANIMATE = "next" : this.isDirectionCorrect("next") && this.animateSheet("next"))
            }, gotoPrev: function () {
                this.$gSaveMenu.hide(), this.ZOOM_MODE || (this.ANIMATION_FLAG || this.startDrag ? this.ORDER_TO_ANIMATE = "prev" : this.isDirectionCorrect("prev") && this.animateSheet("prev"))
            }, zoomIn: function (e) {
                var i = this;
                if (this.ZOOM_MODE || this.ANIMATE_ZOOM) return !1;
                this.ANIMATE_ZOOM = !0, this.ZOOM_MODE = 1;
                var s = this.divNames.zoom_layer, a = t("#" + s);
                a.size() && a.remove(), this.ZOOMSIZE = {
                    height: t(window).height(),
                    width: t(window).width(),
                    top: 0,
                    left: 0
                };
                var n = this.ZOOMSIZE;
                n.top = t(document).scrollTop();
                var o = .8, h = {width: n.width * o, height: n.height * o};
                h.top = Math.floor(n.top + (n.height - h.height) / 2), h.left = Math.floor(n.left + (n.width - h.width) / 2);
                var r = {
                    buildZoomLayer: function () {
                        var e = t('<div id="' + s + '"></div>').css({
                            border: "1px solid white",
                            position: "absolute",
                            top: h.top,
                            left: h.left,
                            width: h.width,
                            height: h.height,
                            cursor: "pointer",
                            opacity: .5,
                            zIndex: i.CFG.ZINDEX.zoomLayer
                        }).click(function () {
                            i.ANIMATE_ZOOM || i.zoomOut()
                        });
                        t("body").append(e), i.$gZoomLayer = t("#" + s), r.animateZoomLayerAppear()
                    }, animateZoomLayerAppear: function () {
                        var s = n.width, a = n.height;
                        i.$gZoomLayer.animate({
                            top: n.top,
                            left: n.left,
                            width: s,
                            height: a,
                            opacity: 1
                        }, 200, function () {
                            t(this).css({
                                opacity: 0,
                                border: "0px none",
                                background: "#e5e5e5"
                            }).animate({opacity: 1}, 300, function () {
                                i.ANIMATE_ZOOM = !1, i.showZoomContent(e)
                            })
                        })
                    }
                };
                r.buildZoomLayer()
            }, showZoomContent: function (t) {
                var e = this, t = t, i = this.getTotalSheets(), s = this.CURRENT.spread, a = 0 == s, n = s == i,
                    o = this.ZOOMSIZE, h = 250, r = 85,
                    d = {width: o.width, height: o.height - r, left: o.left, top: o.top}, l = a || n ? 1 : 2,
                    g = {height: this.CFG.BOOK_UNSCALED.height, width: this.CFG.BOOK_UNSCALED.width * l},
                    A = g.width < d.width && g.height < d.height,
                    p = {vertical: (g.height + 2 * h - d.height) / 100, horizontal: (g.width + 2 * h - d.width) / 100},
                    c = "", f = this.divNames.zoom_content, E = this.divNames.zoom_behavior_section,
                    S = this.divNames.zoom_title_spread, u = this.divNames.zoom_buttons,
                    R = "position:absolute;width:100%;height:" + r + "px;top:" + d.height + "px;left:0px;",
                    m = ['<div class="' + f + '" style="width:100%;height:100%;"></div>', '<div style="' + R + 'z-index:10;background:white;opacity:0.8">&nbsp;</div>', '<div style="' + R + 'z-index:30;" class="' + u + '">&nbsp;</div>', '<div style="position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:20;">', '<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0">', '<tr><td colspan=3 align="center" class="' + E + '"></td></tr>', '<tr><td align="center" class="' + S + '">' + this.CURRENT.spreadTitle + "</td></tr>", "</table>", "</div>"].join("");
                this.$gZoomLayer.html(m);
                var v = this.$gZoomLayer.find("." + f), _ = this.$gZoomLayer.find("." + E).css({height: d.height}),
                    T = (this.$gZoomLayer.find("." + S).css({height: r}), this.$gZoomLayer.find("." + u)), O = {
                        buttonsInsert: function () {
                            var t = e.cloneIconsSet();
                            t.append(e.buttonCreate("zoomClose", function () {
                            }, {mode: "light"})), T.append(t.css({"float": "right", margin: "8px 8px 0px 0px"}))
                        }, calculateCoord: function (t) {
                            var e = {x: t.x - d.left, y: t.y - d.top},
                                i = {vertical: 100 / (d.height / e.y), horizontal: 100 / (d.width / e.x)},
                                s = p.vertical * i.vertical * -1 + h, a = p.horizontal * i.horizontal * -1 + h;
                            return {top: s, left: a}
                        }, moveContent: function (t) {
                            c.css({marginTop: t.top + "px", marginLeft: t.left + "px"})
                        }, contentToCenter: function () {
                            var e = 20, i = parseFloat(c.css("marginLeft")) || 0, s = parseFloat(c.css("marginTop")) || 0;
                            if (t && !A) var a = this.calculateCoord(t), n = a.left,
                                o = a.top; else var n = (g.width - d.width) / 2 * -1,
                                o = g.height < d.height ? (g.height - d.height) / 2 * -1 : 0;
                            O.recurseAnimation(e, 0, [i, s], [n, o])
                        }, behaviors: function () {
                            var i = this;
                            _.mousemove(function (t) {
                                A || O.moveContent(i.calculateCoord({x: t.pageX, y: t.pageY}))
                            }).hover(function () {
                                A || (e.TMR_ZOOMPAGES_ANI && (clearTimeout(e.TMR_ZOOMPAGES_ANI), e.TMR_ZOOMPAGES_ANI = null), t ? t = !1 : c.hide().fadeIn("normal"))
                            }, function () {
                                t && (t = !1), O.contentToCenter()
                            })
                        }, recurseAnimation: function (t, i, s, a) {
                            e.TMR_ZOOMPAGES_ANI = setTimeout(function () {
                                i++;
                                var e = i / t, n = 1 - (1 - Math.sin(Math.acos(1 - e))), o = 100 * n,
                                    h = s[1] - (s[1] - a[1]) / 100 * o, r = s[0] - (s[0] - a[0]) / 100 * o;
                                c.css({margin: h + "px 0px 0px " + r + "px"}), t > i && O.recurseAnimation(t, i, s, a)
                            }, 5)
                        }, showEmptyPages: function () {
                            var t = g.height, e = g.width, i = "";
                            i += a || n ? a ? '<td class="page_front"></td>' : '<td class="page_back"></td>' : '<td class="page_back" width="50%"></td><td class="page_front" width="50%"></td>';
                            var s = ['<table class="zoom_pages" width="' + e + 'px" height="' + t + 'px" style="display:none;"><tr>', i, "</tr></table>"].join("");
                            v.html(s), c = v.find(".zoom_pages"), O.behaviors(), O.insertSelfShadow(), O.choosePageForLoading()
                        }, insertSelfShadow: function () {
                            var t = e.SELFSHADOW_UNSCALED, i = c.height();
                            c.find(".page_back").html('<div style="width:100%;height:' + i + "px;background:url(" + t.back.toDataURL() + ') no-repeat;">&nbsp;</div>'), c.find(".page_front").html('<div style="width:100%;height:' + i + "px;background:url(" + t.front.toDataURL() + ') no-repeat;">&nbsp;</div>'), c.fadeIn("normal"), O.contentToCenter()
                        }, insertImageToZoomPage: function (t) {
                            var i = "left" == t.side ? ".page_back" : ".page_front", a = "left" == t.side ? s - 1 : s,
                                n = e.buildResizedImage(e.CFG.BOOK_UNSCALED, 1, {
                                    img: t.img,
                                    page: "left" == t.side ? 0 : 1,
                                    sheet: a
                                }, !1);
                            if (e.CFG.DIVIDE_IMAGES) {
                                var o = "left" == t.side ? 0 : -1 * e.CFG.BOOK_UNSCALED.width;
                                c.find(i).css({background: 'url("' + n.toDataURL() + '") ' + o + "px 0px no-repeat"})
                            } else c.find(i).css({background: 'url("' + n.toDataURL() + '") no-repeat'})
                        }, loadImageForZoomPage: function (t, i) {
                            if (e.TMR_ZOOM || (e.TMR_ZOOM = {}), t.indexOf(".png") > -1 || t.indexOf(".jpg") > -1 || t.indexOf(".gif") > -1) {
                                var s = new Image;
                                s.onload = function () {
                                    var e = {img: this, src: t, side: i};
                                    setTimeout(function () {
                                        O.insertImageToZoomPage(e)
                                    }, 10)
                                }, e.IMG_NOW_LOADING_FOR_ZOOM.push(s), s.src = t
                            }
                        }, choosePageForLoading: function () {
                            if (s) if (s == i) {
                                var t = 2 * i - 1, a = e.ARR_PAGES_SRC[t];
                                O.loadImageForZoomPage(a, "left")
                            } else {
                                var t = 2 * s - 1, a = e.ARR_PAGES_SRC[t];
                                O.loadImageForZoomPage(a, "left");
                                var t = 2 * s, a = e.ARR_PAGES_SRC[t];
                                O.loadImageForZoomPage(a, "right")
                            } else {
                                var t = 0, a = e.ARR_PAGES_SRC[t];
                                O.loadImageForZoomPage(a, "right")
                            }
                        }
                    };
                O.buttonsInsert(), O.showEmptyPages()
            }, zoomOut: function () {
                return this.ZOOM_MODE ? (this.ZOOM_MODE = 0, void(this.$gZoomLayer && this.$gZoomLayer.remove())) : !1
            }, rotate_x_to: function (t) {
                this.GLOSSY && this.gGL && (this.gGL.bookBase.rotation.x = t * Math.PI / 180 * -1, this.startRender());
                var e = "translate3d(" + this.OFFSET.left + "px," + this.OFFSET.top + "px,0px) rotateX(" + t + "deg)";
                this.$gContainter.css({"-webkit-transform": e, "-moz-transform": e, "-ms-transform": e})
            }, slopeAnimate: function () {
                var t = this;
                if (this.ANIMATION_SLOPE) return !1;
                this.ANIMATION_SLOPE = !0;
                var e = this.CFG.ARR_SLOPE_ANGLES.length, i = t.CURRENT.slope_mode, s = this.CFG.ARR_SLOPE_ANGLES[i];
                this.CURRENT.slope_mode = e > i + 1 ? i + 1 : 0, this.CFG.START_SLOPE_MODE = this.CURRENT.slope_mode;
                var a = this.CFG.ARR_SLOPE_ANGLES[this.CURRENT.slope_mode], n = a > s ? 1 : -1, o = function () {
                    s += n, setTimeout(function () {
                        s != a ? (t.rotate_x_to(s), o()) : (t.rotate_x_to(s), t.ANIMATION_SLOPE = !1)
                    }, 10)
                };
                o()
            }, slopeAnimateTo: function (t) {
                var e = this;
                if (this.ANIMATION_SLOPE) return !1;
                this.ANIMATION_SLOPE = !0;
                var i = this.CFG.ARR_SLOPE_ANGLES.length, s = e.CURRENT.slope_mode, a = this.CFG.ARR_SLOPE_ANGLES[s];
                if ("up" === t) {
                    if (!(i > s + 1)) return e.ANIMATION_SLOPE = !1, !1;
                    this.CURRENT.slope_mode = s + 1
                } else {
                    if (!(s > 0)) return e.ANIMATION_SLOPE = !1, !1;
                    this.CURRENT.slope_mode = s - 1
                }
                this.CFG.START_SLOPE_MODE = this.CURRENT.slope_mode;
                var n = this.CFG.ARR_SLOPE_ANGLES[this.CURRENT.slope_mode], o = n > a ? 1 : -1, h = function () {
                    a += o, setTimeout(function () {
                        a != n ? (e.rotate_x_to(a), h()) : (e.rotate_x_to(a), e.ANIMATION_SLOPE = !1)
                    }, 10)
                };
                h()
            }, slopeToggle: function (t) {
                var t = parseInt(t, 10), e = this.CFG.ARR_SLOPE_ANGLES;
                if (t < e.length) {
                    var i = e[t];
                    this.CURRENT.slope_mode = t, this.CFG.START_SLOPE_MODE = this.CURRENT.slope_mode, this.rotate_x_to(i)
                }
            }, fit3dDataToBookSize: function () {
                var t = this;
                this.FRAMES = this.getClonedData(), this.FRAMES_GL_SCALED = this.getClonedData();
                var e = this.$TARGET ? {horizontal: 0, vertical: 0} : this.CFG.SPACE_AROUND_STAGE, i = {
                    width: this.FIRST_IMAGE_SIZE.w + 2 * t.CFG.BORDER || 100,
                    height: this.FIRST_IMAGE_SIZE.h + 2 * t.CFG.BORDER || 100
                };
                this.CFG.DIVIDE_IMAGES && (i.width = i.width % 2 > 0 ? (i.width - 1) / 2 : i.width / 2);
                var s = this.$TARGET ? this.TARGETSIZE : this.WINSIZE;
                this.BOOK_INTERNAL && (s.height = this.CFG.MAX_SCREEN_SIZE.height);
                var a = this.getIconsPanelHeight(), n = {
                    w: Math.min(this.CFG.MAX_SCREEN_SIZE.width, s.width) - e.horizontal,
                    h: Math.min(this.CFG.MAX_SCREEN_SIZE.height, s.height) - a - e.vertical
                }, o = {
                    w: 2 * i.width + 2 * this.CFG.PASPARTU_BEHAVIORS_PARAM.width,
                    h: i.height + 2 * this.CFG.PASPARTU_BEHAVIORS_PARAM.height
                };
                if (o.w > n.w || o.h > n.h) var h = n.w / o.w, r = n.h / o.h, d = Math.min(h, r); else var d = 1;
                this.GSCALE = d, bookUnscaled = {
                    width: i.width,
                    height: i.height
                }, i.width = Math.round(i.width * this.GSCALE), i.height = Math.round(i.height * this.GSCALE);
                var l = {width: 800, height: Math.round(800 * i.height / i.width)}, g = this.FRAMES[0][0].bezie.length,
                    A = Math.abs(this.FRAMES[0][0].bezie[g - 1].x), p = i.width / A, c = l.width / A,
                    f = function (t, e) {
                        for (var i = 0; i < t.length; i++) for (var s = t[i].edges3d, a = 0; a < s.length; a++) s[a].width *= e, s[a].x *= e, s[a].z *= e
                    };
                f(this.FRAMES[0], p), f(this.FRAMES[1], p), f(this.FRAMES_GL_SCALED[0], c), f(this.FRAMES_GL_SCALED[1], c), i.width && i.height && this.initWithSize(i, bookUnscaled, l)
            }, initWithSize: function (t, e, i) {
                var s = this;
                this.CFG.BOOK_GL_SIZE = i, this.CFG.BOOK_SIZE = t, this.CFG.BOOK_UNSCALED = e, this.MOUSE = {
                    startDragCoord: {
                        x: 0,
                        y: 0
                    }, oldCoord: {x: 0, y: 0}, lastCoord: {x: 0, y: 0}, isOverStage: !1
                }, this.ANIMATION = {SPEED: 15}, this.STAGE = {
                    width: 2 * Math.round(this.CFG.BOOK_SIZE.width + this.CFG.PASPARTU_BEHAVIORS_PARAM.width * this.GSCALE),
                    height: Math.round(this.CFG.BOOK_SIZE.height + 2 * this.CFG.PASPARTU_BEHAVIORS_PARAM.height * this.GSCALE)
                }, this.STAGE_HALF = {
                    width: this.STAGE.width / 2,
                    height: Math.round(this.STAGE.height / 2)
                }, this.STAGE_CENTER = {
                    top: 0,
                    left: 0
                }, this.OFFSET = {
                    top: Math.round(.5 * (this.STAGE.height - this.CFG.BOOK_SIZE.height)),
                    left: .5 * this.STAGE.width
                }, this.CURRENT = {
                    frame: 0,
                    sheet: -1,
                    dragged_sheet: -1,
                    spread: 0,
                    hoverframe: 0,
                    hoverside: "front",
                    dir_ani: 1,
                    slope_mode: this.CFG.START_SLOPE_MODE,
                    spreadTitle: ""
                }, this.LAST = {
                    mousemoved: !1,
                    sheet: -1,
                    forward: 1,
                    moved: {sheet: -1, $edges: !1, forward: 0}
                }, this.$gStage.css({
                    width: this.STAGE.width,
                    height: this.STAGE.height,
                    border: "0px solid red"
                }), this.$gContainter.css({
                    width: this.CFG.BOOK_SIZE.width,
                    height: this.CFG.BOOK_SIZE.height * this.CFG.ROTATE_CENTER_OFFSET,
                    border: "0px solid gold"
                }), this.calculateSheets(), this.correctStartPage(), this.SELFSHADOW = {
                    front: this.createSelfShadow("front", this.CFG.BOOK_SIZE),
                    back: this.createSelfShadow("back", this.CFG.BOOK_SIZE)
                }, this.SELFSHADOW_UNSCALED = {
                    front: this.createSelfShadow("front", this.CFG.BOOK_UNSCALED),
                    back: this.createSelfShadow("back", this.CFG.BOOK_UNSCALED)
                }, this.buildIconsPanel(), this.buildSaveMenuLayer(), !s.GLOSSY && this.buildHelpLayer(), this.stageToCenter(), this.behavior(), this.GLOSSY && (this.gGL ? (this.updateGlStage(), this.updateGlHlpLayer()) : (this.gGL = this.getGlStage(), this.createGlHlpLayer(), this.renderGL()), this.startRender()), this.rotate_x_to(this.CFG.ARR_SLOPE_ANGLES[this.CURRENT.slope_mode]), this.buildAndPreloadSheets()
            }, updateGlStage: function () {
                var t = this.gGL, e = this.$gStage.width(), i = this.$gStage.height();
                this.$gGlossyContainter.css({width: e, height: i}), t.renderer.setSize(e, i)
            }, updateGlHlpLayer: function () {
                var t = this.gGL.helpLayers;
                this.gGL.bookBase.remove(t.dark.left), this.gGL.bookBase.remove(t.dark.right), this.gGL.bookBase.remove(t.light.left), this.gGL.bookBase.remove(t.light.right), this.createGlHlpLayer()
            }, createGlHlpLayer: function () {
                var t = this, e = this.CFG.BOOK_SIZE, i = this.CFG.BOOK_GL_SIZE,
                    s = {dark: this.getHlpLayerBgImage("dark"), light: this.getHlpLayerBgImage("light")},
                    n = {width: 300, height: 200}, o = this.DARK_MODE ? "dark" : "light", h = window[a].SKIN, r = {
                        PlainTextured: function (t) {
                            var e = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
                                s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                                a = t.src || e, n = THREE.FrontSide, h = t.skin,
                                r = new THREE.Mesh(new THREE.PlaneGeometry(i.width, i.height), new THREE.MeshBasicMaterial({
                                    map: THREE.ImageUtils.loadTexture(s),
                                    transparent: !0,
                                    side: n
                                }));
                            return THREE.ImageUtils.loadTexture(a, void 0, function (e) {
                                r.material.map = e, h !== o && (r.material.opacity = 0), t.onReady && t.onReady(r)
                            }), r
                        }, backgroundImage: function (t, a) {
                            var o = document.createElement("canvas");
                            o.width = i.width, o.height = i.height;
                            var h = o.getContext("2d");
                            h.drawImage(s[a], 0, 0, o.width, o.height), h.lineWidth = 4, h.strokeStyle = "dark" === a ? "#888888" : "#bcbcbc";
                            var d = 470 / e.width;
                            if (d = d > 2.2 ? 2.2 : d, d = .8 > d ? .8 : d, "left" === t) {
                                h.beginPath(), h.moveTo(i.width, 0), h.lineTo(0, 0), h.lineTo(0, i.height), h.lineTo(i.width, i.height), h.stroke();
                                var l = r.hlpLeftImage(a);
                                h.drawImage(l, i.width - n.width * d - 20, i.height - n.height * d - 20, n.width * d, n.height * d)
                            } else {
                                h.beginPath(), h.moveTo(0, 0), h.lineTo(i.width, 0), h.lineTo(i.width, i.height), h.lineTo(0, i.height), h.stroke();
                                var g = r.hlpRightImage(a);
                                h.drawImage(g, i.width - n.width * d - 20, i.height - n.height * d - 20, n.width * d, n.height * d)
                            }
                            return o.toDataURL()
                        }, hlpLeftImage: function (e) {
                            var i = t.getLNG("hlpClickToOpen"), s = t.getLNG("hlpUseMousewheelGL"),
                                a = document.createElement("canvas");
                            a.width = n.width, a.height = n.height;
                            var o = a.getContext("2d");
                            o.fillStyle = "dark" === e ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)", o.font = "bold 20pt Arial", o.textAlign = "right", o.fillText(i, n.width - 10, n.height - 155), o.fillStyle = "dark" === e ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,.5)", o.font = "18pt Arial", o.fillText(s[0], n.width - 10, n.height - 110), o.fillText(s[1], n.width - 10, n.height - 80);
                            var r = h.HELP_ARROW[e], d = 1.5;
                            return o.drawImage(r, a.width - r.width * d - 10, a.height - r.height * d - 20, r.width * d, r.height * d), a
                        }, hlpRightImage: function (e) {
                            var i = t.getLNG("toStart"), s = document.createElement("canvas");
                            s.width = n.width, s.height = n.height;
                            var a = s.getContext("2d");
                            return a.fillStyle = "dark" === e ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)", a.font = "20pt Arial", a.textAlign = "right", a.fillText(i, n.width - 10, n.height - 10), s
                        }
                    }, d = r.PlainTextured({
                        src: r.backgroundImage("left", "light"),
                        side: "left",
                        skin: "light",
                        onReady: function (e) {
                            e.position.y = i.height * t.CFG.ROTATE_CENTER_OFFSET_GL, e.position.z = -5, e.position.x = .5 * -i.width, t.gGL.bookBase.add(e)
                        }
                    }), l = r.PlainTextured({
                        src: r.backgroundImage("right", "light"),
                        side: "right",
                        skin: "light",
                        onReady: function (e) {
                            e.position.y = i.height * t.CFG.ROTATE_CENTER_OFFSET_GL, e.position.z = -5, e.position.x = .5 * i.width, t.gGL.bookBase.add(e)
                        }
                    }), g = r.PlainTextured({
                        src: r.backgroundImage("left", "dark"), side: "left", skin: "dark", onReady: function (e) {
                            e.position.y = i.height * t.CFG.ROTATE_CENTER_OFFSET_GL, e.position.z = -5, e.position.x = .5 * -i.width, t.gGL.bookBase.add(e)
                        }
                    }), A = r.PlainTextured({
                        src: r.backgroundImage("right", "dark"),
                        side: "right",
                        skin: "dark",
                        onReady: function (e) {
                            e.position.y = i.height * t.CFG.ROTATE_CENTER_OFFSET_GL, e.position.z = -5, e.position.x = .5 * i.width, t.gGL.bookBase.add(e)
                        }
                    });
                this.gGL.helpLayers = {light: {left: d, right: l}, dark: {left: g, right: A}}
            }, correctStartPage: function () {
                var t = function (t, e, i) {
                    return e > t && (t = e), t > i && (t = i), t
                };
                this.START_PAGE = t(this.START_PAGE, 1, 2 * this.getTotalSheets()), this.CURRENT.spread = (this.START_PAGE - this.START_PAGE % 2) / 2, this.START_FROM_END = this.CURRENT.spread === this.getTotalSheets()
            }, calculateSheets: function () {
                if (!this.ALLSHEETS || !this.ALLSHEETS.length) {
                    this.ALL_PAGES_MAP = [];
                    var t = [];
                    if (this.CFG.DIVIDE_IMAGES) {
                        this.ARR_PAGES_SRC.length < 2 && this.ARR_PAGES_SRC.push(this.CFG.PAGE_DEFAULT_COLOR);
                        var e = 2 * this.ARR_PAGES_SRC.length, i = [];
                        i.push(this.ARR_PAGES_SRC[0]);
                        for (var s = 1; s < this.ARR_PAGES_SRC.length; s++) i.push(this.ARR_PAGES_SRC[s]), i.push(this.ARR_PAGES_SRC[s]);
                        i.push(this.ARR_PAGES_SRC[0]), this.ARR_PAGES_SRC = i
                    } else var e = this.ARR_PAGES_SRC.length;
                    for (var s = 0; e > s; s++) {
                        var a = this.ARR_PAGES_SRC[s].indexOf(".jpg") > -1 || this.ARR_PAGES_SRC[s].indexOf(".png") > -1 || this.ARR_PAGES_SRC[s].indexOf(".gif") > -1;
                        this.ALL_PAGES_MAP[s] = a ? "image" : "color"
                    }
                    var n = e % 2 > 0 ? (e + 1) / 2 : e / 2;
                    2 * n > e && this.ARR_PAGES_SRC.push(this.CFG.PAGE_DEFAULT_COLOR);
                    for (var s = 0; s < this.ARR_PAGES_SRC.length; s += 2) t.push({
                        front: this.ARR_PAGES_SRC[s],
                        back: this.ARR_PAGES_SRC[s + 1],
                        opened: 0
                    });
                    this.ALLSHEETS = t
                }
            }, createSelfShadow: function (t, e) {
                var i = document.createElement("canvas");
                i.width = e.width, i.height = e.height;
                var s = i.getContext("2d"), a = s.createLinearGradient(0, 0, i.width, 0);
                return "front" == t ? (a.addColorStop(0, "rgba(0,0,0,0.15)"), a.addColorStop(.3, "rgba(0,0,0,0)")) : (a.addColorStop(.7, "rgba(255,255,255,0)"), a.addColorStop(1, "rgba(255,255,255,0.15)")), s.fillStyle = a, s.fillRect(0, 0, i.width, i.height), i
            }, addCeshNames: function (t) {
                for (var e = 0; e < this.ARR_PAGES_SRC.length; e++) {
                    var i = this.ARR_PAGES_SRC[e];
                    (i.indexOf(".png") > -1 || i.indexOf(".jpg") > -1 || i.indexOf(".gif") > -1) && (this.ARR_PAGES_SRC[e] += "?cash=" + t)
                }
            }, getClonedData: function () {
                return t.extend(!0, {}, {arr: this.FRDATA}).arr
            }, getLNG: function (t) {
                var e = this.LNG[t] || this.LNG[t.toLowerCase()];
                return e ? e[this.CFG.LANGUAGE] : "unknown"
            }, findBookSizeByFirstImage: function (t) {
                for (var e = this, i = "", s = 0; s < this.ARR_PAGES_SRC.length && "" == i; s++) {
                    var a = this.ARR_PAGES_SRC[s];
                    (a.indexOf(".png") > -1 || a.indexOf(".jpg") > -1 || a.indexOf(".gif") > -1) && (i = a)
                }
                if ("" != i) {
                    var n = new Image;
                    n.onload = function () {
                        e.FIRST_IMAGE_SIZE = {w: this.width, h: this.height}, t && t()
                    }, n.src = i
                }
            }, isNeedResizeReposInternal: function () {
                if (this.BOOK_INTERNAL) {
                    var t = this.$TARGET, e = {top: 0, left: t.offset().left, width: t.width(), height: 100},
                        i = this.TARGETSIZE;
                    return this.TARGETSIZE = e, e.width !== i.width ? "resize" : e.left !== i.left ? "reposition" : !1
                }
                return !1
            }, behavior: function () {
                var e = this;
                this.startDrag = !1, this.HAS_BEHAVIORS || (t(window).bind("resize." + this.PRE_NAME, function () {
                    e.zoomOut(), e.TMR_RESIZE && (clearTimeout(e.TMR_RESIZE), e.TMR_RESIZE = null), e.TMR_RESIZE = setTimeout(function () {
                        if (e.BOOK_INTERNAL) {
                            if (!window[a].SUPERBOOK) {
                                var t = e.isNeedResizeReposInternal();
                                t && e.restart(t)
                            }
                        } else e.restart()
                    }, 300)
                }), t(document).bind("keyup." + this.PRE_NAME, function (t) {
                    window[a].CURRENT === e.PRE_NAME && (39 === t.keyCode ? e.gotoNext() : 37 === t.keyCode && e.gotoPrev())
                }), this.HAS_BEHAVIORS = !0);
                var i = {
                    id: this.PRE_NAME + "canvasZoomWaiter", size: this.CFG.ZOOM_WAITER_SIZE, create: function () {
                        e.$gZoomWaiter = t("#" + e.divNames.zoom_waiter).css({
                            width: this.size,
                            height: this.size
                        }), e.$gZoomWaiter.html('<canvas id="' + this.id + '" width="' + this.size + '" height="' + this.size + '"></canvas>'), e.gZoomWaiterContext = document.getElementById(this.id) && document.getElementById(this.id).getContext("2d")
                    }
                };
                i.create();
                var s = {
                    size: this.CFG.ZOOM_WAITER_SIZE, radius: 25, draw: function (t) {
                        var i = this.size, s = this.radius, a = function (e) {
                            e.clearRect(0, 0, i, i), e.beginPath(), e.lineWidth = 2, e.strokeStyle = "#c7c7c7";
                            var a = i / 2, n = (t - 90) * Math.PI / 180, o = -1.5707963267948966;
                            e.arc(a, a, s, o, n), e.stroke()
                        };
                        e.gZoomWaiterContext && a(e.gZoomWaiterContext)
                    }, show: function () {
                        var t = e.STAGE_BOUNDING_BOX, i = e.MOUSE.startDragCoord;
                        e.$gZoomWaiter.css({top: i.y - 30 - t.top, left: i.x - 30 - t.left}).show()
                    }, hide: function () {
                        e.$gZoomWaiter.hide()
                    }
                }, n = function (t) {
                    var i, a = 0, o = {time: 20, start: 5, pause: 40}, h = 360 / (o.time - o.start), r = !1;
                    (n = function (t) {
                        var d = {
                            stop_waiting: function () {
                                r && (r = !1, s.hide(), a && (a = 0, i && clearTimeout(i), i = null))
                            }, verify: function () {
                                t ? this.stop_waiting() : a > o.time - 1 ? (this.stop_waiting(), e.GLOSSY || e.getSheetByIndex(e.CURRENT.dragged_sheet).find(".wholeimage").show(), e.ORDER_TO_ANIMATE = !1, e.stop_drag(), e.zoomIn(e.MOUSE.startDragCoord)) : (r = !0, a++, a === o.start + 1 && s.show(), a > o.start && s.draw(h * (a - o.start)), i = setTimeout(function () {
                                    n()
                                }, o.pause))
                            }
                        };
                        d.verify()
                    })(t)
                }, o = t("#" + e.divNames.book_stage);
                o.unbind(), o.swipeMePls({
                    preventDefault: !0, enableMouse: !1, distance: 100, onSwipe: function (t) {
                        if ("right" === t.direction || "left" === t.direction) {
                            var i = "right" === t.direction ? "gotoPrev" : "gotoNext";
                            e.clickSpeedIsOk() && e[i]()
                        } else ("up" === t.direction || "down" === t.direction) && e.slopeAnimateTo(t.direction)
                    }
                }), o.hover(function () {
                    e.MOUSE.isOverStage = !0
                }, function () {
                    e.MOUSE.isOverStage = !1, e.ANIMATION_FLAG || e.startDrag && e.stop_drag_and_animate()
                }), o.mousedown(function (t) {
                    return e.LAST.mousemoved = !1, e.ZOOM_MODE ? !1 : e.ANIMATION_FLAG || !e.isMouseOverPage() ? !1 : (n(), e.start_drag(t), !1)
                }), o.mouseup(function () {
                    if (e.ZOOM_MODE) return !1;
                    n("stop");
                    var t = "front" === e.CURRENT.hoverside ? "next" : "back";
                    return e.ANIMATION_FLAG ? (e.LAST.mousemoved || (e.ORDER_TO_ANIMATE = t), !1) : (e.startDrag && e.stop_drag_and_animate(), void(e.GLOSSY && e.GL_LINK_TO_START && e.gotoSpread(0)))
                }), o.mousemove(function (t) {
                    if (e.MOUSE.oldCoord = e.MOUSE.lastCoord, e.MOUSE.lastCoord = {
                            x: t.pageX,
                            y: t.pageY
                        }, e.calculateSideAndFrame(e.MOUSE.lastCoord), e.LAST.mousemoved = !0, !e.ZOOM_MODE && n("stop"), e.ANIMATION_FLAG) return !1;
                    if (e.startDrag) {
                        var i = Math.abs(e.MOUSE.oldCoord.x - e.MOUSE.lastCoord.x);
                        if (i > e.CFG.MAX_MOUSE_SPEED_X) return void e.stop_drag_and_animate();
                        var s = Math.abs(e.MOUSE.startDragCoord.x - e.MOUSE.lastCoord.x),
                            a = Math.round(s / e.CFG.DRAG_PARAM.px_per_persent), o = a + e.START_DRAG_FRAME || 0;
                        if (o > e.CFG.MAX_FRAME_DRAGGABLE) return void e.stop_drag_and_animate();
                        e.drag_sheet(o)
                    }
                }), o.mousewheel && o.mousewheel(function (t, i) {
                    if (e.ANIMATION_FLAG || e.startDrag) return !1;
                    var s = i > 0 ? "gotoPrev" : "gotoNext";
                    return e.clickSpeedIsOk() && e[s](), !1
                })
            }, clickSpeedIsOk: function () {
                var t = (new Date).getTime();
                if (this.G_TMR_SPEED_CLICK) {
                    var e = this.G_TMR_SPEED_CLICK, i = t - e;
                    return i > 1100 ? (this.G_TMR_SPEED_CLICK = t, !0) : !1
                }
                return this.G_TMR_SPEED_CLICK = t, !0
            }, start_drag: function (t) {
                this.MOUSE.startDragCoord = {
                    x: t.pageX,
                    y: t.pageY
                }, this.START_DRAG_FRAME = this.CURRENT.frame, this.startDrag = this.CURRENT.hoverside;
                var e = this.CURRENT.spread;
                this.CURRENT.dragged_sheet = "front" == this.startDrag ? e : e - 1
            }, stop_drag_and_animate: function () {
                var t = "front" == this.startDrag ? "gotoNext" : "gotoPrev";
                this.CURRENT.dragged_sheet = -1, this.startDrag = !1, this[t]()
            }, stop_drag: function () {
                this.CURRENT.dragged_sheet = -1, this.startDrag = !1
            }, changeSpreadTitle: function () {
                var t = this.CURRENT.spread, e = this.ARR_PAGES_TITLE.length, i = {left: "", right: ""}, s = "";
                if (0 === t) {
                    var a = !0;
                    i.right = this.ARR_PAGES_TITLE[0] || ""
                } else if (2 * t - 1 == e) {
                    var n = !0;
                    i.left = this.ARR_PAGES_TITLE[2 * t - 1] || ""
                } else i.left = this.ARR_PAGES_TITLE[2 * t - 1] || "", i.right = this.ARR_PAGES_TITLE[2 * t] || "";
                if (a) s = "<p>" + i.right + "</p>"; else if (n) s = "<p>" + i.left + "</p>"; else {
                    var o = this.getLNG("left"), h = this.getLNG("right");
                    i.left && i.right ? s = ["<p><span>" + o + ":</span> " + i.left + "<br>", "<span>" + h + ":</span> " + i.right + "</p>"].join("") : i.left ? s = "<p><span>" + o + ":</span> " + i.left + "</p>" : i.right && (s = "<p><span>" + h + ":</span> " + i.right + "</p>")
                }
                this.CURRENT.spreadTitle = s, this.$gSpreadTitle.html(s)
            }, calculateBounds: function () {
                var e = this, i = e.CFG.ICONS_PANEL, s = e.getIconsPanelHeight(), a = e.STAGE,
                    n = e.$TARGET ? e.TARGETSIZE : e.WINSIZE,
                    o = e.$TARGET ? {top: e.$TARGET.offset().top, left: e.$TARGET.offset().left} : {top: 0, left: 0},
                    h = e.CFG.PASPARTU_BEHAVIORS_PARAM.height * e.GSCALE, r = h * i.overlay_pr,
                    d = Math.round(.5 * (n.height - (a.height + s - r)));
                d = e.BOOK_INTERNAL ? 0 : d + t(document).scrollTop(), this.STAGE_OFFSET = offset = {
                    left: Math.round(.5 * n.width - .5 * a.width) + o.left,
                    top: d + o.top
                }, this.STAGE_CENTER = {
                    top: Math.round(offset.top + .5 * a.height),
                    left: Math.round(offset.left + .5 * a.width)
                }, this.STAGE_BOUNDING_BOX = {width: a.width, height: a.height, top: offset.top, left: offset.left};
                var l = this.$gIconsPanel.width();
                this.ICONS_PANEL_BOUNDS = ipb = {
                    width: l,
                    height: this.$gIconsPanel.height(),
                    left: .5 * n.width - .5 * l + o.left,
                    top: offset.top + e.STAGE.height - r
                }, this.MAX_BOUNDS = {
                    width: Math.max(e.STAGE_BOUNDING_BOX.width, ipb.width),
                    height: Math.round(ipb.top + ipb.height - e.STAGE_BOUNDING_BOX.top),
                    top: e.STAGE_BOUNDING_BOX.top,
                    left: Math.min(e.STAGE_BOUNDING_BOX.left, ipb.left)
                }
            }, stageToCenter: function () {
                var t = this;
                this.STAGE && (this.tmrToCenter && clearTimeout(this.tmrToCenter), this.$gStage.hide(), this.tmrToCenter = setTimeout(function () {
                    t.calculateBounds(), t.$gStage.css({
                        top: t.STAGE_OFFSET.top,
                        left: t.STAGE_OFFSET.left
                    }).show(), t.bgLoaderShow(!1);
                    var e = t.ICONS_PANEL_BOUNDS, i = {width: t.$gBookLoader.width(), height: t.$gBookLoader.height()},
                        s = {width: t.$gSaveMenu.width(), height: t.$gSaveMenu.height()}, a = t.STAGE;
                    t.$gIconsPanel.css({
                        top: e.top,
                        left: e.left,
                        visibility: "visible"
                    }), t.$gBookLoader.css({
                        top: .5 * a.height - .5 * i.height,
                        left: .5 * a.width - .5 * i.width
                    }), t.$gSaveMenu.css({
                        top: .5 * a.height - .5 * s.height + t.STAGE_OFFSET.top,
                        left: .5 * a.width - .5 * s.width + t.STAGE_OFFSET.left
                    }), t.correctTargetHeight()
                }, 100))
            }, correctTargetHeight: function () {
                this.BOOK_INTERNAL && (this.$TARGET.css({height: this.MAX_BOUNDS.height}), this.$TARGET.attr("onebook3d", this.PRE_NAME)), window[a].buildNextBook()
            }, drag_sheet: function (t) {
                var t = 100 > t ? t : 100, e = this.CURRENT.dragged_sheet;
                if (this.GLOSSY) var i = this.getSheetByIndex(e), s = this.getEdgesFormSheet(e),
                    a = "front" == this.startDrag ? 1 : 0, n = {gl_sheet: i, gl_edges: s, forward: a}; else {
                    var o = this.getSheetByIndex(e), h = this.getEdgesFormSheet(e),
                        a = "front" == this.startDrag ? 1 : 0, n = {sheet: e, $edges: h, forward: a};
                    null === this.SHEET_DISPLAYED && (this.SHEET_DISPLAYED = e, o.find(".all_edges").show(), o.find(".wholeimage").hide())
                }
                this.moveSheetTo(t, n)
            }, moveSheetTo: function (t, e) {
                var i = this, t = t || 0, s = e.sheet, a = e.forward, n = 2,
                    o = i.GLOSSY ? this.FRAMES_GL_SCALED[a][t].edges3d : this.FRAMES[a][t].edges3d;
                if (this.GLOSSY) {
                    var h = this.getHlpLayerGL(), r = this.getTotalSheets();
                    h.left && h.right && (i.startDrag && !s && a ? h.left.material.opacity = (100 - t) / 100 : i.startDrag && s === r - 1 && !a && (h.right.material.opacity = (100 - t) / 100))
                } else {
                    var d = this.$gHelpLayer.find(".hlpLeftSide"), l = this.$gHelpLayer.find(".hlpRightSide"),
                        r = this.getTotalSheets();
                    i.startDrag && !s && a ? d.css({opacity: (100 - t) / 100}) : i.startDrag && s === r - 1 && !a && l.css({opacity: (100 - t) / 100})
                }
                if (this.GLOSSY) {
                    var g = e.gl_edges;
                    this.CURRENT.frame = t;
                    for (var A = 0; A < o.length; A++) {
                        var p = o[A].width + n;
                        g[A].width = p, g[A].position.x = o[A].x, g[A].position.z = -o[A].z, g[A].rotation.y = Math.PI * o[A].angle / 180
                    }
                    this.LAST.moved = {sheet: s, gl_edges: g, forward: a}, this.startRender()
                } else {
                    var c = e.$edges;
                    if (c && c.size()) {
                        this.CURRENT.frame = t;
                        for (var A = 0; A < o.length; A++) {
                            var p = o[A].width + n;
                            c.eq(A).css({
                                width: p + "px",
                                "-webkit-transform": "translate3d(" + o[A].x + "px,0px," + -o[A].z + "px) rotateY(" + o[A].angle + "deg)",
                                "-moz-transform": "translate3d(" + o[A].x + "px,0px," + -o[A].z + "px) rotateY(" + o[A].angle + "deg)",
                                "-ms-transform": "translate3d(" + o[A].x + "px,0px," + -o[A].z + "px) rotateY(" + o[A].angle + "deg)"
                            })
                        }
                        this.LAST.moved = {sheet: s, $edges: c, forward: a}
                    }
                }
            }, calculateSideAndFrame: function (t) {
                var e = this;
                try {
                    var i = t.y - this.STAGE_CENTER.top, s = Math.abs(i), a = t.x - this.STAGE_CENTER.left,
                        n = this.STAGE_HALF.width - this.CFG.BOOK_SIZE.width,
                        o = this.CFG.BOOK_SIZE.width + Math.floor(.8 * n), h = this.STAGE_HALF.width - o, r = h / 100,
                        d = Math.abs(a), l = {
                            x: Math.round(d / this.CFG.BOOK_SIZE.width * 100),
                            y: Math.round(100 - s / this.STAGE_HALF.height * 100)
                        };
                    0 > i && (l.y = l.y > 50 ? 100 : 2 * l.y), d > o && (l.x = Math.floor((this.STAGE_HALF.width - (d - 1)) / r)), l.x > 100 && (l.x = 100);
                    var g = Math.round((.8 * l.x + 20) / 100 * l.y);
                    this.CURRENT.hoverside = 0 > a ? "back" : "front", this.CURRENT.hoverframe = Math.round(this.CFG.SHEETS_SENSIVITY / 100 * g), this.LAST.sheet = this.CURRENT.sheet, this.CURRENT.sheet = "front" === this.CURRENT.hoverside ? this.CURRENT.spread : this.CURRENT.spread - 1, this.GLOSSY && this.CURRENT.sheet == this.ALLSHEETS.length && (a > .75 * this.CFG.BOOK_SIZE.width && i > .5 * this.STAGE_HALF.height ? (e.$gStage.addClass("pointer"), e.GL_LINK_TO_START = !0) : (e.GL_LINK_TO_START = !1, e.$gStage.removeClass("pointer")))
                } catch (A) {
                }
            }, getEdgesFormSheet: function (t) {
                if (this.GLOSSY) {
                    var e = this.GL_ARR_SHEETS[t];
                    return e && e.mesh ? (e.mesh.position.z = 1 * this.CFG.GL_DEPTH_STEP, e.mesh.children) : !1
                }
                var i = this.$ARR_SHEETS[t];
                return i && i.size() ? (i.css({zIndex: 2e4}), i.find("div")) : !1
            }, getSheetByIndex: function (t) {
                return this.GLOSSY ? this.GL_ARR_SHEETS[t] : this.$ARR_SHEETS[t]
            }, isMouseOverPage: function () {
                if (!this.MOUSE.isOverStage) return !1;
                var t = 0 == this.CURRENT.spread, e = this.CURRENT.spread == this.getTotalSheets();
                return t || e ? t && "front" == this.CURRENT.hoverside ? !0 : e && "back" == this.CURRENT.hoverside ? !0 : !1 : !0
            }, isDirectionCorrect: function (t) {
                var e = "next" === t ? 1 : 0, i = this.ALLSHEETS.length;
                return 0 !== this.CURRENT.spread || e ? this.CURRENT.spread === i && e ? !1 : !0 : !1
            }, startOffsetDepth: function (e, i) {
                var s = this;
                if (this.GLOSSY) {
                    var a = (this.getSheetByIndex(i), this.getSheetsSortedBySide());
                    if (e) a.sidesRight[0].mesh.position.z = 1 * s.CFG.GL_DEPTH_STEP, t.each(a.sidesRight, function (t) {
                        t && (this.mesh.position.z = -1 * (t - 1) * s.CFG.GL_DEPTH_STEP)
                    }); else {
                        var n = a.sidesLeft.length, o = 1;
                        if (n) for (var h = n; h > 0; h--) a.sidesLeft[h - 1].mesh.position.z = o * s.CFG.GL_DEPTH_STEP, o -= 1
                    }
                } else {
                    var r = (this.getSheetByIndex(i), this.$gContainter.find(".side-left")),
                        d = this.$gContainter.find(".side-right");
                    if (e) d.eq(0).css({
                        "-webkit-transform": "translate3d(0px,0px,1px)",
                        "-moz-transform": "translate3d(0px,0px,1px)",
                        "-ms-transform": "translate3d(0px,0px,1px)"
                    }), d.each(function (e) {
                        e && t(this).css({
                            "-webkit-transform": "translate3d(0px,0px," + -1 * (e - 1) + "px)",
                            "-moz-transform": "translate3d(0px,0px," + -1 * (e - 1) + "px)",
                            "-ms-transform": "translate3d(0px,0px," + -1 * (e - 1) + "px)"
                        })
                    }); else {
                        var n = r.size(), o = 1;
                        if (n) for (var h = n; h > 0; h--) r.eq(h - 1).css({
                            "-webkit-transform": "translate3d(0px,0px," + o + "px)",
                            "-moz-transform": "translate3d(0px,0px," + o + "px)",
                            "-ms-transform": "translate3d(0px,0px," + o + "px)"
                        }), o -= 1
                    }
                }
            }, startRender: function () {
                this.GLOSSY && (this.renderStartedAt = new Date)
            }, renderGL: function () {
                var t = this;
                requestAnimationFrame(function () {
                    var e = new Date, i = e.getTime() - (t.renderStartedAt.getTime() || 0);
                    3e3 > i && t.gGL.renderer.render(t.gGL.scene, t.gGL.camera), t.renderGL()
                })
            }, getSheetsSortedBySide: function () {
                if (this.GLOSSY) {
                    var t = this.GL_ARR_SHEETS, e = [], i = [];
                    for (var s in t) t.hasOwnProperty(s) && ("sideLeft" === t[s].sideClass ? e.push(t[s]) : i.push(t[s]));
                    return {sidesLeft: e, sidesRight: i}
                }
            }, endOffsetDepth: function (t, e) {
                var i = this;
                if (this.GLOSSY) {
                    var s = (this.getSheetByIndex(e), this.getSheetsSortedBySide());
                    if (this.GL_ARR_SHEETS.length) if (t) {
                        var a = s.sidesLeft.length;
                        if (a) for (var n = a; n > 0; n--) s.sidesLeft[a - n].mesh.position.z = -1 * n * i.CFG.GL_DEPTH_STEP;
                        s.sidesRight[0].mesh.position.z = 0
                    } else {
                        var a = s.sidesRight.length, o = -1 * a;
                        if (a) for (var n = a; n > 0; n--) s.sidesRight[n - 1].mesh.position.z = o * i.CFG.GL_DEPTH_STEP, o += 1;
                        s.sidesLeft[s.sidesLeft.length - 1].mesh.position.z = 0
                    }
                } else {
                    var h = (this.getSheetByIndex(e), this.$gContainter.find(".side-left")),
                        r = this.$gContainter.find(".side-right");
                    if (t) {
                        var a = h.size();
                        if (a) for (var n = a; n > 0; n--) h.eq(a - n).css({
                            "-webkit-transform": "translate3d(0px,0px," + -1 * n + "px)",
                            "-moz-transform": "translate3d(0px,0px," + -1 * n + "px)",
                            "-ms-transform": "translate3d(0px,0px," + -1 * n + "px)"
                        });
                        r.eq(0).css({
                            "-webkit-transform": "translate3d(0px,0px,0px)",
                            "-moz-transform": "translate3d(0px,0px,0px)",
                            "-ms-transform": "translate3d(0px,0px,0px)"
                        })
                    } else {
                        var a = r.size(), o = -1 * a;
                        if (a) for (var n = a; n > 0; n--) r.eq(n - 1).css({
                            "-webkit-transform": "translate3d(0px,0px," + o + "px)",
                            "-moz-transform": "translate3d(0px,0px," + o + "px)",
                            "-ms-transform": "translate3d(0px,0px," + o + "px)"
                        }), o += 1;
                        h.last().css({
                            "-webkit-transform": "translate3d(0px,0px,0px)",
                            "-moz-transform": "translate3d(0px,0px,0px)",
                            "-ms-transform": "translate3d(0px,0px,0px)"
                        })
                    }
                }
            }, animateSheet: function (t) {
                if (this.isDirectionCorrect(t)) {
                    var e = this, i = "next" === t ? this.CURRENT.spread : this.CURRENT.spread - 1,
                        s = "next" === t ? 1 : 0, a = function () {
                            var t = h + 1, e = 100 - t, i = e % o;
                            e = i ? e - i : e;
                            var s = 100 - e;
                            return s
                        };
                    if (e.GLOSSY) {
                        this.getSheetByIndex(i)
                    } else var n = this.getSheetByIndex(i);
                    this.SHEET_DISPLAYED = i, this.ANIMATION_FLAG = !0;
                    var o = 4, h = this.CURRENT.frame, r = s ? this.CURRENT.spread : this.CURRENT.spread - 1,
                        d = this.ANIMATION.SPEED, l = this.getTotalSheets();
                    this.startOffsetDepth(s, r);
                    var g = a();
                    if (e.GLOSSY) var A = e.getEdgesFormSheet(r),
                        p = {sheet: r, gl_edges: A, forward: s}; else var c = e.getEdgesFormSheet(r),
                        p = {sheet: r, $edges: c, forward: s};
                    var f = 0 === this.CURRENT.spread & s, E = 1 === this.CURRENT.spread & !s,
                        S = this.CURRENT.spread === l & !s, u = this.CURRENT.spread === l - 1 & s;
                    if (e.GLOSSY) var R = this.getHlpLayerGL(); else var m = this.$gHelpLayer.find(".hlpLeftSide"),
                        v = this.$gHelpLayer.find(".hlpRightSide");
                    var _ = function () {
                        101 > g ? (e.moveSheetTo(g, p), e.GLOSSY ? R.left && R.right && (f && (R.left.material.opacity = (100 - g) / 100), E && (R.left.material.opacity = g / 100), S && (R.right.material.opacity = (100 - g) / 100), u && (R.right.material.opacity = g / 100)) : (f && m.css({opacity: (100 - g) / 100}), E && m.css({opacity: g / 100}), S && v.css({opacity: (100 - g) / 100}), u && v.css({opacity: g / 100})), setTimeout(function () {
                            g += o, _()
                        }, d)) : (e.endOffsetDepth(s, r), e.switchCurrents(p))
                    };
                    this.GLOSSY ? _() : n.find(".all_edges").fadeIn("fast", function () {
                        n.find(".wholeimage").hide(), _()
                    })
                }
            }, switchCurrents: function (t) {
                {
                    var e = this, i = t.sheet, s = t.forward, a = s ? 10 * (i + 1) : 10 * (this.ALLSHEETS.length - i);
                    this.CURRENT.spread
                }
                if (this.LAST.forward = s, this.LAST.moved.forward = s ? 0 : 1, e.GLOSSY) {
                    var n = s ? 180 : 0, o = this.getSheetByIndex(i);
                    o.sideClass = "sideLeft" === o.sideClass ? "sideRight" : "sideLeft"
                } else {
                    var n = s ? 180 : 0, h = this.getSheetByIndex(i), r = h.find(".wholeimage"),
                        d = h.find(".all_edges");
                    h.css({zIndex: a}).toggleClass("side-right").toggleClass("side-left"), r.css({
                        "-webkit-transform": "rotateY(" + n + "deg)",
                        "-moz-transform": "rotateY(" + n + "deg)",
                        "-ms-transform": "rotateY(" + n + "deg)"
                    })
                }
                this.CURRENT.spread += s ? 1 : -1, this.CURRENT.frame = 0, this.START_PAGE = 2 * e.CURRENT.spread ? 2 * e.CURRENT.spread : 1, this.buildAndPreloadSheets(), this.changeSpreadTitle(), this.pageNumbersChange(), this.bookLoaderShow(!this.didSpreadLoaded(this.CURRENT.spread));
                var l = this.CURRENT.spread, g = this.ARR_PAGES_SRC.length;
                if (0 === l) ; else if (2 * l === g) ;
                var A = this.ORDER_TO_ANIMATE;
                if (A && this.isDirectionCorrect(A)) e.GLOSSY ? (e.ORDER_TO_ANIMATE = !1, e.animateSheet(A)) : r.fadeIn("fast", function () {
                    e.SHEET_DISPLAYED = null, d.hide(), e.ORDER_TO_ANIMATE = !1, e.animateSheet(A)
                }); else if (e.GLOSSY) {
                    e.ORDER_TO_ANIMATE = !1, e.ANIMATION_FLAG = !1;
                    var p = e.CURRENT.spread === e.getTotalSheets(), c = e.$G_ARR_BUTTONS.togglebook;
                    p ? (e.START_FROM_END = !0, c && c.update()) : 0 === e.CURRENT.spread && (e.START_FROM_END = !1, c && c.update())
                } else r.fadeIn("fast", function () {
                    e.SHEET_DISPLAYED = null, d.hide(), e.ORDER_TO_ANIMATE = !1, e.ANIMATION_FLAG = !1;
                    var t = e.CURRENT.spread === e.getTotalSheets(), i = e.$G_ARR_BUTTONS.togglebook;
                    t ? (e.START_FROM_END = !0, i && i.update()) : 0 === e.CURRENT.spread && (e.START_FROM_END = !1, i && i.update())
                })
            }, didSpreadLoaded: function (t) {
                if (this.GLOSSY) {
                    var e = t > 0 ? this.GL_ARR_SHEETS[t - 1] : !1,
                        i = t < this.ALLSHEETS.length ? this.GL_ARR_SHEETS[t] : !1;
                    if (e) {
                        var s = e.backFilled;
                        if (!s) return !1
                    }
                    if (i) {
                        var a = i.frontFilled;
                        if (!a) return !1
                    }
                    return !0
                }
                var n = t > 0 ? this.$gContainter.find(".sheet" + (t - 1)) : !1,
                    o = t < this.ALLSHEETS.length ? this.$gContainter.find(".sheet" + t) : !1;
                if (n) {
                    var s = n.hasClass("back-filled") ? !0 : !1;
                    if (!s) return !1
                }
                if (o) {
                    var a = o.hasClass("front-filled") ? !0 : !1;
                    if (!a) return !1
                }
                return !0
            }, build_background: function () {
                var e = this.divNames.background, i = t("#" + e);
                i.size() && i.remove();
                var s = this.DARK_MODE ? "" : 'class="light"',
                    a = ['<div style="opacity:1" id="' + e + '" ' + s + " >", '<div style="text-align:center;color:gray;width:100%;height:100%;display:table;">', '<span style="vertical-align:middle;display:table-cell;">', '<div style="margin:auto;width:90px;height:90px;-moz-border-radius:15px;border-radius:15px;opacity:0.5;', "background:white url(" + this.AJAX_LOADER + ') center no-repeat;"></div>', "</span></div></div>"].join("");
                t("body").append(a), this.$gBookBackground = t("#" + e), this.$gBookBackground.mousewheel && this.$gBookBackground.mousewheel(function () {
                    return !1
                }), this.bgLoaderShow(!0)
            }, buildSaveMenuLayer: function () {
                this.$gSaveMenu && this.$gSaveMenu.remove();
                var e = this, i = this.divNames.save_menu, s = 230, a = .5 * this.STAGE.width, a = s > a ? s : a,
                    n = this.CFG.ZINDEX.bookSaveMenu, o = function () {
                        var t = document.createElement("canvas");
                        t.width = 2, t.height = 2;
                        var e = t.getContext("2d");
                        return e.fillStyle = "rgba(80,80,80,.8)", e.fillRect(0, 0, 2, 2), t.toDataURL()
                    },
                    h = ['<div class="' + i + '" ', 'style="display:none;position:absolute;top:0px;left:0px;width:' + a + "px;z-index:" + n + ";", "text-align:center;background:url(" + o() + ');-moz-border-radius:7px;border-radius:7px;">', '<h1 style="margin:20px 20px 10px 20px;">' + e.getLNG("askSaveImage") + "</h1>", '<p style="margin:0px 20px 20px 20px;">' + e.getLNG("askSaveLinks") + "</p>", "</div>"].join("");
                this.$gSaveMenu = t(h), t("body").append(this.$gSaveMenu)
            }, buildHelpLayer: function () {
                var e = this, i = this.CFG.BOOK_SIZE, s = this.getLNG("hlpGoToHomelink"),
                    n = this.getLNG("hlpClickToOpen"), o = this.getLNG("hlpUseMousewheel"), h = this.getLNG("toStart"),
                    r = i.width < 150 ? 'class="middleSize"' : "", d = i.height < 130,
                    l = this.DARK_MODE ? "dark" : "light", g = window[a].SKIN, A = [];
                A.push("<p " + r + ">"), d || this.CFG.FV || A.push('<a style="display:table;margin:0px 0px 0px auto;" href="' + this.CFG.HOME_LINK + '" target="_blank" title="' + s + '"><span name="home_link" style="background:url(' + g.HOME_LINK[l].toDataURL() + ') no-repeat center;"></span></a>'), A.push('<span name="click_to_open"><a href="#">' + n + "</a></span>"), A.push('<span name="use_mousewheel">' + o + "</span>"), d || A.push('<span name="help_arrow" style="background:url(' + g.HELP_ARROW[l].toDataURL() + ') no-repeat center;"></span>'), A.push("</p>"), A = A.join("");
                var p = [];
                p.push("<p " + r + ">"), p.push('<span name="goto_start"><a href="#">' + h + "</a></span>"), p.push("</p>"), p = p.join("");
                var c = this.START_PAGE < 2 ? 1 : 0, f = this.START_FROM_END ? 1 : 0, E = this.getHlpLayerBgImage(),
                    S = ['<div style="margin-top:1px;display:table;width:100%;height:100%;">', '<div class="hlpLeftSide" style="opacity:' + c + ";", "background:url(" + E.toDataURL() + ");", 'display:table-cell;height:100%;width:50%;text-align:right;vertical-align:bottom;">' + A + "</div>", '<div class="hlpRightSide" style="opacity:' + f + ";", "background:url(" + E.toDataURL() + ");", 'display:table-cell;height:100%;width:50%;text-align:right;vertical-align:bottom;">' + p + "</div>", "</div>"].join(""),
                    u = this.DARK_MODE ? "" : 'class="light"';
                this.$gHelpLayer = t("<div " + u + ' id="' + this.divNames.book_help_layer + '"></div>').css({
                    top: 0,
                    left: -1 * i.width + "px",
                    width: 2 * i.width - 2 + "px",
                    height: i.height - 1 + "px"
                }).html(S).find("span[name=click_to_open]").click(function () {
                    return e.gotoNext(), !1
                }).end().find("span[name=goto_start]").click(function () {
                    return e.gotoSpread(0), !1
                }).end(), this.$gContainter.html(this.$gHelpLayer)
            }, getHlpLayerBgImage: function (t) {
                var e = document.createElement("canvas");
                e.width = 100, e.height = 100;
                var i = e.getContext("2d");
                return i.fillStyle = t ? "dark" === t ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" : this.DARK_MODE ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)", i.fillRect(0, 0, e.width, e.height), e
            }, buildAndPreloadSheets: function () {
                var e = this, i = {
                        buildColorSheet: function (i, s, a) {
                            for (var n = 0, h = a === l || a > l ? 1 : 0, r = e.FRAMES[h][n].edges3d, d = t('<span class="all_edges" style="display:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;"></span>'), g = 0; g < r.length; g++) {
                                var A = r[g].width + o,
                                    p = "translate3d(" + r[g].x + "px, 0px, " + -r[g].z + "px) rotateY(" + r[g].angle + "deg)",
                                    c = "-webkit-transform:rotateY(-180deg);-moz-transform:rotateY(-180deg);-ms-transform:rotateY(-180deg);",
                                    f = '<span class="back" style="background:' + s.back + ";" + c + '"></span>',
                                    E = '<span class="front" style="background:' + s.front + ';"></span>',
                                    S = t('<div class="unselectable frame' + n + "-" + g + '">' + f + E + "</div>").css({
                                        position: "absolute",
                                        top: "0px",
                                        left: "0px",
                                        width: A + "px",
                                        height: e.CFG.BOOK_SIZE.height + "px",
                                        "-webkit-transform": p,
                                        "-moz-transform": p,
                                        "-ms-transform": p
                                    });
                                d.append(S)
                            }
                            i.html(d);
                            var u = ['<span class="back_image" style="-webkit-transform:rotateY(-180deg);-moz-transform:rotateY(-180deg);-ms-transform:rotateY(-180deg);"><div style=""></div></span>', '<span class="front_image" style=""><div style=""></div></span>'].join(""),
                                R = h ? 0 : 180, m = e.CFG.BOOK_SIZE;
                            i.append(['<span class="wholeimage" style="display:block;position:absolute;top:0;left:0;z-index:20;width:' + m.width + "px;height:" + m.height + "px;", "-webkit-transform:translate3d(0px,0px,0px) rotateY(" + R + "deg);-moz-transform:translate3d(0px,0px,0px) rotateY(" + R + "deg);-ms-transform:translate3d(0px,0px,0px) rotateY(" + R + 'deg);">' + u + "</span>"].join(""))
                        }, fillSheetWithDefaultImages: function (t) {
                            for (var i = [e.ALLSHEETS[t].front, e.ALLSHEETS[t].back], s = 0; s < i.length; s++) {
                                var a = i[s];
                                a.indexOf(".png") > -1 || a.indexOf(".jpg") > -1 || a.indexOf(".gif") > -1 ? e.createImageFromColor(e.CFG.PAGE_DEFAULT_COLOR, t, s) : e.createImageFromColor(a, t, s)
                            }
                        }, startLoadImagesForSheet: function (t) {
                            for (var i = [e.ALLSHEETS[t].front, e.ALLSHEETS[t].back], s = 0; s < i.length; s++) {
                                var a = i[s];
                                (a.indexOf(".png") > -1 || a.indexOf(".jpg") > -1 || a.indexOf(".gif") > -1) && e.loadImageForPage(a, t, s)
                            }
                        }
                    }, s = {
                        PlainTextured: function (t) {
                            var e = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
                                i = t.imageSrc || e,
                                s = (t.color ? t.color : 16777215, t.backSide ? THREE.BackSide : THREE.FrontSide),
                                a = new THREE.Mesh(new THREE.PlaneGeometry(t.size[0], t.size[1]), new THREE.MeshBasicMaterial({
                                    map: THREE.ImageUtils.loadTexture(e),
                                    side: s
                                }));
                            return THREE.ImageUtils.loadTexture(i, void 0, function (e) {
                                a.material.map = e, t.onReady && t.onReady(a)
                            }), a
                        }, buildColorSheet: function (t, a) {
                            var n = 0, o = t.num === l || t.num > l ? 1 : 0, h = e.FRAMES_GL_SCALED[o][n].edges3d,
                                r = e.CFG.BOOK_GL_SIZE.height, d = t.zindex3d, g = 2 * h.length;
                            e.READY_GL_EDGES || (e.READY_GL_EDGES = []), e.READY_GL_EDGES[t.num] = [];
                            for (var A = function (s) {
                                e.READY_GL_EDGES[s].push(1), g === e.READY_GL_EDGES[s].length && (i.fillSheetWithDefaultImages(t.num), i.startLoadImagesForSheet(t.num))
                            }, p = 0; p < h.length; p++) {
                                h[p].width, function (t, i, n, o, h, l) {
                                    var g = l.num, p = l.mesh, c = new THREE.Object3D;
                                    c.position.x = n, c.position.z = -o, c.rotation.y = Math.PI * h / 180, p.add(c), p.position.z = d, p.position.y = r * e.CFG.ROTATE_CENTER_OFFSET_GL, p.name = "sheet", t.bookBase.add(p);
                                    new s.PlainTextured({
                                        size: [i, r], color: a.front, onReady: function (t) {
                                            t.position.x += i / 2, t.name = "front", c.add(t), A(g)
                                        }
                                    }), new s.PlainTextured({
                                        size: [i, r], color: a.back, backSide: !0, onReady: function (t) {
                                            t.position.x += i / 2, t.name = "back", c.add(t), A(g)
                                        }
                                    })
                                }(e.gGL, h[p].width, h[p].x, h[p].z, h[p].angle, t)
                            }
                        }
                    }, a = function (t) {
                        if (!e.SHEETS_WAS_BUILT[t]) {
                            e.SHEETS_WAS_BUILT[t] = !0;
                            var i = t === l || t > l, a = i ? "sideRight" : "sideLeft", n = i ? "right" : "left",
                                o = -1 * f[n] * e.CFG.GL_DEPTH_STEP,
                                h = {num: t, sideClass: a, zindex3d: o, mesh: new THREE.Object3D},
                                r = e.getColorsBySheet(t);
                            e.GL_ARR_SHEETS[t] = h, f[n] += 1, s.buildColorSheet(h, r)
                        }
                    }, n = function (s) {
                        if (!e.SHEETS_WAS_BUILT[s]) {
                            e.SHEETS_WAS_BUILT[s] = !0;
                            var a = s === l || s > l, n = a ? 10 * (e.ALLSHEETS.length - s) : 10 * (s + 1),
                                o = a ? "side-right" : "side-left", h = a ? "right" : "left", r = -1 * f[h],
                                d = t(['<div  num="' + s + '" class="sheet' + s + " " + o + '" ', 'style="-webkit-transform:translate3d(0px,0px,' + r + "px);-moz-transform:translate3d(0px,0px," + r + "px);-ms-transform:translate3d(0px,0px," + r + "px);", "position:absolute;top:0;left:0;z-index:" + n + '"></div>'].join(""));
                            a ? e.$gContainter.append(d) : e.$gHelpLayer.after(d), f[h] += 1, e.$ARR_SHEETS[s] = d;
                            var g = e.getColorsBySheet(s);
                            i.buildColorSheet(d, g, s), i.fillSheetWithDefaultImages(s), i.startLoadImagesForSheet(s)
                        }
                    }, o = 1.2, h = this.LAST.forward, r = (this.GIF, this.CFG.NUMBEROF_PRELOAD_SHEETS),
                    d = this.ALLSHEETS.length, l = this.CURRENT.spread, g = l == d, A = l - r, p = l + r;
                if (this.GLOSSY) var c = function (t) {
                    var i = 0, s = e.GL_ARR_SHEETS;
                    for (var a in s) s.hasOwnProperty(a) && s[a].sideClass === t && i++;
                    return i
                }, f = {
                    left: c("sideLeft"),
                    right: c("sideRight")
                }; else var f = {
                    left: this.$gContainter.find(".side-left").size(),
                    right: this.$gContainter.find(".side-right").size()
                };
                g && A--, A = 0 > A ? 0 : A, p = d > p ? p : d - 1;
                for (var E = function () {
                    for (var t = [], e = [], i = A; p + 1 > i; i++) i === l || i > l ? e.push(i) : t.push(i);
                    return t.reverse().concat(e)
                }, S = E(), u = 0; u < S.length; u++) this.GLOSSY ? a(S[u]) : n(S[u]);
                this.deleteSheet(h ? A - 1 : p + 1)
            }, deleteSheet: function (t) {
                if (0 > t || t > this.ALLSHEETS.length - 1 || !this.SHEETS_WAS_BUILT[t]) return !1;
                if (this.SHEETS_WAS_BUILT[t] = !1, this.IMG_NOW_LOADING[2 * t] && (this.IMG_NOW_LOADING[2 * t].src = this.GIF, this.IMG_NOW_LOADING[2 * t].onload = !1), this.IMG_NOW_LOADING[2 * t + 1] && (this.IMG_NOW_LOADING[2 * t + 1].src = this.GIF, this.IMG_NOW_LOADING[2 * t + 1].onload = !1), this.GLOSSY) {
                    var e = this.getSheetByIndex(t);
                    e && (this.gGL.bookBase.remove(e.mesh), delete this.GL_ARR_SHEETS[t])
                } else this.$gContainter.find("div.sheet" + t).remove()
            }, getColorsBySheet: function (t) {
                var e = this.CFG.PAGE_DEFAULT_COLOR, i = this.ALLSHEETS[t].front;
                i = i.indexOf(".") > -1 ? e : i;
                var s = this.ALLSHEETS[t].back;
                s = s.indexOf(".") > -1 ? e : s;
                var a = {front: i, back: s};
                return a
            }, createImageFromColor: function (t, e, i) {
                var s = this, a = function () {
                    var t = document.createElement("canvas"), e = s.CFG.BOOK_SIZE.width, i = s.CFG.BOOK_SIZE.height;
                    t.width = s.CFG.DIVIDE_IMAGES ? 2 * e : e, t.height = i;
                    var a = t.getContext("2d");
                    return a.fillStyle = "rgba(0,0,0,0)", a.fillRect(0, 0, t.width, t.height), t
                };
                this.shredAndFill({img: a(), src: t, sheet: e, page: i})
            }, loadImageForPage: function (t, e, i) {
                var s = this, a = 2 * e + i;
                this.NOW_LOADING_COUNTER++, this.IMG_NOW_LOADING[a] = new Image, this.IMG_NOW_LOADING[a].onload = function () {
                    s.NOW_LOADING_COUNTER--, s.update_queue_loaded_images({img: this, src: t, sheet: e, page: i})
                }, setTimeout(function () {
                    s.IMG_NOW_LOADING && s.IMG_NOW_LOADING[a] && (s.IMG_NOW_LOADING[a].src = t)
                }, 500)
            }, update_queue_loaded_images: function (t) {
                var e = this, i = function () {
                    if (!e.ANIMATION_FLAG) {
                        var t = e.QUEUE_IMAGES_LOADED.shift();
                        t && e.shredAndFill(t)
                    }
                    e.QUEUE_IMAGES_LOADED.length && (e.TMR_QUEUE = setTimeout(function () {
                        i()
                    }, 10))
                };
                this.TMR_QUEUE && clearTimeout(this.TMR_QUEUE), this.QUEUE_IMAGES_LOADED.push(t), i()
            }, buildResizedImage: function (t, e, i, s) {
                var a = this.getString([76, 73, 77, 73, 84, 69, 68, 0, 76, 73, 71, 72, 84, 0, 86, 69, 82, 83, 73, 79, 78]),
                    n = i.img, o = i.page > 0 ? "back" : "front", h = this.getColorsBySheet(i.sheet), r = i.sheet,
                    d = document.createElement("canvas"), l = t.width, g = t.height;
                l = this.CFG.DIVIDE_IMAGES ? 2 * l : l, d.width = l, d.height = g;
                var A = d.getContext("2d");
                A.fillStyle = h[o], A.fillRect(0, 0, l, g);
                var p = this.CFG.BORDER * e, c = d.width - 2 * p, f = d.height - 2 * p;
                if (n.width > c || n.height > f) var E = c / n.width, S = f / n.height, u = Math.min(E, S), R = E == u,
                    m = R ? c : Math.floor(n.width * u), v = R ? Math.floor(n.height * u) : f; else var m = n.width,
                    v = n.height;
                A.drawImage(n, p, p, m, v);
                var _ = this.getTotalSheets(), T = 0 === i.sheet && 0 === i.page, O = i.sheet === _ - 1 && 1 === i.page;
                if (s) {
                    var L = this.SELFSHADOW[o];
                    this.CFG.DIVIDE_IMAGES ? A.drawImage(L, i.page > 0 ? 0 : this.CFG.BOOK_SIZE.width, 0) : T || O || A.drawImage(L, 0, 0)
                }
                if (this.GLOSSY) {
                    var I = this.CFG.FV;
                    if (!I && r > parseInt(String.fromCharCode(50), 10)) {
                        var w = .7, G = 300, C = 82, N = 20, x = 30, b = document.createElement("canvas");
                        b.width = G, b.height = C;
                        var M = b.getContext("2d");
                        M.fillStyle = "rgba(200,200,200,.4)", M.fillRect(10, 10, b.width - 20, b.height - 20), M.lineWidth = 10, M.strokeStyle = "rgba(200,200,200,.4)", M.beginPath(), M.moveTo(x, 0), M.lineTo(0, 0), M.lineTo(0, N), M.moveTo(G - x, 0), M.lineTo(G, 0), M.lineTo(G, N), M.moveTo(G, C - N), M.lineTo(G, C), M.lineTo(G - x, C), M.moveTo(0, C - N), M.lineTo(0, C), M.lineTo(x, C), M.stroke(), M.fillStyle = "#ffffff", M.font = "16pt Arial", M.textAlign = "center", M.fillText(a, b.width / 2, 50), A.drawImage(b, d.width / 2 - b.width * w / 2, d.height / 2 - b.height * w / 2, b.width * w, b.height * w)
                    }
                }
                return d
            }, shredAndFill: function (e) {
                var i = this;
                if (!this.CFG.BOOK_SIZE.width || !this.CFG.BOOK_SIZE.height) return !1;
                var s = {
                        switchSheetLoadingStatus: function () {
                            var t = 2 * h + o, e = "color" === i.ALL_PAGES_MAP[t];
                            i.GLOSSY ? d && (d[r + "Loading"] ? (delete d[r + "Loading"], d[r + "Filled"] = !0) : e ? d[r + "Filled"] = !0 : d[r + "Loading"] = !0) : l.hasClass(r + "-loading") ? l.removeClass(r + "-loading").addClass(r + "-filled") : l.addClass(e ? r + "-filled" : r + "-loading")
                        }, cutImagesAndInsertIntoEdges: function (e) {
                            for (var s, o, h, g = 0, A = e.height, p = e.width, c = 0; c < a.length; c++) {
                                o = Math.round(a[c].width), i.CFG.DIVIDE_IMAGES || ("front" === r ? (s = g, g += o, h = s + o > p ? p - s : o) : (g += o, s = p - g, h = o, 0 > s && (h = o + s, s = 0)));
                                var f = document.createElement("canvas");
                                f.width = h, f.height = A;
                                var E = f.getContext("2d");
                                i.GLOSSY && "back" === r && (E.translate(h, 0), E.scale(-1, 1)), E.drawImage(e, s, 0, h, A, 0, 0, h, A);
                                var S = f.toDataURL(), u = document.createElement("img");
                                u.src = S, n.push(u)
                            }
                            if (i.GLOSSY) {
                                if (d && d.mesh) {
                                    var R = d.mesh.children;
                                    t.each(R, function (t) {
                                        var e = this.getObjectByName(r);
                                        THREE.ImageUtils.loadTexture(n[t].src, void 0, function (t) {
                                            e && (e.material.map = t)
                                        })
                                    })
                                }
                            } else {
                                var m = l.find(".wholeimage ." + r + "_image"), v = m.find("div"), _ = l.find("." + r),
                                    T = "back" === r ? -1 : 1;
                                v.css({background: "url(" + e.toDataURL() + ") " + T + "px 0px no-repeat"}), m.css({background: "url(" + e.toDataURL() + ") 0px 0px no-repeat"}), _.each(function (e) {
                                    t(this).css({
                                        background: "url(" + n[e].src + ") no-repeat",
                                        backgroundSize: "100% 100%"
                                    })
                                })
                            }
                        }
                    }, a = i.FRAMES[0][this.FIRST_FRAME].edges3d, n = [], o = (e.img, e.page), h = e.sheet,
                    r = o > 0 ? "back" : "front";
                if (this.GLOSSY) var d = i.GL_ARR_SHEETS[h]; else var l = this.$ARR_SHEETS[h];
                this.startRender(), s.switchSheetLoadingStatus();
                var g = this.buildResizedImage(this.CFG.BOOK_SIZE, this.GSCALE, e, "selfShadow");
                s.cutImagesAndInsertIntoEdges(g), this.bookLoaderShow(!this.didSpreadLoaded(this.CURRENT.spread))
            }, saveImagesAs: function () {
                var e = this, i = function (t) {
                        for (var e = t.toDataURL().match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/), i = atob(e[3]), s = new ArrayBuffer(i.length), a = new Uint8Array(s), n = 0; n < a.length; n++) a[n] = i.charCodeAt(n);
                        return new Blob([a], {type: e[1]})
                    }, s = {
                        loadImage: function (t) {
                            var e = new Image;
                            e.onload = function () {
                                var t = document.createElement("canvas");
                                t.width = this.width, t.height = this.height;
                                var e = t.getContext("2d");
                                e.drawImage(this, 0, 0, this.width, this.height), s.saveImage(t)
                            }, e.src = t
                        }, saveImage: function (t) {
                            var e = window.URL || webkitURL, s = document.createElement("a"), a = i(t);
                            s.download = "photo.png", s.href = e.createObjectURL(a), document.body.appendChild(s), s.click(), document.body.removeChild(s), setTimeout(function () {
                                e.revokeObjectURL(a)
                            }, 100)
                        }, showMenu: function () {
                            e.$gSaveMenu.toggle()
                        }
                    }, a = 0 == this.CURRENT.spread, n = this.CURRENT.spread == this.getTotalSheets(),
                    o = this.ARR_PAGES_SRC;
                a ? s.loadImage(o[0]) : n ? s.loadImage(o[o.length - 1]) : (e.$gSaveMenu.find("a").unbind().each(function (i) {
                    t(this).click(function () {
                        var t = i ? 2 * e.CURRENT.spread : 2 * e.CURRENT.spread - 1;
                        return o[t] && s.loadImage(o[t]), s.showMenu(), !1
                    })
                }), s.showMenu())
            }
        }, o = {
            init: function (t) {
                this.MATH = h.init(), this.onReady = t.onReady, this.ARR_ANIMATIONS = [], this.CURRENT_FLIP_NAME = t.flip || "", this.FLIP_NAMES = [], this.CURRENT_KEYFRAME = 1, this.CURRENT_LINE = 0, this.CFG = {
                    SPEED_ANIMATION: 15,
                    BOOK_HEIGHT: 300,
                    YSCALETOP: .3,
                    YSCALE: .08,
                    BEZIE_ROUGH: window[a].GLOSSY ? 10 : 4,
                    BOOK_ROTATE_X: 0,
                    ARR_BOOK_WIDTH: []
                }, this.ARR_ANI = ['<div id="animations" style="display:none;">', '<div class="book" name="basic">', '<div class="points" xy="-40,0 -60,0 -80,0 -80,0 -120,0"></div>', '<div class="frame" fr="0" ang="0 0 0 0 0"></div>', '<div class="frame" fr="30" ang="100 15 5 5 -30"></div>', '<div class="frame" fr="60" ang="140 120 40 40 -30"></div>', '<div class="frame" fr="80" ang="130 145 195 195 190"></div>', '<div class="frame" fr="100" ang="180 180 180 180 180"></div>', "</div>", '<div class="book" name="soft">', '<div class="points" xy="-40,0 -60,0 -80,0 -80,0 -120,0"></div>', '<div class="frame" fr="0" ang="0 0 0 0 0"></div>', '<div class="frame" fr="30" ang="95 60 10 10 -50"></div>', '<div class="frame" fr="60" ang="150 145 60 60 -30"></div>', '<div class="frame" fr="80" ang="175 170 105 105 60"></div>', '<div class="frame" fr="100" ang="180 180 180 180 180"></div>', "</div>"].join(""), this.load_animations_from_html()
            }, load_animations_from_html: function () {
                var e = this, i = function (t) {
                    for (var e = 0, i = 0; i < t.length; i++) e += t[i][0];
                    return e = 0 > e ? -1 * e : e
                };
                t(this.ARR_ANI).find(".book").each(function () {
                    var s = [], a = t(this).attr("name"),
                        n = t(this).find(".points").attr("xy").split(" ").map(function (t) {
                            return t.split(",").map(function (t) {
                                return parseInt(t)
                            })
                        });
                    t(this).find(".frame").each(function () {
                        for (var e = parseInt(t(this).attr("fr"), 10), i = t(this).attr("ang").split(" ").map(function (t) {
                            return parseInt(t)
                        }), a = {frame: e, line: []}, o = 0; o < n.length; o++) a.line[o] = {
                            xy: n[o],
                            ang: i[o],
                            center: [0, 0]
                        };
                        s.push(a)
                    }), e.CFG.ARR_BOOK_WIDTH.push(i(n)), e.FLIP_NAMES.push(a), e.ARR_ANIMATIONS[a] = s
                }), this.CURRENT_FLIP_NAME = -1 !== t.inArray(this.CURRENT_FLIP_NAME, this.FLIP_NAMES) ? this.CURRENT_FLIP_NAME : this.FLIP_NAMES[0];
                var s = window[a].FLIPS[this.CURRENT_FLIP_NAME];
                s ? this.onReady(s) : this.rebuild()
            }, rebuild: function () {
                var t = this.ARR_ANIMATIONS[this.CURRENT_FLIP_NAME];
                this.FIRST_KEYFRAME = t[0].frame;
                var e = this.buildAllFramesFrom(t);
                this.ALL_FRAMES = this.calculateCenters(e), this.calculateBezie(), this.calculateEdgeSkewY(), this.CFG.AMOUNT_ADGES_3D = this.ALL_FRAMES[0].edges3d.length;
                for (var i = [], s = 0; s < this.ALL_FRAMES.length; s++) {
                    for (var n = this.ALL_FRAMES[s], o = [], h = 0; h < n.edges3d.length; h++) o[h] = {
                        angle: 180 - n.edges3d[h].angle,
                        width: n.edges3d[h].width,
                        x: -1 * n.edges3d[h].x,
                        z: n.edges3d[h].z
                    };
                    i.push({
                        bezie: n.bezie,
                        edges3d: o,
                        frame: n.frame,
                        keyframe: n.keyframe,
                        line: n.line,
                        skewYbottom: n.skewYbottom,
                        skewYtop: n.skewYtop
                    })
                }
                var r = [this.ALL_FRAMES, i];
                window[a].FLIPS[this.CURRENT_FLIP_NAME] = r, this.onReady(r)
            }, buildAllFramesFrom: function (e) {
                var e = e, i = [];
                if (e.length < 1) return [];
                for (var s = 0; s < e.length; s++) i[e[s].frame] = t.extend(!0, {}, e[s]), i[e[s].frame].keyframe = !0;
                for (var s = 1; s < e.length; s++) for (var a = e[s - 1], n = e[s], o = n.frame - a.frame, h = 1; o > h; h++) {
                    for (var r = a.frame + h, d = [], l = 0; l < n.line.length; l++) {
                        var g = Math.floor((n.line[l].ang - a.line[l].ang) / o * h + a.line[l].ang),
                            A = [n.line[l].xy[0], n.line[l].xy[1]];
                        d.push({xy: A, ang: g, center: [0, 0]})
                    }
                    i[r] = {frame: r, line: d}
                }
                return i
            }, calculateCenters: function (e) {
                var i = this, e = e;
                return t.each(e, function (t) {
                    if (!(t < i.FIRST_KEYFRAME)) for (var e = this.line, t = 0; t < e.length; t++) {
                        var s = e[t].ang, a = s > 0 ? 1 : -1, n = s * a, o = e[t].center,
                            h = [i.MATH.COS[n], a * -i.MATH.SIN[n], o[0], a * i.MATH.SIN[n], i.MATH.COS[n], o[1]],
                            r = e[t].xy, d = i.MATH.xy_matrix2d(r, h);
                        e[t].xy = d, e[t + 1] && (e[t + 1].center = d)
                    }
                }), e
            }, calculateBezie: function () {
                var e = this.ALL_FRAMES, i = this.CFG.BEZIE_ROUGH;
                t.each(e, function () {
                    var t = this.line;
                    if (!(t.length < 3)) {
                        for (var e = [{
                            x: 0,
                            y: 0
                        }], s = 0, a = 0, n = 0, o = [0, 0], h = t[0].xy, r = t[1].xy, d = t[2].xy, l = 1; i > l; l++) s = 1 / i * l, a = (1 - s) * (1 - s) * (1 - s) * o[0] + 3 * s * (1 - s) * (1 - s) * h[0] + 3 * s * s * (1 - s) * r[0] + s * s * s * d[0], n = (1 - s) * (1 - s) * (1 - s) * o[1] + 3 * s * (1 - s) * (1 - s) * h[1] + 3 * s * s * (1 - s) * r[1] + s * s * s * d[1], e.push({
                            x: a,
                            y: n
                        });
                        if (e.push({x: d[0], y: d[1]}), 5 === t.length || t.length > 5) {
                            for (var s = 0, a = 0, n = 0, o = t[2].xy, h = t[3].xy, r = t[4].xy, l = 1; i > l; l++) s = 1 / i * l, a = (1 - s) * (1 - s) * o[0] + 2 * s * (1 - s) * h[0] + s * s * r[0], n = (1 - s) * (1 - s) * o[1] + 2 * s * (1 - s) * h[1] + s * s * r[1], e.push({
                                x: a,
                                y: n
                            });
                            e.push({x: r[0], y: r[1]})
                        }
                        this.bezie = e
                    }
                }), this.ALL_FRAMES = e
            }, calculateEdgeSkewY: function () {
                var e = this.CFG.BOOK_HEIGHT, i = this.CFG.YSCALE, s = this.CFG.YSCALETOP, a = this.ALL_FRAMES;
                t.each(a, function () {
                    for (var t = this.bezie, a = [], n = [], o = [], h = 0; h < t.length - 1; h++) {
                        var r, d, l, g;
                        r = t[h], d = t[h + 1];
                        var A = Math.sqrt((d.y - r.y) * (d.y - r.y) + (d.x - r.x) * (d.x - r.x)),
                            p = (180 * Math.atan2(d.y - r.y, d.x - r.x) / Math.PI).toFixed(15);
                        o.push({
                            x: r.x,
                            z: r.y,
                            width: A,
                            angle: p
                        }), l = r.y * s - e, g = d.y * s - e, a.push((180 * Math.atan2(g - l, d.x - r.x) / Math.PI).toFixed(15)), y1bottom = r.y * i - e, y2bottom = d.y * i - e, n.push((180 * Math.atan2(y2bottom - y1bottom, d.x - r.x) / Math.PI).toFixed(15))
                    }
                    this.edges3d = o, this.skewYtop = a, this.skewYbottom = n
                }), this.ALL_FRAMES = a
            }, get_total_keyframes: function () {
                var t = this.ARR_ANIMATIONS[this.CURRENT_ANIMATION];
                return t.length
            }, get_total_lines: function () {
                var t = this.ALL_FRAMES[this.FIRST_KEYFRAME].line;
                return t.length
            }
        }, h = {
            init: function () {
                return this.SIN = [], this.COS = [], this._calculate(), this
            }, _calculate: function () {
                for (var t = 0; 360 > t; t++) this.SIN[t] = Math.sin(t * Math.PI / 180).toFixed(15);
                for (var t = 0; 360 > t; t++) this.COS[t] = Math.cos(t * Math.PI / 180).toFixed(15);
                !function (t) {
                    t.map || (t.map = function (t) {
                        for (var e = this.length, i = new Array(e), s = 0; e > s; s++) s in this && (i[s] = t.call(!1, this[s], s, this));
                        return i
                    })
                }(Array.prototype)
            }, xy_matrix2d: function (t, e) {
                var i = t;
                i.push(1);
                var s = e;
                return [s[0] * i[0] + s[1] * i[1] + s[2] * i[2], s[3] * i[0] + s[4] * i[1] + s[5] * i[2]]
            }
        }, r = window[a].NUMBER;
        return window[a].NUMBER += 1, window[a].queueBooksBuilding.push({
            arrSrc: e,
            options: i,
            target: s
        }), r && window[a].buildingNowFlag || window[a].buildNextBook(), this
    }, t.fn.onebook = function (e, i) {
        return t.onebook(e, i, this), this
    }
}(jQuery);

/**
 * riadesign
 * jquery plugin 'swipeMePls';
 */

(function (e) {
    e.fn.swipeMePls = function (t) {
        var n = e.extend({
            preventDefault: true, enableMouse: true, distance: 100, onTouch: function (e) {
            }, onMove: function (e) {
            }, onSwipe: function (e) {
            }, onEnd: function () {
            }
        }, t || {});
        var r;
        var i;
        return this.each(function () {
            var t = e(this);
            var s, o;
            var u, a;
            var f = false;
            var l = {
                touchStart: function (e) {
                    if (e.targetTouches.length > 1) {
                        return
                    }
                    var t = e.targetTouches[0];
                    u = t.pageX;
                    a = t.pageY;
                    s = t.pageX;
                    o = t.pageY;
                    r = new Date;
                    n.onTouch({
                        clientX: t.clientX,
                        clientY: t.clientY,
                        pageX: t.pageX,
                        pageY: t.pageY,
                        screenX: t.screenX,
                        screenY: t.screenY
                    })
                }, mouseDown: function (e) {
                    f = true;
                    u = e.pageX;
                    a = e.pageY;
                    s = e.pageX;
                    o = e.pageY;
                    r = new Date;
                    n.onTouch({
                        clientX: e.clientX,
                        clientY: e.clientY,
                        pageX: e.pageX,
                        pageY: e.pageY,
                        screenX: e.screenX,
                        screenY: e.screenY
                    });
                    n.preventDefault && e.preventDefault()
                }, mouseMove: function (e) {
                    if (f) {
                        n.onMove({
                            deltaX: e.pageX - s,
                            deltaY: e.pageY - o,
                            clientX: e.clientX,
                            clientY: e.clientY,
                            pageX: e.pageX,
                            pageY: e.pageY,
                            screenX: e.screenX,
                            screenY: e.screenY
                        });
                        s = e.pageX;
                        o = e.pageY
                    }
                    n.preventDefault && e.preventDefault()
                }, moveEnd: function (e) {
                    if (f) {
                        f = false;
                        l.testSwipe()
                    }
                    n.preventDefault && e.preventDefault();
                    n.onEnd()
                }, touchEnd: function (e) {
                    f = false;
                    l.testSwipe();
                    n.onEnd()
                }, touchMove: function (e) {
                    if (e.targetTouches.length > 1) {
                        return
                    }
                    var t = e.targetTouches[0];
                    n.onMove({
                        deltaX: t.pageX - s,
                        deltaY: t.pageY - o,
                        clientX: t.clientX,
                        clientY: t.clientY,
                        pageX: t.pageX,
                        pageY: t.pageY,
                        screenX: t.screenX,
                        screenY: t.screenY,
                        evt: e
                    });
                    s = t.pageX;
                    o = t.pageY;
                    n.preventDefault && e.preventDefault()
                }, testSwipe: function () {
                    var e = s - u;
                    var t = o - a;
                    i = Math.abs(new Date - r) / 1e3;
                    if (Math.abs(e) >= Math.abs(t)) {
                        if (Math.abs(e) >= n.distance) {
                            var f = e >= 0 ? "right" : "left";
                            n.onSwipe({direction: f, distance: Math.abs(e), speed: Math.abs(e) / i, time: i})
                        }
                    } else {
                        if (Math.abs(t) >= n.distance) {
                            var f = t >= 0 ? "down" : "up";
                            n.onSwipe({direction: f, distance: Math.abs(t), speed: Math.abs(t) / i, time: i})
                        }
                    }
                }, touchCancel: function (e) {
                }
            };
            if (n.enableMouse) {
                t.mousedown(function (e) {
                    var e = e || window.event;
                    var t = e.keyCode || e.which;
                    if (t == 1) {
                        l.mouseDown(e)
                    }
                });
                t.mouseup(l.moveEnd);
                e("body").mouseup(l.moveEnd);
                t.mousemove(l.mouseMove)
            }
            this.addEventListener("touchstart", l.touchStart);
            this.addEventListener("touchmove", l.touchMove);
            this.addEventListener("touchend", l.touchEnd);
            this.addEventListener("touchcancel", l.touchCancel)
        })
    }
})(jQuery);



