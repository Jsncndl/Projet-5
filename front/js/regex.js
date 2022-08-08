//-----------------------------------------REGEX-----------------------------------------//
// Test regex email //
export function validateEmail(email) {
  const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (regEmail.test(email)) {
    return true;
  } else {
    return false;
  }
}

// Test regex names //
export function validateName(name) {
  const regName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (regName.test(name)) {
    return true;
  } else {
    return false;
  }
}

// Test regex address //
export function validateAddress(address) {
  const regAddress = /^[a-zA-Z0-9 ,'\s]{5,50}$/;
  if (regAddress.test(address)) {
    return true;
  } else {
    return false;
  }
}
