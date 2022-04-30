const sprintfCodes: Record<string, { title: string; description: string }> = {
    "%%": {
        title: "%%",
        description: "a percent sign"
    },
    "%b": {
        title: "%b",
        description: "Binary number"
    },
    "%c": {
        title: "%c",
        description: "The character according to the ASCII value"
    },
    "%d": {
        title: "%d",
        description: "Signed decimal number (negative, zero or positive)"
    },
    "%e": {
        title: "%e",
        description: "Scientific notation using a lowercase (e.g. 1.2e+2)"
    },
    "%E": {
        title: "%E",
        description: "Scientific notation using a uppercase (e.g. 1.2E+2)"
    },
    "%u": {
        title: "%u",
        description: "Unsigned decimal number (equal to or greater than zero)"
    },
    "%f": {
        title: "%f",
        description: "Floating-point number (local settings aware)"
    },
    "%F": {
        title: "%F",
        description: "Floating-point number (not local settings aware)"
    },
    "%g": {
        title: "%g",
        description: "shorter of %e and %f"
    },
    "%G": {
        title: "%G",
        description: "shorter of %E and %f"
    },
    "%o": {
        title: "%o",
        description: "Octal number"
    },
    "%s": {
        title: "%s",
        description: "String"
    },
    "%x": {
        title: "%x",
        description: "Hexadecimal number (lowercase letters)"
    },
    "%X": {
        title: "%X",
        description: "Hexadecimal number (uppercase letters)"
    },
};

export default sprintfCodes;
