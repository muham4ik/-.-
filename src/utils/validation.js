import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
    phone_number: Yup.string().min(19, "Invalid phone number").required("Phone number is required"),
})

export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
})

export const verifyPassValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
})

export const updatePassValidationSchema = Yup.object().shape({
    new_password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
    code: Yup.string().required().trim(),
})

// ------------- SERVICES --------------

export const servicesValidationSchema = Yup.object().shape({
    name: Yup.string().required("Xizmat nomini kiriting"),
    price: Yup.number().required("Xizmat narxini kiriting"),
})

// Create Category validationSchema

export const createCategoryValidationSchema = Yup.object().shape({
    category_name: Yup.string().required("Xizmat nomini kiriting"),
   
})

// -------------- Order -------------------


export const orderValidationSchema = Yup.object().shape({
    amount: Yup.number().required("Xizmat sonini kiriting"),
    client_full_name: Yup.string().required("Ismingizni kiriting"),
    client_phone_number: Yup.string().min(10, "Noto'gri raqam").required("Telefon raqam majburiy"),
    service_id: Yup.string().required("Xizmat id kiriting"),
})



export const WorkervalidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    first_name: Yup.string()
      .min(2, "Name is too short")
      .max(50, "Name is too long")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Name is too short")
      .max(50, "Name is too long")
      .required("Last name is required"),
    password: Yup.string()
      .min(6, "Password is too short")
      .required("Password is required"),
    phone_number: Yup.string()
      .min(3, "Phone number is too short")
      .required("Phone number is required")
      .max(15, "Phone number is too long"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.string().required("Age is required"),
  });

  // Products



  const romanNumeralRegex = /^(X|L|M|S|XXl)+$/;
  export const ProductvalidationSchema = Yup.object().shape({
    age_max: Yup.number()
      .positive("Age Max must be a positive number")
      .integer("Age Max must be an integer")
      .required("Age Max is required"),
    age_min: Yup.number()
      .positive("Age Min must be a positive number")
      .integer("Age Min must be an integer")
      .required("Age Min is required"),
    category_id: Yup.string()
      .required("Category ID is required"),
    color: Yup.array()
      .of(Yup.string())
      .required("At least one color must be selected"),
    cost: Yup.number()
      .positive("Cost must be a positive number")
      .required("Cost is required"),
    count: Yup.number()
      .positive("Count must be a positive number")
      .integer("Count must be an integer")
      .required("Count is required"),
    description: Yup.string()
      .required("Description is required"),
    discount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%")
      .required("Discount is required"),
    for_gender: Yup.string()
      .oneOf(["male", "female"], "Gender must be either male or female")
      .required("Gender is required"),
    made_in: Yup.string()
      .required("Made In is required"),
    product_name: Yup.string()
      .required("Product Name is required"),
    size: Yup.array()
      .of(Yup.string().matches(romanNumeralRegex, "Product size should be in Roman numerals only"))
      .required("Size is required"),
  });


  // Media

 export const mediavalidationSchema = Yup.object().shape({
    photo: Yup.mixed().required("Photo is required"),
  });