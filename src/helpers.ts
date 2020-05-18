const DATE_THRESHOLD = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);
const sum = (accumulator: any, currentValue: any) => accumulator + currentValue;

const filterData = (data: any[], postalCode: string) => {
  return data.filter((stateData: { state: any; date: number }) => {
    const dateString = stateData.date.toString();
    const formattedDateString = `${dateString.substring(
      0,
      4
    )}/${dateString.substring(4, 6)}/${dateString.substring(6, 8)}`;
    const date = new Date(formattedDateString);
    return stateData.state === postalCode && date > DATE_THRESHOLD;
  });
};

const averageData = (data: { totalTestResults: any }[]) => {
  return Math.round(
    data
      .map((stateData: { totalTestResults: any }, index: number) => {
        if (index === data.length - 1) {
          return 0;
        }
        return stateData.totalTestResults - data[index + 1].totalTestResults;
      })
      .reduce(sum, 0) / data.length
  );
};

export { filterData, averageData };
