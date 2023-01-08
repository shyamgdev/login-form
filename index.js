const password__validation = (e) => {
  const value = e.value;
  const spacialCharactor = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const number = /\d/;

  if (value.length >= 8 && spacialCharactor.test(value) && number.test(value)) {
    console.log("yes")
    e.style.borderColor = "green";
  }
  else {
    e.style.borderColor = "red";
  }
}