export const transValidation = {
email_incorrect: "Email phai co dang example@gmail.com!",
gender_incorrect: "Bede phai hong tar??",
password_incorrect: "Mat khau phai gom 8 ky tu, bao gom chu hoa, chu thuong, chu so va ky tu dac biet.",
password_confirmation_incorrect: "Nhap lai mat khau chua chinh xac!"
};

export const transErrors = {
    account_in_use: "user nay da duoc su dung.",
    account_removed: "tai khoan nay da bi go khoi he thong, neu day la hieu lam, vui long lien he bo phan ho tro cua chung toi.",
    account_not_active: "Email da dang ky nhung chua duoc Active tai khoan, vui long kiem tra email hoac lien he voi bo phan ho tro cua chung toi."
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tai khoan <strong>${userEmail} da duoc tao, kiem tra email de Active tai khoan truoc khi dang nhap, cam on</strong>`
    }
};
