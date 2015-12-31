/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "width",
                centerStage: "horizontal",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'two-bg-11-img2',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image.fourb.info/item/41/39/cae5823ba9b7e70148e1da106ad2d5a8_640x1008.jpg",'0px','0px']
                        },
                        {
                            id: 'E2',
                            type: 'image',
                            rect: ['201px', '346px', '90px', '85px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image.fourb.info/item/87/51/0bab44f3e53520231aa0859d9d48a732_90x85.png",'0px','0px']
                        },
                        {
                            id: 'two-bg-11-img1',
                            display: 'none',
                            type: 'image',
                            rect: ['96px', '320px', '60%', '10%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image2.fourb.info/item/19/60/4fc31eb46130db47b52182315d1a22d2_640x133.png",'0px','0px']
                        },
                        {
                            id: 'two-bg-11-img22',
                            display: 'none',
                            type: 'image',
                            rect: ['99px', '535px', '60%', '10%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image3.fourb.info/item/91/7/8783f8136d06acf9d933179357794352_640x133.png",'0px','0px']
                        },
                        {
                            id: 'D',
                            type: 'image',
                            rect: ['195px', '431px', '96px', '85px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image3.fourb.info/item/61/19/86397417e0341701221f06e5e2841216_96x85.png",'0px','0px']
                        },
                        {
                            id: 'G',
                            type: 'image',
                            rect: ['191px', '511px', '97px', '89px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image2.fourb.info/item/13/35/dd2519232c5eb9f18a3eb47f9c82ef4b_97x89.png",'0px','0px']
                        },
                        {
                            id: 'shadow',
                            type: 'image',
                            rect: ['178px', '692px', '124px', '15px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image3.fourb.info/item/91/36/bdcf7fe0b3318a20f712c02ce4c4ca29_124x15.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'E',
                            type: 'image',
                            rect: ['197px', '600px', '90px', '85px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image.fourb.info/item/87/51/0bab44f3e53520231aa0859d9d48a732_90x85.png",'0px','0px']
                        },
                        {
                            id: 'tianmao3',
                            type: 'image',
                            rect: ['102px', '33px', '60%', '25%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)","http://image3.fourb.info/item/56/34/b2580e96b0029bcab32ecca748c9dead_640x316.png",'0px','0px'],
                            transform: [[],[],[],['1.5','1.5']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '480px', '800px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 6000,
                    autoPlay: true,
                    data: [
                        [
                            "eid49",
                            "rotateZ",
                            3363,
                            207,
                            "easeOutBounce",
                            "${G}",
                            '0deg',
                            '-10deg'
                        ],
                        [
                            "eid50",
                            "rotateZ",
                            3571,
                            166,
                            "easeOutBounce",
                            "${G}",
                            '-10deg',
                            '0deg'
                        ],
                        [
                            "eid45",
                            "scaleX",
                            2000,
                            1000,
                            "easeOutBounce",
                            "${shadow}",
                            '0',
                            '1'
                        ],
                        [
                            "eid143",
                            "top",
                            3000,
                            3000,
                            "easeOutBounce",
                            "${shadow}",
                            '691px',
                            '692px'
                        ],
                        [
                            "eid133",
                            "left",
                            6000,
                            0,
                            "easeOutBounce",
                            "${two-bg-11-img1}",
                            '96px',
                            '96px'
                        ],
                        [
                            "eid144",
                            "top",
                            3000,
                            3000,
                            "easeOutBounce",
                            "${two-bg-11-img1}",
                            '320px',
                            '312px'
                        ],
                        [
                            "eid52",
                            "rotateZ",
                            4363,
                            207,
                            "easeOutBounce",
                            "${D}",
                            '0deg',
                            '-10deg'
                        ],
                        [
                            "eid53",
                            "rotateZ",
                            4571,
                            166,
                            "easeOutBounce",
                            "${D}",
                            '-10deg',
                            '0deg'
                        ],
                        [
                            "eid148",
                            "left",
                            6000,
                            0,
                            "easeOutBounce",
                            "${E2}",
                            '201px',
                            '198px'
                        ],
                        [
                            "eid55",
                            "rotateZ",
                            5363,
                            207,
                            "easeOutBounce",
                            "${E2}",
                            '0deg',
                            '-10deg'
                        ],
                        [
                            "eid56",
                            "rotateZ",
                            5571,
                            166,
                            "easeOutBounce",
                            "${E2}",
                            '-10deg',
                            '0deg'
                        ],
                        [
                            "eid111",
                            "left",
                            2363,
                            637,
                            "easeOutBounce",
                            "${E}",
                            '197px',
                            '195px'
                        ],
                        [
                            "eid91",
                            "left",
                            6000,
                            0,
                            "easeOutBounce",
                            "${E}",
                            '195px',
                            '195px'
                        ],
                        [
                            "eid40",
                            "top",
                            2000,
                            1000,
                            "easeOutBounce",
                            "${E}",
                            '-88px',
                            '600px'
                        ],
                        [
                            "eid95",
                            "top",
                            6000,
                            0,
                            "easeOutBounce",
                            "${E}",
                            '600px',
                            '600px'
                        ],
                        [
                            "eid137",
                            "scaleX",
                            2000,
                            1000,
                            "easeOutBounce",
                            "${two-bg-11-img1}",
                            '1',
                            '1.5'
                        ],
                        [
                            "eid141",
                            "display",
                            2000,
                            0,
                            "easeOutBounce",
                            "${two-bg-11-img1}",
                            'none',
                            'block'
                        ],
                        [
                            "eid100",
                            "rotateZ",
                            2363,
                            207,
                            "easeOutBounce",
                            "${E}",
                            '0deg',
                            '-5deg'
                        ],
                        [
                            "eid101",
                            "rotateZ",
                            2570,
                            1,
                            "easeOutBounce",
                            "${E}",
                            '-5deg',
                            '0deg'
                        ],
                        [
                            "eid99",
                            "rotateZ",
                            2737,
                            0,
                            "easeOutBounce",
                            "${E}",
                            '0deg',
                            '0deg'
                        ],
                        [
                            "eid126",
                            "scaleY",
                            0,
                            1000,
                            "easeOutBounce",
                            "${tianmao3}",
                            '1',
                            '1.5'
                        ],
                        [
                            "eid131",
                            "scaleY",
                            1000,
                            1000,
                            "easeOutBounce",
                            "${tianmao3}",
                            '1.5',
                            '1'
                        ],
                        [
                            "eid146",
                            "left",
                            4000,
                            0,
                            "easeOutBounce",
                            "${G}",
                            '191px',
                            '191px'
                        ],
                        [
                            "eid147",
                            "left",
                            6000,
                            0,
                            "easeOutBounce",
                            "${G}",
                            '191px',
                            '191px'
                        ],
                        [
                            "eid142",
                            "display",
                            2000,
                            0,
                            "easeOutBounce",
                            "${two-bg-11-img22}",
                            'none',
                            'block'
                        ],
                        [
                            "eid140",
                            "scaleX",
                            2000,
                            1000,
                            "easeOutBounce",
                            "${two-bg-11-img22}",
                            '1',
                            '1.5'
                        ],
                        [
                            "eid132",
                            "height",
                            6000,
                            0,
                            "easeOutBounce",
                            "${two-bg-11-img1}",
                            '10%',
                            '10%'
                        ],
                        [
                            "eid94",
                            "left",
                            6000,
                            0,
                            "easeOutBounce",
                            "${D}",
                            '195px',
                            '195px'
                        ],
                        [
                            "eid47",
                            "scaleY",
                            2000,
                            1000,
                            "easeOutBounce",
                            "${shadow}",
                            '0',
                            '1'
                        ],
                        [
                            "eid127",
                            "top",
                            0,
                            0,
                            "easeOutBounce",
                            "${tianmao3}",
                            '33px',
                            '33px'
                        ],
                        [
                            "eid93",
                            "left",
                            6000,
                            0,
                            "easeOutBounce",
                            "${shadow}",
                            '178px',
                            '178px'
                        ],
                        [
                            "eid51",
                            "top",
                            4000,
                            1000,
                            "easeOutBounce",
                            "${D}",
                            '-256px',
                            '426px'
                        ],
                        [
                            "eid103",
                            "top",
                            6000,
                            0,
                            "easeOutBounce",
                            "${D}",
                            '426px',
                            '431px'
                        ],
                        [
                            "eid123",
                            "scaleX",
                            0,
                            1000,
                            "easeOutBounce",
                            "${tianmao3}",
                            '1',
                            '1.5'
                        ],
                        [
                            "eid129",
                            "scaleX",
                            1000,
                            1000,
                            "easeOutBounce",
                            "${tianmao3}",
                            '1.5',
                            '1'
                        ],
                        [
                            "eid54",
                            "top",
                            5000,
                            1000,
                            "easeOutBounce",
                            "${E2}",
                            '-339px',
                            '346px'
                        ],
                        [
                            "eid48",
                            "top",
                            3000,
                            1000,
                            "easeOutBounce",
                            "${G}",
                            '-173px',
                            '511px'
                        ],
                        [
                            "eid102",
                            "top",
                            6000,
                            0,
                            "easeOutBounce",
                            "${G}",
                            '511px',
                            '511px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("Antest_edgeActions.js");
})("EDGE-109228010");
