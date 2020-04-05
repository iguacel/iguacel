const something = (() => {
  let executed = false;
  return () => {
    if (!executed) {
      executed = true;
      // do something
      console.log("executed");
    }
  };
})();

something(); // "do something" happens
something(); // nothing happens
