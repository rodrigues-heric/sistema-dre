interface GetTest {
  message: string;
  time: Date;
}

export const getData = (month: string, vertical: string): GetTest => {
  return {
    message: "success",
    time: new Date(),
  };
};
