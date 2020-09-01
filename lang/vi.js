export const transValidation = {
email_incorrect: "Email phai co dang example@gmail.com!",
gender_incorrect: "Bede phai hong tar??",
password_incorrect: "Mat khau phai gom 8 ky tu, bao gom chu hoa, chu thuong, chu so va ky tu dac biet.",
password_confirmation_incorrect: "Nhap lai mat khau chua chinh xac!",
update_username: "Username gioi han trong khoang 3-17 ky tu, và không được có ký tự đặc biệt.",
update_gender: "Có phải bạn là giới tính thứ 3?",
update_address: "Địa chỉ giới hạn trong khoảng 3-30 ký tự.",
update_phone: "Số điện thoại Việt Nam bắt đầu bằng số 0, giới hạn từ 10-11 ký tự.",
keyword_find_user: "Lỗi từ khóa tìm kiếm, chỉ cho phép chữ cái, số hay khoảng trống."
};

export const transErrors = {
    account_in_use: "user nay da duoc su dung.",
    account_removed: "tai khoan nay da bi go khoi he thong, neu day la hieu lam, vui long lien he bo phan ho tro cua chung toi.",
    account_not_active: "Email da dang ky nhung chua duoc Active tai khoan, vui long kiem tra email hoac lien he voi bo phan ho tro cua chung toi.",
    account_undefined: "Tài khoản này không tồn tại.",
    token_undefine: "token khong ton tai!",
    login_failed: "Sai tai khoan hoac mat khau!",
    server_error: "Co loi phia server, lien he voi bo phan ho tro de bao cao loi nay, xin cam on.",
    avatar_type: "Kieu file khong hop le, chi chap nhan png, jpg hay jpeg",
    avatar_size: "Anh upload toi da cho phep la 1MB",
    user_current_password_failed: "Mật khẩu hiện tại không chính xác."
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tai khoan <strong>${userEmail} da duoc tao, kiem tra email de Active tai khoan truoc khi dang nhap, cam on</strong>`
    },
    account_actived: "kich hoat tai khoan thanh cong, ban da co the dang nhap ung dung.",
    loginSuccess: (username) => {
        return `Xin chao ${username}, chuc ban mot ngay tot lanh.`
    },
    logout_success: "Dang xuat tai khoan thanh cong, hen gap lai.",
    user_info_updated: "Cap nhat thong tin nguoi dung thanh cong.",
    user_password_updated: "Cập nhật mật khẩu thành công."
};

export const transMail = {
   subject: "Awesome chat: xac nhan kich hoat tai khoan.",
   template: (linkVerify) => {
    return `
        <h2>Ban nhan duoc email nay vi da dang ky ung dung Awesome Chat.</h2>
        <h3>Vui long click vao lien ket ben duoi de xac nhan tai khoan.</h3>
        <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
        <h4>Neu tin rang day la nham lan, hay bo qua no. Cam on.</h4>
    `;
   },
   send_failed: "co loi trong qua trinh gui email, vui long lien he voi bo phan ho tro."
};
