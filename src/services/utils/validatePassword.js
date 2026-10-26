// validate the password
//-Atleast 8 characters
//-atleast 1 uppercase
//-atleast 1 lowercase
//-special character!@#$%^&*()_+<>?|
//-Password must match

export const validator = (password = "", confirmPassword = "") => {
  const error = [];
  password.length < 6 && error.push("At least 6 characters required");

  !/[A-Z]/.test(password) &&
    error.push("Password must include at least 1 uppercase letter"); //aassdd
  !/[a-z]/.test(password) &&
    error.push("Password must include at least 1 lowercase letter"); //aassdd
  !/[0-9]/.test(password) &&
    error.push("Password must include at least 1 number"); //aassdd
  !/[!@#$%^&*()_+<>?|]/.test(password) &&
    error.push(
      "Password must include at least 1 of special character !@#$%^&*()_+<>?|",
    ); //aassdd

  password !== confirmPassword && error.push("Password do not match");

  return error;
};
