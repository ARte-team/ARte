<?php
$modelDir = "../uploads/models/" . $_POST["title"] . "/" ;
$photoDir = "../uploads/images/" . $_POST["title"]  . "/";

array_map("unlink", glob("$modelDir/*.*"));
array_map("unlink", glob("$photoDir/*.*"));

if (!rmdir($modelDir))
  echo "error in deleting the 3D model of " . $_POST["title"] . "\n";

if (!rmdir($photoDir))
  echo "error in deleting the photo of " . $_POST["title"] . "\n";
?>
