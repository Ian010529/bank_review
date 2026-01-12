const mongoose = require("mongoose");
import { AnyObject } from "./../node_modules/mongoose/types/index.d";
const companyModel = require("./companyModel");

const storySchema = new mongoose.Schema(
  {
    vibe: {
      type: String,
      ennum: ["positive", "negative", "neutral"],
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    isAnomymous: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: function () {
        return !this.isAnomymous;
      },
    },

    anonymousId: {
      type: String,
      required: function () {
        return this.isAnomymous;
      },

      userType: {
        type: String,
        enum: [
          "individual",
          "bank employee",
          "bussiness customer",
          "former employee",
          "investor",
          "other",
        ],
        required: true,
      },
    },

    title: {
      type: String,
      required: true,
    },

    story: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
