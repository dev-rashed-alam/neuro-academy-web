import * as yup from "yup";

let courseSchema = yup.object().shape({
  title: yup.string().required(),
  instructorName: yup.string().required(),
  shortTitle: yup.string().required(),
  duration: yup.string().required(),
  price: yup.string().required(),
  category: yup.array().required(),
  type: yup.object().required(),
  requirements: yup.string().required(),
  features: yup.string().required(),
  description: yup.string().required(),
  image: yup.mixed().required("Thumbnail is required"),
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
  category: yup.object().required(),
  status: yup.string().required(),
  description: yup.string().required(),
  image: yup.mixed().required("Thumbnail is required"),
});

let couponSchema = yup.object().shape({
  title: yup.string().required(),
  couponCode: yup.string().required(),
  percentage: yup.string().required(),
  expireDate: yup.date().required(),
});

export { courseSchema, categorySchema, articleSchema, couponSchema };
