import { staffSelectType } from "@/components/custom/MultiSelect";
import { AddressType, MapType } from "@/type/location";
import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Mật khẩu tối thiểu cần 6 kí tự",
    })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Mật khẩu cần chứa ít nhất một kí tự in hoa và một kí tự in thường",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "Mật khẩu tối thiểu cần 6 kí tự",
    })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Mật khẩu cần chứa ít nhất một kí tự in hoa và một kí tự in thường",
    }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message: "Vui lòng nhập đúng định dạng email",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Email không hợp lệ theo định dạng",
    }),
});

export const LoginSchema = z.object({
  account: z
    .string().min(1, { message: "cannot be empty" }),
  password: z.string(),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập đúng định dạng email",
  }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu tối thiểu cần 6 kí tự" })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Mật khẩu cần chứa ít nhất một kí tự in hoa và một kí tự in thường",
    }),
  comfirmPassword: z
    .string()
    .min(6, { message: "Mật khẩu tối thiểu cần 6 kí tự" }),
});

export const ServiceSchema = z.object({
  id: z.string().optional(),
  serviceName: z
    .string()
    .min(1, { message: "Tên dịch vụ không thể bỏ trống" })
    .max(55, { message: "Tên dịch vụ không thể vượt quá 55 ký tự" }),
  shortDescription: z
    .string()
    .min(1, { message: "Miêu tả dịch vụ không thể bỏ trống" })
    .max(1000, { message: "Miêu tả dịch vụ không thể vượt quá 1000 ký tự" }),
  longDescription: z
    .string()
    .min(1, { message: "Miêu tả dịch vụ không thể bỏ trống" })
    .max(1000, { message: "Miêu tả dịch vụ không thể vượt quá 1000 ký tự" }),
  promotionImg: z
    .string()
    .min(1, { message: "Hình ảnh khuyến mãi không thể bỏ trống" })
    .max(256, { message: "Hình ảnh khuyến mãi không thể vượt quá 256 ký tự" }),
  serviceItems: z.array(
    z.object({
      id: z.string(),
      title: z
        .string()
        .min(1, { message: "Tiêu đề không thể bỏ trống" })
        .max(256, { message: "Tiêu đề không thể vượt quá 256 ký tự" }),
      description: z
        .string()
        .min(1, { message: "Mô tả không thể bỏ trống" })
        .max(256, { message: "Mô tả không thể vượt quá 256 ký tự" }),
      promotionImg: z
        .string()
        .min(1, { message: "Hình ảnh khuyến mãi không thể bỏ trống" })
        .max(256, {
          message: "Hình ảnh khuyến mãi không thể vượt quá 256 ký tự",
        }),
    })
  ),
  otherImg: z.string().optional(),
});

export const ServiceItemsSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string().min(1, { message: "Tiêu đề không thể bỏ trống" }),
    description: z
      .string()
      .min(1, { message: "Mô tả không thể bỏ trống" })
      .max(1000, { message: "Mô tả không thể vượt quá 1000 ký tự" }),
    promotionImg: z
      .string()
      .min(1, { message: "Link image không thể bỏ trống" })
      .regex(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, {
        message: "Link image phải là đường dẫn hợp lệ của ảnh",
      }),
  })
);

const phoneRegex = /^0\d{8,9}$/;

export const UpdateProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().nullable().optional().refine((value) => {
    if (!value) return true;
    return phoneRegex.test(value);
  }, {
    message: "Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số",
  }),
  provinceName: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .optional(),
  provinceId: z.string().optional(),
  districtId: z.string().optional(),
  wardId: z.string().optional(),
  districtName: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .optional(),
  wardName: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .optional(),
  specificAddress: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .optional(),
  dob: z.date().nullable(),
  gender: z.string().nullable(),
});

export const ChangePasswordSchema = z.object({
  id: z.string().optional(),
  oldPassword: z.string().min(1, {
    message: "Cannot be empty",
  }),
  newPassword: z
    .string()
    .min(6, {
      message: "Password has at least 6 characters",
    })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Password must contain at least one uppercase letter and one lowercase letter",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "Password has at least 6 characters",
    })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Password must contain at least one uppercase letter and one lowercase letter",
    }),
});

export const BookingFormSchema = z.object({
  serviceName: z.string().min(1, { message: "vui lòng chọn dịch vụ" }),
  serviceCombo: z.string({ required_error: "vui lòng chọn dịch vụ" }),
  date: z.date({ required_error: "Hãy chọn ngày đặt lịch" }),
  time: z.string().min(1, { message: "Vui lòng chọn thời gian" }),
  price: z.string().optional(),
  userId: z.string().min(1),
  province: z.string().optional(),
  district: z.string().optional(),
  ward: z.string().optional(),
  specificAddress: z.string().optional(),
  map: z.custom<MapType>().optional(),
  address: z.custom<AddressType>().optional(),
  priorityStaffId: z.string().optional(),
  userAddress: z.string().optional(),
  bookingOption: z.string({
    required_error: "Vui lòng chọn tùy chọn đặt lịch",
  }),
  staffList: z.array(z.custom<staffSelectType>()).optional(),
  deposit: z.string().optional(),
  paymentMethod: z.string().optional(),
  phoneNumber: z
    .string()
    .min(1, { message: "Vui lòng nhập số điện thoại" })
    .regex(phoneRegex, {
      message: "Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số",
    }),
});

export const feedbackSchema = z.object({
  feedback: z.string().min(30, {
    message: "Đánh giá phải nhiều hơn 30 ký tự",
  }),
  rate: z.string().refine(
    (val) => {
      const rate = Number(val);
      return !isNaN(rate) && rate >= 1 && rate <= 5;
    },
    {
      message: "Đánh giá từ 1 đến 5 sao",
    }
  ),
  userId: z.string().min(1, {
    message: "Id người dùng ko thể để trống",
  }),
  requestId: z.string().min(1, {
    message: "Yêu cầu không thể để trống",
  }),
});

export const UpdateServiceSchema = z.object({
  id: z.string().optional(),
  serviceName: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .max(1000, { message: "Tên dịch vụ không thể vượt quá 1000 ký tự" }),
  serviceDescription: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .max(1000, { message: "Miêu tả dịch vụ không thể vượt quá 1000 ký tự" }),
  shortDescription: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .max(500, { message: "Miêu tả dịch vụ không thể vượt quá 500 ký tự" }),
  serviceImageUrl: z.string().optional(),
});

export const UpdateServiceItemSchema = z.object({
  id: z.string().optional(),
  serviceItemTitle: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .max(256, { message: "Tên dịch vụ không thể vượt quá 256 ký tự" }),
  serviceItemDescription: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .max(1000, { message: "Miêu tả dịch vụ không thể vượt quá 1000 ký tự" }),
  serviceImageUrl: z.string().optional(),
  serviceId: z.string().optional(),
});

export const UpdateServiceComboSchema = z.object({
  id: z.string().optional(),
  workOption: z.string().min(1, {
    message: "Yêu cầu tối thiểu 2 ký tự",
  }),
  workDuration: z.string().min(1, {
    message: "Thời gian làm việc ít nhất là 2 ký tự",
  }),
  staffNumber: z.coerce
    .number()
    .positive({ message: "Số lượng nhân viên phải > 0" }),
  price: z.coerce.number().positive({ message: "Giá tiền phải > 0" }),
  duration: z.coerce
    .number()
    .positive({ message: "Thời lượng làm việc phải > 0" }),
  serviceId: z.string().optional(),
});

export const updateUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Vui lòng không để trống" }).nullable(),
  phoneNumber: z.string().nullable().optional().refine((value) => {
    if (!value) return true;
    return phoneRegex.test(value);
  }, {
    message: "Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số",
  }),
  gender: z.string().nullable(),
  dateOfBirth: z.date().nullable(),
  email: z
    .string()
    .email({
      message: "Vui lòng nhập đúng định dạng email",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Email không hợp lệ theo định dạng",
    }),
  role: z.string().optional(),
  address: z.string().optional(),
  status: z.boolean().optional(),
});

export const deleteUserSchema = z.object({
  id: z.string().optional(),
});

export const updateReportStatusSchema = z.object({
  id: z.string().optional(),
  status: z.string(),
});

export const ApplicationFormSchema = z.object({
  applicationType: z.string().min(1),
  reason: z
    .string()
    .min(1)
    .max(256, { message: "Lý do không thể vượt quá 256 ký tự" }),
  attachedFile: z.array(z.any().optional()).optional(),
});

export const CreateUserSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập đúng định dạng email" }),
  password: z
    .string()
    .min(6, {
      message: "Mật khẩu tối thiểu cần 6 kí tự",
    })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Mật khẩu cần chứa ít nhất một kí tự in hoa và một kí tự in thường",
    }),
  confirmPassword: z
    .string()
    .min(6, {
      message: "Mật khẩu tối thiểu cần 6 kí tự",
    })
    .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
      message:
        "Mật khẩu cần chứa ít nhất một kí tự in hoa và một kí tự in thường",
    }),
  name: z.string().min(1, { message: "Vui lòng không để trống" }),
  phone: z
    .string()
    .min(1, { message: "Vui lòng không để trống" })
    .regex(phoneRegex, {
      message: "Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số",
    }),
  dob: z.date({ message: "Vui lòng nhập đúng định dạng DD/MM/YYYY" }),
  gender: z.string().min(1, { message: "Vui lòng chọn giới tính" }),
  role: z.string(),
});

export const GenerateStaffSchema = z.array(
  z.object({
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Sai định dạng ngày tháng",
    }),
    email: z.string().email({ message: "Vui lòng nhập đúng định dạng email" }),
    gender: z.string().min(1, { message: "Vui lòng chọn giới tính" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có tối thiểu 6 kí tứ" })
    // .refine((value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value), {
    //   message:
    //     "Mật khẩu cần chứa ít nhất một kí tự in hoa và một kí tự in thường",
    // }),
    ,
    phone: z
      .string().min(1)
    // .regex(phoneRegex, { message: "Số điện thoại phải bắt đầu bằng 0 và chứa 9-10 chữ số" })
    ,
    role: z.string().min(1, { message: "Vui lòng chọn vai trò" }),
    skills: z.string(),
  })
);
