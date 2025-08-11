const PLURAL_RULES = [
  { regex: /([^aeiou])y$/, replacement: "$1ies" }, // e.g., "city" -> "cities"
  { regex: /s$/, replacement: "ses" }, // e.g., "bus" -> "buses"
  { regex: /(ss)$/, replacement: "$1es" }, // e.g., "kiss" -> "kisses"
  { regex: /(sh|ch)$/, replacement: "$1es" }, // e.g., "dish" -> "dishes"
  { regex: /x$/, replacement: "xes" }, // e.g., "box" -> "boxes"
  { regex: /z$/, replacement: "zes" }, // e.g., "quiz" -> "quizzes"
  { regex: /f$/, replacement: "ves" }, // e.g., "leaf" -> "leaves"
  { regex: /fe$/, replacement: "ves" }, // e.g., "life" -> "lives"
] as const

const IRREGULARNOUNS = {
  child: "children",
  person: "people",
  man: "men",
  woman: "women",
  mouse: "mice",
  goose: "geese",
  foot: "feet",
  tooth: "teeth",
  cactus: "cacti",
  focus: "foci",
  fungus: "fungi",
  nucleus: "nuclei",
  syllabus: "syllabi",
  analysis: "analyses",
  diagnosis: "diagnoses",
  oasis: "oases",
  thesis: "theses",
  crisis: "crises",
  phenomenon: "phenomena",
  criterion: "criteria",
  datum: "data",
} as const

const IRREGULARPLURALS = {
  children: "child",
  men: "man",
  women: "woman",
  people: "person",
  mice: "mouse",
  geese: "goose",
  feet: "foot",
  teeth: "tooth",
  oxen: "ox",
  leaves: "leaf",
  lives: "life",
} as const

export class StringUtils {
  constructor() {}

  public static convertToPluralize(noun: string, isPlural: boolean = true) {
    if (!isPlural) return noun

    const matchedIrregularNoun = IRREGULARNOUNS[noun.toLowerCase() as keyof typeof IRREGULARNOUNS]

    if (matchedIrregularNoun) {
      return matchedIrregularNoun
    }

    for (const rule of PLURAL_RULES) {
      if (rule.regex.test(noun)) {
        return noun.replace(rule.regex, rule.replacement)
      }
    }

    return noun + "s"
  }

  public static convertToSingular(noun: string, isSingular: boolean = true) {
    if (!isSingular) return noun

    if (IRREGULARPLURALS[noun as keyof typeof IRREGULARPLURALS]) {
      return IRREGULARPLURALS[noun as keyof typeof IRREGULARPLURALS]
    }

    // Handle pluralization rules
    if (noun.endsWith("ies")) {
      return noun.slice(0, -3) + "y" // e.g., "parties" -> "party"
    } else if (noun.endsWith("ves")) {
      return noun.slice(0, -3) + "f" // e.g., "wolves" -> "wolf"
    } else if (noun.endsWith("s") && !noun.endsWith("ss")) {
      return noun.slice(0, -1) // e.g., "cars" -> "car", but not "boss" -> "bos"
    }
    return noun
  }
  public static capitalizeFirstLetter(text: string) {
    if (typeof text !== "string") return ""
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  public static camelToSnake(text: string) {
    return text.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()
  }
  public static snakeToCamel(text: string) {
    return text.replace(/(_\w)/g, (matches) => matches[1].toUpperCase())
  }
  public static truncateText(text: string, maxLength: number = 4, suffix = "...") {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + suffix + text.slice(-maxLength)
  }
  public static reverse(text: string) {
    return text.split("").reverse().join("")
  }
  public static highlightWord(text: string, word: string, highlightTag = "mark") {
    const regex = new RegExp(`(${word})`, "gi")
    return text.replace(regex, `<${highlightTag}>$1</${highlightTag}>`)
  }
}
