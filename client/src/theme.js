const Theme = {

    "global": {
        "colors": {
            "icon": {
                "0": "#",
                "1": "6",
                "2": "6",
                "3": "6",
                "4": "6",
                "5": "6",
                "6": "6",
                "dark": "#f8f8ff",
                "light": "#666666"
            },
            "active": "rgba(221,221,221,0.5)",
            "black": "#181818",
            "border": {
                "dark": "rgba(255,255,255,0.33)",
                "light": "rgba(0,0,0,0.33)"
            },
            "brand": "#3d5a80",
            "control": {
                "dark": "#00A8F0",
                "light": "#3d5a80"
            },
            "focus": "#ee6c4d",
            "placeholder": "#AAAAAA",
            "selected": "#98c1d9",
            "text": {
                "dark": "#f8f8ff",
                "light": "#444444"
            },
            "white": "#f8f8ff",
            "accent-1": "#ee6c4d",
            "accent-2": "#E6C84B",
            "accent-3": "#915591",
            "accent-4": "#FFCA58",
            "dark-1": "#000000",
            "dark-2": "#222222",
            "dark-3": "#555555",
            "dark-4": "#777777",
            "dark-5": "#999999",
            "dark-6": "#999999",
            "light-1": "#fcfcfc",
            "light-2": "#f2f2f2",
            "light-3": "#e8e8e8",
            "light-4": "#CCCCCC",
            "light-5": "#DADADA",
            "light-6": "#DADADA",
            "neutral-1": "#98c1d9",
            "neutral-2": "#8c4f47",
            "neutral-3": "#e7b4a5",
            "neutral-4": "#774677",
            "status-critical": "#cd3813",
            "status-error": "#cd3813",
            "status-warning": "#F0AA3C",
            "status-ok": "#67a66f",
            "status-unknown": "#848484",
            "status-disabled": "#848484",
            "background": "#c2c2c2"
        },
        "animation": {
            "duration": "1s",
            "jiggle": {
                "duration": "0.1s"
            }
        },
        "borderSize": {
            "xsmall": "1px",
            "small": "2px",
            "medium": "4px",
            "large": "12px",
            "xlarge": "24px"
        },
        "breakpoints": {
            "small": {
                "value": 768,
                "borderSize": {
                    "xsmall": "1px",
                    "small": "2px",
                    "medium": "4px",
                    "large": "6px",
                    "xlarge": "12px"
                },
                "edgeSize": {
                    "none": "0px",
                    "hair": "1px",
                    "xxsmall": "2px",
                    "xsmall": "3px",
                    "small": "6px",
                    "medium": "12px",
                    "large": "24px",
                    "xlarge": "48px"
                },
                "size": {
                    "xxsmall": "24px",
                    "xsmall": "48px",
                    "small": "96px",
                    "medium": "192px",
                    "large": "384px",
                    "xlarge": "768px",
                    "full": "100%"
                }
            },
            "medium": {
                "value": 1536
            },
            "large": {}
        },
        "deviceBreakpoints": {
            "phone": "small",
            "tablet": "medium",
            "computer": "large"
        },
        "control": {
            "border": {
                "width": "1px",
                "radius": "4px",
                "color": "border"
            }
        },
        "debounceDelay": 300,
        "drop": {
            "background": "#ffffff",
            "border": {
                "width": "0px",
                "radius": "0px"
            },
            "shadowSize": "small",
            "zIndex": "20"
        },
        "edgeSize": {
            "none": "0px",
            "hair": "1px",
            "xxsmall": "3px",
            "xsmall": "6px",
            "small": "12px",
            "medium": "24px",
            "large": "48px",
            "xlarge": "96px",
            "responsiveBreakpoint": "small"
        },
        "elevation": {
            "light": {
                "none": "none",
                "xsmall": "0px 1px 2px rgba(0, 0, 0, 0.20)",
                "small": "0px 2px 4px rgba(0, 0, 0, 0.20)",
                "medium": "0px 4px 8px rgba(0, 0, 0, 0.20)",
                "large": "0px 8px 16px rgba(0, 0, 0, 0.20)",
                "xlarge": "0px 12px 24px rgba(0, 0, 0, 0.20)"
            },
            "dark": {
                "none": "none",
                "xsmall": "0px 2px 2px rgba(255, 255, 255, 0.40)",
                "small": "0px 4px 4px rgba(255, 255, 255, 0.40)",
                "medium": "0px 6px 8px rgba(255, 255, 255, 0.40)",
                "large": "0px 8px 16px rgba(255, 255, 255, 0.40)",
                "xlarge": "0px 12px 24px rgba(255, 255, 255, 0.40)"
            }
        },
        "focus": {
            "border": {
                "color": "focus"
            }
        },
        "font": {
            "size": "16px",
            "height": "20px",
            "maxWidth": "432px",
            "family": "'Quicksand', sans-serif;",
            "face": "/* latin-ext */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 300;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hJVQNcOM.woff2) format('woff2');   unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 300;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hK1QN.woff2) format('woff2');   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }  /* latin-ext */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 400;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hJVQNcOM.woff2) format('woff2');   unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 400;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hK1QN.woff2) format('woff2');   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; } /* latin-ext */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 500;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hJVQNcOM.woff2) format('woff2');   unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 500;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hK1QN.woff2) format('woff2');   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; } /* latin-ext */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 600;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hJVQNcOM.woff2) format('woff2');   unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 600;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hK1QN.woff2) format('woff2');   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; } /* latin-ext */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 700;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hJVQNcOM.woff2) format('woff2');   unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF; } /* latin */ @font-face {   font-family: 'Quicksand';   font-style: normal;   font-weight: 700;   font-display: swap;   src: url(https://fonts.gstatic.com/s/quicksand/v22/6xKtdSZaM9iE8KbpRA_hK1QN.woff2) format('woff2');   unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }"
        },
        "hover": {
            "background": {
                "dark": {
                    "color": "active",
                    "opacity": "medium"
                },
                "light": {
                    "color": "active",
                    "opacity": "medium"
                }
            },
            "color": {
                "dark": "white",
                "light": "black"
            }
        },
        "input": {
            "padding": {
                "horizontal": "small",
                "vertical": "xsmall"
            },
            "weight": 600
        },
        "opacity": {
            "strong": 0.8,
            "medium": 0.4,
            "weak": 0.1
        },
        "selected": {
            "background": "selected",
            "color": "white"
        },
        "spacing": "24px",
        "size": {
            "xxsmall": "48px",
            "xsmall": "96px",
            "small": "192px",
            "medium": "384px",
            "large": "768px",
            "xlarge": "1152px",
            "xxlarge": "1536px",
            "full": "100%"
        }
    },
    "icon": {
        "size": {
            "small": "12px",
            "medium": "24px",
            "large": "48px",
            "xlarge": "96px"
        }
    },
    "accordion": {
        "icons": {}
    },
    "anchor": {
        "textDecoration": "none",
        "fontWeight": 600,
        "color": {
            "dark": "#98c1d9",
            "light": "#3d5a80"
        },
        "hover": {
            "textDecoration": "underline"
        }
    },
    "box": {
        "responsiveBreakpoint": "small"
    },
    "button": {
        "border": {
            "width": "2px",
            "radius": "18px"
        },
        "primary": {
            "background": "#3D5A80",
        },
        "disabled": {
            "opacity": 0.3
        },
        "minWidth": "96px",
        "maxWidth": "384px",
        "padding": {
            "vertical": "4px",
            "horizontal": "22px"
        },
        "extend": [
            "\n      ",
            null,
            "\n    "
        ]
    },
    "calendar": {
        "small": {
            "fontSize": "14px",
            "lineHeight": 1.375,
            "daySize": "27.428571428571427px",
            "slideDuration": "0.2s"
        },
        "medium": {
            "fontSize": "18px",
            "lineHeight": 1.45,
            "daySize": "54.857142857142854px",
            "slideDuration": "0.5s"
        },
        "large": {
            "fontSize": "30px",
            "lineHeight": 1.11,
            "daySize": "109.71428571428571px",
            "slideDuration": "0.8s"
        },
        "icons": {
            "small": {}
        }
    },
    "carousel": {
        "icons": {}
    },
    "chart": {},
    "checkBox": {
        "border": {
            "color": {
                "dark": "rgba(255, 255, 255, 0.5)",
                "light": "rgba(0, 0, 0, 0.15)"
            },
            "width": "2px"
        },
        "check": {
            "radius": "4px",
            "thickness": "4px"
        },
        "icon": {
            "extend": [
                "\n        box-sizing: border-box;\n        position: absolute;\n        top: 0px;\n        left: 0px;\n        width: ",
                null,
                ";\n        height: ",
                null,
                ";\n      "
            ]
        },
        "icons": {},
        "hover": {
            "border": {
                "color": {
                    "dark": "white",
                    "light": "black"
                }
            }
        },
        "size": "24px",
        "toggle": {
            "color": {
                "dark": "#d9d9d9",
                "light": "#d9d9d9"
            },
            "radius": "24px",
            "size": "48px",
            "knob": {}
        }
    },
    "clock": {
        "analog": {
            "hour": {
                "color": {
                    "dark": "light-2",
                    "light": "dark-3"
                },
                "width": "8px",
                "size": "24px",
                "shape": "round"
            },
            "minute": {
                "color": {
                    "dark": "light-4",
                    "light": "dark-3"
                },
                "width": "4px",
                "size": "12px",
                "shape": "round"
            },
            "second": {
                "color": {
                    "dark": "accent-1",
                    "light": "accent-1"
                },
                "width": "3px",
                "size": "9px",
                "shape": "round"
            },
            "size": {
                "small": "72px",
                "medium": "96px",
                "large": "144px",
                "xlarge": "216px",
                "huge": "288px"
            }
        },
        "digital": {
            "text": {
                "xsmall": {
                    "size": "10px",
                    "height": 1.5
                },
                "small": {
                    "size": "14px",
                    "height": 1.43
                },
                "medium": {
                    "size": "18px",
                    "height": 1.375
                },
                "large": {
                    "size": "22px",
                    "height": 1.167
                },
                "xlarge": {
                    "size": "26px",
                    "height": 1.1875
                },
                "xxlarge": {
                    "size": "34px",
                    "height": 1.125
                }
            }
        }
    },
    "collapsible": {
        "minSpeed": 200,
        "baseline": 500
    },
    "dataTable": {
        "header": {},
        "groupHeader": {
            "border": {
                "side": "bottom",
                "size": "xsmall"
            },
            "fill": "vertical",
            "pad": {
                "horizontal": "small",
                "vertical": "xsmall"
            },
            "background": {
                "dark": "dark-2",
                "light": "light-2"
            }
        },
        "icons": {},
        "resize": {
            "border": {
                "side": "right",
                "color": "border"
            }
        },
        "primary": {
            "weight": "bold"
        }
    },
    "diagram": {
        "line": {
            "color": "accent-1"
        }
    },
    "formField": {
        "border": {
            "color": "border",
            "position": "inner",
            "side": "bottom",
            "error": {
                "color": {
                    "dark": "white",
                    "light": "status-critical"
                }
            }
        },
        "content": {
            "pad": {
                "horizontal": "small",
                "bottom": "small"
            }
        },
        "error": {
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            },
            "color": {
                "dark": "status-critical",
                "light": "status-critical"
            }
        },
        "help": {
            "margin": {
                "left": "small"
            },
            "color": {
                "dark": "dark-3",
                "light": "dark-3"
            }
        },
        "label": {
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            }
        },
        "margin": {
            "bottom": "small"
        }
    },
    "grommet": {},
    "heading": {
        "font": {},
        "level": {
            "1": {
                "font": {},
                "small": {
                    "size": "34px",
                    "height": "40px",
                    "maxWidth": "816px"
                },
                "medium": {
                    "size": "50px",
                    "height": "56px",
                    "maxWidth": "1200px"
                },
                "large": {
                    "size": "82px",
                    "height": "88px",
                    "maxWidth": "1968px"
                },
                "xlarge": {
                    "size": "114px",
                    "height": "120px",
                    "maxWidth": "2736px"
                }
            },
            "2": {
                "font": {},
                "small": {
                    "size": "26px",
                    "height": "32px",
                    "maxWidth": "624px"
                },
                "medium": {
                    "size": "34px",
                    "height": "40px",
                    "maxWidth": "816px"
                },
                "large": {
                    "size": "50px",
                    "height": "56px",
                    "maxWidth": "1200px"
                },
                "xlarge": {
                    "size": "66px",
                    "height": "72px",
                    "maxWidth": "1584px"
                }
            },
            "3": {
                "font": {},
                "small": {
                    "size": "22px",
                    "height": "28px",
                    "maxWidth": "528px"
                },
                "medium": {
                    "size": "26px",
                    "height": "32px",
                    "maxWidth": "624px"
                },
                "large": {
                    "size": "34px",
                    "height": "40px",
                    "maxWidth": "816px"
                },
                "xlarge": {
                    "size": "42px",
                    "height": "48px",
                    "maxWidth": "1008px"
                }
            },
            "4": {
                "font": {},
                "small": {
                    "size": "18px",
                    "height": "24px",
                    "maxWidth": "432px"
                },
                "medium": {
                    "size": "18px",
                    "height": "24px",
                    "maxWidth": "432px"
                },
                "large": {
                    "size": "18px",
                    "height": "24px",
                    "maxWidth": "432px"
                },
                "xlarge": {
                    "size": "18px",
                    "height": "24px",
                    "maxWidth": "432px"
                }
            },
            "5": {
                "font": {},
                "small": {
                    "size": "16px",
                    "height": "22px",
                    "maxWidth": "384px"
                },
                "medium": {
                    "size": "16px",
                    "height": "22px",
                    "maxWidth": "384px"
                },
                "large": {
                    "size": "16px",
                    "height": "22px",
                    "maxWidth": "384px"
                },
                "xlarge": {
                    "size": "16px",
                    "height": "22px",
                    "maxWidth": "384px"
                }
            },
            "6": {
                "font": {},
                "small": {
                    "size": "14px",
                    "height": "20px",
                    "maxWidth": "336px"
                },
                "medium": {
                    "size": "14px",
                    "height": "20px",
                    "maxWidth": "336px"
                },
                "large": {
                    "size": "14px",
                    "height": "20px",
                    "maxWidth": "336px"
                },
                "xlarge": {
                    "size": "14px",
                    "height": "20px",
                    "maxWidth": "336px"
                }
            }
        },
        "responsiveBreakpoint": "small",
        "weight": 600
    },
    "layer": {
        "background": "white",
        "border": {
            "radius": "4px"
        },
        "container": {
            "zIndex": "15"
        },
        "overlay": {
            "background": "rgba(0, 0, 0, 0.5)"
        },
        "responsiveBreakpoint": "small",
        "zIndex": "10"
    },
    "menu": {
        "icons": {}
    },
    "meter": {
        "color": "accent-1"
    },
    "paragraph": {
        "small": {
            "size": "14px",
            "height": "20px",
            "maxWidth": "336px"
        },
        "medium": {
            "size": "18px",
            "height": "24px",
            "maxWidth": "432px"
        },
        "large": {
            "size": "22px",
            "height": "28px",
            "maxWidth": "528px"
        },
        "xlarge": {
            "size": "26px",
            "height": "32px",
            "maxWidth": "624px"
        },
        "xxlarge": {
            "size": "34px",
            "height": "40px",
            "maxWidth": "816px"
        }
    },
    "radioButton": {
        "border": {
            "color": {
                "dark": "rgba(255, 255, 255, 0.5)",
                "light": "rgba(0, 0, 0, 0.15)"
            },
            "width": "2px"
        },
        "check": {
            "radius": "100%"
        },
        "hover": {
            "border": {
                "color": {
                    "dark": "white",
                    "light": "black"
                }
            }
        },
        "icon": {},
        "icons": {},
        "gap": "small",
        "size": "24px"
    },
    "rangeInput": {
        "track": {
            "height": "5px",
            "color": "brand",
            "lower": {
                "color": "brand",
            },
            "upper": {
                "color": "light-6"
            }
        },
        "thumb": {
            "color": "brand"
        }
    },
    "rangeSelector": {
        "background": {
            "invert": {
                "color": "light-4"
            }
        }
    },
    "select": {
        "container": {},
        "control": {},
        "icons": {},
        "options": {
            "box": {
                "align": "start",
                "pad": "small"
            },
            "text": {
                "margin": "none"
            }
        },
        "step": 20
    },
    "tab": {
        "active": {
            "color": "text"
        },
        "border": {
            "side": "bottom",
            "size": "small",
            "color": {
                "dark": "accent-1",
                "light": "brand"
            },
            "active": {
                "color": {
                    "dark": "white",
                    "light": "black"
                }
            },
            "hover": {
                "color": {
                    "dark": "white",
                    "light": "black"
                }
            }
        },
        "color": "control",
        "hover": {
            "color": {
                "dark": "white",
                "light": "black"
            }
        },
        "margin": {
            "vertical": "xxsmall",
            "horizontal": "small"
        },
        "pad": {
            "bottom": "xsmall"
        }
    },
    "tabs": {
        "header": {},
        "panel": {}
    },
    "table": {
        "header": {
            "align": "start",
            "pad": {
                "horizontal": "small",
                "vertical": "xsmall"
            },
            "border": "bottom",
            "verticalAlign": "bottom",
            "fill": "vertical"
        },
        "body": {
            "align": "start",
            "pad": {
                "horizontal": "small",
                "vertical": "xsmall"
            }
        },
        "footer": {
            "align": "start",
            "pad": {
                "horizontal": "small",
                "vertical": "xsmall"
            },
            "border": "top",
            "verticalAlign": "top",
            "fill": "vertical"
        }
    },
    "text": {
        "xsmall": {
            "size": "12px",
            "height": "18px",
            "maxWidth": "288px"
        },
        "small": {
            "size": "14px",
            "height": "20px",
            "maxWidth": "336px"
        },
        "medium": {
            "size": "18px",
            "height": "24px",
            "maxWidth": "432px"
        },
        "large": {
            "size": "22px",
            "height": "28px",
            "maxWidth": "528px"
        },
        "xlarge": {
            "size": "26px",
            "height": "32px",
            "maxWidth": "624px"
        },
        "xxlarge": {
            "size": "34px",
            "height": "40px",
            "maxWidth": "816px"
        }
    },
    "video": {
        "captions": {
            "background": "rgba(0, 0, 0, 0.7)"
        },
        "icons": {},
        "scrubber": {
            "color": "light-4"
        }
    },
    "worldMap": {
        "color": "light-3",
        "continent": {
            "active": "8px",
            "base": "6px"
        },
        "hover": {
            "color": "light-4"
        },
        "place": {
            "active": "20px",
            "base": "8px"
        }
    }
}

export default Theme