type languageList = "ZH-TW" | "EN-US"

let nowLanguage: languageList

const LanguagePack = {
  "ZH-TW": {
    main: {
      setting: "設定",
      export: {
        name: "導出設定",
        title: "導出設定檔",
        export: {
          title: "[導出]",
          link: "鏈接",
          copy: "複製"
        }
      }
    },
    setting: {
      main: {
        name: "主要",
        language: "語言",
        link: {
          name: "鏈接",
          list: {
            name: "名字",
            url: "鏈接"
          }
        }
      },
      theme: {
        name: "主題",
        color: "顔色",
        color2: "副色",
        textColor: "文字顔色",
        opacity: "透明度",
        blur: "模糊"
      },
      background: {
        name: "背景",
        style: "樣式",
        text: "文字",
        image: "背景圖"
      },
      filters: {
        name: "效果器",
        vignetting: "暈影 / 暗角",
        bloom: "高光"
      },
      special: {
        name: "特殊",
        dibleAnim: "禁用動畫",
      },
      other: {
        name: "其他",
        export: "導出/導入設定",
      }
    },
    settingElement: {
      list: {
        add: "添加",
        del: "刪除"
      }
    }
  },
  "EN-US": {
    main: {
      setting: "Setting",
      export: {
        name: "ExportSetting",
        title: "ExportSetting",
        export: {
          title: "[ Export ]",
          link: "Link",
          copy: "Copy "
        }
      }
    },
    setting: {
      main: {
        name: "Main",
        language: "Language",
        link: {
          name: "Link",
          list: {
            name: "Name",
            url: "Url"
          }
        }
      },
      theme: {
        name: "Theme",
        color: "Color",
        color2: "SecondaryColor",
        textColor: "TextColor",
        opacity: "Opacity",
        blur: "Blur"
      },
      background: {
        name: "Background",
        style: "Style",
        text: "Text",
        image: "BackgroundImage"
      },
      filters: {
        name: "Filters",
        vignetting: "Vignetting",
        bloom: "Bloom"
      },
      special: {
        name: "Special",
        dibleAnim: "DisableAnimation",
      },
      other: {
        name: "Other",
        export: "Export/Import Setting",
      }
    },
    settingElement: {
      list: {
        add: "Add",
        del: "Delete"
      }
    }
  }
}


const KiloModus = {
  transformEffect: function (event: MouseEvent, XoffSet: number, YoffSet: number, Element: Element | HTMLElement, other?: string) {
    const x = ((event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2)) * XoffSet;
    const y = ((event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2)) * YoffSet;
    Element.setAttribute("style", `transform:translate(${x}px, ${y}px) ${other || ""}`);
  }
}

type SettingType = {
  background?: {
    style?: string
    text?: string
    image?: string
  }
  theme?: {
    color?: string
    color2?: string
    textColor?: string
    opacity?: number
    blur?: number
  }
  main?: {
    link?: Array<{
      name?: string,
      url?: string
    }>
    language?: languageList
  }
  filters?: {
    bloom?: boolean
    vignetting?: boolean
  }
  special?: {
    dibleAnim?: boolean
  }
}

const defaultSetting: SettingType = {
  background: {
    style: "snow",
    text: "KILO OwO",
    image: ""
  },
  theme: {
    color: "#00ffff",
    color2: "#000000",
    textColor: "#ffffff",
    opacity: 100,
    blur: 0,
  },
  main: {
    link: [
      {
        url: "google.com",
        name: "Google"
      },
      {
        url: "youtube.com",
        name: "YouTube"
      },
      {
        url: "soundcloud.com",
        name: "SoundCloud"
      },
      {
        url: "facebook.com",
        name: "Facebook"
      },
      {
        url: "github.com",
        name: "GitHub"
      },
    ],
    language: "EN-US"
  },
  filters: {
    bloom: false,
    vignetting: false
  },
  special: {
    dibleAnim: false
  }
}

let setting: SettingType = defaultSetting

let Language = LanguagePack[setting.main.language]

const backgroundFrame = document.getElementById("BackGround")!
const mainFrame = document.getElementById("Main")!

function applyLanguage() {
  Language = LanguagePack[setting.main.language]
  {
    {
      [
        document.querySelector("#Main>.bar>.setting"),
        document.querySelector("#Settings>div>.title>.title")
      ].forEach(e => {
        e.innerHTML = Language.main.setting
      })
    }

    {
      const owo = document.querySelector("#Export>div");

      owo.querySelector(".title>.title")
        .innerHTML = Language.main.export.name;
      owo.querySelector(".content>.output>legend")
        .innerHTML = Language.main.export.title;

      const awa = owo.querySelector(".content>.output");

      awa.querySelector(".link>.title")
        .innerHTML = Language.main.export.export.link;

      (awa.querySelector(".json>.copy") as HTMLInputElement)
        .value = `${Language.main.export.export.copy}json`;
      (awa.querySelector(".base64>.copy") as HTMLInputElement)
        .value = `${Language.main.export.export.copy}base64`;
      (awa.querySelector(".link>.copy") as HTMLInputElement)
        .value = `${Language.main.export.export.copy}${Language.main.export.export.link}`;
    }
  }
  initSetting();
}

function applySetting() {

  /* Theme */
  {
    const value = (document.querySelector(":root") as HTMLDivElement).style

    value.setProperty("--theme-color", setting.theme?.color?.toString())
    value.setProperty("--black-color", `${setting.theme?.color2?.toString()}${parseInt(setting.theme?.opacity?.toString(), 10).toString(16)}`)
    value.setProperty("--blur-effect", `${setting.theme?.blur?.toString()}px`)
    value.setProperty("--text-color", setting.theme?.textColor?.toString())
  }

  /* Filters */
  {
    const value = document.getElementById("Filters").style

    value.setProperty("--bloom", (+setting.filters.bloom).toString())
    value.setProperty("--vignetting", (+setting.filters.vignetting).toString())
  }

  /* Background */
  {
    /* Style */
    {
      const owo = backgroundFrame.children
      for (let index = 0; index < owo.length; index++) {
        const ele = owo[index] as HTMLDivElement;

        ele.classList.add("hide")
        if (ele.getAttribute("background-style") === setting.background.style) {
          ele.classList.remove("hide")
        }

        if (setting.background.image) {
          ele.style.backgroundImage = `url(${setting.background.image})`
        }
      }
    }

    /* ApplyText */
    document.querySelectorAll("[Background-Text]")
      .forEach(e => {
        e.innerHTML =
          `<div>${setting.background.text}</div>`;
      })
  }

  /* Main */
  {
    mainFrame.querySelector(".link").innerHTML = ""

    setting.main.link.forEach((e) => {
      const a = document.createElement("a")

      a.setAttribute("href", "http://" + e.url)
      a.setAttribute("target", "_blank")

      a.innerHTML = e.name

      mainFrame.querySelector(".link").appendChild(a)
    })
  }

  /* Special */
  {
    const owo = document.getElementById("Frame")
    if ((setting.special.dibleAnim || setting.special.dibleAnim)) {
      owo.classList.add("dibleAnim")
    } else {
      owo.classList.remove("dibleAnim")
    }
  }

  /* Language */
  {
    if (nowLanguage !== setting.main.language) {
      nowLanguage = setting.main.language
      applyLanguage()
    }
  }

  /* Export */
  {
    const out = document.querySelector("#Export>div>.content>.output")

    const nLo = window.location

    const applyArea = function (id: string, value: string) {
      const area = out.querySelector(`.${id}`);
      area.querySelector(".out").innerHTML = value;
      (area.querySelector(".copy") as HTMLElement).onclick = () => {
        (area.querySelector(".out") as HTMLTextAreaElement).select();
        document.execCommand("copy")
      };
    }

    applyArea("json", JSON.stringify(setting))
    applyArea("base64", btoa(JSON.stringify(setting)))
    applyArea("link", `${nLo.origin}?setting=${btoa(JSON.stringify(setting))}`)
  }
}

function initSetting() {

  type SettingListType = Array<{
    name: string
    id: string
    contros: Array<
      {
        inputType: "text" | "color" | "url"
        name: string
        id: string
        value: string
      } | {
        inputType: "list"
        name: string
        id: string
        value: Array<any>
        list: Array<{
          key: string
          name: string
        }>
      } | {
        inputType: "range"
        name: string
        id: string
        value: string
        max: number
        min?: number
        endfix: string
      } | {
        inputType: "select"
        name: string
        id: string
        options: Array<{
          name: string
          value: string
        }>
        value: string
      } | {
        inputType: "checkbox"
        name: string
        id: string
        value: boolean
      } | {
        inputType: "button"
        name: string
        function: () => void
      }
    >
  }>

  const SettingList: SettingListType = [
    {
      name: Language.setting.main.name,
      id: "main",
      contros: [
        {
          inputType: "select",
          id: "language",
          name: Language.setting.main.language,
          options: [
            {
              name: "繁體中文 ( 台灣 )",
              value: "ZH-TW"
            },
            {
              name: "English ( US ) ",
              value: "EN-US"
            }
          ],
          value: setting.main.language
        },
        {
          inputType: "list",
          id: "link",
          name: Language.setting.main.link.name,
          list: [
            {
              key: "name",
              name: Language.setting.main.link.list.name
            },
            {
              key: "url",
              name: Language.setting.main.link.list.url
            }
          ],
          value: setting.main.link
        }
      ]
    },
    {
      name: Language.setting.theme?.name,
      id: "theme",
      contros: [
        {
          inputType: "color",
          id: "color",
          name: Language.setting.theme?.color,
          value: setting.theme?.color
        },
        {
          inputType: "color",
          id: "textColor",
          name: Language.setting.theme?.textColor,
          value: setting.theme?.textColor
        },
        {
          inputType: "color",
          id: "color2",
          name: Language.setting.theme?.color2,
          value: setting.theme?.color2
        },
        {
          inputType: "range",
          id: "opacity",
          max: 255,
          name: Language.setting.theme?.opacity,
          endfix: "",
          value: `${setting.theme?.opacity}`
        },
        {
          inputType: "range",
          id: "blur",
          max: 100,
          name: Language.setting.theme?.blur,
          endfix: "px",
          value: `${setting.theme?.blur}`
        },
      ]
    },
    {
      name: Language.setting.background.name,
      id: "background",
      contros: [
        {
          inputType: "select",
          id: "style",
          name: Language.setting.background.style,
          options: (() => {
            const _arr = []
            const _styles = backgroundFrame.children

            for (let index = 0; index < _styles.length; index++) {
              const ele = _styles[index];

              const name = ele.getAttribute("background-style")

              _arr.push({
                name,
                value: name
              })
            }

            return _arr;
          })(),
          value: setting.background.style
        },
        {
          inputType: "text",
          id: "text",
          name: Language.setting.background.text,
          value: setting.background.text
        },
        {
          inputType: "url",
          id: "image",
          name: Language.setting.background.image,
          value: setting.background.image
        }
      ]
    },
    {
      name: Language.setting.filters.name,
      id: "filters",
      contros: [
        {
          inputType: "checkbox",
          name: Language.setting.filters.vignetting,
          id: "vignetting",
          value: setting.filters.vignetting
        },
        {
          inputType: "checkbox",
          name: Language.setting.filters.bloom,
          id: "bloom",
          value: setting.filters.bloom
        }
      ]
    },
    {
      name: Language.setting.special.name,
      id: "special",
      contros: [
        {
          inputType: "checkbox",
          name: Language.setting.special.dibleAnim,
          id: "dibleAnim",
          value: setting.special.dibleAnim
        }
      ]
    },
    {
      name: Language.setting.other.name,
      id: "other",
      contros: [
        {
          inputType: "button",
          name: Language.setting.other.export,
          function() {
            document.getElementById('Export').classList.add('show')
          },
        }
      ]
    }
  ]

  const SettingOut = document.getElementById("Settings").querySelector(".content")

  SettingOut.innerHTML = ""

  SettingList.forEach(e => {
    const group = document.createElement("fieldset")
    group.classList.add("group")
    const title = document.createElement("legend")
    title.classList.add("title")
    const groupId = e.id

    title.innerHTML = `[${e.name}]`

    group.append(title)

    e.contros.forEach(e1 => {
      if (e1.inputType === "button") {
        const button = document.createElement("input")
        button.setAttribute("type", "button")
        button.classList.add("button")
        button.value = e1.name
        button.onclick = e1.function

        group.append(button)
      } else if (e1.inputType === "checkbox") {
        const id = e1.id
        const checkbox = document.createElement("label")
        checkbox.classList.add("checkbox")
        checkbox.innerHTML = e1.name

        const input = document.createElement("input")
        input.setAttribute("type", "checkbox")
        input.checked = e1.value
        const mark = document.createElement("span")
        mark.classList.add("mark")
        const background = document.createElement("span")
        background.classList.add("background")

        checkbox.onclick = () => {
          (setting as any)[groupId][id] = input.checked
          applySetting()
        }

        mark.append(background)

        checkbox.append(input)
        checkbox.append(mark)

        group.append(checkbox)
      } else {
        const id = e1.id
        if (e1.inputType === "list") {
          const aSetting = document.createElement("fieldset")
          aSetting.classList.add("list")
          const title = document.createElement("legend")
          title.classList.add("title")
          title.innerHTML = e1.name
          const list = document.createElement("div")
          list.classList.add("list")
          const add = document.createElement("input")
          add.setAttribute("type", "button")
          add.classList.add("del")
          add.value = Language.settingElement.list.add

          const onEvent = function () {
            const _arr: Array<any> = [];

            const _list = list.children

            for (let index = 0; index < _list.length; index++) {
              const ele = _list[index].querySelectorAll(".ctr");

              let nowObj = "{"

              ele.forEach(e => {
                const e1 = (e.querySelector(".input") as HTMLInputElement)
                nowObj = nowObj + `"${e1.getAttribute("value-key")}":"${e1.value}",`
              })
              console.log(nowObj)
              _arr.push(JSON.parse(`${nowObj.slice(0, -1)}}`))
            }

            (setting as any)[groupId][id] = _arr;
            console.log(_arr);

            applySetting()
          }

          const createCtr = function (list: HTMLElement, keyMap: Array<{ key: string, name: string }>, value: any) {
            const group = document.createElement("div")
            group.classList.add("group")
            const contros = document.createElement("div")
            contros.classList.add("contros")
            const del = document.createElement("input")
            del.setAttribute("type", "button")
            del.classList.add("del")
            del.value = Language.settingElement.list.del
            del.onclick = () => {
              group.remove()
              onEvent()
            }

            keyMap.forEach(e3 => {
              const ctr = document.createElement("div")
              ctr.classList.add("ctr")

              const name = document.createElement("div")
              name.classList.add("name")
              name.innerHTML = e3.name
              const input = document.createElement("input")
              input.setAttribute("type", "text")
              input.setAttribute("value-key", e3.key)
              input.classList.add("input")
              input.value = value[e3.key]
              input.oninput = onEvent

              ctr.append(name)
              ctr.append(input)

              contros.append(ctr)
            })

            group.append(contros)
            group.append(del)

            list.append(group)
          }

          aSetting.append(title)

          e1.value.forEach(e2 => {
            createCtr(list, e1.list, e2)
          })

          aSetting.append(list)
          add.onclick = () => {
            createCtr(list, e1.list, { url: "url", name: "name" })
            onEvent()
          }
          aSetting.append(add)

          group.append(aSetting)

        } else {
          const aSetting = document.createElement("div")
          const name = document.createElement("span")
          const value = document.createElement("span")
          let input: HTMLInputElement | HTMLSelectElement

          name.innerHTML = e1.name
          name.classList.add("name")

          aSetting.append(name)


          const onEvent = function (thisInp: HTMLInputElement | HTMLSelectElement, valueEle: HTMLSpanElement, endFix?: string) {
            return () => {
              (setting as any)[groupId][id] = thisInp.value
              valueEle.innerHTML = `${thisInp.value}${endFix || ""}`
              applySetting()
            }
          }

          if (e1.inputType === "select") {

            input = document.createElement("select")

            e1.options.forEach(e2 => {
              const option = document.createElement("option")

              option.innerHTML = e2.name
              option.setAttribute("value", e2.value)
              if (e1.value === e2.value) {
                option.setAttribute("selected", "selected")
              }

              input.append(option)
            })

            value.innerHTML = `${e1.options[0].value}`

            input.addEventListener("input", onEvent(input, value))

          } else if (e1.inputType === "range") {

            input = document.createElement("input")

            input.setAttribute("type", e1.inputType)
            input.setAttribute("max", e1.max.toString())
            input.setAttribute("min", `${e1.min || 0}`)

            input.addEventListener("input", onEvent(input, value, e1.endfix))

          } else {

            input = document.createElement("input")
            input.setAttribute("type", e1.inputType)
            input.addEventListener("input", onEvent(input, value))

          }

          input.setAttribute("title", `${groupId}-${id}`)

          name.innerHTML = e1.name

          input.classList.add("input")
          input.value = e1.value
          value.innerHTML = e1.value

          value.classList.add("value")

          aSetting.append(input)
          aSetting.append(value)

          group.append(aSetting)
        }
      }
    })

    SettingOut.append(group)
  })
}

function init() {
  {
    const nowUrl = new URL(window.location.toString()).searchParams

    if (nowUrl.get("setting")) {
      try {
        setting =
          JSON.parse(
            atob(
              nowUrl.get("setting")
            )
          )
      } catch (err) {
        setting = defaultSetting
        console.error(err)
      }
    }

    initSetting();
    applySetting();
  }
}

init()

{
  const nowFrame = backgroundFrame.querySelector(".styles[background-style=\"snow\"]")

  for (let index = 0; index < 200; index++) {
    const snow = document.createElement("div")

    snow.classList.add("snow")

    nowFrame?.querySelector(".snow").appendChild(
      snow
    )
  }

  {
    document.onmousemove = mouseEvent => {
      {
        const array = backgroundFrame.getElementsByClassName("text")[0].getElementsByClassName("txt")
        if (!setting.special.dibleAnim) {
          for (let index = 0; index < array.length; index++) {
            const element = array[index];

            const event = -(10 + (20 * index))

            KiloModus.transformEffect(mouseEvent, event, event, element.getElementsByTagName("div")[0])
          }
        } else {
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            element.setAttribute("style", "")
          }
        }
      }
    }
  }
}

{
  const Frame = document.getElementById("Frame")!
  window.addEventListener("blur", () => {
    Frame.classList.add("blur")
  })
  window.addEventListener("focus", () => {
    Frame.classList.remove("blur")
  })

  document.onkeydown = ({ code: keyCode }) => {
    if (keyCode === "Escape") {
      document.querySelectorAll(".window").forEach(e => e.classList.remove('show'))
    }
  }
}