<?php
$modelFiles = $_FILES["model3D"];
$photoFile  = $_FILES["photo"];
$title = $_POST["title"];
$update = $_POST["update"];

$modelDir = "../uploads/models/" . $title . "/";
$photoDir = "../uploads/images/" . $title . "/";

/*echo $modelDir . "\n";
echo $photoDir . "\n";
echo "update ? " . $update . "\n";*/

// Init the models directory
if (!is_dir($modelDir))
    mkdir($modelDir, 0777, true);
else if ($update)
    array_map("unlink", glob("$modelDir/*.*"));

// Init the photos directory
if (!is_dir($photoDir))
    mkdir($photoDir, 0777, true);
else if ($update)
    array_map("unlink", glob("$photoDir/*.*"));

// Create a URL for each 3D model file (.gltf, .bin, ...)
$modelURLs = [];
foreach ($modelFiles["name"] as &$filename)
    $modelURLs[] = $modelDir . basename($filename);

// break the reference with the last element
unset($value);

$photoURL = $photoDir . basename($photoFile["name"]);

//echo $modelURL . "\n" . $photoURL . "\n";
/*echo $modelURLs[0] . "\n";
echo $modelURLs[1] . "\n";
echo $photoURL . "\n";//*/

// Get the filetype for each 3D model file (.gltf, .bin, ...)
$modelFileTypes = [];
foreach ($modelURLs as &$modelURL)
    $modelFileTypes[] = strtolower(pathinfo($modelURL, PATHINFO_EXTENSION));

// break the reference with the last element
unset($value);

$photoFileType = strtolower(pathinfo($photoURL, PATHINFO_EXTENSION));

/*echo $modelFileTypes[0] . "\n";
echo $modelFileTypes[1] . "\n";
echo $photoFileType . "\n";//*/

// 2 types: model and photo but model can consist of multiple files
$n = 1 + count($modelURLs);

function sendError($msg) {
  $obj->status = "error";
  $obj->msg = $msg;

  $json = json_encode($obj);
  echo $json;
}


// Check if image file is a actual image or fake image
$check = getimagesize($photoFile["tmp_name"]);
if (!$check) {
  sendError($photoFile["name"] . " is not an image!");
  return;
}

// Check if one of the files already exists
if (!$update) {
  $file = $modelURLs[0];
  for ($i = 0; $i < $n; $i++) {
    if ($i < $n-1)
      $file = $modelURLs[$i];
    else
      $file = $photoURL;

    //echo "i: " . $i . ", file: " . $file . "\n";

    if (file_exists($file)) {
      if ($i < $n-1)
        sendError("Sorry, " . $modelfiles["name"][$i] . " already exists");
      else
        sendError("Sorry, " . $photofile["name"] . " already exists");
      return;
    }
  }
}

// Check size of each file
//$file = $modelFile;
$filesize = $modelFiles["size"][0];
$maxSize = 15728640; // 15 Mb
for ($i = 0; $i < $n; $i++) {
  if ($i < $n-1)
    $filesize = $modelFiles["size"][$i];
  else {
    $filesize = $photoFile["size"];
    $maxSize = 5242880; // 5 Mb
  }

  // Check model size
  if ($filesize > $maxSize) {
    if ($i < $n-1)
      sendError("Sorry, " . $modelfiles["name"][$i] . " is too large");
    else
      sendError("Sorry, " . $photofile["name"] . " is too large");
    return;
  }
}

// Allow certain file formats
foreach ($modelFileTypes as &$modelFileType)
  if($modelFileType != "gltf" && $modelFileType != "fbx" && $modelFileType != "obj" && $modelFileType != "bin") {
    sendError("Sorry, only .fbx, .gltf, .obj and .bin 3D model formats are allowed");
    return;
  }

// break the reference with the last element
unset($value);

// Allow certain file formats
if($photoFileType != "jpg" && $photoFileType != "jpeg" && $photoFileType != "png") {
  sendError("Sorry, only .jpg, .jpeg and .png images are allowed");
  return;
}

// Upload files
$file   = $modelFiles["tmp_name"][0];
$target = $modelURLs[0];

/*echo count($modelFiles["tmp_name"]) . "\n";
echo "tmp_name model[0]: " . $file . "\n";
echo "tmp_name photo: " . $photoFile["tmp_name"] . "\n";

echo $modelFiles["size"][0] . "\n";
echo $modelFiles["size"][1] . "\n";
echo $photoFile["size"] . "\n";*/

for ($i = 0; $i < $n; $i++) {
  if ($i < $n-1) {
    $file   = $modelFiles["tmp_name"][$i];
    $target = $modelURLs[$i];
  }
  else {
    $file   = $photoFile["tmp_name"];
    $target = $photoURL;
  }

  //echo $file . "\n";
  //echo $target . "\n";

  // PER ORA BLOCCO IL .bin
  if ($i == 0)
    continue;

  if (!move_uploaded_file($file, $target)) {
    if ($i < $n-1)
      sendError("Sorry, there was an error uploading " . $modelfiles["name"][$i]);
    else
      sendError("Sorry, there was an error uploading " . $photofile["name"]);
    return;
  }
}

// Return JSON with the path relative to HTML files
$modelURLs= [];
foreach ($modelFiles["name"] as &$filename)
    $modelURLs[] = "../files/assets/uploads/models/" . $title . "/" . basename($filename);

$obj->modelURLs = $modelURLs;
$obj->photoURL = "../files/assets/uploads/images/" . $title . "/" . basename($photoFile["name"]);
$obj->status = "success";

$json = json_encode($obj);

echo $json;
?>