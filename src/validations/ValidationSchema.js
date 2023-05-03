import * as yup from "yup";

let courseSchema = yup.object().shape({
    title: yup.string().required(),
    instructorName: yup.string().required(),
    shortTitle: yup.string().required(),
    courseDuration: yup.string().required(),
    coursePrice: yup.string().required(),
    category: yup.array().required("Category is required"),
    type: yup.object().required(),
    courseRequirements: yup.string().required(),
    courseFeatures: yup.string().required(),
    courseDescription: yup.string().required(),
    thumbnail: yup.mixed().when("isThumbnailExist", {
        is: false,
        then: yup.string().required("Thumbnail is required"),
    }),
    playlistId: yup.string().when("courseType", {
        is: "youtube",
        then: yup.string().required("Playlist id is required."),
    }),
});

let categorySchema = yup.object().shape({
    name: yup.string().required(),
    status: yup.string().required(),
});

let articleSchema = yup.object().shape({
    title: yup.string().required(),
    categoryId: yup.string().required("Category is required."),
    status: yup.string().required(),
    description: yup.string().required(),
});

let couponSchema = yup.object().shape({
    title: yup.string().required("Coupon code is required"),
    couponCode: yup.string().required(),
    percentage: yup.string().required("Percentage is required"),
    expiryDate: yup.date().required("Expire date required"),
});

let adminProfile = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phoneNumber: yup.string().required("Mobile number is required"),
    // password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .when("password", {
            is: (value) => !!value,
            then: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required")
        })
});

export {
    courseSchema,
    categorySchema,
    articleSchema,
    couponSchema,
    adminProfile,
};
