export default function formatSize(size) {
    if (size > 1024*1024*1024) {
        return (size / (1024*1024*1024)).toFixed(1) + "Gb"
    }
    if (size > 1024*1024) {
        return (size / (1024*1024)).toFixed(1) + "Mb"
    }
    if (size > 1024) {
        return (size / (1024)).toFixed(1) + "Kb"
    }
    return size + "B"
};