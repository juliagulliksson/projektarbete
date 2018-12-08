const formatDate = {
  methods: {
    formatDate(date) {
      let d = new Date(date);
      let options = {
        month: "short",
        day: "numeric",
        year: "numeric"
      };
      return d.toLocaleString("en-us", options);
    }
  }
};

export default formatDate;
