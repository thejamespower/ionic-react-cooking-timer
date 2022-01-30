const finishTimer = (id) => (x) =>
  x.id !== id
    ? x
    : {
        ...x,
        finished: true,
        active: false,
      };

export default finishTimer;
