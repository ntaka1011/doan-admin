export const convertPrice = (price: number) => {
  try {
    const result = price.toLocaleString().replaceAll(',', '.');

    return `${result}₫`
  } catch (error) {
    console.log(error);
  }
};
