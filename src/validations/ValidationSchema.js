import * as yup from "yup";

let schema = yup.object().shape({
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

export { schema };
