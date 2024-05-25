const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual("name").get(function () {
  if (this.first_name && this.family_name) {
    return this.first_name + " " + this.family_name;
  }
});

authorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

authorSchema.virtual("lifespan").get(function () {
  const birth = this.date_of_birth
    ? dateFormatter(this.date_of_birth)
    : "unknown";
  const death = this.date_of_death
    ? dateFormatter(this.date_of_death)
    : "present";
  lifespan = birth + " - " + death;
  if (birth === "unknown" && death === "present") {
    lifespan = "Unknown";
  }
  return lifespan;
});

authorSchema.virtual("date_of_birth_dd_mm_yyyy").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toISODate()
    : "";
});

authorSchema.virtual("date_of_death_dd_mm_yyyy").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toISODate()
    : "";
});

const dateFormatter = (date) => {
  return date
    ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
    : "";
};

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
