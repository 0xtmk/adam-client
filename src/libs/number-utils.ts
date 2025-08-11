export class NumberUtils {
  public bigValue?: bigint
  private decimals: number
  public initValue?: number | string | bigint
  static etherUnits = {
    gwei: 9,
    wei: 18,
  }

  constructor(initValue?: number | string | bigint, decimals: number = 18) {
    if (this.checkInvalidNumber(initValue)) {
      this.logError(initValue, "Init Value")
      this.bigValue = undefined
    } else {
      if (typeof initValue === "bigint") {
        this.bigValue = initValue
      } else {
        const _initValue = initValue?.toString().includes("e-")
          ? Number(initValue).toFixed(Number(initValue.toString().split("-")?.[1] || 0))
          : initValue

        this.bigValue = _initValue ? NumberUtils.parseUnits(_initValue.toString(), decimals) : undefined
      }
    }

    this.initValue = initValue
    this.decimals = decimals
  }

  public plus(value: number | string | bigint) {
    if (!this.bigValue) {
      return this
    }
    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Plus")
      return this
    }

    if (typeof this.initValue === "bigint") {
      const _value = typeof value === "bigint" ? value : BigInt(value)

      this.bigValue = this.bigValue + _value
    } else {
      this.bigValue = this.bigValue + NumberUtils.parseUnits(value.toString(), this.decimals)
    }

    return this
  }
  public minus(value: number | string | bigint) {
    if (!this.bigValue) {
      return this
    }

    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Minus")
      return this
    }

    if (typeof this.initValue === "bigint") {
      const _value = typeof value === "bigint" ? value : BigInt(value)

      this.bigValue = this.bigValue + _value
    } else {
      this.bigValue = this.bigValue - NumberUtils.parseUnits(value.toString(), this.decimals)
    }

    return this
  }
  public multiply(value: number | string) {
    if (!this.bigValue) {
      return this
    }

    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Multiply")
      return this
    }

    this.bigValue = BigInt(
      NumberUtils.formatUnits(this.bigValue * NumberUtils.parseUnits(value.toString(), this.decimals), this.decimals),
    )

    return this
  }

  public divide(value: number | string) {
    if (!this.bigValue) {
      return this
    }

    if (this.checkInvalidNumber(value)) {
      this.logError(value, "Divide")
      return this
    }

    this.bigValue =
      (this.bigValue * NumberUtils.parseUnits("1", this.decimals)) /
      NumberUtils.parseUnits(value.toString(), this.decimals)

    return this
  }

  public static format(value: string | number | bigint, options?: number, compact?: boolean): string
  public static format(
    value: string | number | bigint,
    options: Intl.NumberFormatOptions & { locales?: Intl.LocalesArgument },
  ): string
  public static format(
    value: string | number | bigint,
    options: (Intl.NumberFormatOptions & { locales?: Intl.LocalesArgument }) | number = {},
    compact: boolean = false,
  ) {
    try {
      if (typeof value !== "string" && typeof value !== "number" && typeof value !== "bigint") {
        return value
      }

      const {
        locales,
        ...defaultOptions
      }: Intl.NumberFormatOptions & { locales?: Intl.LocalesArgument } & {
        roundingMode?:
          | "ceil"
          | "floor"
          | "expand"
          | "trunc"
          | "halfCeil"
          | "halfFloor"
          | "halfExpand"
          | "halfTrunc"
          | "halfEven"
          | undefined
      } = {
        locales: "en",
        minimumFractionDigits: 0,
        maximumFractionDigits: 6,
        roundingMode: "trunc",
      }

      const valueFormatted = Number(value)

      if (!valueFormatted) return value

      if (typeof options === "number") {
        return new Intl.NumberFormat(locales, {
          ...defaultOptions,
          maximumFractionDigits: options,
          notation: compact ? "compact" : "standard",
          compactDisplay: "short",
        }).format(valueFormatted)
      } else {
        return new Intl.NumberFormat(locales, {
          ...defaultOptions,
          ...options,
        }).format(valueFormatted)
      }
    } catch (error) {
      console.log("🚀 ~ NumberUtils ~ error:", error, value)
      return "-"
    }
  }

  public static fixedNumber(value: string | number, digits: number = 6) {
    if (digits === undefined) {
      digits = 0
    }

    if (!value.toString().includes(".")) return Number(value)

    const multiplicator = Math.pow(10, digits)

    const formattedValue = Number(value)

    const newValue = parseFloat((formattedValue * multiplicator).toFixed(11))
    return Math.floor(newValue) / multiplicator
  }

  public static randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.random() * (max - min + 1) + min
  }

  public static parseUnits(value: string, decimals: number) {
    {
      let [integer, fraction = "0"] = value.split(".")

      const negative = integer.startsWith("-")
      if (negative) integer = integer.slice(1)

      // trim leading zeros.
      fraction = fraction.replace(/(0+)$/, "")

      // round off if the fraction is larger than the number of decimals.
      if (decimals === 0) {
        if (Math.round(Number(`.${fraction}`)) === 1) integer = `${BigInt(integer) + BigInt(1)}`
        fraction = ""
      } else if (fraction.length > decimals) {
        const [left, unit, right] = [
          fraction.slice(0, decimals - 1),
          fraction.slice(decimals - 1, decimals),
          fraction.slice(decimals),
        ]

        const rounded = Math.round(Number(`${unit}.${right}`))
        if (rounded > 9) fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0")
        else fraction = `${left}${rounded}`

        if (fraction.length > decimals) {
          fraction = fraction.slice(1)
          integer = `${BigInt(integer) + BigInt(1)}`
        }

        fraction = fraction.slice(0, decimals)
      } else {
        fraction = fraction.padEnd(decimals, "0")
      }

      return BigInt(`${negative ? "-" : ""}${integer}${fraction}`)
    }
  }

  public static formatUnits(value: bigint, decimals: number) {
    let display = value.toString()

    const negative = display.startsWith("-")
    if (negative) display = display.slice(1)

    display = display.padStart(decimals, "0")

    let [integer, fraction] = [display.slice(0, display.length - decimals), display.slice(display.length - decimals)]
    fraction = fraction.replace(/(0+)$/, "")
    return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`
  }

  public static parseEther(ether: string, unit: "wei" | "gwei" = "wei") {
    return this.parseUnits(ether, this.etherUnits[unit])
  }
  public static formatEther(wei: bigint, unit: "wei" | "gwei" = "wei") {
    return this.formatUnits(wei, this.etherUnits[unit])
  }

  public static exactValue(value: number | string) {
    if (Number(value).toString().includes("e-")) {
      const [realValue, fixedValue] = value.toString().split("e-")

      let bonusFixed = 0

      if (realValue.includes(".")) {
        bonusFixed = realValue.split(".")[1].length
      }

      return Number(value).toFixed(Number(fixedValue || 0) + bonusFixed)
    } else if (Number(value) > Number.MAX_SAFE_INTEGER) {
      return BigInt(value).toString()
    }
    return value.toString()
  }

  private checkInvalidNumber(value: any) {
    return !Number(value)
  }

  public toNumber() {
    return Number(this.value)
  }

  private logError(value: any, prefix?: string) {
    console.error(`Decimal${prefix ? `[${prefix}]:` : ""} ${value} is Invalid`)
  }

  get value() {
    if (typeof this.initValue === "bigint") {
      return this.bigValue?.toString()
    } else {
      return this.bigValue ? NumberUtils.formatUnits(this.bigValue, this.decimals) : "0"
    }
  }
}
