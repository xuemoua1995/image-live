// export const dateTimeFormat = (timestamp: number | string): string => {
//     const date = new Date(Number(timestamp)); // Ensure timestamp is a number
//     const options: Intl.DateTimeFormatOptions = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//     };
//     return date.toLocaleDateString('en-US', options);
// };
// export const dateTimeFormatIncludeTime = (timestamp: number | string): string => {
//     const date = new Date(Number(timestamp)); // Ensure timestamp is a number
//     const options: Intl.DateTimeFormatOptions = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//     };
//     return date.toLocaleDateString('en-US', options);
// };

export const dateTimeFormat = (timestamp: number | string): string => {
    const date = new Date(Number(timestamp)); // Ensure timestamp is a number
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };
    return date.toLocaleDateString('en-GB', options);
};

export const dateTimeFormatIncludeTime = (timestamp: number | string): string => {
    const date = new Date(Number(timestamp)); // Ensure timestamp is a number
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    return date.toLocaleDateString('en-GB', options) + ' ' + date.toLocaleTimeString('en-GB', options);
};
