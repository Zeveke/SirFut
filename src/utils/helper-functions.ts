export const setupInterval = (
  countDownDate: number,
  setCountdown: (value: {
    days: number;
    hours: number;
    minutes: number;
  }) => void
) => {
  const intervalId = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    setCountdown({ days, hours, minutes });
  }, 1000);

  return intervalId;
};
