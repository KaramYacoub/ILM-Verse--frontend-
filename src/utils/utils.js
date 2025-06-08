/**
 * Format a date string into a localized date format
 * @param {string} dateString - The date string to format
 * @param {Object} options - Optional formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = { year: "numeric", month: "long", day: "numeric" }) => {
    return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Format a date string into a short date format (e.g., "Jan 1, 2024")
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/**
 * Convert 24-hour time to 12-hour format with AM/PM
 * @param {string} time24 - Time in 24-hour format (HH:MM)
 * @returns {string} Time in 12-hour format with AM/PM
 */
export const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":");
    const period = +hours >= 12 ? "PM" : "AM";
    const hours12 = +hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
};

/**
 * Get the file type from a MIME type string
 * @param {string} mimeType - The MIME type string
 * @returns {string} The formatted file type
 */
export const getFileType = (mimeType) => {
    if (mimeType.includes("video")) return "Video";
    if (mimeType.includes("pdf")) return "PDF";
    if (mimeType.includes("word") || mimeType.includes("msword")) return "DOC";
    return mimeType.split("/")[1]?.toUpperCase() || "File";
};

/**
 * Check if a date is past due
 * @param {string} dueDateString - The due date string to check
 * @returns {boolean} True if the date is past due, false otherwise
 */
export const isPastDue = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const currentDate = new Date();
    return currentDate > dueDate;
};

/**
 * Format a time string to 12-hour format with AM/PM
 * @param {string} dateString - The date string
 * @param {string} timeString - The time string
 * @returns {string} Formatted time string
 */
export const formatDateTime = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

/**
 * Get the day of the week from a date string
 * @param {string} dateString - The date string
 * @returns {string} The day of the week
 */
export const getDayOfWeek = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        weekday: "long",
    });
};