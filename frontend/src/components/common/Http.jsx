export const apiUrl = "http://localhost:8000/api";
export const getToken = () => {
    const adminInfo = localStorage.getItem("adminInfo");
    const data = JSON.parse(adminInfo);
    const token = data.token;
    if (token) {
        return token;
    } else {
        return null;
    }
}
export const getUserToken = () => {
    const userInfo = localStorage.getItem("userInfo");
    const data = JSON.parse(userInfo);
    const token = data.token;
    if (token) {
        return token;
    } else {
        return null;
    }
}