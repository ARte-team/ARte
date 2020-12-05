"use strict";

// Return 0 if title is ok, 1 otherwise
function validateTitle(title, titleError) {
  if (!title || !titleError)   return 1;

  const titleValue = title.value;
  return titleValue !== "" ? showSuccess(title, titleError) : showError(title, titleError, "Title cannot be blank");
}

// Return 0 if author is ok, 1 otherwise
function validateAuthor(author, authorError) {
  if (!author || !authorError)   return 1;

  const authorValue = author.value;
  return authorValue !== "" ? showSuccess(author, authorError) : showError(author, authorError, "Author cannot be blank");
}

// Return 0 if description is ok, 1 otherwise
function validateDescription(description, descriptionError) {
  if (!description || !descriptionError)   return 1;

  const descriptionValue = description.value;
  return descriptionValue !== "" ? showSuccess(description, descriptionError) : showError(description, descriptionError, "Description cannot be blank");
}

// Return 0 if room is ok, 1 otherwise
function validateRoom(room, roomError) {
  if (!room || !roomError)   return 1;

  const roomValue = room.value;
  return roomValue !== "0" ? showSuccess(room, roomError) : showError(room, roomError, "Room cannot be blank");
}

// Return 0 if 3Dmodel is ok, 1 otherwise
function validate3Dmodel(model, modelError) {
  if (!model || !modelError)   return 1;

  // Check if input file contains the files entry
  if (!"files" in model)
    return showError(model, modelError, "3D model cannot be blank");

  // Else check if a file has been selected
  else if (model.files.length < 1)
    return showError(model, modelError, "3D model cannot be blank");

  // Else get extension and check if the selected file is a 3D model
  else {
    for (let file of model.files) {
      if ("name" in file) {
        const f = file.name.split(".");
        const extension = f[f.length-1];

        const extensions = ["gltf", "fbx", "obj", "bin"];

        for (const ext of extensions) {
          if (extension === ext) {
            //modelValue = file;
            return showSuccess(model, modelError);
          }
        }

        return showError(model, modelError, "3D model must be one of the following formats: .fbx, .gltf, .obj or .bin");
      }
    }


    /*const file = model.files[0];
    if ("name" in file) {
      const f = file.name.split(".");
      const extension = f[f.length-1];

      const extensions = ["gltf", "fbx", "obj"];

      for (const ext of extensions) {
        if (extension === ext) {
          //modelValue = file;
          return showSuccess(model, modelError);
        }
      }

      return showError(model, modelError, "3D model must be one of the following formats: .fbx, .gltf or .obj");
    }*/
  }
}

// Return 0 if photo is ok, 1 otherwise
function validatePhoto(photo, photoError) {
  if (!photo || !photoError)   return 1;

  // Check if input file contains the files entry
  if (!"files" in photo)
    return showError(photo, photoError, "Photo cannot be blank");

  // Else check if a file has been selected
  else if (photo.files.length < 1)
    return showError(photo, photoError, "Photo cannot be blank");

  // Else get extension and check if the selected file is a photo
  else {
    const file = photo.files[0];
    if ("name" in file) {
      const f = file.name.split(".");
      const extension = f[f.length-1];

      const extensions = ["jpg", "jpeg", "png"]

      for (const ext of extensions) {
        if (extension === ext) {
          //photoValue = file;
          return showSuccess(photo, photoError);
        }
      }

      return showError(photo, photoError, "Photo must be one of the following formats: .jpeg, .jpg or .png");
    }
  }
}

// Return true if password is ok
function validatePassword(password, passwordValue) {
  if (!password)  return false;

  passwordValue = password.value;
  return passwordValue.length >= 8;
}

// Return true if passwords match
function matchPasswords(password, repeatPassword) {
  if (password && repeatPassword)
    return password.value === repeatPassword.value;
  else
    return false;
}

// Set error classes and text and return 1
function showError(inputElement, textElement, text) {
  if (!inputElement || !textElement || !text)  return 1;
  // Set error classes and text
  inputElement.parentNode.parentNode.classList.add("has-danger");
  inputElement.classList.add("form-control-danger");

  textElement.classList.add("text-danger");
  textElement.classList.add("error");
  textElement.innerText = text;
  return 1;
}

// Remove error classes and text and return 0 if ok
function showSuccess(inputElement, textElement) {
  if (!inputElement || !textElement)  return 1;

  // Remove error classes
  inputElement.parentNode.parentNode.classList.remove("has-danger");
  inputElement.classList.remove("form-control-danger");
  textElement.classList.remove("text-danger");
  textElement.classList.remove("error");

  // Remove error text
  textElement.innerText = "";
  return 0;
}
