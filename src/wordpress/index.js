wp.blocks.registerBlockType('listings-plugin/live-listings', {
  title: "Live Listings",
  icon: "smiley",
  category: "common",
  edit: function () {
    return <h3>This is a h3 from JSX.</h3>
  },
  save: function () {
    return wp.element.createElement("h1", null, "This is the Frontend.")
  }
});