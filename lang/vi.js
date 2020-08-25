export const transValidation = {
email_incorrect: "Email phai co dang example@gmail.com!",
gender_incorrect: "Bede phai hong tar??",
password_incorrect: "Mat khau phai gom 8 ky tu, bao gom chu hoa, chu thuong, chu so va ky tu dac biet.",
password_confirmation_incorrect: "Nhap lai mat khau chua chinh xac!"
};

export const transErrors = {
    account_in_use: "user nay da duoc su dung.",
    account_removed: "tai khoan nay da bi go khoi he thong, neu day la hieu lam, vui long lien he bo phan ho tro cua chung toi.",
    account_not_active: "Email da dang ky nhung chua duoc Active tai khoan, vui long kiem tra email hoac lien he voi bo phan ho tro cua chung toi.",
    token_undefine: "token khong ton tai!",
    login_failed: "Sai tai khoan hoac mat khau!",
    server_error: "Co loi phia server, lien he voi bo phan ho tro de bao cao loi nay, xin cam on."
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tai khoan <strong>${userEmail} da duoc tao, kiem tra email de Active tai khoan truoc khi dang nhap, cam on</strong>`
    },
    account_actived: "kich hoat tai khoan thanh cong, ban da co the dang nhap ung dung.",
    loginSuccess: (username) => {
        return `Xin chao ${username}, chuc ban mot ngay tot lanh.`
    },
    logout_success: "Dang xuat tai khoan thanh cong, hen gap lai."
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
