import * as yup from "yup";

let courseSchema = yup.object().shape({
  title: yup.string().required(),
  instructorName: yup.string().required(),
  shortTitle: yup.string().required(),
  duration: yup.string().required(),
  price: yup.string().required(),
  category: yup.array().required("Category is required"),
  type: yup.object().required(),
  requirements: yup.string().required(),
  features: yup.string().required(),
  description: yup.string().required(),
  image: yup.mixed().when("isThumbnailExist", {
    is: false,
    then: yup.string().required("Thumbnail is required"),
  }),
  playlistId: yup.string().when("courseType", {
    is: "youtube",
    then: yup.string().required("Playlist id is required."),
  }),
});

let categorySchema = yup.object().shape({
  title: yup.string().required(),
  status: yup.string().required(),
});

let articleSchema = yup.object().shape({
  title: yup.string().required(),
  category: yup.object().required("Category is required."),
  status: yup.string().required(),
  description: yup.string().required(),
});

let couponSchema = yup.object().shape({
  title: yup.string().required("Coupon code is required"),
  code: yup.string().required(),
  percent: yup.string().required("Percentage is required"),
  expiry_date: yup.date().required("Expire date required"),
});

export { courseSchema, categorySchema, articleSchema, couponSchema };
