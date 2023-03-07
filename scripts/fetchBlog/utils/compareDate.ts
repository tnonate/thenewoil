const compareDate = (dateA: Date, dateB: Date) => {
    if (dateA === dateB) return 0;
    if (dateA >= dateB) return 1;
    return -1;
};

export default compareDate;