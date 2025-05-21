const disabledDate = (current) => {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 9);
  return (
    current &&
    (current < today.setHours(0, 0, 0, 0) ||
      current > maxDate.setHours(23, 59, 59, 999))
  );
};

export default disabledDate;