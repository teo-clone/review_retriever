/*
 * Utilities related to dates and times
 */

// Format date object as a nicely readable string for the UI
export function formatReviewDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return new Intl.DateTimeFormat('en-US', options)
        .formatToParts(date).map(part => part.value)
        .join('').replace(",", " ");
}

// Returns date which is 48 hours before now
export function twoDaysAgoNow(): Date {
    const now = new Date();

    return new Date(now.getTime() - (48 * 60 * 60 * 1000));
}