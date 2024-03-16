export function formatSize(bytes: number): string {
    if (bytes < 1024) {
        return bytes + "bytes";
    }
    if (bytes < 1048576) {
        return Math.round(bytes / 10.24) / 100 + "Kb";
    }
    if (bytes < 1073741824) {
        return Math.round(bytes / 10485.76) / 100 + "Mb";
    }

    if (bytes < 1099511627776) {
        return Math.round(bytes / 10737418.24) / 100 + "Gb";
    }

    if (bytes < 1125899906842624) {
        return Math.round(bytes / 10995116277.76) / 100 + "Tb";
    }
}