interface GetTest {
  message: string;
  time: Date;
}

export const getData = (): GetTest => {
  return {
    message: "success",
    time: new Date(),
  };
};
